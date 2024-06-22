"use client";

import { tripsThisYear } from "@/lib/trip";
import styles from "../../styles/userstats.module.scss";
import { Visit } from "@prisma/client";
import { useEffect, useState } from "react";

type Trip = {
  id: number;
  name: string;
  description: string;
  visits: Visit[];
};

export default function UserStats({ trips }: { trips: Trip[] }) {
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
        <p className={styles.desc}>Trips</p>
      </div>
      <div>
        <p className={styles.stat}>{tripsThisYearCount}</p>
        <p className={styles.desc}>This Year</p>
      </div>
    </div>
  );
}
