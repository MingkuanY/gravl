"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import BasicTripInfoCard from "@/components/log/BasicTripInfoCard";
import ManualFillCard from "@/components/log/ManualFillCard";
import { PlaceInput } from "@/utils/types";

export default function NewTrip({
  places,
  logTripPage,
  setLogTripPage,
  addTrip,
}: {
  places: PlaceInput[];
  logTripPage: number;
  setLogTripPage: Function;
  addTrip: Function;
}) {
  const [tripData, setTripData] = useState({
    trip_name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const [visitsData, setVisitsData] = useState([]);

  return (
    <>
      <div className={styles.overlay}>
        {logTripPage === 0 && (
          <BasicTripInfoCard
            visits={visitsData}
            setVisitsData={setVisitsData}
            tripData={tripData}
            setTripData={setTripData}
            setLogTripPage={setLogTripPage}
          />
        )}
        {logTripPage === 1 && (
          <ManualFillCard
            tripData={tripData}
            visits={visitsData}
            setVisitsData={setVisitsData}
            places={places}
            setLogTripPage={setLogTripPage}
            addTrip={addTrip}
          />
        )}
      </div>
    </>
  );
}
