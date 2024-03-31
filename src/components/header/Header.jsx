import { useContext, useState } from "react";
import styles from "../../styles/header.module.scss";
import logo from "../../assets/icons/car.svg";
import account from "../../assets/icons/account.svg";
import friends from "../../assets/icons/friends.svg";
import pfpMD from "../../assets/images/pfpMD.jpg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../services/AuthContext";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [notif, setNotif] = useState(2);

  const navigate = useNavigate();
  const loginClicked = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  const pfpClicked = () => {
    /* show account menu dropdown */
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
          <>
            <div className={styles.friendsContainer}>
              <img src={friends} alt="Friends" />
              <p>Friends</p>
            </div>
            <div className={styles.pfpContainer} onClick={pfpClicked}>
              <img src={pfpMD} alt="PFP" className={styles.pfp} />
              <div className={styles.notifContainer}>
                <p>{notif}</p>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loginContainer} onClick={loginClicked}>
            <div className={styles.login}>Login</div>
            <img src={account} alt="Account" className={styles.account} />
          </div>
        )}
      </div>
    </div>
  );
}
