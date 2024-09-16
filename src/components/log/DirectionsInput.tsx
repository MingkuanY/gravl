import styles from "../../styles/directionsinput.module.scss";
import Icon from "../icons/Icon";
import classnames from "classnames";

export default function DirectionsInput() {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={classnames(styles.icon, styles.car)}>
          <Icon type="car" fill="#319fff" />
        </div>
        <input type="text" placeholder="from" />
      </div>
      <div className={styles.dotContainer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.inputContainer}>
        <div className={classnames(styles.icon, styles.pin)}>
          <Icon type="pin" fill="#319fff" />
        </div>
        <input type="text" placeholder="to" />
      </div>
    </div>
  );
}
