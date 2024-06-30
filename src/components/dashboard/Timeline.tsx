import { deleteTrip } from "@/actions/actions";
import styles from "../../styles/timeline.module.scss";
import Icon from "../icons/Icon";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { formatDates, getTripDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";
import { useState, useTransition } from "react";

export default function Timeline({
  initialTrips,
  setLogTripPage,
  currTrip,
  setCurrTrip,
  setOptimisticTrips,
}: {
  initialTrips: TripWithVisits[];
  setLogTripPage: Function;
  currTrip: number;
  setCurrTrip: Function;
  setOptimisticTrips: Function;
}) {
  const handleClick = (tripID: number) => {
    setCurrTrip(currTrip !== tripID ? tripID : -1);
  };

  const [trips, setTrips] = useState(initialTrips);

  const [, startTransition] = useTransition();

  const handleDelete = async (tripID: number) => {
    setCurrTrip(-1);
    setOptimisticTrips(trips.filter((trip) => trip.id !== tripID));
    await deleteTrip(tripID);
    setTrips(trips.filter((trip) => trip.id !== tripID));
  };

  return (
    <div className={`${styles.timeline} ${!trips.length && styles.empty}`}>
      <LogTripButton setLogTripPage={setLogTripPage} />
      <div className={styles.pastTrips}>
        {trips.map((trip, index) => {
          const tripDates = getTripDates(trip);
          const previousTrip = index - 1 >= 0 ? trips[index - 1] : null;
          const tripYear = new Date(tripDates.startDate).getFullYear();
          const showYear =
            !previousTrip ||
            new Date(getTripDates(previousTrip).startDate).getFullYear() !==
              tripYear;

          return (
            <div className={styles.tripCheckpoint} key={index}>
              <div className={styles.dot}>
                <TripCard
                  name={trip.name}
                  desc={trip.description}
                  selected={currTrip === trip.id}
                  isClicked={() => handleClick(trip.id)}
                />
                {showYear && <p className={styles.year}>{tripYear}</p>}
                <p className={styles.dates}>
                  {formatDates(tripDates.startDate, tripDates.endDate)}
                </p>
              </div>
              {currTrip === trip.id && (
                <button
                  className={styles.trashContainer}
                  onClick={() => startTransition(() => handleDelete(trip.id))}
                >
                  <div className={styles.trash}>
                    <Icon type="trash" fill="#319fff" />
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
