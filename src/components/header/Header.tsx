"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const [notif, setNotif] = useState(0);

  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Icon type="car" fill="#319fff" />
        </div>
        <p className={styles.gravl}>Gravl</p>
      </div>
      <div className={styles.headerRightContainer}>
        {session ? (
          <>
            <div className={styles.pfpContainer} ref={dropdownRef}>
              <img
                src={session.user?.image as string}
                alt="PFP"
                className={styles.pfp}
                onClick={() => setUserDropdown(!userDropdown)}
              />
              {notif > 0 && (
                <div className={styles.notifContainer}>
                  <p>{notif}</p>
                </div>
              )}

              <div
                className={`${styles.dropdown} ${
                  userDropdown ? styles.active : styles.inactive
                }`}
              >
                <ul>
                  <li onClick={() => signOut()}>Log Out</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className={styles.loginContainer}
          >
            <div className={styles.login}>Login</div>
            <div className={styles.account}>
              <Icon type="account" fill="#319fff" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
