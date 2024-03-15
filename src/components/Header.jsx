import styles from "../styles/header.module.scss";
import logo from "../assets/car.svg";
import account from "../assets/account.svg";
import pin from "../assets/pin.svg";
import go from "../assets/go.svg";

export default function Header() {
  let loggedIn = true;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Gravl Logo" />
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {loggedIn ? (
          <>
            <input
              type="checkbox"
              id="toggle"
              className={styles.toggleCheckbox}
            />
            <label htmlFor="toggle" className={styles.toggleContainer}>
              <div>
                <img src={go} alt="Go" />
                <p>Plan</p>
              </div>
              <div>
                <img src={pin} alt="Pin" />
                <p>Track</p>
              </div>
            </label>
          </>
        ) : (
          <div className={styles.login}>Login</div>
        )}
        <img src={account} alt="Account" className={styles.account} />
      </div>
    </div>
  );
}
