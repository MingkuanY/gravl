"use client";

import { tripsThisYear } from "@/utils/date";
import styles from "../../styles/userstats.module.scss";
import { useEffect, useState } from "react";
import { TripWithVisits } from "@/utils/types";

export default function UserStats({ trips }: { trips: TripWithVisits[] }) {
  const [tripCount, setTripCount] = useState(0);
  const [tripsThisYearCount, setTripsThisYearCount] = useState(0);

  useEffect(() => {
    setTripCount(trips.length);
    setTripsThisYearCount(tripsThisYear(trips));
  }, [trips]);

  return (
    <div className={styles.userStats}>
      <div>
        <p className={styles.stat}>{tripCount}</p>
        <p className={styles.desc}>Trip{tripCount !== 1 && "s"}</p>
      </div>
      <div>
        <p className={styles.stat}>{tripsThisYearCount}</p>
        <p className={styles.desc}>This Year</p>
      </div>
    </div>
  );
}
