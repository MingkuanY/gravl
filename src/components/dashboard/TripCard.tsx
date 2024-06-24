import styles from "../../styles/tripcard.module.scss";

export default function TripCard({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  return (
    <button className={styles.container}>
      <div className={styles.right}>
        <p className={styles.title}>{name}</p>
        <p className={styles.locations}>{desc}</p>
      </div>
    </button>
  );
}
