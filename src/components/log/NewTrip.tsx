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
}: {
  user: User;
  places: PlaceInput[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [tripData, setTripData] = useState({
    trip_name: "",
    description: "",
    start_date: "",
  });

  const [visitsData, setVisitsData] = useState([]);

  return (
    <>
      <div className={styles.overlay}>
        {currentPage === 0 && (
          <BasicTripInfoCard
            user={user}
            tripData={tripData}
            setTripData={setTripData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 1 && (
          <ManualFillCard
            tripData={tripData}
            visits={visitsData}
            setVisitsData={setVisitsData}
            places={places}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
