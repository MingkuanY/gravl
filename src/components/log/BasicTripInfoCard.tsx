"use client";

import styles from "../../styles/basictripinfocard.module.scss";
import DatePicker from "./DatePicker";
import { useState } from "react";
import CloseBtn from "./CloseBtn";
import { VisitInput } from "@/utils/types";

export type BasicTripInfo = {
  trip_name: string;
  description: string;
  start_date: string;
};

export default function BasicTripInfoCard({
  visits,
  setVisitsData,
  tripData,
  setTripData,
  setLogTripPage,
}: {
  visits: VisitInput[];
  setVisitsData: Function;
  tripData: BasicTripInfo;
  setTripData: Function;
  setLogTripPage: Function;
}) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!tripData.trip_name && !tripData.start_date) {
      setError("Please name and date your trip.");
    } else if (!tripData.trip_name) {
      setError("Please name your trip.");
    } else if (!tripData.start_date) {
      setError("Please add a start date.");
    } else {
      setLogTripPage(1);
      setError("");
    }
  };

  const handleDateChange = (date: string) => {
    setVisitsData(
      visits.filter((visit) => new Date(visit.date) >= new Date(date))
    );
    setTripData({ ...tripData, start_date: date });
  };

  return (
    <div className={styles.container}>
      <CloseBtn setLogTripPage={setLogTripPage} />
      <input
        className={styles.nameInput}
        type="text"
        value={tripData.trip_name}
        placeholder="Name Your Trip"
        required
        onChange={(e) =>
          setTripData({ ...tripData, trip_name: e.target.value })
        }
      />
      <textarea
        className={styles.descInput}
        placeholder="Tell us about it..."
        maxLength={160}
        value={tripData.description}
        onChange={(e) =>
          setTripData({ ...tripData, description: e.target.value })
        }
      />
      <div className={styles.bottom}>
        <div className={styles.dateContainer}>
          <p>Started on</p>
          <DatePicker date={tripData.start_date} setDate={handleDateChange} />
        </div>
        <button onClick={handleNext}>Map It Out</button>
      </div>
      <p className={styles.error}>{error}</p>
    </div>
  );
}
