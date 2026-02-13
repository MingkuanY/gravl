"use client";

import styles from "../../styles/logtripbutton.module.scss";
import Icon from "../icons/Icon";

export default function LogTripButton({
  onLogTripClick,
}: {
  onLogTripClick: () => void;
}) {
  return (
    <button onClick={onLogTripClick} className={styles.button}>
      <div className={styles.plus}>
        <Icon type="plus" fill="#FFF" />
      </div>
      <p>Log Trip</p>
    </button>
  );
}
