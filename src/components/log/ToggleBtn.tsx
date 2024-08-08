import styles from "../../styles/togglebtn.module.scss";
import classnames from "classnames";

export default function ToggleBtn({ onToggle }: { onToggle: Function }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={handleChange} />
      <span className={classnames(styles.slider, styles.round)}></span>
    </label>
  );
}
