import styles from "../../styles/tripcard.module.scss";

export default function TripCard({
  name,
  desc,
  selected,
  isClicked,
}: {
  name: string;
  desc: string;
  selected: boolean;
  isClicked: Function;
}) {
  return (
    <button
      className={`${styles.container} ${selected && styles.selected}`}
      onClick={() => isClicked()}
    >
      <div className={styles.right}>
        <p className={styles.title}>{name}</p>
        <p className={styles.locations}>{desc}</p>
      </div>
    </button>
  );
}
