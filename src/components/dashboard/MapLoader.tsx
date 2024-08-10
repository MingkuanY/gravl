"use client";

import styles from "../../styles/maploader.module.scss";
import Counties, { totalCounties } from "@/components/maps/Counties";
import { totalStates } from "@/components/maps/States";
import { totalCountries } from "@/components/maps/Countries";
import { totalNationalparks } from "@/components/maps/NationalParks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../../styles/circularprogressbar.scss";
import { useEffect, useState } from "react";
import { PlaceInput, TripWithVisits, VisitInput } from "@/utils/types";
import Icon from "../icons/Icon";
import classnames from "classnames";

export const mapNames = ["counties", "states", "countries", "national parks"];

export default function MapLoader({
  trips,
  places,
  mode,
}: {
  trips: TripWithVisits[];
  places: PlaceInput[];
  mode: string;
}) {
  const [count, setCount] = useState([0, 0, 0, 0]);

  const [sortedVisits, setSortedVisits] = useState<VisitInput[]>([]);

  const sortVisitsByType = (trips: TripWithVisits[]) => {
    const newSortedVisits: VisitInput[] = [];
    const uniqueVisits = new Set();

    trips.map((trip) => {
      trip.visits.forEach((visit) => {
        const v = {
          place_id: visit.placeId,
          date: visit.date.toISOString().split("T")[0],
          order: visit.order,
        };

        newSortedVisits.push(v);
        uniqueVisits.add(v.place_id);
      });
    });

    const counts = [uniqueVisits.size, 0, 0, 0];
    setCount(counts);

    setSortedVisits(newSortedVisits);
  };

  useEffect(() => {
    sortVisitsByType(trips);
  }, [trips]);

  // total counts of each map imported from the map components
  const totalCounts = [
    totalCounties,
    totalStates,
    totalCountries,
    totalNationalparks,
  ];

  const currentMap = 0; //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn: number) => {
    if (btn === 0) {
      setReload((reload) => !reload);
    }
  };

  /**
   * If a parameter (reset) is passed in, then set count to reset. Else, increment count by one.
   * @param {number} reset the value to set count to if provided
   */
  const updateCount = (reset: number) => {
    setCount((prevCounts) => {
      const newCounts = [...prevCounts];
      if (reset !== undefined) {
        newCounts[currentMap] = reset;
      } else {
        newCounts[currentMap] += 1;
      }
      return newCounts;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Counties
          animate={true}
          data={sortedVisits}
          updateCount={updateCount}
          total={count[0]}
          reload={reload}
          pause={20}
          places={places}
          toggleHighways={false}
        />
      </div>

      {mode !== "NON-USER" && (
        <div className={styles.stats}>
          {mapNames.map((map, index) => (
            <div
              className={classnames(
                styles.progressContainer,
                currentMap === index && styles.selected
              )}
              key={index}
            >
              {currentMap !== index && (
                <div className={classnames(styles.unselected, styles.hovered)}>
                  <Icon type="lock" fill="#7dc2ff" />
                </div>
              )}
              <CircularProgressbarWithChildren
                value={count[index]}
                maxValue={totalCounts[index]}
              >
                {currentMap === index && (
                  <>
                    <div className={styles.countContainer}>
                      <p className={styles.count}>{count[index]}</p>
                      <p className={styles.totalCount}>/{totalCounts[index]}</p>
                    </div>
                    <p className={styles.type}>{map}</p>
                  </>
                )}
              </CircularProgressbarWithChildren>
              <div
                className={classnames(
                  styles.progressbarBackground,
                  currentMap === index && styles.selected,
                  "progress-circle"
                )}
                onClick={() => statClicked(index)}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
