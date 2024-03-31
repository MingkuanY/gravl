import styles from "../styles/landing.module.scss";
import Header from "../components/header/Header";
import CountiesMap from "../components/maps/CountiesMap";
import go from "../assets/icons/go.svg";

import AuthContext from "../services/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const navigate = useNavigate();
  const loginClicked = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <CountiesMap />
        <p className={styles.motto}>Travel sets you free.</p>
        <button onClick={loginClicked}>
          <img src={go} alt="Go" />
          <p>Sign Up</p>
        </button>
      </div>
    </>
  );
}
