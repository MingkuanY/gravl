import { useState, useContext } from "react";
import styles from "../styles/header.module.scss";
import logo from "../assets/icons/car.svg";
import account from "../assets/icons/account.svg";
import GoPin from "./GoPin";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../services/AuthContext";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
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

  const navigate = useNavigate();
  const loginClicked = () => {
    setIsLoggedIn(true);
    navigate("/track");
  };

  return (
    <div className={styles.headerContainer}>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
        onClick={() => setIsLoggedIn(false)}
      >
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="Gravl Logo" />
          <p className={styles.gravl}>Gravl</p>
        </div>
      </Link>
      <div className={styles.headerRightContainer}>
        {isLoggedIn ? (
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
          <div className={styles.login} onClick={loginClicked}>
            Login
          </div>
        )}
        <img
          src={account}
          alt="Account"
          className={styles.account}
          onClick={loginClicked}
        />
      </div>
    </div>
  );
}
