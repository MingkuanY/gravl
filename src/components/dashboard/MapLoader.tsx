"use client";

import styles from "../../styles/maploader.module.scss";
import Counties, { totalCounties } from "@/components/maps/Counties";
import States, { totalStates } from "@/components/maps/States";
import Countries, { totalCountries } from "@/components/maps/Countries";
import NationalParks, {
  totalNationalparks,
} from "@/components/maps/NationalParks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../../styles/circularprogressbar.scss";
import { useState } from "react";
import { Place } from "@prisma/client";

interface MapLoaderProps {
  counties: Place[];
  states: Place[];
  countries: Place[];
  nationalparks: Place[];
}

export const mapNames = ["counties", "states", "countries", "national parks"];

export default function MapLoader({
  counties,
  states,
  countries,
  nationalparks,
}: MapLoaderProps) {
  // available maps

  // total counts of each map imported from the map components
  const totalCounts = [
    totalCounties,
    totalStates,
    totalCountries,
    totalNationalparks,
  ];

  const [currentMap, setCurrentMap] = useState(0); //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn: number) => {
    setCurrentMap(btn);
    setReload((reload) => !reload);
  };

  const getStatsCount = () => {
    // Don't count DC as a state
    const actualStates = states.filter((state) => state.place_id !== "DC");
    return [
      counties.length,
      actualStates.length,
      countries.length,
      nationalparks.length,
    ];
  };

  const [count, setCount] = useState(getStatsCount());

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
            animate={true}
            data={counties}
            updateCount={updateCount}
            total={count[0]}
            reload={reload}
            pause={20}
          />
        );
      case 1:
        return (
          <States
            animate={true}
            data={states}
            updateCount={updateCount}
            total={count[1]}
            reload={reload}
          />
        );
      case 2:
        return (
          <Countries
            animate={true}
            data={countries}
            updateCount={updateCount}
            total={count[2]}
            reload={reload}
          />
        );
      case 3:
        return (
          <NationalParks
            animate={true}
            data={nationalparks}
            updateCount={updateCount}
            total={count[3]}
            reload={reload}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.mapContainer} ${
          currentMap === 2 && styles.largeMapContainer
        }`}
      >
        {renderMap(currentMap)}
      </div>

      <div className={styles.stats}>
        {mapNames.map((map, index) => (
          <div
            className={`${styles.progressContainer} ${
              currentMap === index && styles.selected
            }`}
            key={index}
          >
            <CircularProgressbarWithChildren
              value={count[index]}
              maxValue={totalCounts[index]}
            >
              <div className={styles.countContainer}>
                <p className={styles.count}>{count[index]}</p>
                <p className={styles.totalCount}>/{totalCounts[index]}</p>
              </div>
              <p className={styles.type}>{map}</p>
            </CircularProgressbarWithChildren>
            <div
              className={`${styles.progressbarBackground} ${
                currentMap === index && styles.selected
              }`}
              onClick={() => statClicked(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
