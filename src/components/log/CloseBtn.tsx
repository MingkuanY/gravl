import styles from "../../styles/closebtn.module.scss";
import Icon from "../icons/Icon";

export default function CloseBtn({ setLogTrip }: { setLogTrip: Function }) {
  return (
    <button className={styles.close} onClick={() => setLogTrip(-1)}>
      <Icon type="close" fill="#cfcfcf" />
    </button>
  );
}
