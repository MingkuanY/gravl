import { useEffect, useState } from "react";
import styles from "../../styles/friendmodal.module.scss";
import Icon from "../icons/Icon";

export default function FriendModal({
  prompt,
  inputPlaceholder,
  submitCallback,
}: {
  prompt: string;
  inputPlaceholder: string;
  submitCallback: Function;
}) {
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitCallback(inputData);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputData]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.prompt}>{prompt}</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder={inputPlaceholder}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <div className={styles.returnContainer}>
            <p>Enter</p>
            <div className={styles.return_arrow}>
              <Icon type="return_arrow" fill="#319fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
