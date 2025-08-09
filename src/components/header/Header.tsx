"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { UserWithTrips } from "../../utils/types.ts";

export default function Header({
  user,
  toggleWrapped = false,
}: {
  user?: UserWithTrips;
  toggleWrapped?: boolean;
}) {
  const showWrapped = new Date().getMonth() === 11; // Only show in December

  /**
   * When user clicks "See Wrapped" or "Back".
   */
  const handleWrapped = () => {
    if (toggleWrapped) {
      router.push(`/${user!.username}`);
    } else {
      router.push(`/${user!.username}/wrapped`);
    }
  };

  const session = useSession();

  const router = useRouter();

  // dropdown menu logic
  const [userDropdown, setUserDropdown] = useState(false);
  const pfpBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!pfpBtnRef.current?.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const goToLandingIfLoggedOut = () => {
    !user && router.push(`/`);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo} onClick={goToLandingIfLoggedOut}>
          <Icon type="car" fill="#319fff" />
        </div>
        <p className={styles.gravl} onClick={goToLandingIfLoggedOut}>
          Gravl
        </p>
        <p className={styles.testing}>Alpha</p>
      </div>
      <div className={styles.headerRightContainer}>
        {session.status === "authenticated" && user ? (
          <>
            {showWrapped && (
              <div className={styles.seeWrappedBtn} onClick={handleWrapped}>
                {toggleWrapped ? "Back" : "See Wrapped"}
              </div>
            )}

            <div className={styles.pfpContainer} ref={pfpBtnRef}>
              <img
                src={user.image as string}
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
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdD5nUmuHoiwyL8rBwFFAf3I3PgmnXaXbOySBW_6sKH6mUwMA/viewform?usp=sf_link"
                    target="_blank"
                  >
                    <li>Feedback</li>
                  </a>
                  <li onClick={() => signOut({ callbackUrl: "/" })}>Log Out</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn("google", { callbackUrl: "/redirect" })}
              className={styles.signUpContainer}
            >
              <div className={styles.account}>
                <Icon type="go" fill="#319fff" />
              </div>
              <div className={styles.signUp}>Sign Up</div>
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/redirect" })}
              className={styles.loginContainer}
            >
              <div className={styles.login}>Login</div>
              <div className={styles.account}>
                <Icon type="account" fill="#319fff" />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
