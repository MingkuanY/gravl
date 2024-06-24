"use client";

import styles from "../../styles/logtripbutton.module.scss";
import Icon from "../icons/Icon";
import { usePathname, useRouter } from "next/navigation";

export default function LogTripButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={() => router.push(`${pathname}?log=tripInfo`)}
      className={styles.button}
    >
      <div className={styles.plus}>
        <Icon type="plus" fill="#FFF" />
      </div>
      <p>Log Trip</p>
    </button>
  );
}
