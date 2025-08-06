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
  if (!window.google || !window.google.maps) {
    console.error("Google Maps JavaScript API is not loaded.");
    return null;
  }

  return new Promise((resolve) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const components = results[0].address_components;

        let city: string | undefined;
        let state: string | undefined;

        for (const component of components) {
          const types = component.types;

          if (types.includes("locality")) {
            city = component.long_name;
          }

          if (
            types.includes("administrative_area_level_1") &&
            component.short_name.length === 2
          ) {
            state = component.short_name;
          }
        }

        if (city && state) {
          resolve(`${city}, ${state}`);
        } else if (state) {
          resolve(state);
        } else {
          resolve(results[0].formatted_address || null);
        }
      } else {
        console.warn("Geocoding failed:", status);
        resolve(null);
      }
    });
  });
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
