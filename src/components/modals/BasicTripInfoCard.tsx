"use client";

import { User } from "@prisma/client";
import styles from "../../styles/basictripinfocard.module.scss";
import DatePicker from "./DatePicker";
import { usePathname, useRouter } from "next/navigation";

export type BasicTripInfo = {
  trip_name: string;
  description: string;
  start_date: string;
};

export default function BasicTripInfoCard({
  user,
  tripData,
  setTripData,
}: {
  user: User;
  tripData: BasicTripInfo;
  setTripData: Function;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const handleNext = () => {
    if (tripData.trip_name && tripData.start_date) {
      router.push(`${pathname}?log=tripMap`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={user.image as string} alt="PFP" className={styles.pfp} />
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
            <DatePicker
              setDate={(date: string) =>
                setTripData({ ...tripData, start_date: date })
              }
            />
          </div>
          <button onClick={handleNext}>Map It Out</button>
        </div>
      </div>
    </div>
  );
}
