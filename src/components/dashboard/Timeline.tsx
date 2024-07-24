import styles from "../../styles/timeline.module.scss";
import Icon from "../icons/Icon";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { findStartAndEndDates, formatDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";
import classnames from "classnames";

export default function Timeline({
  trips,
  setLogTripPage,
  currTrip,
  setCurrTrip,
  handleDelete,
  handleEditTrip,
  setEditTrip,
}: {
  trips: TripWithVisits[];
  setLogTripPage: Function;
  currTrip: number;
  setCurrTrip: Function;
  handleDelete: Function;
  handleEditTrip: Function;
  setEditTrip: Function;
}) {
  const handleClick = (tripID: number) => {
    setCurrTrip(currTrip !== tripID ? tripID : -1);
  };

  return (
    <div className={classnames(styles.timeline, !trips.length && styles.empty)}>
      <LogTripButton
        setLogTripPage={setLogTripPage}
        setEditTrip={setEditTrip}
      />
      {trips.length == 0 && (
        <div className={styles.proTipContainer}>
          <p className={styles.proTip}>Add Your First Trip</p>
          <div className={styles.up_arrow}>
            <Icon type="up_arrow" fill="#319fff" />
          </div>
        </div>
      )}
      <div className={styles.pastTrips}>
        {trips.map((trip, index) => {
          const tripDates = findStartAndEndDates(trip.visits);
          const previousTrip = index - 1 >= 0 ? trips[index - 1] : null;
          const tripYear = new Date(tripDates.startDate).getFullYear();
          const showYear =
            !previousTrip ||
            new Date(
              findStartAndEndDates(previousTrip.visits).startDate
            ).getFullYear() !== tripYear;

          return (
            <div className={styles.tripCheckpoint} key={index}>
              <div className={styles.dot}>
                <div className={styles.tripCardContainer}>
                  <TripCard
                    name={trip.name}
                    desc={trip.description}
                    selected={currTrip === trip.id}
                    isClicked={() => handleClick(trip.id)}
                    editTrip={() => handleEditTrip(trip.id)}
                  />
                  <button
                    className={styles.trashContainer}
                    onClick={() => handleDelete(trip.id)}
                  >
                    <div className={styles.trash}>
                      <Icon type="trash" fill="#319fff" />
                    </div>
                  </button>
                </div>
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
