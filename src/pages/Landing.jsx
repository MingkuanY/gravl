import styles from "../styles/landing.module.scss";
import Header from "../components/header/Header";
import CountiesMap from "../components/maps/CountiesMap";
import Icon from "../components/icons/Icon";

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
        <div className={styles.map}>
          <CountiesMap />
        </div>
        <p className={styles.motto}>Travel sets you free.</p>
        <button onClick={loginClicked}>
          <div className={styles.go}>
            <Icon type="go" fill="#fff" />
          </div>
          <p>Sign Up</p>
        </button>
      </div>
    </>
  );
}
