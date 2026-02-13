import exifr from "exifr";
import haversine from "haversine-distance";
import { TripWithVisits } from "./types";
import { dbscanClusterPhotos, generateTripName } from "./clustering";

const MILES_THRESHOLD = 5;
const METERS_THRESHOLD = MILES_THRESHOLD * 1609.34;

export type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
  file?: File;
};

export type TripPreview = {
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
};

export const extractPhotoMetadata = async (
  files: FileList
): Promise<PhotoData[]> => {
  const results: PhotoData[] = [];

  for (const file of Array.from(files)) {
    try {
      const exifData = await exifr.parse(file, { gps: true });
      const timestamp = exifData?.DateTimeOriginal || exifData?.CreateDate;
      const lat = exifData?.latitude;
      const lng = exifData?.longitude;

      if (timestamp) {
        results.push({
          timestamp: new Date(timestamp).toISOString(),
          location: lat && lng ? { lat, lng } : undefined,
          file,
        });
      }
    } catch (err) {
      // Silently skip photos that can't be parsed
    }
  }

  return results
    .filter((p) => p.location)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
};

const isWithinDistance = (
  pointA: { lat: number; lng: number },
  pointB: { lat: number; lng: number },
  metersThreshold = METERS_THRESHOLD
) => {
  return haversine(pointA, pointB) <= metersThreshold;
};

export const filterPhotosByDistance = (photos: PhotoData[]) => {
  const withLocation = photos.filter(
    (p) => p.location && p.location.lat && p.location.lng
  );
  if (withLocation.length === 0) return [];

  const filtered = [withLocation[0]];
  let lastKept = withLocation[0];

  for (let i = 1; i < withLocation.length; i++) {
    if (!isWithinDistance(lastKept.location!, withLocation[i].location!)) {
      filtered.push(withLocation[i]);
      lastKept = withLocation[i];
    }
  }

  return filtered;
};

