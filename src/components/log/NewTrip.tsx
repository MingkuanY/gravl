"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import BasicTripInfoCard from "@/components/log/BasicTripInfoCard";
import ManualFillCard from "@/components/log/ManualFillCard";
import { PlaceInput, TripWithVisits, VisitInput } from "@/utils/types";
import { findStartAndEndDates } from "@/utils/date";
import { Visit } from "@prisma/client";

export default function NewTrip({
  places,
  logTripPage,
  setLogTripPage,
  addTrip,
  editTrip,
}: {
  places: PlaceInput[];
  logTripPage: number;
  setLogTripPage: Function;
  addTrip: Function;
  editTrip: TripWithVisits | undefined | null;
}) {
  const [tripData, setTripData] = useState({
    trip_name: editTrip ? editTrip.name : "",
    description: editTrip ? editTrip.description : "",
    start_date: editTrip ? findStartAndEndDates(editTrip.visits).startDate : "",
    end_date: editTrip ? findStartAndEndDates(editTrip.visits).endDate : "",
  });

  const convertToVisitInputs = (visits: Visit[]): VisitInput[] => {
    return visits.map((visit) => ({
      date: visit.date.toISOString().split("T")[0],
      order: visit.order,
      fips_code: visit.placeFipsCode,
    }));
  };

  const [visitsData, setVisitsData] = useState(
    editTrip ? convertToVisitInputs(editTrip.visits) : []
  );

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
