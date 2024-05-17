"use client";

import { signIn } from "next-auth/react";
import styles from "../../styles/signupbutton.module.scss";
import Icon from "../icons/Icon";

export default function SignUpButton() {
  return (
    <button onClick={() => signIn("google")} className={styles.button}>
      <div className={styles.go}>
        <Icon type="go" fill="#fff" />
      </div>
      <p>Sign Up</p>
    </button>
  );
}
