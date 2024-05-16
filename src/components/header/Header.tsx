"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon";
import pfpMD from "../../assets/images/pfpMD.jpg";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
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

  const isLoggedIn = true;

  return (
    <div className={styles.headerContainer}>
      <Link href={"/dashboard"} className={styles.logoContainer}>
        <div className={styles.logo}>
          <Icon type="car" fill="#319fff" />
        </div>
        <p className={styles.gravl}>Gravl</p>
      </Link>
      <div className={styles.headerRightContainer}>
        {isLoggedIn ? (
          <>
            <div className={styles.pfpContainer} ref={dropdownRef}>
              <Image
                src={pfpMD}
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
                  <li>Settings</li>
                  <Link href={"/"}>
                    <li>Log Out</li>
                  </Link>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link href={"/dashboard"} className={styles.loginContainer}>
            <div className={styles.login}>Login</div>
            <div className={styles.account}>
              <Icon type="account" fill="#319fff" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
