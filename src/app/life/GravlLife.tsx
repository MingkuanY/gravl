"use client";

import React, { useRef, useState } from "react";
import exifr from "exifr";
import styles from "../../styles/life.module.scss";
import WrappedLoader from "../../components/maps/WrappedLoader";
import { PlaceInput, TripWithVisits, VisitInput } from "../../utils/types";
import Loading from "../load";
import { useRouter } from "next/navigation";

type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function GravlLife({ places }: { places: PlaceInput[] }) {
  const [visits, setVisits] = useState<VisitInput[]>([]);
  const router = useRouter();

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

  const getRouteSegments = async (photos: PhotoData[]) => {
    const directionsService = new google.maps.DirectionsService();
    const segments = [];

    for (let i = 0; i < photos.length - 1; i++) {
      const start = photos[i].location!;
      const end = photos[i + 1].location!;
      const timestamp = photos[i].timestamp;

      try {
        const results = await directionsService.route({
          origin: `${start.lat}, ${start.lng}`,
          destination: `${end.lat}, ${end.lng}`,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        const polyline = results.routes[0].overview_polyline;

        const decodedPolyline = google.maps.geometry.encoding
          .decodePath(polyline)
          .map((latLng) => [latLng.lng(), latLng.lat()]);

        const response = await fetch(
          "https://api.gravl.org/process_polyline/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ polyline: decodedPolyline }),
          }
        );

        if (!response.ok) {
          console.error("Error processing polyline:", response.statusText);
          continue;
        }

        const data = await response.json();

        segments.push({
          start,
          end,
          polyline,
          fipsCodes: data.fips_codes as string[],
          timestamp,
        });
      } catch (err) {
        console.error("Error calculating route:", err);
      }
    }

    return segments;
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
        <div className={styles.container}>
          <div className={styles.centerContent}>
            <input
              type="text"
              className={styles.tripNameInput}
              placeholder="Name your trip..."
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
            <button
              className={`${styles.button} ${
                tripName.trim() === "" ? styles.disabledButton : ""
              }`}
              onClick={handleButtonClick}
              disabled={tripName.trim() === ""}
            >
              Map Your Trip
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <button
            className={styles.backButton}
            onClick={() => router.push(`/`)}
          >
            ←
          </button>
        </div>
      ) : (
        <div className={styles.viewport}>
          <h1>{tripName}</h1>
          <p className={styles.stat}>{newCounties} new counties</p>
          <p className={styles.stat}>{newStates} new states</p>
          <WrappedLoader trips={[newTrip]} places={places} />
          <p className={styles.link}>gravl.org</p>

          <button
            className={styles.backButton}
            onClick={() => router.push(`/`)}
          >
            ←
          </button>
        </div>
      )}
    </>
  );
}
