import styles from "../../styles/tripcard.module.scss";

export default function TripCard({ title, locations, thumbnail }) {
  return (
    <button className={styles.container}>
      <img src={thumbnail} alt="Trip Thumbnail" />
      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        <p className={styles.locations}>{locations.join(", ")}</p>
      </div>
    </button>
  );
}
