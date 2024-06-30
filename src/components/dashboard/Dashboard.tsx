"use client";

import styles from "../../styles/dashboard.module.scss";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import UserStats from "@/components/dashboard/UserStats";
import Timeline from "@/components/dashboard/Timeline";
import { useEffect, useMemo, useOptimistic, useRef, useState } from "react";
import { PlaceInput, TripWithVisits } from "@/utils/types";
import NewTrip from "../log/NewTrip";
import { sortTrips } from "@/utils/date";

export default function Dashboard({
  initialTrips,
  user,
  places,
}: {
  initialTrips: TripWithVisits[];
  user: any;
  places: PlaceInput[];
}) {
  const [trips, setTrips] = useState(initialTrips);
  const updateTrips = (newTrip: TripWithVisits) => {
    setTrips([...trips, newTrip]);
  };
  const [optimisticTrips, setOptimisticTrips] = useOptimistic(trips);

  const [logTripPage, setLogTripPage] = useState(-1); // Page of logging a trip
  const [currTrip, setCurrTrip] = useState(-1); // Current trip displayed
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const updateWithNewTrip = (newTrip: TripWithVisits) => {
    setOptimisticTrips([...trips, newTrip]);
    setCurrTrip(newTrip.id);
  };

  useEffect(() => {
    const sortedTripsChronological = sortTrips(optimisticTrips, true);
    if (currTrip === -1) {
      setTripsForMaps(sortedTripsChronological);
    } else {
      const currentTrip = optimisticTrips.find((trip) => trip.id === currTrip);
      setTripsForMaps(currentTrip ? [currentTrip] : []);
    }
  }, [currTrip, optimisticTrips]);

  const sortedTrips = useMemo(
    () => sortTrips(optimisticTrips),
    [optimisticTrips]
  );

  return (
    <>
      {logTripPage !== -1 && (
        <NewTrip
          user={user}
          places={places}
          logTripPage={logTripPage}
          setLogTripPage={setLogTripPage}
          updateWithNewTrip={updateWithNewTrip}
          updateTrips={updateTrips}
        />
      )}
      {logTripPage === -1 && (
        <div className={styles.container}>
          <Timeline
            initialTrips={sortedTrips}
            setLogTripPage={setLogTripPage}
            currTrip={currTrip}
            setCurrTrip={setCurrTrip}
            setOptimisticTrips={setOptimisticTrips}
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
