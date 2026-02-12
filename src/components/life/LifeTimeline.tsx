import { useScreenWidth } from "@/utils/hooks";
import styles from "../../styles/timeline.module.scss";
import loginButtonStyles from "../../styles/logtripbutton.module.scss";
import TripCard from "../dashboard/TripCard";
import { findStartAndEndDates, formatDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";
import classnames from "classnames";
import Icon from "../icons/Icon";

export default function LifeTimeline({
  trips,
  selectedTripId,
  onSelectTrip,
  onLoginToSave,
  setLogTripPage,
  setEditTrip,
  setConfirmDelete,
  handleEditTrip,
}: {
  trips: TripWithVisits[];
  selectedTripId: number | null;
  onSelectTrip: (tripId: number | null) => void;
  onLoginToSave: () => void;
  setLogTripPage: Function;
  setEditTrip: Function;
  setConfirmDelete: Function;
  handleEditTrip: Function;
}) {
  const isMobile = useScreenWidth();

  const handleClick = (tripID: number, event: React.MouseEvent) => {
    if (isMobile && window.scrollY !== 0) {
      const handleScroll = () => {
        if (window.scrollY === 0) {
          processClick(tripID);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      processClick(tripID);
    }
  };

  const processClick = (tripID: number) => {
    if (selectedTripId === tripID) {
      onSelectTrip(null);
    } else {
      onSelectTrip(tripID);
    }
  };

  return (
    <div className={classnames(styles.timeline, !trips.length && styles.empty)}>
      {isMobile && (
        <div className={styles.mobileOnlyContainer}>
          <button onClick={onLoginToSave} className={styles.saveTripsButtonMobile}>
            <p>Save Trips</p>
          </button>
        </div>
      )}

      {!isMobile && (
        <button onClick={onLoginToSave} className={loginButtonStyles.button} style={{ justifyContent: 'center' }}>
          <p>Log In to Save Trips</p>
        </button>
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
                    selected={selectedTripId === trip.id}
                    isClicked={(event: React.MouseEvent) =>
                      handleClick(trip.id, event)
                    }
                    editTrip={() => handleEditTrip(trip.id)}
                  />
                  {!isMobile && (
                    <button
                      className={styles.trashContainer}
                      onClick={() => setConfirmDelete(trip.id)}
                    >
                      <div className={styles.trash}>
                        <Icon type="trash" fill="#319fff" />
                      </div>
                    </button>
                  )}
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
