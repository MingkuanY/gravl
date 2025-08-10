"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon";
import { signIn, signOut } from "next-auth/react";
import classnames from "classnames";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "../../contexts/UserContext";
import { useScreenWidth } from "../../utils/hooks";

export default function Header() {
  const isMobile = useScreenWidth();
  const sessionUser = useUserContext();

  const showWrapped = new Date().getMonth() === 11; // Only show in December

  const router = useRouter();
  const pathname = usePathname();
  const toggleWrapped = sessionUser
    ? pathname.endsWith(`/${sessionUser.username}/wrapped`)
    : null;
  /**
   * Toggle between '/[username]' and '/[username]/wrapped' routes.
   */
  const handleWrapped = () => {
    if (!sessionUser) return;
    const base = `/${sessionUser.username}`;
    const nextPath = pathname.endsWith("/wrapped") ? base : `${base}/wrapped`;
    router.push(nextPath);
  };

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
    !sessionUser && router.push(`/`);
  };

  const goToProfile = () => {
    sessionUser && router.push(`/${sessionUser.username}`);
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
        {sessionUser ? (
          <>
            {showWrapped && (
              <div className={styles.seeWrappedBtn} onClick={handleWrapped}>
                {toggleWrapped ? "Back" : "See Wrapped"}
              </div>
            )}

            <div className={styles.pfpContainer} ref={pfpBtnRef}>
              <img
                src={sessionUser.image as string}
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
                  {!isMobile && <li onClick={goToProfile}>Profile</li>}
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
