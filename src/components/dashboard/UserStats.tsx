"use client";

import { tripsThisYear } from "@/utils/date";
import styles from "../../styles/userstats.module.scss";
import { useEffect, useState } from "react";
import { TripWithVisits } from "@/utils/types";

export default function UserStats({
  trips,
  setIsOpen,
  setCurrTrip,
}: {
  trips: TripWithVisits[];
  setIsOpen: Function;
  setCurrTrip: Function;
}) {
  const [tripCount, setTripCount] = useState(0);
  const [tripsThisYearCount, setTripsThisYearCount] = useState(0);

  useEffect(() => {
    setTripCount(trips.length);
    setTripsThisYearCount(tripsThisYear(trips));
  }, [trips]);

  const handleClick = () => {
    setIsOpen((isOpen: boolean) => !isOpen);
    setCurrTrip(-1);
  };

  return (
    <div className={styles.userStats}>
      <div>
        <p className={styles.stat} onClick={handleClick}>
          {tripCount}
        </p>
        <p className={styles.desc}>Trips</p>
      </div>
      <div>
        <p className={styles.stat} onClick={handleClick}>
          {tripsThisYearCount}
        </p>
        <p className={styles.desc}>This Year</p>
      </div>
    </div>
  );
}
