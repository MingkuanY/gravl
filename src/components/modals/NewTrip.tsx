"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import { User } from "@prisma/client";
import BasicTripInfoCard from "./BasicTripInfoCard";
import ManualFillCard from "./ManualFillCard";
import { PlaceInput } from "@/utils/types";

export default function NewTrip({
  user,
  places,
  searchParams,
}: {
  user: User;
  places: PlaceInput[];
  searchParams: { log: string };
}) {
  const [tripData, setTripData] = useState({
    trip_name: "",
    description: "",
    start_date: "",
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
            places={places}
          />
        )}
      </div>
    </>
  );
}
