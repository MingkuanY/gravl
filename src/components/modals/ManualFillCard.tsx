"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/manualfillcard.module.scss";
import Counties from "../maps/Counties";
import Countries from "../maps/Countries";
import NationalParks from "../maps/NationalParks";
import States from "../maps/States";
import { BasicTripInfo } from "./BasicTripInfoCard";
import { VisitInput } from "@/lib/visit";
import { mapNames } from "../dashboard/MapLoader";
import Icon from "../icons/Icon";
import { addDays, formatMDYShortDate } from "@/utils/date";
import { PlaceInput } from "@/lib/place";

export default function ManualFillCard({
  tripData,
  visits,
  setVisitsData,
  places,
}: {
  tripData: BasicTripInfo;
  visits: VisitInput[];
  setVisitsData: Function;
  places: PlaceInput[];
}) {
  const placeIDs = new Set(places.map((place) => place.place_id));
  const placesMap = new Map(
    places.map((place) => [place.place_id, place.label])
  );

  const [dayCount, setDayCount] = useState(1);
  const getCurrentDate = () => {
    return addDays(tripData.start_date, dayCount - 1);
  };
  const visitsOnCurrentDate = () =>
    visits.filter((visit) => visit.date === getCurrentDate());

  const [mapPopup, setMapPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !popupRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMapPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [currentMap, setCurrentMap] = useState(0);
  /**
   * Renders the correct map based on the types index
   * @param {number} index the index in the types array that indicates which map should be rendered
   * @returns the map component to be rendered
   */
  const renderMap = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Counties
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 1:
        return (
          <States
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 2:
        return (
          <Countries
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 3:
        return (
          <NationalParks
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
    }
  };

  const handleFinish = () => {
    // Check that the user has at least one visit selected and navigate the user to the next step
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.titleContainer}>
          <p className={styles.name}>{tripData.trip_name}</p>
          <p className={styles.dayCount}>Day {dayCount}</p>
        </div>

        <div
          className={`${styles.mapContainer} ${
            currentMap === 2 && styles.largeMapContainer
          }`}
        >
          {renderMap(currentMap)}
        </div>

        <div className={styles.mapPickerContainer}>
          <p className={styles.currentMapName}>{mapNames[currentMap]}</p>
          <button
            className={styles.popupButton}
            onClick={() => setMapPopup((mapPopup) => !mapPopup)}
            ref={buttonRef}
          >
            <div className={styles.mapIcon}>
              <Icon type="map" fill="#319fff" />
            </div>
          </button>

          {mapPopup && (
            <div className={styles.popupContainer} ref={popupRef}>
              {mapNames.map((map, index) => (
                <button
                  className={`${styles.mapNames} ${
                    index === currentMap && styles.selected
                  }`}
                  key={index}
                  onClick={() => {
                    if (index !== currentMap) {
                      setCurrentMap(index);
                      setMapPopup(false);
                    }
                  }}
                >
                  {map}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.header}>
          <p className={styles.heading}>Visited on</p>

          <div className={styles.dateChanger}>
            <button
              className={styles.backDate}
              onClick={() => {
                setDayCount((dayCount) => Math.max(1, dayCount - 1));
              }}
            >
              <div className={styles.back_arrow}>
                <Icon type="back_arrow" fill="#fff" />
              </div>
            </button>
            <p className={styles.currentDate}>
              {formatMDYShortDate(getCurrentDate())}
            </p>
            <button
              className={styles.forwardDate}
              onClick={() => setDayCount((dayCount) => dayCount + 1)}
            >
              <div className={styles.forward_arrow}>
                <Icon type="back_arrow" fill="#fff" />
              </div>
            </button>
          </div>
        </div>

        <div className={styles.visitedList}>
          {visitsOnCurrentDate().length > 0 ? (
            visitsOnCurrentDate().map((visit, index) => (
              <p className={styles.visitedPlace} key={index}>
                {placesMap.get(visit.place_id)}
              </p>
            ))
          ) : (
            <p className={styles.placeholderForList}>
              Select a place on the map.
            </p>
          )}
        </div>

        <button
          className={`${styles.finish} ${
            !visits.length && styles.unselectable
          }`}
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
