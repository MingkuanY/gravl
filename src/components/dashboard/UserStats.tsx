"use client";

import { tripsThisYear } from "@/lib/trip";
import styles from "../../styles/userstats.module.scss";
import { Visit } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const isTimelineOpen = currentSearchParams.get("timeline") === "open";

    if (isTimelineOpen) {
      currentSearchParams.delete("timeline");
    } else {
      currentSearchParams.set("timeline", "open");
    }

    router.push(`${pathname}?${currentSearchParams.toString()}`);
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
