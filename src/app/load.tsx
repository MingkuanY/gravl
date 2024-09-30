import styles from "../styles/loading.module.scss";
import Icon from "../components/icons/Icon";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.wheel}>
        <Icon type="wheel" fill="#24292f" />
      </div>
      <p>Generating maps...</p>
    </div>
  );
}
