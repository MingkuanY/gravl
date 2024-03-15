import styles from "../styles/landing.module.scss";
import Header from "../components/Header";
import CountiesMap from "../components/maps/CountiesMap";
import GoPin from "../components/GoPin";

export default function Landing() {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <CountiesMap />
        <div className={styles.btnsContainer}>
          <button className={styles.planBtn}>
            <GoPin width="4rem" blue={false} go={true} />
            <p>Plan</p>
          </button>
          <button className={styles.trackBtn}>
            <GoPin width="4rem" blue={false} go={false} />
            <p>Track</p>
          </button>
        </div>
      </div>
    </>
  );
}
