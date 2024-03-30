import styles from "../../styles/timeline.module.scss";
import TripCard from "./TripCard";
import { monthAbbreviations } from "../../utils/date";

export default function Timeline({ trips }) {
  /**
   * Organize trips (already in reverse chronological order) by year and month to be rendered into the timeline.
   * @param {list of trip objects} trips each has title, locations, dates, and thumbnail attributes
   * @returns list of years each a list of month objects with a month and a list of trips all in reverse chronological order
   */
  const organizeTripsByYearAndMonth = (trips) => {
    const years = [];

    let previousYear = null;
    let previousMonth = null;

    trips.forEach((trip) => {
      const startDate = new Date(trip.dates[0]);
      const year = startDate.getFullYear();
      const month = monthAbbreviations[startDate.getMonth()];

      if (previousYear !== year) {
        years.push({ year, months: [] });
      }
      if (previousYear !== year || previousMonth !== month) {
        years[years.length - 1].months.push({ month, trips: [] });
      }
      previousYear = year;
      previousMonth = month;

      years[years.length - 1].months[
        years[years.length - 1].months.length - 1
      ].trips.push(trip);
    });

    return years;
  };

  return (
    <div className={styles.timelineContainer}>
      <p className={styles.myTimeline}>My Timeline</p>
      <div className={styles.timeline}>
        {organizeTripsByYearAndMonth(trips).map((year, yearIndex) => (
          <div className={styles.yearContainer} key={yearIndex}>
            <div className={styles.year}>{year.year}</div>
            <div className={styles.allMonthsContainer}>
              {year.months.map((month, monthIndex) => (
                <div className={styles.monthContainer} key={monthIndex}>
                  <div className={styles.month}>{month.month}</div>
                  <div className={styles.allTripsContainer}>
                    {month.trips.map((trip, tripIndex) => (
                      <div className={styles.trips} key={tripIndex}>
                        <TripCard {...trip} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
