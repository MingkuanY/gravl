"use client";

import styles from "../../styles/logtripmethodmodal.module.scss";
import CloseBtn from "../log/CloseBtn";

export default function LogTripMethodModal({
  onManual,
  onUpload,
  onClose,
}: {
  onManual: () => void;
  onUpload: () => void;
  onClose: () => void;
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <CloseBtn setClose={onClose} />
        <h2 className={styles.title}>How would you like to log your trip?</h2>
        <div className={styles.buttonContainer}>
          <button onClick={onManual} className={styles.optionButton}>
            Log Manually
          </button>
          <button onClick={onUpload} className={styles.optionButton}>
            Upload Photos
          </button>
        </div>
      </div>
    </div>
  );
}
