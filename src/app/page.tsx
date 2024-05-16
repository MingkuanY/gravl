// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import CountiesMap from "../components/maps/CountiesMap.tsx";
import Icon from "../components/icons/Icon";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <CountiesMap />
        </div>
        <p className={styles.motto}>Travel sets you free.</p>
        <Link href={"/dashboard"} className={styles.button}>
          <div className={styles.go}>
            <Icon type="go" fill="#fff" />
          </div>
          <p>Sign Up</p>
        </Link>
      </div>
    </>
  );
}
