"use client";

import { useRouter } from "next/navigation";
import styles from "../../styles/mapoutyourlifebutton.module.scss";
import { useScreenWidth } from "../../utils/hooks.ts";
import { signIn } from "next-auth/react";
import Icon from "../icons/Icon.tsx";

export default function MapOutYourLife() {
  const isMobile = useScreenWidth();
  const router = useRouter();
  return (
    <>
      {isMobile ? (
        <button onClick={() => router.push("/life")} className={styles.button}>
          <p>Map Out Your Life</p>
        </button>
      ) : (
        <button
          onClick={() => signIn("google", { callbackUrl: "/redirect" })}
          className={styles.signUpButton}
        >
          <div className={styles.go}>
            <Icon type="go" fill="#fff" />
          </div>
          <p>Sign Up</p>
        </button>
      )}
    </>
  );
}
