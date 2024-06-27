"use client";

import { User } from "@prisma/client";
import styles from "../../styles/basictripinfocard.module.scss";
import DatePicker from "./DatePicker";

export type BasicTripInfo = {
  trip_name: string;
  description: string;
  start_date: string;
};

export default function BasicTripInfoCard({
  user,
  tripData,
  setTripData,
  setCurrentPage,
}: {
  user: User;
  tripData: BasicTripInfo;
  setTripData: Function;
  setCurrentPage: Function;
}) {
  const handleNext = () => {
    if (tripData.trip_name && tripData.start_date) {
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.container}>
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
          <DatePicker
            setDate={(date: string) =>
              setTripData({ ...tripData, start_date: date })
            }
          />
        </div>
        <button onClick={handleNext}>Map It Out</button>
      </div>
    </div>
  );
}
