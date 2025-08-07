"use client";

import React, { useRef, useState } from "react";
import exifr from "exifr";
import styles from "../../styles/life.module.scss";

type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function Life() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tripName, setTripName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const photos = await extractPhotoMetadata(files);
    if (photos.length < 2) {
      console.warn("Need at least 2 geotagged photos to calculate a route.");
      return;
    }

    const routeSegments = await getRouteSegments(photos);
    const visits = generateVisitsFromSegments(routeSegments);

    console.log("Generated visits:", visits);
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
        });
      } catch (err) {
        console.error("Error calculating route:", err);
      }
    }

    return segments;
  };

  const generateVisitsFromSegments = (segments: { fipsCodes: string[] }[]) => {
    const allFipsCodes = segments.flatMap((s) => s.fipsCodes);
    const seen = new Set<string>();
    const currentDate = new Date().toISOString().split("T")[0];

    return allFipsCodes
      .filter((code) => {
        if (seen.has(code)) return false;
        seen.add(code);
        return true;
      })
      .map((fips_code, index) => ({
        fips_code,
        date: currentDate,
        order: index,
      }));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.tripNameInput}
        placeholder="Name your trip..."
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />
      <button className={styles.button} onClick={handleButtonClick}>
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
  );
}
