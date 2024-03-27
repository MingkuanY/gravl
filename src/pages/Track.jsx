import styles from "../styles/track.module.scss";
import Header from "../components/header/Header";
import CountiesMap from "../components/maps/CountiesMap";
import StatesMap from "../components/maps/StatesMap";
import CountriesMap from "../components/maps/CountriesMap";
import NationalParksMap from "../components/maps/NationalParksMap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../styles/circularprogressbar.scss";
import { useState } from "react";
import TimelineYear from "../components/track/TimelineYear";

export default function Track() {
  const [count, setCount] = useState(30);
  const totalCount = 50;
  const [mapType, setMapType] = useState(1);
  const types = ["counties", "states", "countries", "national parks"];

  const navClicked = (btn) => {
    setMapType(btn);
  };

  const renderMap = (index) => {
    switch (index) {
      case 0:
        return <CountiesMap />;
      case 1:
        return <StatesMap />;
      case 2:
        return <CountriesMap />;
      case 3:
        return <NationalParksMap />;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.statContainer}>
        {renderMap(mapType)}
        <div className={styles.stats}>
          <div className={styles.progressContainer}>
            <CircularProgressbarWithChildren
              value={count}
              maxValue={totalCount}
            >
              <div className={styles.countContainer}>
                <p className={styles.count}>{count}</p>
                <p className={styles.totalCount}>/{totalCount}</p>
              </div>
              <p className={styles.type}>{types[mapType]}</p>
            </CircularProgressbarWithChildren>
          </div>
          <div className={styles.statsNavbar}>
            <button
              className={`${styles.counties} ${
                mapType === 0 ? styles.selected : styles.unselected
              }`}
              onClick={() => navClicked(0)}
            >
              Counties
            </button>
            <button
              className={`${styles.states} ${
                mapType === 1 ? styles.selected : styles.unselected
              }`}
              onClick={() => navClicked(1)}
            >
              States
            </button>
            <button
              className={`${styles.countries} ${
                mapType === 2 ? styles.selected : styles.unselected
              }`}
              onClick={() => navClicked(2)}
            >
              Countries
            </button>
            <button
              className={`${styles.nationalparks} ${
                mapType === 3 ? styles.selected : styles.unselected
              }`}
              onClick={() => navClicked(3)}
            >
              National Parks
            </button>
            <div
              className={styles.animation}
              style={{
                top: `${mapType * 2}rem`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.timelineContainer}>
        <p className={styles.myTimeline}>My Timeline</p>
        <div className={styles.timeline}>
          <TimelineYear year={2024} />
        </div>
      </div>
    </>
  );
}
