import styles from "../styles/dashboard.module.scss";
import Header from "../components/header/Header";
import CountiesMap from "../components/maps/CountiesMap";
import StatesMap from "../components/maps/StatesMap";
import CountriesMap from "../components/maps/CountriesMap";
import NationalParksMap from "../components/maps/NationalParksMap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../styles/circularprogressbar.scss";
import { useState } from "react";
import pfp from "../assets/images/pfp.jpg";
import edit from "../assets/icons/edit.svg";
import badge from "../assets/icons/badge.svg";

export default function Dashboard() {
  /* mock data */
  const user = {
    username: "funnyufo",
    location: "Atlanta, Georgia",
    bio: "Not all who wander are lost... but I am.",
    tripsTotal: 32,
    tripsThisYear: 9,
    pfp: "",
    hasBadge: true,
    bucketMaps: [
      { type: "counties", count: 456, totalCount: 3413 },
      { type: "states", count: 30, totalCount: 50 },
      { type: "countries", count: 19, totalCount: 195 },
      { type: "national parks", count: 26, totalCount: 63 },
    ],
    trips: [
      {
        title: "Solar Eclipse in Texas",
        locations: ["Austin", "Houston"],
        dates: ["2024-04-05", "2024-04-09"],
        thumbnail:
          "https://res.cloudinary.com/simpleview/image/upload/v1648755098/clients/austin/Austin_Skyline_Credit_Christopher_Sherman_lifetime__4f60343d-9f69-450c-8ad3-fa636761786d.jpg",
      },
      {
        title: "The Windy City",
        locations: ["Chicago"],
        dates: ["2024-01-07", "2024-01-09"],
        thumbnail:
          "https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg",
      },
      {
        title: "Southern California",
        locations: ["Santa Barbara", "San Diego"],
        dates: ["2023-12-15", "2023-12-22"],
        thumbnail:
          "https://lajolla.com/wp-content/uploads/2018/12/Southern-California.jpg",
      },
      {
        title: "Louisiana",
        locations: ["New Orleans", "Lake Pontchartrain"],
        dates: ["2023-11-20", "2023-11-25"],
        thumbnail:
          "https://cdn.britannica.com/74/93074-050-F81FFDD7/home-plantation-Louisiana.jpg",
      },
      {
        title: "Germany",
        locations: ["Berlin", "Hamburg", "Jasmund National Park"],
        dates: ["2023-05-15", "2023-08-07"],
        thumbnail:
          "https://www.germany.travel/media/redaktion/staedte_kultur_content/Berlin_Brandenburger_Tor_im_Sonnenuntergang_Leitmotiv_German_Summer_Cities.jpg",
      },
      {
        title: "Philadelphia",
        locations: ["Pennsauken", "Independence Hall", "Elfreth's Alley"],
        dates: ["2023-05-12", "2023-05-14"],
        thumbnail:
          "https://www.tripsavvy.com/thmb/6AbCUK2IzOMaMfG-Qc-f0FocVfE=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1062250032-110de1d7c76d4f49804555d75dffbfa1.jpg",
      },
      {
        title: "Senior trip w/ da boiz",
        locations: ["Loneliest Road in America", "Banff", "Mt. Rainier"],
        dates: ["2022-07-11", "2022-07-27"],
        thumbnail:
          "https://i0.wp.com/beautahfulworld.com/wp-content/uploads/2022/07/IMG-6248-1-scaled.jpg?fit=2560%2C1920&ssl=1",
      },
    ],
  };

  const [currentMap, setCurrentMap] = useState(0); //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn) => {
    setCurrentMap(btn);
    setReload((reload) => !reload);
  };

  const [count, setCount] = useState(user.bucketMaps.map((map) => map.count));

  /**
   * If a parameter (reset) is passed in, then set count to reset. Else, increment count by one.
   * @param {number} reset the value to set count to if provided
   */
  const updateCount = (reset) => {
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
  const renderMap = (index) => {
    switch (index) {
      case 0:
        return (
          <CountiesMap
            updateCount={updateCount}
            total={user.bucketMaps[index].count}
            reload={reload}
          />
        );
      case 1:
        return (
          <StatesMap
            updateCount={updateCount}
            total={user.bucketMaps[index].count}
            reload={reload}
          />
        );
      case 2:
        return (
          <CountriesMap
            updateCount={updateCount}
            total={user.bucketMaps[index].count}
            reload={reload}
          />
        );
      case 3:
        return (
          <NationalParksMap
            updateCount={updateCount}
            total={user.bucketMaps[index].count}
            reload={reload}
          />
        );
    }
  };

  return (
    <>
      <Header />

      <div className={styles.timelineContainer}></div>

      <div className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.pfpContainer}>
            <img src={pfp} alt="PFP" />
            {user.hasBadge && (
              <div className={styles.badgeContainer}>
                <img src={badge} alt="Badge" />
              </div>
            )}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.usernameAndEdit}>
              <p className={styles.username}>{user.username}</p>
              <img src={edit} alt="Edit" />
            </div>
            <p className={styles.location}>{user.location}</p>
            <p className={styles.bio}>{user.bio}</p>
          </div>
          <div className={styles.userStats}>
            <div>
              <p className={styles.stat}>{user.tripsTotal}</p>
              <p className={styles.desc}>Trips</p>
            </div>
            <div>
              <p className={styles.stat}>{user.tripsThisYear}</p>
              <p className={styles.desc}>This Year</p>
            </div>
          </div>
        </div>

        <div className={styles.mapContainer}>{renderMap(currentMap)}</div>

        <div className={styles.stats}>
          {user.bucketMaps.map((map, index) => (
            <div className={styles.progressContainer} key={index}>
              <CircularProgressbarWithChildren
                value={count[index]}
                maxValue={map.totalCount}
              >
                <div className={styles.countContainer}>
                  <p className={styles.count}>{count[index]}</p>
                  <p className={styles.totalCount}>/{map.totalCount}</p>
                </div>
                <p className={styles.type}>{map.type}</p>
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
    </>
  );
}
