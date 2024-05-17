"use client";

import styles from "../../styles/maploader.module.scss";
import Counties from "@/components/maps/Counties";
import States from "@/components/maps/States";
import Countries from "@/components/maps/Countries";
import NationalParks from "@/components/maps/NationalParks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../../styles/circularprogressbar.scss";
import { useState } from "react";

export default function MapLoader() {
  /* mock data */
  const user = {
    username: "funnyufo",
    location: "Atlanta, Georgia",
    bio: "Not all who wander are lost... but I am.",
    pfp: "",
    hasBadge: true,
    maps: [
      { name: "counties", count: 506, total: 3413 },
      { name: "states", count: 31, total: 50 },
      { name: "countries", count: 19, total: 195 },
      { name: "national parks", count: 27, total: 63 },
    ],
    trips: [],
  };

  const [currentMap, setCurrentMap] = useState(0); //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn: number) => {
    setCurrentMap(btn);
    setReload((reload) => !reload);
  };

  const getStatsCount = () => {
    return [0, 0, 0, 0];
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
            updateCount={updateCount}
            total={user.maps[index].count}
            reload={reload}
          />
        );
      case 1:
        return (
          <States
            updateCount={updateCount}
            total={user.maps[index].count}
            reload={reload}
          />
        );
      case 2:
        return (
          <Countries
            updateCount={updateCount}
            total={user.maps[index].count}
            reload={reload}
          />
        );
      case 3:
        return (
          <NationalParks
            updateCount={updateCount}
            total={user.maps[index].count}
            reload={reload}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>{renderMap(currentMap)}</div>

      <div className={styles.stats}>
        {user.maps.map((map, index) => (
          <div
            className={`${styles.progressContainer} ${
              currentMap === index && styles.selected
            }`}
            key={index}
          >
            <CircularProgressbarWithChildren
              value={count[index]}
              maxValue={map.total}
            >
              <div className={styles.countContainer}>
                <p className={styles.count}>{count[index]}</p>
                <p className={styles.totalCount}>/{map.total}</p>
              </div>
              <p className={styles.type}>{map.name}</p>
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
