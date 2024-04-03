import { useContext, useEffect, useRef, useState } from "react";
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

  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const navigate = useNavigate();
  const loginClicked = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };
  const logoutClicked = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.logoContainer}
        onClick={() => isLoggedIn && navigate("/dashboard")}
      >
        <img className={styles.logo} src={logo} alt="Gravl Logo" />
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {isLoggedIn ? (
          <>
            <div className={styles.friendsContainer}>
              <img src={friends} alt="Friends" />
              <p>Friends</p>
            </div>
            <div className={styles.pfpContainer} ref={dropdownRef}>
              <img
                src={pfpMD}
                alt="PFP"
                className={styles.pfp}
                onClick={() => setUserDropdown(!userDropdown)}
              />
              <div className={styles.notifContainer}>
                <p>{notif}</p>
              </div>

              <div
                className={`${styles.dropdown} ${
                  userDropdown ? styles.active : styles.inactive
                }`}
              >
                <ul>
                  <li>Settings</li>
                  <li onClick={() => logoutClicked()}>Log Out</li>
                </ul>
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
