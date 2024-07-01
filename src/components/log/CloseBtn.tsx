import styles from "../../styles/closebtn.module.scss";
import Icon from "../icons/Icon";

export default function CloseBtn({ setClose }: { setClose: Function }) {
  return (
    <button className={styles.close} onClick={() => setClose()}>
      <Icon type="close" fill="#cfcfcf" />
    </button>
  );
}
