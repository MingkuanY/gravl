import styles from "../../styles/closebtn.module.scss";
import Icon from "../icons/Icon";

export default function CloseBtn({
  setLogTripPage,
}: {
  setLogTripPage: Function;
}) {
  return (
    <button className={styles.close} onClick={() => setLogTripPage(-1)}>
      <Icon type="close" fill="#cfcfcf" />
    </button>
  );
}
