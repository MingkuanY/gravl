"use client";

import React, { useEffect, useRef, useState } from "react";
import exifr from "exifr";
import styles from "../../styles/landing.module.scss";
import dashboardStyles from "../../styles/dashboard.module.scss";
import { TripWithVisits, TripInput, VisitInput } from "../../utils/types";
import Loading from "../../app/load";
import haversine from "haversine-distance";
import LifeTimeline from "../../components/life/LifeTimeline";
import MapLoader from "../../components/dashboard/MapLoader";
import { signIn } from "next-auth/react";
import { dbscanClusterPhotos, generateTripName } from "../../utils/clustering";
import classnames from "classnames";
import NewTrip from "../../components/log/NewTrip";
import ConfirmSelection from "../../components/modals/ConfirmSelection";
import TripDiscoveryModal from "../../components/life/TripDiscoveryModal";
import Counties from "../maps/Counties";
import Icon from "../icons/Icon";
import { useScreenWidth } from "../../utils/hooks";

const MILES_THRESHOLD = 5;
const METERS_THRESHOLD = MILES_THRESHOLD * 1609.34;

type PhotoData = {
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
  file?: File;
};

type TripPreview = {
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
};

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
      const photos = await extractPhotoMetadata(files);
      if (photos.length === 0) {
        console.error("No geotagged photos found.");
        setIsLoading(false);
        return;
      }

      const { clusters, singletons } = dbscanClusterPhotos(photos);

      if (clusters.length === 0 && singletons.length === 0) {
        console.error("No trip clusters found.");
        setIsLoading(false);
        return;
      }

      const generatedTrips: TripWithVisits[] = [];
      const previews: TripPreview[] = [];
      let tripIndex = 0;

      for (let i = 0; i < clusters.length; i++) {
        const cluster = clusters[i];

        try {
          const [routeSegments, tripName] = await Promise.all([
            getRouteSegments(cluster),
            generateTripName(cluster, tripIndex),
          ]);

          const visits = generateVisitsFromSegments(routeSegments);
          if (visits.length === 0) continue;

          const trip: TripWithVisits = {
            id: Date.now() + tripIndex,
            name: tripName,
            description: "",
            createdAt: new Date(),
            updatedAt: null,
            userId: "",
            visits: visits.map((visit, index) => ({
              id: index,
              tripId: Date.now() + tripIndex,
              placeId: null,
              placeFipsCode: visit.fips_code,
              date: new Date(visit.date),
              order: visit.order,
            })),
          };

          generatedTrips.push(trip);

          const middleIndex = Math.floor(cluster.length / 2);
          const representativePhoto = cluster[middleIndex];

          if (representativePhoto?.file) {
            const imageUrl = URL.createObjectURL(representativePhoto.file);
            const startDate = cluster[0].timestamp.split("T")[0];
            const endDate = cluster[cluster.length - 1].timestamp.split("T")[0];

            previews.push({
              name: tripName,
              imageUrl,
              startDate,
              endDate,
            });
          }

          tripIndex++;
        } catch (error) {
          console.error(`Error processing cluster ${i + 1}:`, error);
        }
      }

      const singletonResults = await Promise.allSettled(
        singletons.map(async (singleton, i) => {
          if (!singleton.location) return null;

          const [fipsCode, tripName] = await Promise.all([
            getCountyFromPoint(singleton.location.lat, singleton.location.lng),
            generateTripName([singleton], tripIndex + i),
          ]);

          if (!fipsCode) return null;

          const trip: TripWithVisits = {
            id: Date.now() + tripIndex + i,
            name: tripName,
            description: "",
            createdAt: new Date(),
            updatedAt: null,
            userId: "",
            visits: [{
              id: 0,
              tripId: Date.now() + tripIndex + i,
              placeId: null,
              placeFipsCode: fipsCode,
              date: new Date(singleton.timestamp),
              order: 0,
            }],
          };

          return { trip, tripName, date: singleton.timestamp.split("T")[0], singletonIndex: i };
        })
      );

      for (const result of singletonResults) {
        if (result.status === "fulfilled" && result.value) {
          const { trip, tripName, date, singletonIndex } = result.value;
          generatedTrips.push(trip);

          const singleton = singletons[singletonIndex];

          if (singleton?.file) {
            const imageUrl = URL.createObjectURL(singleton.file);
            previews.push({
              name: tripName,
              imageUrl,
              startDate: date,
              endDate: date,
            });
          }
        }
      }

      if (generatedTrips.length === 0 && previews.length === 0) {
        setIsLoading(false);
        return;
      }

      generatedTrips.sort((a, b) => {
        const aDate = a.visits[0]?.date || new Date(0);
        const bDate = b.visits[0]?.date || new Date(0);
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      });

      previews.sort((a: TripPreview, b: TripPreview) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

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
      setTripsForMaps(trips);
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

  const extractPhotoMetadata = async (
    files: FileList
  ): Promise<PhotoData[]> => {
    const results: PhotoData[] = [];

    for (const file of Array.from(files)) {
      try {
        const exifData = await exifr.parse(file, { gps: true });
        const timestamp = exifData?.DateTimeOriginal || exifData?.CreateDate;
        const lat = exifData?.latitude;
        const lng = exifData?.longitude;

        if (timestamp) {
          results.push({
            timestamp: new Date(timestamp).toISOString(),
            location: lat && lng ? { lat, lng } : undefined,
            file,
          });
        }
      } catch (err) {
      }
    }

    return results
      .filter((p) => p.location)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
  };

  const isWithinDistance = (
    pointA: { lat: number; lng: number },
    pointB: { lat: number; lng: number },
    metersThreshold = METERS_THRESHOLD
  ) => {
    return haversine(pointA, pointB) <= metersThreshold;
  };

  const filterPhotosByDistance = (photos: PhotoData[]) => {
    const withLocation = photos.filter(
      (p) => p.location && p.location.lat && p.location.lng
    );
    if (withLocation.length === 0) return [];

    const filtered = [withLocation[0]];
    let lastKept = withLocation[0];

    for (let i = 1; i < withLocation.length; i++) {
      if (!isWithinDistance(lastKept.location!, withLocation[i].location!)) {
        filtered.push(withLocation[i]);
        lastKept = withLocation[i];
      }
    }

    return filtered;
  };

  const createRouteSegment = async (
    directionsService: google.maps.DirectionsService,
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    timestamp: string
  ) => {
    const results = await directionsService.route({
      origin: `${start.lat}, ${start.lng}`,
      destination: `${end.lat}, ${end.lng}`,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const polyline = results.routes[0].overview_polyline;

    const decodedPolyline = google.maps.geometry.encoding
      .decodePath(polyline)
      .map((latLng) => [latLng.lng(), latLng.lat()]);

    return {
      start,
      end,
      polyline,
      decodedPolyline,
      timestamp,
    };
  };

  async function processPolylinesBatch(
    decodedPolylines: Array<Array<[number, number]>>
  ) {
    const response = await fetch(
      "https://api.gravl.org/process_polylines_batch/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ polylines: decodedPolylines }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error processing polylines batch: " + response.statusText
      );
    }

    const data = await response.json();
    return data.results;
  }

  const getRouteSegments = async (photos: PhotoData[]) => {
    const filteredPhotos = filterPhotosByDistance(photos);
    const directionsService = new google.maps.DirectionsService();

    const segmentPromises = [];
    for (let i = 0; i < filteredPhotos.length - 1; i++) {
      segmentPromises.push(
        createRouteSegment(
          directionsService,
          filteredPhotos[i].location!,
          filteredPhotos[i + 1].location!,
          filteredPhotos[i + 1].timestamp
        )
      );
    }

    const segments = (await Promise.allSettled(segmentPromises))
      .filter((res) => res.status === "fulfilled")
      .map((res) => (res as PromiseFulfilledResult<any>).value);

    if (segments.length === 0) {
      return [];
    }

    const allFipsCodes = await processPolylinesBatch(
      segments.map((s) => s.decodedPolyline)
    );

    return segments.map((segment, i) => ({
      ...segment,
      fipsCodes: allFipsCodes[i],
    }));
  };

  const generateVisitsFromSegments = (
    segments: { fipsCodes: string[]; timestamp: string }[]
  ) => {
    const seen = new Set<string>();
    const visits = [];

    for (const segment of segments) {
      const { fipsCodes, timestamp } = segment;

      for (const fips_code of fipsCodes) {
        if (!seen.has(fips_code)) {
          seen.add(fips_code);
          visits.push({
            fips_code,
            date: timestamp.split("T")[0],
            order: visits.length,
          });
        }
      }
    }

    return visits;
  };

  const getCountyFromPoint = async (
    lat: number,
    lng: number
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        "https://api.gravl.org/get_county_from_point/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lng }),
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.fips_code || null;
    } catch (error) {
      return null;
    }
  };

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
