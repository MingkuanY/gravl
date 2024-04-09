import styles from "../styles/dashboard.module.scss";
import Header from "../components/header/Header";
import TripCard from "../components/dashboard/TripCard";
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
import plus from "../assets/icons/plus.svg";
import dropdown from "../assets/icons/dropdown.svg";
import { formatDates } from "../utils/date";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  /* mock data */
  const user = {
    username: "funnyufo",
    location: "Atlanta, Georgia",
    bio: "Not all who wander are lost... but I am.",
    pfp: "",
    hasBadge: true,
    bucketMaps: [
      { type: "counties", count: 506, totalCount: 3413 },
      { type: "states", count: 31, totalCount: 50 },
      { type: "countries", count: 19, totalCount: 195 },
      { type: "national parks", count: 27, totalCount: 63 },
    ],
    trips: [
      {
        title: "Solar Eclipse in Texas",
        locations: ["Austin", "Houston"],
        dates: ["2024-04-05", "2024-04-09"],
        completed: false,
      },
      {
        title: "Spring Break of Gains",
        locations: ["Gainesville"],
        dates: ["2024-03-15", "2024-03-23"],
        thumbnail:
          "https://www.campspot.com/c/images/cms/1920w/2023/07/Campgrounds-near-Gainesville-FL.jpg",
        completed: true,
      },
      {
        title: "Southern California",
        locations: ["Santa Barbara", "San Diego"],
        dates: ["2023-12-15", "2023-12-22"],
        thumbnail:
          "https://lajolla.com/wp-content/uploads/2018/12/Southern-California.jpg",
        completed: true,
      },
      {
        title: "Louisiana",
        locations: ["New Orleans", "Lake Pontchartrain"],
        dates: ["2023-11-20", "2023-11-25"],
        thumbnail:
          "https://cdn.britannica.com/74/93074-050-F81FFDD7/home-plantation-Louisiana.jpg",
        completed: true,
      },
      {
        title: "HackMIT",
        locations: ["Boston"],
        dates: ["2023-09-14", "2023-09-17"],
        thumbnail:
          "https://www.trolleytours.com/wp-content/uploads/2016/05/boston-mit.jpg",
        completed: true,
      },
      {
        title: "Germany",
        locations: ["Berlin", "Hamburg", "Jasmund National Park"],
        dates: ["2023-05-15", "2023-08-07"],
        thumbnail:
          "https://www.germany.travel/media/redaktion/staedte_kultur_content/Berlin_Brandenburger_Tor_im_Sonnenuntergang_Leitmotiv_German_Summer_Cities.jpg",
        completed: true,
      },
      {
        title: "Philadelphia",
        locations: ["Pennsauken", "Independence Hall", "Elfreth's Alley"],
        dates: ["2023-05-12", "2023-05-14"],
        thumbnail:
          "https://www.tripsavvy.com/thmb/6AbCUK2IzOMaMfG-Qc-f0FocVfE=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1062250032-110de1d7c76d4f49804555d75dffbfa1.jpg",
        completed: true,
      },
      {
        title: "Christmas in London",
        locations: ["The Shard", "Hyde Park"],
        dates: ["2022-12-20", "2022-12-28"],
        thumbnail:
          "https://www.civitatis.com/blog/wp-content/uploads/2022/11/que-ver-navidad-londres.jpg",
        completed: true,
      },
      {
        title: "A Floridian Thanksgiving",
        locations: ["Tampa", "Clearwater", "Crystal River"],
        dates: ["2022-11-19", "2022-11-27"],
        thumbnail:
          "https://www.visitstpeteclearwater.com/sites/default/files/styles/large_horizontal_wide/public/2021-05/clearwater-marina-overview-memorial-causeway.jpg?h=a92f03cd&itok=E9lccMlh",
        completed: true,
      },
      {
        title: "The Smokies",
        locations: ["Dahlonega", "Cades Cove", "Clingmans Dome"],
        dates: ["2022-10-15", "2022-10-18"],
        thumbnail:
          "https://media.istockphoto.com/id/1438541686/photo/colorful-autumn-trees-mountain-views-in-tennessee-during-the-fall-of-2022.jpg?s=612x612&w=0&k=20&c=OpEXUlSKLHaQpOMpbGRZBPwpnq8ZgJPf5Xo27oe0sZ0=",
        completed: true,
      },
      {
        title: "Senior trip w/ da boiz",
        locations: ["Loneliest Road in America", "Banff", "Mt. Rainier"],
        dates: ["2022-07-11", "2022-07-27"],
        thumbnail:
          "https://i0.wp.com/beautahfulworld.com/wp-content/uploads/2022/07/IMG-6248-1-scaled.jpg?fit=2560%2C1920&ssl=1",
        completed: true,
      },
      {
        title: "Central European Tour",
        locations: ["Prague", "Wrocław", "Krakow", "Budapest"],
        dates: ["2022-06-25", "2022-07-03"],
        thumbnail:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/02/19/16/budapest-1.jpg",
        completed: true,
      },
      {
        title: "Butte County Wildflowers",
        locations: ["Phantom Falls", "Clear Lake"],
        dates: ["2022-04-10", "2022-04-11"],
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Phantom_Falls.jpg/1200px-Phantom_Falls.jpg",
        completed: true,
      },
      {
        title: "Winter in the Southwest",
        locations: ["Joshua Tree", "Sedona", "Grand Canyon"],
        dates: ["2021-12-19", "2021-12-30"],
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg",
        completed: true,
      },
    ],
  };

  /**
   * Counts number of trips that start or end in the current year for display in the user profile
   * @returns count the number of trips
   */
  const countTripsThisYear = () => {
    const thisYear = new Date().getFullYear();
    let count = 0;
    for (let i = 0; i < user.trips.length; i++) {
      const trip = user.trips[i];
      const startYear = new Date(trip.dates[0]).getFullYear();
      const endYear = new Date(trip.dates[1]).getFullYear();
      if (startYear === thisYear || endYear === thisYear) {
        count += 1;
      } else {
        break;
      }
    }
    return count;
  };

  const navigate = useNavigate();
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

      <div className={styles.container}>
        <div className={styles.timeline}>
          <div className={styles.planTripBtn}>
            <button
              className={styles.newTrip}
              onClick={() => navigate("/plan")}
            >
              <img src={plus} alt="Plus" />
            </button>
            <button className={styles.tripDropdown}>
              <p className={styles.tripPlans}>Trip Plans</p>
              <div>
                <img src={dropdown} alt="Dropdown" />
              </div>
            </button>
          </div>
          <div className={styles.trips}>
            {user.trips.map((trip, index) => {
              const previousTrip =
                index - 1 >= 0 ? user.trips[index - 1] : null;
              const tripYear = new Date(trip.dates[0]).getFullYear();
              const showYear =
                !previousTrip ||
                new Date(previousTrip.dates[0]).getFullYear() !== tripYear;

              return (
                <div className={styles.tripCheckpoint} key={index}>
                  <div>
                    <TripCard {...trip} />
                    {showYear && (
                      <p
                        className={`${styles.year} ${
                          !trip.completed && styles.fade
                        }`}
                      >
                        {tripYear}
                      </p>
                    )}
                    <p
                      className={`${styles.dates} ${
                        !trip.completed && styles.fade
                      }`}
                    >
                      {formatDates(...trip.dates)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
                <p className={styles.stat}>{user.trips.length}</p>
                <p className={styles.desc}>Trips</p>
              </div>
              <div>
                <p className={styles.stat}>{countTripsThisYear()}</p>
                <p className={styles.desc}>This Year</p>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>{renderMap(currentMap)}</div>

          <div className={styles.stats}>
            {user.bucketMaps.map((map, index) => (
              <div
                className={`${styles.progressContainer} ${
                  currentMap === index && styles.selected
                }`}
                key={index}
              >
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
      </div>
    </>
  );
}