export const createRouteSegment = async (
  directionsService: google.maps.DirectionsService,
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  timestamp: string
) => {
  const results = await directionsService.route({
    origin: `${start.lat}, ${start.lng}`,
    destination: `${end.lat}, ${end.lng}`,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  const polyline = results.routes[0].overview_polyline;

  const decodedPolyline = google.maps.geometry.encoding
    .decodePath(polyline)
    .map((latLng) => [latLng.lng(), latLng.lat()]);

  return {
    start,
    end,
    polyline,
    decodedPolyline,
    timestamp,
  };
};

export async function processPolylinesBatch(
  decodedPolylines: Array<Array<[number, number]>>
) {
  const response = await fetch(
    "https://api.gravl.org/process_polylines_batch/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ polylines: decodedPolylines }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error processing polylines batch: " + response.statusText
    );
  }

  const data = await response.json();
  return data.results;
}

export const getRouteSegments = async (photos: PhotoData[]) => {
  const filteredPhotos = filterPhotosByDistance(photos);
  const directionsService = new google.maps.DirectionsService();

  const segmentPromises = [];
  for (let i = 0; i < filteredPhotos.length - 1; i++) {
    segmentPromises.push(
      createRouteSegment(
        directionsService,
        filteredPhotos[i].location!,
        filteredPhotos[i + 1].location!,
        filteredPhotos[i + 1].timestamp
      )
    );
  }

  const segments = (await Promise.allSettled(segmentPromises))
    .filter((res) => res.status === "fulfilled")
    .map((res) => (res as PromiseFulfilledResult<any>).value);

  if (segments.length === 0) {
    return [];
  }

  const allFipsCodes = await processPolylinesBatch(
    segments.map((s) => s.decodedPolyline)
  );

  return segments.map((segment, i) => ({
    ...segment,
    fipsCodes: allFipsCodes[i],
  }));
};

export const generateVisitsFromSegments = (
  segments: { fipsCodes: string[]; timestamp: string }[]
) => {
  const seen = new Set<string>();
  const visits = [];

  for (const segment of segments) {
    const { fipsCodes, timestamp } = segment;

    for (const fips_code of fipsCodes) {
      if (!seen.has(fips_code)) {
        seen.add(fips_code);
        visits.push({
          fips_code,
          date: timestamp.split("T")[0],
          order: visits.length,
        });
      }
    }
  }

  return visits;
};

export const getCountyFromPoint = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  try {
    const response = await fetch(
      "https://api.gravl.org/get_county_from_point/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.fips_code || null;
  } catch (error) {
    return null;
  }
};

export const processPhotosIntoTrips = async (
  files: FileList
): Promise<{ trips: TripWithVisits[]; previews: TripPreview[] }> => {
  const photos = await extractPhotoMetadata(files);
  if (photos.length === 0) {
    console.error("No geotagged photos found.");
    return { trips: [], previews: [] };
  }

  const { clusters, singletons } = dbscanClusterPhotos(photos);

  if (clusters.length === 0 && singletons.length === 0) {
    console.error("No trip clusters found.");
    return { trips: [], previews: [] };
  }

  const generatedTrips: TripWithVisits[] = [];
  const previews: TripPreview[] = [];
  let tripIndex = 0;

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];

    try {
      const [routeSegments, tripName] = await Promise.all([
        getRouteSegments(cluster),
        generateTripName(cluster, tripIndex),
      ]);

      const visits = generateVisitsFromSegments(routeSegments);
      if (visits.length === 0) continue;

      const trip: TripWithVisits = {
        id: Date.now() + tripIndex,
        name: tripName,
        description: "",
        createdAt: new Date(),
        updatedAt: null,
        userId: "",
        visits: visits.map((visit, index) => ({
          id: index,
          tripId: Date.now() + tripIndex,
          placeId: null,
          placeFipsCode: visit.fips_code,
          date: new Date(visit.date),
          order: visit.order,
        })),
      };

      generatedTrips.push(trip);

      const middleIndex = Math.floor(cluster.length / 2);
      const representativePhoto = cluster[middleIndex];

      if (representativePhoto?.file) {
        const imageUrl = URL.createObjectURL(representativePhoto.file);
        const startDate = cluster[0].timestamp.split("T")[0];
        const endDate = cluster[cluster.length - 1].timestamp.split("T")[0];

        previews.push({
          name: tripName,
          imageUrl,
          startDate,
          endDate,
        });
      }

      tripIndex++;
    } catch (error) {
      console.error(`Error processing cluster ${i + 1}:`, error);
    }
  }

  const singletonResults = await Promise.allSettled(
    singletons.map(async (singleton, i) => {
      if (!singleton.location) return null;

      const [fipsCode, tripName] = await Promise.all([
        getCountyFromPoint(singleton.location.lat, singleton.location.lng),
        generateTripName([singleton], tripIndex + i),
      ]);

      if (!fipsCode) return null;

      const trip: TripWithVisits = {
        id: Date.now() + tripIndex + i,
        name: tripName,
        description: "",
        createdAt: new Date(),
        updatedAt: null,
        userId: "",
        visits: [{
          id: 0,
          tripId: Date.now() + tripIndex + i,
          placeId: null,
          placeFipsCode: fipsCode,
          date: new Date(singleton.timestamp),
          order: 0,
        }],
      };

      return { trip, tripName, date: singleton.timestamp.split("T")[0], singletonIndex: i };
    })
  );

  for (const result of singletonResults) {
    if (result.status === "fulfilled" && result.value) {
      const { trip, tripName, date, singletonIndex } = result.value;
      generatedTrips.push(trip);

      const singleton = singletons[singletonIndex];

      if (singleton?.file) {
        const imageUrl = URL.createObjectURL(singleton.file);
        previews.push({
          name: tripName,
          imageUrl,
          startDate: date,
          endDate: date,
        });
      }
    }
  }

  if (generatedTrips.length === 0 && previews.length === 0) {
    return { trips: [], previews: [] };
  }

  generatedTrips.sort((a, b) => {
    const aDate = a.visits[0]?.date || new Date(0);
    const bDate = b.visits[0]?.date || new Date(0);
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  previews.sort((a: TripPreview, b: TripPreview) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return { trips: generatedTrips, previews };
};
