import styles from "../../styles/tripcard.module.scss";
import Icon from "../icons/Icon";

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
        <div className={styles.check}>
          <Icon type={"check"} fill={"#319fff"} />
        </div>
      )}
      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        <p className={styles.locations}>{locations.join(", ")}</p>
      </div>
    </button>
  );
}
