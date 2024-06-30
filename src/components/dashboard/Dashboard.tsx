"use client";

import styles from "../../styles/dashboard.module.scss";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import UserStats from "@/components/dashboard/UserStats";
import Timeline from "@/components/dashboard/Timeline";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [logTrip, setLogTrip] = useState(-1); // Page of logging a trip
  const [currTrip, setCurrTrip] = useState(-1); // Current trip displayed
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const setTrip = (tripID: number) => {
    setCurrTrip(tripID);
  };

  useEffect(() => {
    const sortedTripsChronological = sortTrips(trips, true);
    if (currTrip === -1) {
      setTripsForMaps(sortedTripsChronological);
    } else {
      const currentTrip = trips.find((trip) => trip.id === currTrip);
      setTripsForMaps(currentTrip ? [currentTrip] : []);
    }
  }, [currTrip, trips]);

  const sortedTrips = useMemo(() => sortTrips(trips), [trips]);

  return (
    <>
      {logTrip !== -1 && (
        <NewTrip
          user={user}
          places={places}
          logTrip={logTrip}
          setLogTrip={setLogTrip}
          setTrip={setTrip}
        />
      )}
      {logTrip === -1 && (
        <div className={styles.container}>
          <Timeline
            user={user}
            trips={sortedTrips}
            setLogTrip={setLogTrip}
            currTrip={currTrip}
            setCurrTrip={setCurrTrip}
          />
          <div className={styles.main}>
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
              <UserStats trips={user!.trips} />
            </div>

            <MapLoader trips={tripsForMaps} places={places} />
          </div>
        </div>
      )}
    </>
  );
}
