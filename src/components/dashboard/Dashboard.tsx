"use client";

import styles from "../../styles/dashboard.module.scss";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import UserStats from "@/components/dashboard/UserStats";
import Timeline from "@/components/dashboard/Timeline";
import { useState } from "react";
import { PlaceInput, TripWithVisits } from "@/utils/types";
import NewTrip from "../log/NewTrip";
import { sortTrips } from "@/utils/date";

export default function Dashboard({
  trips,
  user,
  places,
}: {
  trips: TripWithVisits[];
  user: any;
  places: PlaceInput[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [logTrip, setLogTrip] = useState(-1);
  const [currTrip, setCurrTrip] = useState(-1);

  const setTrip = (tripID: number) => {
    setIsOpen(true);
    setCurrTrip(tripID);
  };

  if (currTrip !== -1) {
    console.log("current trip: ", currTrip);
  }

  return (
    <>
      {logTrip !== -1 && (
        <NewTrip
          user={user}
          places={places}
          logTrip={logTrip}
          setLogTrip={setLogTrip}
        />
      )}
      {logTrip === -1 && (
        <div className={styles.container}>
          <Timeline
            trips={sortTrips(trips)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setLogTrip={setLogTrip}
            currTrip={currTrip}
            setCurrTrip={setCurrTrip}
          />
          <div className={`${styles.main} ${isOpen ? styles.shifted : ""}`}>
            <div className={styles.profile}>
              <div className={styles.pfpContainer}>
                <img src={user!.image!} alt="PFP" />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.usernameAndEdit}>
                  <p className={styles.username}>{user!.username}</p>
                  <div className={styles.edit}>
                    <EditProfileButton />
                  </div>
                </div>
                <p className={styles.location}>{user!.location}</p>
                <p className={styles.bio}>{user!.bio}</p>
              </div>
              <UserStats trips={user!.trips} setIsOpen={setIsOpen} />
            </div>

            <MapLoader trips={sortTrips(trips, true)} places={places} />
          </div>
        </div>
      )}
    </>
  );
}
