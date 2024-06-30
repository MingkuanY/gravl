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
  logTripPage,
  setLogTripPage,
  updateWithNewTrip,
  updateTrips,
}: {
  user: User;
  places: PlaceInput[];
  logTripPage: number;
  setLogTripPage: Function;
  updateWithNewTrip: Function;
  updateTrips: Function;
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
            user={user}
            tripData={tripData}
            visits={visitsData}
            setVisitsData={setVisitsData}
            places={places}
            setLogTripPage={setLogTripPage}
            updateWithNewTrip={updateWithNewTrip}
            updateTrips={updateTrips}
          />
        )}
      </div>
    </>
  );
}
