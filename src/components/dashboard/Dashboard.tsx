"use client";

import styles from "../../styles/dashboard.module.scss";
import MapLoader from "@/components/dashboard/MapLoader";
import Timeline from "@/components/dashboard/Timeline";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { TripInput, TripWithVisits } from "@/utils/types";
import NewTrip from "../log/NewTrip";
import { sortTrips } from "@/utils/date";
import Onboarding from "../onboarding/Onboarding";
import { addTripToUser, deleteTrip, updateTrip } from "@/actions/actions";
import ConfirmSelection from "../modals/ConfirmSelection";
import Profile from "./Profile";
import classnames from "classnames";
import { useUserContext } from "../../contexts/UserContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useScreenWidth } from "../../utils/hooks";
import LogTripMethodModal from "./LogTripMethodModal";
import TripDiscoveryModal from "../life/TripDiscoveryModal";
import { processPhotosIntoTrips, TripPreview } from "../../utils/photoProcessing";
import Loading from "../../app/load";

export default function Dashboard() {
  const sessionUser = useUserContext();
  const { viewingUser, isOwner } = useProfileContext();
  const isMobile = useScreenWidth();

  const [editProfile, setEditProfile] = useState(false);

  const [trips, setTrips] = useState<TripWithVisits[]>(viewingUser!.trips);
  const [optimisticTrips, setOptimisticTrips] = useOptimistic(trips);
  const [, startTransition] = useTransition();
  const hasImportedFromLife = useRef(false);

  const [logTripPage, setLogTripPage] = useState(-1); // Page of logging a trip
  const [currTrip, setCurrTrip] = useState<number[]>([]); // Current trip displayed
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [tripPreviews, setTripPreviews] = useState<TripPreview[]>([]);
  const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);
  const [reloadMap, setReloadMap] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addTrip = async (trip: TripInput, tempID: number) => {
    if (!sessionUser) throw new Error("Add trip without a session");

    const tempTrip: TripWithVisits = {
      id: tempID,
      name: trip.trip_name,
      description: trip.description,
      userId: sessionUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      visits: trip.visits.map((visit, index) => ({
        id: tempID + index,
        date: new Date(visit.date),
        order: visit.order,
        tripId: tempID,
        placeId: null,
        placeFipsCode: visit.fips_code,
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
      updatedTrip = await addTripToUser(sessionUser.id, trip);
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

  const handleLogTripClick = () => {
    if (isMobile) {
      fileInputRef.current?.click();
    } else {
      setShowMethodModal(true);
    }
  };

  const handleMethodManual = () => {
    setShowMethodModal(false);
    setEditTrip(null);
    setLogTripPage(0);
  };

  const handleMethodUpload = () => {
    setShowMethodModal(false);
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !sessionUser) return;

    setIsProcessingPhotos(true);

    try {
      const { trips: generatedTrips, previews } = await processPhotosIntoTrips(files);

      if (generatedTrips.length === 0) {
        setIsProcessingPhotos(false);
        return;
      }

      const savedTrips: TripWithVisits[] = [];
      for (const trip of generatedTrips) {
        const tripInput: TripInput = {
          trip_name: trip.name,
          description: trip.description,
          visits: trip.visits.map((v) => ({
            fips_code: v.placeFipsCode,
            date: v.date.toISOString().split("T")[0],
            order: v.order,
          })),
        };

        try {
          const savedTrip = await addTripToUser(sessionUser.id, tripInput);
          savedTrips.push(savedTrip);
        } catch (error) {
          console.error("Failed to save trip:", trip.name, error);
        }
      }

      if (savedTrips.length > 0) {
        setTrips((prev) => [...prev, ...savedTrips]);
        setOptimisticTrips((prev) => [...prev, ...savedTrips]);
      }

      setTripPreviews(previews);
      setShowDiscoveryModal(true);
      setIsProcessingPhotos(false);
    } catch (error) {
      console.error("Error processing photos:", error);
      setIsProcessingPhotos(false);
    }

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDismissDiscovery = () => {
    tripPreviews.forEach((preview) => URL.revokeObjectURL(preview.imageUrl));
    setShowDiscoveryModal(false);
    setTripPreviews([]);
    setReloadMap((prev) => !prev);
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

  // Import trips from localStorage after sign-in from Gravl Life
  useEffect(() => {
    const importLifeTrips = async () => {
      if (!sessionUser || !isOwner || hasImportedFromLife.current) return;

      try {
        const storedData = localStorage.getItem("gravl_life_trips_v1");
        if (!storedData) return;

        // Clear localStorage immediately to prevent re-import
        localStorage.removeItem("gravl_life_trips_v1");
        hasImportedFromLife.current = true;

        const payload = JSON.parse(storedData);
        if (payload.version !== 1 || payload.source !== "life-import") return;

        const storedTrips = payload.trips;
        const successfulTrips: TripWithVisits[] = [];

        for (const tripInput of storedTrips) {
          const isDuplicate = trips.some((existingTrip) => {
            if (existingTrip.name !== tripInput.trip_name) return false;
            if (existingTrip.visits.length !== tripInput.visits.length)
              return false;

            const firstVisitFips = existingTrip.visits[0]?.placeFipsCode;
            const firstStoredVisitFips = tripInput.visits[0]?.fips_code;

            return firstVisitFips === firstStoredVisitFips;
          });

          if (isDuplicate) {
            continue;
          }

          try {
            const savedTrip = await addTripToUser(sessionUser.id, tripInput);
            successfulTrips.push(savedTrip);
          } catch (error) {
            console.error("Failed to import trip:", tripInput.trip_name, error);
          }
        }

        if (successfulTrips.length > 0) {
          setTrips((prev) => [...prev, ...successfulTrips]);
          setOptimisticTrips((prev) => [...prev, ...successfulTrips]);
        }
      } catch (error) {
        console.error("Error importing life trips:", error);
      }
    };

    importLifeTrips();
  }, [sessionUser, isOwner, trips]);

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
      {isProcessingPhotos && <Loading />}
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
      {showDiscoveryModal && (
        <TripDiscoveryModal
          tripPreviews={tripPreviews}
          onDismiss={handleDismissDiscovery}
        />
      )}
      {showMethodModal && (
        <LogTripMethodModal
          onManual={handleMethodManual}
          onUpload={handleMethodUpload}
          onClose={() => setShowMethodModal(false)}
        />
      )}
      {editProfile && <Onboarding setClose={() => setEditProfile(false)} />}
      {logTripPage !== -1 && (
        <NewTrip
          logTripPage={logTripPage}
          setLogTripPage={setLogTripPage}
          addTrip={handleAddTrip}
          editTrip={editTrip}
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handlePhotoUpload}
        style={{ display: "none" }}
      />
      {logTripPage === -1 && (
        <div className={styles.container}>
          {isOwner && (
            <Timeline
              trips={sortedTrips}
              onLogTripClick={handleLogTripClick}
              currTrip={currTrip}
              setCurrTrip={setCurrTrip}
              setConfirmDelete={setConfirmDelete}
              handleEditTrip={handleEditTrip}
            />
          )}
          <div className={classnames(styles.main, !isOwner && styles.centered)}>
            <Profile setEditProfile={setEditProfile} trips={trips} />

            <MapLoader trips={tripsForMaps} triggerReload={reloadMap} />
          </div>
        </div>
      )}
    </>
  );
}
