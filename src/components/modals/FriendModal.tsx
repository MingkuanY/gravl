import { useEffect, useRef, useState } from "react";
import styles from "../../styles/friendmodal.module.scss";
import Icon from "../icons/Icon";
import CloseBtn from "../log/CloseBtn";

export default function FriendModal({
  prompt,
  inputPlaceholder,
  setClose,
  submitCallback,
  status,
  setStatus,
}: {
  prompt: string;
  inputPlaceholder: string;
  setClose: Function;
  submitCallback: Function;
  status: string;
  setStatus: Function;
}) {
  useEffect(() => {
    setStatus("DEFAULT");
  }, []);

  const [inputData, setInputData] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitCallback(inputData);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputData]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container} ref={containerRef}>
        <CloseBtn setClose={() => setClose()} />

        {status === "DEFAULT" && (
          <>
            <p className={styles.prompt}>{prompt}</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder={inputPlaceholder}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                autoFocus
              />
              <div className={styles.returnContainer}>
                <p>Enter</p>
                <div className={styles.return_arrow}>
                  <Icon type="return_arrow" fill="#319fff" />
                </div>
              </div>
            </div>
          </>
        )}
        {status === "PENDING" && (
          <>
            <div className={styles.wheel}>
              <Icon type="wheel" fill="#24292f" />
            </div>
            <p className={styles.pending}>Loading...</p>
          </>
        )}
        {status === "SUCCESS" && (
          <>
            <div className={styles.check}>
              <Icon type="check" fill="#319fff" />
            </div>
            <p className={styles.success}>Friend request sent</p>
            <button className={styles.btn} onClick={() => setStatus("DEFAULT")}>
              Add Another Friend
            </button>
          </>
        )}
        {status === "FAILURE" && (
          <>
            <div className={styles.sad}>
              <Icon type="sad" fill="#319fff" />
            </div>
            <p className={styles.failure}>User not found</p>
            <button className={styles.btn} onClick={() => setStatus("DEFAULT")}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
