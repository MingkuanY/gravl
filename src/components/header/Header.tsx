import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon";
import pfpMD from "../../assets/images/pfpMD.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../services/AuthContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext<AuthType>(AuthContext);
  const [notif, setNotif] = useState(2);

  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
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
        <div className={styles.logo}>
          <Icon type="car" fill="#319fff" />
        </div>
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {isLoggedIn ? (
          <>
            <div className={styles.friendsContainer}>
              <div className={styles.friends}>
                <Icon type="friends" fill="#319fff" />
              </div>
              <p>Friends</p>
            </div>
            <div className={styles.pfpContainer} ref={dropdownRef}>
              <img
                src={pfpMD.src}
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
            <div className={styles.account}>
              <Icon type="account" fill="#319fff" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
