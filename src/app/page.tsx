// Welcome to Gravl

"use client";

import styles from "../styles/landing.module.scss";
import Counties from "../components/maps/Counties.tsx";
import Icon from "../components/icons/Icon";
import { signIn, useSession } from "next-auth/react";
import Dashboard from "./dashboard/page.tsx";

export default function Landing() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <div className={styles.mainContainer}>
          <div className={styles.map}>
            <Counties />
          </div>
          <p className={styles.motto}>Travel sets you free.</p>
          <button onClick={() => signIn("google")} className={styles.button}>
            <div className={styles.go}>
              <Icon type="go" fill="#fff" />
            </div>
            <p>Sign Up</p>
          </button>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
