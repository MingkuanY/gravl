"use client";

import { signIn } from "next-auth/react";
import styles from "../../styles/signupbutton.module.scss";
import Icon from "../icons/Icon.tsx";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();
  const handleSignIn = async () => {
    const result = await signIn("google", { redirect: false });

    console.log(result);

    if (result?.url) {
      const url = new URL(result.url, window.location.origin);
      const isNewUser = url.searchParams.get("newUser") === "true";

      console.log("url: ", url);
      console.log("isNewUser: ", isNewUser);

      if (isNewUser) {
        router.push("/create-account");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <button onClick={handleSignIn} className={styles.button}>
      <div className={styles.go}>
        <Icon type="go" fill="#fff" />
      </div>
      <p>Sign Up</p>
    </button>
  );
}
