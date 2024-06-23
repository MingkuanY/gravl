"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import { User } from "@prisma/client";
import BasicTripInfoCard from "./BasicTripInfoCard";
import ManualFillCard from "./ManualFillCard";

export default function NewTrip({
  user,
  searchParams,
}: {
  user: User;
  searchParams: { log: string };
}) {
  const [tripData, setTripData] = useState({
    trip_name: "A Floridian Thanksgiving",
    description: "Twas fun.",
    start_date: "2024-06-16",
  });

  const [visitsData, setVisitsData] = useState([]);

  return (
    <>
      <div className={styles.overlay}>
        {searchParams.log === "tripInfo" && (
          <BasicTripInfoCard
            user={user}
            tripData={tripData}
            setTripData={setTripData}
          />
        )}
        {searchParams.log === "tripMap" && (
          <ManualFillCard
            tripData={tripData}
            visits={visitsData}
            setVisitsData={setVisitsData}
          />
        )}
      </div>
    </>
  );
}
