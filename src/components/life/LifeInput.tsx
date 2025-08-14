"use client";

import classNames from "classnames";
import styles from "../../styles/lifeinput.module.scss";
import { useScreenWidth } from "../../utils/hooks";
import { useRouter } from "next/navigation";

export default function LifeInput({
  handleButtonClick,
  handleFileChange,
  tripName,
  setTripName,
  fileInputRef,
}: {
  handleButtonClick: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tripName: string;
  setTripName: React.Dispatch<React.SetStateAction<string>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) {
  const isMobile = useScreenWidth();
  const router = useRouter();

  return (
    <div className={classNames(styles.container, !isMobile && styles.desktop)}>
      <div className={styles.centerContent}>
        <input
          type="text"
          className={styles.tripNameInput}
          placeholder="Name your trip..."
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
        <button
          className={`${styles.button} ${
            tripName.trim() === "" ? styles.disabledButton : ""
          }`}
          onClick={handleButtonClick}
          disabled={tripName.trim() === ""}
        >
          Map Your Trip
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <button className={styles.backButton} onClick={() => router.push(`/`)}>
        ←
      </button>
    </div>
  );
}
