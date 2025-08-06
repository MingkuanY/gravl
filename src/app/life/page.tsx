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
  locationName?: string;
};

const getLocationName = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();
    if (data.status === "OK") {
      return data.results[0]?.formatted_address || null;
    } else {
      console.warn("Geocoding failed:", data.status);
      return null;
    }
  } catch (err) {
    console.error("Error with geocoding request:", err);
    return null;
  }
};

export default function Life() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<PhotoData[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const results: PhotoData[] = [];

    for (const file of Array.from(files)) {
      try {
        const exifData = await exifr.parse(file, { gps: true });
        const timestamp = exifData?.DateTimeOriginal || exifData?.CreateDate;
        const lat = exifData?.latitude;
        const lng = exifData?.longitude;

        if (timestamp) {
          const formattedTime = new Date(timestamp).toLocaleString();

          let locationName: string | undefined;
          if (lat && lng) {
            locationName = (await getLocationName(lat, lng)) ?? undefined;
          }
          results.push({
            timestamp: formattedTime,
            location: lat && lng ? { lat, lng } : undefined,
            locationName,
          });
        }
      } catch (err) {
        console.error(`Error parsing ${file.name}:`, err);
      }
    }

    setPhotos(results);
  };

  return (
    <div className={styles.container}>
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
      <ul className={styles.list}>
        {photos.map((photo, idx) => (
          <li key={idx} className={styles.item}>
            <strong>{photo.timestamp}</strong>
            {photo.location ? (
              <span>
                {" "}
                — 📍{" "}
                {photo.locationName
                  ? photo.locationName
                  : `${photo.location.lat.toFixed(
                      5
                    )}, ${photo.location.lng.toFixed(5)}`}
              </span>
            ) : (
              <span> — No location data</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
