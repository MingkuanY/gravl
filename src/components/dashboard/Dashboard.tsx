"use client";

import styles from "../../styles/dashboard.module.scss";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import UserStats from "@/components/dashboard/UserStats";
import Timeline from "@/components/dashboard/Timeline";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { PlaceInput, TripInput, TripWithVisits } from "@/utils/types";
import NewTrip from "../log/NewTrip";
import { sortTrips } from "@/utils/date";
import Onboarding from "../onboarding/Onboarding";
import { addTripToUser, deleteTrip, updateTrip } from "@/actions/actions";

export default function Dashboard({
  initialTrips,
  user,
  places,
}: {
  initialTrips: TripWithVisits[];
  user: any;
  places: PlaceInput[];
}) {
  const [editProfile, setEditProfile] = useState(false);

  const [trips, setTrips] = useState(initialTrips);
  const [optimisticTrips, setOptimisticTrips] = useOptimistic(trips);
  const [, startTransition] = useTransition();

  const [logTripPage, setLogTripPage] = useState(-1); // Page of logging a trip
  const [currTrip, setCurrTrip] = useState(-1); // Current trip displayed
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const addTrip = async (trip: TripInput, tempID: number) => {
    const tempTrip: TripWithVisits = {
      id: tempID,
      name: trip.trip_name,
      description: trip.description,
      userId: user.id,
      visits: trip.visits.map((visit, index) => ({
        id: tempID + index,
        date: new Date(visit.date),
        order: visit.order,
        tripId: tempID,
        placeId: visit.place_id,
      })),
    };

    let updatedTrip: TripWithVisits;
    if (editTrip) {
      // Updating an existing trip
      setOptimisticTrips((prev) =>
        prev.map((t) => (t.id === editTrip.id ? tempTrip : t))
      );
      updatedTrip = await updateTrip(editTrip.id, trip);
      setEditTrip(null);
      setTrips((prev) =>
        prev.map((t) => (t.id === editTrip.id ? updatedTrip : t))
      );
      setOptimisticTrips((prev) =>
        prev.map((t) => (t.id === editTrip.id ? updatedTrip : t))
      );
    } else {
      // Adding a new trip
      setOptimisticTrips((prev) => [...prev, tempTrip]);
      updatedTrip = await addTripToUser(user.id, trip);
      setTrips((prev) => [...prev, updatedTrip]);
      setOptimisticTrips((prev) => prev.filter((t) => t.id !== tempID));
    }

    setCurrTrip(updatedTrip.id);
  };

  const handleAddTrip = (trip: TripInput) => {
    const tempID = Date.now();
    setCurrTrip(tempID);
    startTransition(() => addTrip(trip, tempID));
  };

  const handleDelete = async (tripID: number) => {
    if (currTrip === tripID) setCurrTrip(-1);
    setTrips((prev) => prev.filter((trip) => trip.id !== tripID));
    await deleteTrip(tripID);
  };

  const [editTrip, setEditTrip] = useState<TripWithVisits | undefined | null>(
    null
  );

  const handleEditTrip = (tripID: number) => {
    setEditTrip(trips.find((trip) => trip.id === tripID));
    setLogTripPage(0);
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

  const sortedTrips = useMemo(
    () => sortTrips(optimisticTrips),
    [optimisticTrips]
  );

  return (
    <>
      {editProfile && (
        <Onboarding
          email={user.email!}
          user={user!}
          setClose={() => setEditProfile(false)}
        />
      )}
      {logTripPage !== -1 && (
        <NewTrip
          places={places}
          logTripPage={logTripPage}
          setLogTripPage={setLogTripPage}
          addTrip={handleAddTrip}
          editTrip={editTrip}
        />
      )}
      {logTripPage === -1 && (
        <div className={styles.container}>
          <Timeline
            trips={sortedTrips}
            setLogTripPage={setLogTripPage}
            currTrip={currTrip}
            setCurrTrip={setCurrTrip}
            handleDelete={handleDelete}
            handleEditTrip={handleEditTrip}
            setEditTrip={setEditTrip}
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
                    <EditProfileButton setEditProfile={setEditProfile} />
                  </div>
                </div>
                <p className={styles.location}>{user!.location}</p>
                <p className={styles.bio}>{user!.bio}</p>
              </div>
              <UserStats trips={trips} />
            </div>

            <MapLoader trips={tripsForMaps} places={places} />
          </div>
        </div>
      )}
    </>
  );
}
