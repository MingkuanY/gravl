import { useScreenWidth } from "@/utils/hooks";
import styles from "../../styles/timeline.module.scss";
import Icon from "../icons/Icon";
import LogTripButton from "./LogTripButton";
import TripCard from "./TripCard";
import { findStartAndEndDates, formatDates } from "@/utils/date";
import { TripWithVisits } from "@/utils/types";
import classnames from "classnames";

export default function Timeline({
  trips,
  onLogTripClick,
  currTrip,
  setCurrTrip,
  setConfirmDelete,
  handleEditTrip,
}: {
  trips: TripWithVisits[];
  onLogTripClick: () => void;
  currTrip: number[];
  setCurrTrip: Function;
  setConfirmDelete: Function;
  handleEditTrip: Function;
}) {
  const isMobile = useScreenWidth();

  /**
   * Called when the user clicks on a trip.
   *
   * @param tripID the trip the user clicks on
   */
  const handleClick = (tripID: number, event: React.MouseEvent) => {
    if (isMobile && window.scrollY !== 0) {
      // if mobile and the user is not already at the top of the screen
      const handleScroll = () => {
        if (window.scrollY === 0) {
          processClick(tripID, event);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // if the user on desktop or is not currently at the top of screen
      processClick(tripID, event);
    }
  };

  /**
   * Determines whether the user made a single click, cmd + click, or shift + click and acts accordingly.
   *
   * @param tripID the trip the user clicks on
   * @param event the type of click
   */
  const processClick = (tripID: number, event: React.MouseEvent) => {
    const isCommandClick = event.metaKey || event.ctrlKey;
    const isShiftClick = event.shiftKey;
    if (isShiftClick && currTrip.length > 0) {
      // Select range
      const lastSelectedIndex = trips.findIndex(
        (trip) => trip.id === currTrip[currTrip.length - 1]
      );
      const clickedIndex = trips.findIndex((trip) => trip.id === tripID);

      if (lastSelectedIndex !== -1 && clickedIndex !== -1) {
        const start = Math.min(lastSelectedIndex, clickedIndex);
        const end = Math.max(lastSelectedIndex, clickedIndex);
        const newSelections = trips
          .slice(start, end + 1)
          .map((trip) => trip.id);
        setCurrTrip((prev: number[]) =>
          Array.from(new Set([...prev, ...newSelections]))
        );
      }
    } else if (isCommandClick) {
      // Toggle selection
      setCurrTrip((prev: number[]) =>
        prev.includes(tripID)
          ? prev.filter((id) => id !== tripID)
          : [...prev, tripID]
      );
    } else {
      // Single selection
      setCurrTrip((prev: number[]) =>
        prev.length === 1 && prev.includes(tripID) ? [] : [tripID]
      );
    }
  };

  return (
    <div className={classnames(styles.timeline, !trips.length && styles.empty)}>
      {isMobile ? (
        <div className={styles.mobileOnlyContainer}>
          <LogTripButton onLogTripClick={onLogTripClick} />
        </div>
      ) : (
        <LogTripButton onLogTripClick={onLogTripClick} />
      )}
      {trips.length == 0 && (
        <div className={styles.proTipContainer}>
          <p className={styles.proTip}>{isMobile ? "Log Your First Trip" : "Add Your First Trip"}</p>
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
                    selected={currTrip.includes(trip.id)}
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
