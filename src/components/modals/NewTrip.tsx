"use client";

import styles from "../../styles/newtrip.module.scss";
import { useState } from "react";
import { User } from "@prisma/client";

export default function NewTrip({ user }: { user: User }) {
  const [step, setStep] = useState(1);

  const [tripData, setTripData] = useState({
    trip_name: "",
    description: "",
    start_date: "",
  });

  return (
    <>
      <div className={styles.overlay}>
        {step === 1 && (
          <div className={styles.container}>
            <div className={styles.leftSide}>
              <img
                src={user.image as string}
                alt="PFP"
                className={styles.pfp}
              />
              <p>{user.username}</p>
            </div>
            <div className={styles.rightSide}>
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
                  <input className={styles.dateInput} type="date" />
                </div>
                <button onClick={() => setStep((step) => step + 1)}>
                  Map It Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
