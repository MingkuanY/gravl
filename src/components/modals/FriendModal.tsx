import { useEffect, useRef, useState } from "react";
import styles from "../../styles/friendmodal.module.scss";
import Icon from "../icons/Icon";
import CloseBtn from "../log/CloseBtn";

export default function FriendModal({
  prompt,
  inputPlaceholder,
  setClose,
  submitCallback,
}: {
  prompt: string;
  inputPlaceholder: string;
  setClose: Function;
  submitCallback: Function;
}) {
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
