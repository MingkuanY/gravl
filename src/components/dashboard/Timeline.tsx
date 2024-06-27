import styles from "../../styles/timeline.module.scss";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { formatDates, getTripDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";

export default function Timeline({
  trips,
  isOpen,
}: {
  trips: TripWithVisits[];
  isOpen: boolean;
}) {
  // Assume trips is already sorted in recent-first order by start date

  return (
    <div className={`${styles.timeline} ${isOpen ? styles.open : ""}`}>
      <LogTripButton />
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
              <div>
                <TripCard name={trip.name} desc={trip.description} />
                {showYear && <p className={styles.year}>{tripYear}</p>}
                <p className={styles.dates}>
                  {formatDates(tripDates.startDate, tripDates.endDate)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
