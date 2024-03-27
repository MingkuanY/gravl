import styles from "../styles/track.module.scss";
import Header from "../components/Header";
import CountiesMap from "../components/maps/CountiesMap";
import StatesMap from "../components/maps/StatesMap";
import CountriesMap from "../components/maps/CountriesMap";
import NationalParksMap from "../components/maps/NationalParksMap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../styles/circularprogressbar.scss";
import { useState } from "react";

export default function Track() {
  const navClicked = (btn) => {
    console.log(btn, " clicked");
  };

  const [count, setCount] = useState(30);
  const totalCount = 50;
  const mapType = "states";

  return (
    <>
      <Header />
      <div className={styles.statContainer}>
        <CountiesMap />
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
              <p className={styles.type}>{mapType}</p>
            </CircularProgressbarWithChildren>
          </div>
          <div className={styles.statsNavbar}>
            <button
              className={styles.counties}
              onClick={() => navClicked("counties")}
            >
              Counties
            </button>
            <button
              className={styles.states}
              onClick={() => navClicked("states")}
            >
              States
            </button>
            <button
              className={styles.countries}
              onClick={() => navClicked("countries")}
            >
              Countries
            </button>
            <button
              className={styles.nationalparks}
              onClick={() => navClicked("nationalparks")}
            >
              National Parks
            </button>
            <div className={styles.animation}></div>
          </div>
        </div>
      </div>
      <div className={styles.timelineContainer}>
        <p className={styles.myTimeline}>My Timeline</p>
        <div className={styles.timeline}></div>
      </div>
    </>
  );
}
