import { deleteTrip } from "@/actions/actions";
import styles from "../../styles/timeline.module.scss";
import Icon from "../icons/Icon";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { formatDates, getTripDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";

export default function Timeline({
  user,
  trips,
  setLogTrip,
  currTrip,
  setCurrTrip,
}: {
  user: any;
  trips: TripWithVisits[];
  setLogTrip: Function;
  currTrip: number;
  setCurrTrip: Function;
}) {
  const handleClick = (tripID: number) => {
    setCurrTrip(currTrip !== tripID ? tripID : -1);
  };

  const handleDelete = async (tripID: number) => {
    setCurrTrip(-1);
    await deleteTrip(tripID);
  };

  return (
    <div className={`${styles.timeline} ${!trips.length && styles.empty}`}>
      <LogTripButton setLogTrip={setLogTrip} />
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
                  onClick={() => handleDelete(trip.id)}
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
