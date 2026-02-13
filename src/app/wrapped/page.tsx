"use client";

import styles from "../../styles/wrapped.module.scss";
import Header from "@/components/header/Header";
import { signIn } from "next-auth/react";
import Icon from "@/components/icons/Icon";

export default function WrappedPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>{currentYear} Travel Wrapped</h1>
        <h2>See where you&apos;ve been this year.</h2>
        <button
          onClick={() => signIn("google", { callbackUrl: "/redirect" })}
          className={styles.signUpButton}
        >
          <div className={styles.go}>
            <Icon type="go" fill="#fff" />
          </div>
          <p>Sign Up</p>
        </button>
      </div>
    </>
  );
}
