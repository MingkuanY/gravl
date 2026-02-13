"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/landing.module.scss";
import dashboardStyles from "../../styles/dashboard.module.scss";
import { TripWithVisits, TripInput, VisitInput } from "../../utils/types";
import Loading from "../../app/load";
import LifeTimeline from "../../components/life/LifeTimeline";
import MapLoader from "../../components/dashboard/MapLoader";
import { signIn } from "next-auth/react";
import classnames from "classnames";
import NewTrip from "../../components/log/NewTrip";
import ConfirmSelection from "../../components/modals/ConfirmSelection";
import TripDiscoveryModal from "../../components/life/TripDiscoveryModal";
import Counties from "../maps/Counties";
import Icon from "../icons/Icon";
import { useScreenWidth } from "../../utils/hooks";
import { processPhotosIntoTrips, TripPreview } from "../../utils/photoProcessing";
import { sortTrips } from "../../utils/date";

export default function LandingContent({
  initialVisitData,
}: {
  initialVisitData: VisitInput[];
}) {
  const isMobile = useScreenWidth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mapReady, setMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [trips, setTrips] = useState<TripWithVisits[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [tripsForMaps, setTripsForMaps] = useState<TripWithVisits[]>([]);

  const [logTripPage, setLogTripPage] = useState(-1);
  const [editTrip, setEditTrip] = useState<TripWithVisits | undefined | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(-1);

  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [tripPreviews, setTripPreviews] = useState<TripPreview[]>([]);
  const [reloadMap, setReloadMap] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);

    try {
      const { trips: generatedTrips, previews } = await processPhotosIntoTrips(files);

      if (generatedTrips.length === 0 && previews.length === 0) {
        setIsLoading(false);
        return;
      }

      setTripPreviews(previews);
      setTrips(generatedTrips);
      setIsLoading(false);
      setMapReady(true);
      setShowDiscoveryModal(true);
    } catch (error) {
      console.error("Error processing photos:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTripId === null) {
      setTripsForMaps(sortTrips(trips, true));
    } else {
      const selectedTrip = trips.find((t) => t.id === selectedTripId);
      setTripsForMaps(selectedTrip ? [selectedTrip] : []);
    }
  }, [selectedTripId, trips]);

  useEffect(() => {
    if (!mapReady) return;

    const handleClickOutside = (event: MouseEvent) => {
      const tripCards = Array.from(document.querySelectorAll(".trip-card"));
      if (
        !tripCards.some((tripCard) => tripCard.contains(event.target as Node)) &&
        selectedTripId !== null
      ) {
        setSelectedTripId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTripId, mapReady]);

  const handleAddTrip = (trip: TripInput) => {
    const tempID = Date.now();

    if (editTrip) {
      const updatedTrip: TripWithVisits = {
        ...editTrip,
        name: trip.trip_name,
        description: trip.description,
        visits: trip.visits.map((visit, index) => ({
          id: index,
          date: new Date(visit.date),
          order: visit.order,
          tripId: editTrip.id,
          placeId: null,
          placeFipsCode: visit.fips_code,
        })),
      };

      setTrips((prev) => prev.map((t) => (t.id === editTrip.id ? updatedTrip : t)));
      setEditTrip(null);
    } else {
      const newTrip: TripWithVisits = {
        id: tempID,
        name: trip.trip_name,
        description: trip.description,
        createdAt: new Date(),
        updatedAt: null,
        userId: "",
        visits: trip.visits.map((visit, index) => ({
          id: index,
          tripId: tempID,
          placeId: null,
          placeFipsCode: visit.fips_code,
          date: new Date(visit.date),
          order: visit.order,
        })),
      };

      setTrips((prev) => [newTrip, ...prev]);
    }

    setLogTripPage(-1);
  };

  const handleEditTrip = (tripID: number) => {
    setEditTrip(trips.find((trip) => trip.id === tripID));
    setLogTripPage(0);
  };

  const handleDelete = (tripID: number) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== tripID));
    setSelectedTripId(null);
    setConfirmDelete(-1);
  };

  const handleDismissDiscovery = () => {
    tripPreviews.forEach((preview) => URL.revokeObjectURL(preview.imageUrl));
    setShowDiscoveryModal(false);
    setTripPreviews([]);
    // Restart the map animation
    setReloadMap((prev) => !prev);
  };

  const handleExportTrips = () => {
    // Persist current trips to localStorage before sign-in
    const payload = {
      version: 1,
      source: "life-import",
      timestamp: Date.now(),
      trips: trips.map((t) => ({
        trip_name: t.name,
        description: t.description,
        visits: t.visits.map((v) => ({
          fips_code: v.placeFipsCode,
          date: v.date.toISOString().split("T")[0],
          order: v.order,
        })),
      })),
    };

    localStorage.setItem("gravl_life_trips_v1", JSON.stringify(payload));
    signIn("google", { callbackUrl: "/redirect" });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!mapReady) {
    return (
      <div className={styles.mainContainer}>
        {!isMobile ? (
          <>
            <div className={styles.leftColumn}>
              <div>
                <div className={styles.bigLogoContainer}>
                  <div className={styles.bigLogo}>
                    <Icon type="car" fill="#319fff" />
                  </div>
                  <h1 className={styles.bigGravl}>Gravl</h1>
                </div>
                <h2 className={styles.stepsTitle}>Generate Your Trips</h2>
                <ul className={styles.stepsList}>
                  <li className={styles.stepItem}>
                    <span className={styles.stepText}>Upload photos with location metadata</span>
                  </li>
                  <li className={styles.stepItem}>
                    <span className={styles.stepText}>Gravl clusters them into trips by location and time</span>
                  </li>
                  <li className={styles.stepItem}>
                    <span className={styles.stepText}>Fine-tune your trips to perfection</span>
                  </li>
                  <li className={styles.stepItem}>
                    <span className={styles.stepText}>Enjoy the map animations!</span>
                  </li>
                </ul>
              </div>
              <button className={styles.uploadButton} onClick={handleButtonClick}>
                <div className={styles.go}>
                  <Icon type="go" fill="#fff" />
                </div>
                <p>Upload Photos</p>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.map}>
                <Counties
                  data={initialVisitData}
                  pause={15}
                  animate={true}
                  toggleHighways={false}
                />
              </div>
              <p className={styles.description}>
                Track your trips by uploading geotagged photos!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.rightColumn}>
              <p className={styles.description}>
                Track your trips by uploading geotagged photos!
              </p>
              <div className={styles.map}>
                <Counties
                  data={initialVisitData}
                  pause={15}
                  animate={true}
                  toggleHighways={false}
                />
              </div>
            </div>
            <div className={styles.leftColumn}>
              <h2 className={styles.stepsTitle}>Generate Your Trips</h2>
              <ul className={styles.stepsList}>
                <li className={styles.stepItem}>
                  <span className={styles.stepText}>Upload photos with location metadata</span>
                </li>
                <li className={styles.stepItem}>
                  <span className={styles.stepText}>Gravl clusters them into trips by location and time</span>
                </li>
                <li className={styles.stepItem}>
                  <span className={styles.stepText}>Fine-tune your trips to perfection</span>
                </li>
                <li className={styles.stepItem}>
                  <span className={styles.stepText}>Enjoy the map animations!</span>
                </li>
              </ul>
              <button className={styles.uploadButton} onClick={handleButtonClick}>
                <div className={styles.go}>
                  <Icon type="go" fill="#fff" />
                </div>
                <p>Upload Photos</p>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  const totalTrips = trips.length;
  const allVisits = trips.flatMap((t) => t.visits);
  const uniqueCounties = new Set(allVisits.map((v) => v.placeFipsCode));
  const uniqueStates = new Set(
    allVisits.map((v) => v.placeFipsCode.slice(0, 2)).filter((s) => s !== "11")
  );
  const newCounties = uniqueCounties.size;
  const newStates = uniqueStates.size;

  return (
    <>
      {showDiscoveryModal && (
        <TripDiscoveryModal
          tripPreviews={tripPreviews}
          onDismiss={handleDismissDiscovery}
        />
      )}
      {confirmDelete !== -1 && (
        <ConfirmSelection
          warningText="Delete this trip?"
          yesFunction={() => handleDelete(confirmDelete)}
          noFunction={() => setConfirmDelete(-1)}
        />
      )}
      {logTripPage !== -1 && (
        <NewTrip
          logTripPage={logTripPage}
          setLogTripPage={setLogTripPage}
          addTrip={handleAddTrip}
          editTrip={editTrip}
        />
      )}
      {logTripPage === -1 && (
        <div className={dashboardStyles.container}>
          <LifeTimeline
            trips={trips}
            selectedTripId={selectedTripId}
            onSelectTrip={setSelectedTripId}
            onLoginToSave={handleExportTrips}
            setLogTripPage={setLogTripPage}
            setEditTrip={setEditTrip}
            setConfirmDelete={setConfirmDelete}
            handleEditTrip={handleEditTrip}
          />
          <div className={classnames(dashboardStyles.main, dashboardStyles.centered)}>
            <div className={styles.statsContainer}>
              <p className={styles.tripCount}>{totalTrips} trip{totalTrips !== 1 ? 's' : ''}</p>
              <p className={styles.stat}>{newCounties} new counties</p>
              <p className={styles.stat}>{newStates} new states</p>
            </div>

            <MapLoader trips={tripsForMaps} triggerReload={reloadMap} />
          </div>
        </div>
      )}
    </>
  );
}
