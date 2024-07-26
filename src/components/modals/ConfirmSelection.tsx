import styles from "../../styles/confirmselection.module.scss";

export default function ConfirmSelection({
  warningText,
  yesFunction,
  noFunction,
}: {
  warningText: string;
  yesFunction: Function;
  noFunction: Function;
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.warning}>{warningText}</p>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={() => yesFunction()}>
            Yes
          </button>
          <button className={styles.no} onClick={() => noFunction()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
