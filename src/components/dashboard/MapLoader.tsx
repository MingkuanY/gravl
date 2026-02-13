"use client";

import styles from "../../styles/maploader.module.scss";
import Counties, { totalCounties } from "@/components/maps/Counties";
import States, { totalStates } from "@/components/maps/States";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../../styles/circularprogressbar.scss";
import { useEffect, useState } from "react";
import { TripWithVisits, VisitInput } from "@/utils/types";
import classnames from "classnames";
import { formatSeparatedDate } from "@/utils/date";

export const mapNames = ["counties", "states", "countries", "national parks"];

export default function MapLoader({ trips, triggerReload }: { trips: TripWithVisits[]; triggerReload?: boolean }) {
  const [count, setCount] = useState([0, 0, 0, 0]);

  const [mapDate, setMapDate] = useState("");

  const [sortedVisits, setSortedVisits] = useState<VisitInput[]>([]);
  const [sortedStates, setSortedStates] = useState<VisitInput[]>([]);

  /**
   * Prepares the visits data to be rendered by sorting and de-duplicating visits.
   *
   * @param trips an array of Trips to render in order
   */
  const sortVisitsByType = (trips: TripWithVisits[]) => {
    // Counties
    const newSortedVisits: VisitInput[] = [];
    const uniqueVisits = new Set();

    // States
    const newSortedStates: VisitInput[] = [];
    const uniqueStates = new Set();
    let dcVisited = false;

    trips.map((trip) => {
      trip.visits.forEach((visit) => {
        const v = {
          fips_code: visit.placeFipsCode,
          date: visit.date.toISOString().split("T")[0],
          order: visit.order,
        };

        newSortedVisits.push(v);
        uniqueVisits.add(v.fips_code);

        const stateFips = v.fips_code.slice(0, 2);
        if (!uniqueStates.has(stateFips)) {
          uniqueStates.add(stateFips);
          const state_v = {
            fips_code: stateFips,
            date: visit.date.toISOString().split("T")[0],
            order: visit.order,
          };
          newSortedStates.push(state_v);

          if (stateFips === "11") {
            // User visited DC, so don't count it in states total
            dcVisited = true;
          }
        }
      });
    });

    const counts = [
      uniqueVisits.size,
      dcVisited ? uniqueStates.size - 1 : uniqueStates.size,
      0,
      0,
    ];
    setCount(counts);

    setSortedVisits(newSortedVisits);
    setSortedStates(newSortedStates);
  };

  useEffect(() => {
    sortVisitsByType(trips);
  }, [trips]);

  useEffect(() => {
    if (triggerReload !== undefined) {
      setReload((prev) => !prev);
    }
  }, [triggerReload]);

  // total counts of each map imported from the map components
  const totalCounts = [totalCounties, totalStates];

  const [currentMap, setCurrentMap] = useState(0); //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn: number) => {
    if (btn <= 1) {
      setCurrentMap(btn);
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

  const renderMap = () => {
    switch (currentMap) {
      case 0:
        return (
          <Counties
            animate={true}
            data={sortedVisits}
            updateCount={updateCount}
            updateDate={setMapDate}
            total={count[0]}
            reload={reload}
            pause={20}
            toggleHighways={false}
          />
        );
      case 1:
        return (
          <States
            animate={true}
            data={sortedStates}
            updateCount={updateCount}
            updateDate={setMapDate}
            total={count[1]}
            reload={reload}
            pause={20}
            toggleHighways={false}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>{renderMap()}</div>

      <div className={styles.mapDate}>
        {mapDate &&
          formatSeparatedDate(mapDate).map((dateVal, index) => {
            const classes = [styles.month, styles.day, styles.year];
            return (
              <p key={index} className={classes[index]}>
                {dateVal}
              </p>
            );
          })}
      </div>

      <div className={styles.stats}>
        {mapNames.slice(0, 2).map((map, index) => (
          <div
            className={classnames(
              styles.progressContainer,
              currentMap === index && styles.selected
            )}
            key={index}
          >
            <CircularProgressbarWithChildren
              value={count[index]}
              maxValue={totalCounts[index]}
            >
              <>
                <div className={styles.countContainer}>
                  <p className={styles.count}>{count[index]}</p>
                  <p className={styles.totalCount}>/{totalCounts[index]}</p>
                </div>
                <p className={styles.type}>{map}</p>
              </>
            </CircularProgressbarWithChildren>
            <div
              className={classnames(
                styles.progressbarBackground,
                styles.selected,
                "progress-circle"
              )}
              onClick={() => statClicked(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
