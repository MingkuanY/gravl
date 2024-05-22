"use client";

import { signIn } from "next-auth/react";
import styles from "../../styles/signupbutton.module.scss";
import Icon from "../icons/Icon.tsx";

export default function SignUpButton({
  username,
}: {
  username: string | null;
}) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: `/${username}` })}
      className={styles.button}
    >
      <div className={styles.go}>
        <Icon type="go" fill="#fff" />
      </div>
      <p>Sign Up</p>
    </button>
  );
}
