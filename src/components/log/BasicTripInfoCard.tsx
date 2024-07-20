"use client";

import styles from "../../styles/basictripinfocard.module.scss";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { VisitInput } from "@/utils/types";
import CloseBtn from "./CloseBtn";

export type BasicTripInfo = {
  trip_name: string;
  description: string;
  start_date: string;
  end_date: string;
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
    } else if (!tripData.start_date || !tripData.end_date) {
      setError("Please add start and end dates.");
    } else if (new Date(tripData.start_date) > new Date(tripData.end_date)) {
      setError("Trying to go back in time, huh?");
    } else {
      setVisitsData(
        visits.filter(
          (visit) =>
            new Date(visit.date) >= new Date(tripData.start_date) &&
            new Date(visit.date) <= new Date(tripData.end_date)
        )
      );
      setLogTripPage(1);
      setError("");
    }
  };

  const handleStartDateChange = (date: string) => {
    setTripData({ ...tripData, start_date: date });
  };

  const handleEndDateChange = (date: string) => {
    setTripData({ ...tripData, end_date: date });
  };

  return (
    <div className={styles.container}>
      <CloseBtn setClose={() => setLogTripPage(-1)} />
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
          <div className={styles.chooseDate}>
            <p>From</p>
            <DatePicker
              date={tripData.start_date}
              setDate={handleStartDateChange}
            />
          </div>
          <div className={styles.chooseDate}>
            <p>To</p>
            <DatePicker
              date={tripData.end_date}
              setDate={handleEndDateChange}
            />
          </div>
        </div>
        <button onClick={handleNext}>Map It Out</button>
      </div>
      <p className={styles.error}>{error}</p>
    </div>
  );
}
