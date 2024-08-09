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
import {
  PlaceInput,
  TripInput,
  TripWithVisits,
  UserWithTrips,
} from "@/utils/types";
import NewTrip from "../log/NewTrip";
import { sortTrips } from "@/utils/date";
import Onboarding from "../onboarding/Onboarding";
import {
  addTripToUser,
  deleteTrip,
  unfriendUsers,
  updateTrip,
} from "@/actions/actions";
import ConfirmSelection from "../modals/ConfirmSelection";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Profile from "./Profile";

export default function Dashboard({
  user,
  places,
  viewOnly,
  viewer,
}: {
  user: UserWithTrips;
  places: PlaceInput[];
  viewOnly: boolean;
  viewer: User;
}) {
  const [editProfile, setEditProfile] = useState(false);

  const [trips, setTrips] = useState<TripWithVisits[]>(user.trips);
  const [optimisticTrips, setOptimisticTrips] = useOptimistic(trips);
  const [, startTransition] = useTransition();

  const [logTripPage, setLogTripPage] = useState(-1); // Page of logging a trip
  const [currTrip, setCurrTrip] = useState<number[]>([]); // Current trip displayed
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const addTrip = async (trip: TripInput, tempID: number) => {
    const tempTrip: TripWithVisits = {
      id: tempID,
      name: trip.trip_name,
      description: trip.description,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
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

    setCurrTrip([updatedTrip.id]);
  };

  const handleAddTrip = (trip: TripInput) => {
    const tempID = Date.now();
    setCurrTrip([tempID]);
    startTransition(() => addTrip(trip, tempID));
  };

  const handleDelete = async (tripID: number) => {
    setCurrTrip((prev) => prev.filter((id) => id !== tripID));
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
    if (currTrip.length === 0) {
      setTripsForMaps(sortedTripsChronological);
    } else {
      const selectedTrips = trips.filter((trip) => currTrip.includes(trip.id));
      setTripsForMaps(sortTrips(selectedTrips, true));
    }
  }, [currTrip, trips]);

  const sortedTrips = useMemo(
    () => sortTrips(optimisticTrips),
    [optimisticTrips]
  );

  const [confirmDelete, setConfirmDelete] = useState(-1);

  // Clicking anywhere outside of a trip card or a progress circle will display all trips
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tripCards = Array.from(document.querySelectorAll(".trip-card"));
      const progressCircles = Array.from(
        document.querySelectorAll(".progress-circle")
      );
      if (
        !tripCards.some((tripCard) =>
          tripCard.contains(event.target as Node)
        ) &&
        !progressCircles.some((progressCircle) =>
          progressCircle.contains(event.target as Node)
        ) &&
        currTrip.length > 0
      ) {
        setCurrTrip([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currTrip]);

  return (
    <>
      {confirmDelete !== -1 && (
        <ConfirmSelection
          warningText="Delete this trip?"
          yesFunction={() => {
            handleDelete(confirmDelete);
            setConfirmDelete(-1);
          }}
          noFunction={() => setConfirmDelete(-1)}
        />
      )}
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
            setConfirmDelete={setConfirmDelete}
            handleEditTrip={handleEditTrip}
            setEditTrip={setEditTrip}
            viewOnly={viewOnly}
          />
          <div className={styles.main}>
            <Profile
              user={user}
              viewOnly={viewOnly}
              viewer={viewer}
              setEditProfile={setEditProfile}
              trips={trips}
            />

            <MapLoader trips={tripsForMaps} places={places} />
          </div>
        </div>
      )}
    </>
  );
}
