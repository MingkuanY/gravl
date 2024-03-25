import { useState } from "react";
import styles from "../styles/header.module.scss";
import logo from "../assets/icons/car.svg";
import account from "../assets/icons/account.svg";
import GoPin from "./GoPin";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  let loggedIn = false;
  const [trackSelected, setTrackSelected] = useState(true);

  const planClicked = () => {
    if (trackSelected) {
      setTrackSelected(false);
    }
  };

  const trackClicked = () => {
    if (!trackSelected) {
      setTrackSelected(true);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="Gravl Logo" />
          <p className={styles.gravl}>Gravl</p>
        </div>
      </Link>
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
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const credentialResponseDecoded = jwtDecode(
              credentialResponse.credential
            );
            console.log(credentialResponseDecoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}
