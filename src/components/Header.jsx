import styles from "../styles/header.module.scss";
import logo from "../assets/car.svg";
import account from "../assets/account.svg";
import GoPin from "./GoPin";

export default function Header() {
  let loggedIn = true;
  let trackSelected = true;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Gravl Logo" />
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {loggedIn ? (
          <div className={styles.toggleContainer}>
            <div className={styles.planBtn}>
              <GoPin width="2.6rem" go={true} blue={trackSelected} />
              <p
                className={trackSelected ? styles.unselected : styles.selected}
              >
                Plan
              </p>
            </div>
            <div className={styles.trackBtn}>
              <GoPin width="2.6rem" go={false} blue={!trackSelected} />
              <p
                className={trackSelected ? styles.selected : styles.unselected}
              >
                Track
              </p>
            </div>
            <div className={styles.animation}></div>
          </div>
        ) : (
          <div className={styles.login}>Login</div>
        )}
        <img src={account} alt="Account" className={styles.account} />
      </div>
    </div>
  );
}
