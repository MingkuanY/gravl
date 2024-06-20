"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "../../styles/signupbutton.module.scss";
import Icon from "../icons/Icon.tsx";
import { useRouter } from "next/navigation";

export default function SignUpButton({ getUser }: { getUser: Function }) {
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("running this");
    signIn("google");
    const { data: session } = useSession();
    const user = await getUser(session?.user.email);
    console.log("User: ", user);
    if (user.username) {
      router.push("/?ob=true");
    } else {
      router.push(`/${user.username}`);
    }
  };

  return (
    <button onClick={handleSignUp} className={styles.button}>
      <div className={styles.go}>
        <Icon type="go" fill="#fff" />
      </div>
      <p>Sign Up</p>
    </button>
  );
}
