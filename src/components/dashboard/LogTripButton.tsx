"use client";

import styles from "../../styles/logtripbutton.module.scss";
import Icon from "../icons/Icon";

export default function LogTripButton({
  setLogTrip,
}: {
  setLogTrip: Function;
}) {
  return (
    <button onClick={() => setLogTrip(0)} className={styles.button}>
      <div className={styles.plus}>
        <Icon type="plus" fill="#FFF" />
      </div>
      <p>Log Trip</p>
    </button>
  );
}
