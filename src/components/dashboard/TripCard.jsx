import styles from "../../styles/tripcard.module.scss";
import check from "../../assets/icons/check.svg";

export default function TripCard({ title, locations, thumbnail, completed }) {
  return (
    <button className={`${styles.container} ${!completed && styles.plan}`}>
      {completed ? (
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt="Trip Thumbnail"
        />
      ) : (
        <img className={styles.check} src={check} alt="Check" />
      )}
      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        <p className={styles.locations}>{locations.join(", ")}</p>
      </div>
    </button>
  );
}
