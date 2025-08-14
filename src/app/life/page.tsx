"use client";

import React, { useRef, useState } from "react";
import exifr from "exifr";
import styles from "../../styles/life.module.scss";
import WrappedLoader from "../../components/maps/WrappedLoader";
import { TripWithVisits, VisitInput } from "../../utils/types";
import Loading from "../load";
import { useRouter } from "next/navigation";
import haversine from "haversine-distance";
import LifeInput from "../../components/life/LifeInput";
import Icon from "../../components/icons/Icon";
import { signIn } from "next-auth/react";

const MILES_THRESHOLD = 5;
const METERS_THRESHOLD = MILES_THRESHOLD * 1609.34;

type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function GravlLife() {
  const [visits, setVisits] = useState<VisitInput[]>([]);
  const router = useRouter();
  const [reanimate, setReanimate] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tripName, setTripName] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);

    const photos = await extractPhotoMetadata(files);
    if (photos.length < 2) {
      console.warn("Need at least 2 geotagged photos to calculate a route.");
      return;
    }

    const routeSegments = await getRouteSegments(photos);
    const visits = generateVisitsFromSegments(routeSegments);

    setIsLoading(false);
    setMapReady(true);
    setVisits(visits);
  };

  const extractPhotoMetadata = async (
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
          });
        }
      } catch (err) {
        console.error(`Error parsing ${file.name}:`, err);
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

  const filterPhotosByDistance = (photos: PhotoData[]) => {
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

  const createRouteSegment = async (
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

  async function processPolylinesBatch(
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

  const getRouteSegments = async (photos: PhotoData[]) => {
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

    const allFipsCodes = await processPolylinesBatch(
      segments.map((s) => s.decodedPolyline)
    );

    return segments.map((segment, i) => ({
      ...segment,
      fipsCodes: allFipsCodes[i],
    }));
  };

  const generateVisitsFromSegments = (
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
            date: timestamp.split("T")[0], // format date as YYYY-MM-DD
            order: visits.length,
          });
        }
      }
    }

    return visits;
  };

  // Map
  const visitedCounties = new Set<string>();
  const visitedStates = new Set<string>();

  const getStateFips = (placeFipsCode: string) => placeFipsCode.slice(0, 2);

  // Compare uploaded trip visits
  const newVisitedCounties = new Set<string>();
  const newVisitedStates = new Set<string>();

  visits.forEach((visit) => {
    const placeFipsCode = visit.fips_code;
    const stateFips = getStateFips(placeFipsCode);

    if (!visitedCounties.has(placeFipsCode)) {
      newVisitedCounties.add(placeFipsCode);
    }

    if (!visitedStates.has(stateFips) && stateFips !== "11") {
      newVisitedStates.add(stateFips);
    }
  });

  // Final stats
  const newCounties = newVisitedCounties.size;
  const newStates = newVisitedStates.size;

  // Create new "trip" object (optional)
  const newTrip: TripWithVisits = {
    id: -1,
    name: tripName,
    description: "",
    createdAt: new Date(),
    updatedAt: null,
    userId: "",
    visits: visits.map((visit, index) => ({
      id: index, // dummy id
      tripId: -1, // dummy tripId
      placeId: null, // placeholder
      placeFipsCode: visit.fips_code,
      date: new Date(visit.date), // convert string to Date
      order: visit.order,
    })),
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!mapReady ? (
        <LifeInput
          handleButtonClick={handleButtonClick}
          handleFileChange={handleFileChange}
          tripName={tripName}
          setTripName={setTripName}
          fileInputRef={fileInputRef}
        />
      ) : (
        <div className={styles.viewport}>
          <h1>{tripName}</h1>
          <p className={styles.stat}>{newCounties} new counties</p>
          <p className={styles.stat}>{newStates} new states</p>
          <WrappedLoader trips={[newTrip]} reanimate={reanimate} />
          <p className={styles.link}>gravl.org</p>

          <div className={styles.buttonRow}>
            <button
              className={styles.circleButton}
              onClick={() => router.push(`/`)}
            >
              <div className={styles.back}>
                <Icon type="back_arrow" fill="#7dc2ff" />
              </div>
            </button>

            <button
              className={styles.circleButton}
              onClick={() => setReanimate((prev) => !prev)}
            >
              <div className={styles.play}>
                <Icon type="play" fill="#7dc2ff" />
              </div>
            </button>

            <button
              className={styles.circleButton}
              onClick={() => signIn("google", { callbackUrl: "/redirect" })}
            >
              <div>
                <Icon type="export" fill="#7dc2ff" />
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
