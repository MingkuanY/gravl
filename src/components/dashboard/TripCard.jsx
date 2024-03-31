import styles from "../../styles/tripcard.module.scss";
import { formatDates } from "../../utils/date";

export default function TripCard({ title, locations, dates, thumbnail }) {
  return (
    <button className={styles.container}>
      <img src={thumbnail} alt="Trip Thumbnail" />
      <div className={styles.right}>
        <div className={styles.titleAndDates}>
          <p className={styles.title}>{title}</p>
          <p className={styles.dates}>{formatDates(dates[0], dates[1])}</p>
        </div>
        <div className={styles.locations}>{locations.join(", ")}</div>
      </div>
    </button>
  );
}
