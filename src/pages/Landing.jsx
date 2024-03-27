import styles from "../styles/landing.module.scss";
import Header from "../components/header/Header";
import CountiesMap from "../components/maps/CountiesMap";
import GoPin from "../components/header/GoPin";

import AuthContext from "../services/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const navigate = useNavigate();
  const loginClicked = () => {
    setIsLoggedIn(true);
    navigate("/track");
  };

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <CountiesMap />
        <div className={styles.btnsContainer}>
          <button className={styles.planBtn} onClick={loginClicked}>
            <GoPin width="4rem" blue={false} go={true} />
            <p>Plan</p>
          </button>
          <button className={styles.trackBtn} onClick={loginClicked}>
            <GoPin width="4rem" blue={false} go={false} />
            <p>Track</p>
          </button>
        </div>
      </div>
    </>
  );
}
