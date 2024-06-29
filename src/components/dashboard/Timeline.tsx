import styles from "../../styles/timeline.module.scss";
import Icon from "../icons/Icon";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { formatDates, getTripDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";

export default function Timeline({
  trips,
  isOpen,
  setIsOpen,
  setLogTrip,
  currTrip,
  setCurrTrip,
}: {
  trips: TripWithVisits[];
  isOpen: boolean;
  setIsOpen: Function;
  setLogTrip: Function;
  currTrip: number;
  setCurrTrip: Function;
}) {
  const handleClick = (tripID: number) => {
    setCurrTrip(currTrip !== tripID ? tripID : -1);
  };

  return (
    <div className={`${styles.timeline} ${isOpen ? styles.open : ""}`}>
      <button
        className={`${styles.openBtn} ${isOpen && styles.flip}`}
        onClick={() => {
          setIsOpen((isOpen: boolean) => !isOpen);
          setCurrTrip(-1);
        }}
      >
        <p className={styles.trips}>Trips</p>
        <div className={styles.back_arrow}>
          <Icon type="back_arrow" fill="#fff" />
        </div>
      </button>
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
              <div>
                <div className="tripCard">
                  <TripCard
                    name={trip.name}
                    desc={trip.description}
                    selected={currTrip === trip.id}
                    isClicked={() => handleClick(trip.id)}
                  />
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
