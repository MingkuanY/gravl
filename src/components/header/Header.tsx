"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import classnames from "classnames";

export default function Header({ user }: { user?: User }) {
  const session = useSession();

  // dropdown menu logic
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
        <p className={styles.testing}>Alpha</p>
      </div>
      <div className={styles.headerRightContainer}>
        {session.status === "authenticated" && (
          <>
            <div className={styles.pfpContainer} ref={dropdownRef}>
              <img
                src={user?.image as string}
                alt="PFP"
                className={styles.pfp}
                onClick={() => setUserDropdown(!userDropdown)}
              />

              <div
                className={classnames(
                  styles.dropdown,
                  userDropdown ? styles.active : styles.inactive
                )}
              >
                <ul>
                  <li onClick={() => signOut({ callbackUrl: "/" })}>Log Out</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {session.status === "unauthenticated" && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/redirect" })}
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
