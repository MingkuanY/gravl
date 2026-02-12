"use client";

import classNames from "classnames";
import styles from "../../styles/lifeinput.module.scss";
import { useScreenWidth } from "../../utils/hooks";
import { useRouter } from "next/navigation";

export default function LifeInput({
  handleButtonClick,
  handleFileChange,
  fileInputRef,
}: {
  handleButtonClick: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) {
  const isMobile = useScreenWidth();
  const router = useRouter();

  return (
    <div className={classNames(styles.container, !isMobile && styles.desktop)}>
      <div className={styles.centerContent}>
        <p className={styles.description}>
          Automatically generate trips from your geotagged photos
        </p>
        <button className={styles.button} onClick={handleButtonClick}>
          Upload Photos
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
