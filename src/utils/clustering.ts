import haversine from "haversine-distance";

const MAX_TRIP_GAP_DAYS = 10; // Maximum days between photos in the same trip
const MAX_TRIP_DISTANCE_KM = 3000; // Maximum km distance between photos in the same trip
const MAX_PLAUSIBLE_SPEED_KMH = 130; // Maximum average travel speed (km/h)
const DEFAULT_MIN_PTS = 2; // Minimum photos to form a cluster

// Geocoding cache to avoid repeated API calls
const geocodeCache = new Map<string, string>();

type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
  file?: File;
};

/**
 * Clusters geotagged photos into trip groups using DBSCAN.
 *
 * Why DBSCAN: Discovers an arbitrary number of trip clusters without requiring the user to specify how many trips they took. Handles noise (isolated photos with no nearby neighbors) gracefully by discarding them.
 *
 * Why client-side: Read via EXIF extraction, privacy, small input size.
 *
 * @param photos - Array of photos with location and timestamp (<=50 expected)
 * @param minPts - Minimum photos to form a cluster (default: 2)
 * @returns Object with clusters array and singletons array. All sorted by timestamp.
 */
export function dbscanClusterPhotos(
  photos: PhotoData[],
  minPts: number = DEFAULT_MIN_PTS,
): { clusters: PhotoData[][]; singletons: PhotoData[] } {
  const n = photos.length;
  const labels = new Array(n).fill(-1); // -1 = unvisited, -2 = noise, >=0 = cluster ID
  let clusterId = 0;

  function isNeighbor(i: number, j: number): boolean {
    const p1 = photos[i];
    const p2 = photos[j];

    if (!p1.location || !p2.location) return false;

    const time1 = new Date(p1.timestamp).getTime();
    const time2 = new Date(p2.timestamp).getTime();

    const timeDiff = Math.abs(time2 - time1);
    const timeDeltaDays = timeDiff / (1000 * 60 * 60 * 24);
    const timeDeltaHours = timeDiff / (1000 * 60 * 60);

    if (timeDeltaDays > MAX_TRIP_GAP_DAYS) return false;

    const geoDistanceMeters = haversine(p1.location, p2.location);
    const geoDistanceKm = geoDistanceMeters / 1000;

    if (geoDistanceKm > MAX_TRIP_DISTANCE_KM) return false;

    if (timeDeltaHours === 0) {
      return geoDistanceKm <= 1;
    }

    const averageSpeedKmh = geoDistanceKm / timeDeltaHours;
    return averageSpeedKmh <= MAX_PLAUSIBLE_SPEED_KMH;
  }

  function getNeighbors(pointIdx: number): number[] {
    const neighbors: number[] = [];
    for (let i = 0; i < n; i++) {
      if (i !== pointIdx && isNeighbor(pointIdx, i)) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }

  for (let i = 0; i < n; i++) {
    if (labels[i] !== -1) continue;

    const neighbors = getNeighbors(i);

    if (neighbors.length < minPts - 1) {
      labels[i] = -2;
      continue;
    }

    labels[i] = clusterId;
    const seedSet = [...neighbors];

    for (let j = 0; j < seedSet.length; j++) {
      const currentPoint = seedSet[j];

      if (labels[currentPoint] === -2) {
        labels[currentPoint] = clusterId;
      }

      if (labels[currentPoint] !== -1) continue;

      labels[currentPoint] = clusterId;
      const currentNeighbors = getNeighbors(currentPoint);

      if (currentNeighbors.length >= minPts - 1) {
        seedSet.push(...currentNeighbors);
      }
    }

    clusterId++;
  }

  const clusters: PhotoData[][] = [];
  for (let id = 0; id < clusterId; id++) {
    const clusterPhotos = photos.filter((_, idx) => labels[idx] === id);
    if (clusterPhotos.length > 0) {
      clusterPhotos.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
      clusters.push(clusterPhotos);
    }
  }

  const singletons: PhotoData[] = [];
  for (let i = 0; i < n; i++) {
    if (labels[i] === -2) {
      singletons.push(photos[i]);
    }
  }

  singletons.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  return { clusters, singletons };
}

/**
 * Generates a human-readable trip name from a photo cluster.
 *
 * @param cluster - Array of photos in the trip cluster
 * @param fallbackIndex - Index to use in fallback name (e.g., "Trip 1")
 * @returns Promise resolving to a trip name
 */
export async function generateTripName(
  cluster: PhotoData[],
  fallbackIndex: number,
): Promise<string> {
  if (cluster.length === 0) {
    return `Trip ${fallbackIndex + 1}`;
  }

  try {
    const startPhoto = cluster[0];
    const endPhoto = cluster[cluster.length - 1];

    if (!startPhoto.location || !endPhoto.location) {
      return `Trip ${fallbackIndex + 1}`;
    }

    const startCity = await getCityName(
      startPhoto.location.lat,
      startPhoto.location.lng,
    );
    const endCity = await getCityName(
      endPhoto.location.lat,
      endPhoto.location.lng,
    );

    if (startCity && endCity) {
      if (startCity === endCity) {
        return `Trip to ${startCity}`;
      } else {
        return `${startCity} to ${endCity}`;
      }
    }

    return `Trip ${fallbackIndex + 1}`;
  } catch (error) {
    return `Trip ${fallbackIndex + 1}`;
  }
}

async function getCityName(lat: number, lng: number): Promise<string | null> {
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLng = Math.round(lng * 100) / 100;
  const cacheKey = `${roundedLat},${roundedLng}`;

  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  try {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({
      location: { lat, lng },
    });

    if (result.results && result.results.length > 0) {
      for (const component of result.results[0].address_components) {
        if (component.types.includes("locality")) {
          const cityName = component.long_name;
          geocodeCache.set(cacheKey, cityName);
          return cityName;
        }
      }

      for (const component of result.results[0].address_components) {
        if (component.types.includes("administrative_area_level_1")) {
          const areaName = component.long_name;
          geocodeCache.set(cacheKey, areaName);
          return areaName;
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
