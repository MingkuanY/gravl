"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import { User } from "@prisma/client";
import BasicTripInfoCard from "@/components/log/BasicTripInfoCard";
import ManualFillCard from "@/components/log/ManualFillCard";
import { PlaceInput } from "@/utils/types";

export default function NewTrip({
  user,
  places,
  logTrip,
  setLogTrip,
  setTrip,
}: {
  user: User;
  places: PlaceInput[];
  logTrip: number;
  setLogTrip: Function;
  setTrip: Function;
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
        {logTrip === 0 && (
          <BasicTripInfoCard
            visits={visitsData}
            setVisitsData={setVisitsData}
            tripData={tripData}
            setTripData={setTripData}
            setLogTrip={setLogTrip}
          />
        )}
        {logTrip === 1 && (
          <ManualFillCard
            user={user}
            tripData={tripData}
            visits={visitsData}
            setVisitsData={setVisitsData}
            places={places}
            setLogTrip={setLogTrip}
            setTrip={setTrip}
          />
        )}
      </div>
    </>
  );
}
