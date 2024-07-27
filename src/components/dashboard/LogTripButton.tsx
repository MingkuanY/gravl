"use client";

import styles from "../../styles/logtripbutton.module.scss";
import Icon from "../icons/Icon";

export default function LogTripButton({
  setLogTripPage,
  setEditTrip,
}: {
  setLogTripPage: Function;
  setEditTrip: Function;
}) {
  const handleClick = () => {
    setEditTrip(null);
    setLogTripPage(0);
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      <div className={styles.plus}>
        <Icon type="plus" fill="#FFF" />
      </div>
      <p>Log Trip</p>
    </button>
  );
}
