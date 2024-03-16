import { useState } from "react";
import styles from "../styles/header.module.scss";
import logo from "../assets/car.svg";
import account from "../assets/account.svg";
import GoPin from "./GoPin";

export default function Header() {
  let loggedIn = true;
  const [trackSelected, setTrackSelected] = useState(true);

  const planClicked = () => {
    setTrackSelected(false);
  };

  const trackClicked = () => {
    setTrackSelected(true);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Gravl Logo" />
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {loggedIn ? (
          <div className={styles.toggleContainer}>
            <button className={styles.planBtn} onClick={planClicked}>
              <GoPin width="2.6rem" go={true} blue={trackSelected} />
              <p
                className={trackSelected ? styles.unselected : styles.selected}
              >
                Plan
              </p>
            </button>
            <button className={styles.trackBtn} onClick={trackClicked}>
              <GoPin width="2.6rem" go={false} blue={!trackSelected} />
              <p
                className={trackSelected ? styles.selected : styles.unselected}
              >
                Track
              </p>
            </button>
            <div
              className={styles.animation}
              style={{
                left: trackSelected ? "9rem" : "0",
                width: trackSelected ? "11rem" : "10rem",
              }}
            ></div>
          </div>
        ) : (
          <div className={styles.login}>Login</div>
        )}
        <img src={account} alt="Account" className={styles.account} />
      </div>
    </div>
  );
}
