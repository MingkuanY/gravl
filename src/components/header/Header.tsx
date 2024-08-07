"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { useScreenWidth } from "@/utils/hooks.ts";
import FriendsBar from "./FriendsBar.tsx";
import { UserWithData } from "@/utils/types.ts";
import { getUserById, readNotifications } from "@/actions/actions.ts";
import { User } from "@prisma/client";
import Notification from "./Notification.tsx";

export default function Header({ user }: { user?: UserWithData }) {
  const [notifications, setNotifications] = useState(
    user ? user.notifications : []
  );
  const [userDetails, setUserDetails] = useState<{
    [key: string]: User;
  }>({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const detailsMap: { [key: string]: User } = {};
      for (const notification of notifications) {
        if (
          notification.userIdInConcern &&
          !detailsMap[notification.userIdInConcern]
        ) {
          const user = await getUserById(notification.userIdInConcern);
          detailsMap[notification.userIdInConcern] = user!;
        }
      }
      setUserDetails(detailsMap);
    };

    fetchUserDetails();
  }, [notifications]);

  const isMobile = useScreenWidth();

  const session = useSession();

  const router = useRouter();

  // dropdown menu logic
  const [userDropdown, setUserDropdown] = useState(false);
  const pfpBtnRef = useRef<HTMLDivElement>(null);

  const [notifDropdown, setNotifDropdown] = useState(false);
  const notifBtnRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!pfpBtnRef.current?.contains(e.target as Node)) {
        setUserDropdown(false);
      }
      if (notifBtnRef.current?.contains(e.target as Node)) {
        if (!notifDropdownRef.current?.contains(e.target as Node)) {
          // Clicking on the notif button
          if (!notifDropdown) {
            // Mark all notifications as read
            setNotifications((prevNotifications) =>
              prevNotifications.map((notification) => ({
                ...notification,
                read: true,
              }))
            );
            readNotifications(user!.id);
          }
          setNotifDropdown(!notifDropdown);
        }
      } else {
        // Clicking outside of both notif button and dropdown
        setNotifDropdown(false);
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
            {!isMobile && <FriendsBar user={user!} />}
            <div className={styles.notifContainer} ref={notifBtnRef}>
              <div className={styles.notif}>
                <Icon type="notification" fill="#319fff" />
              </div>

              {notifications.filter((notification) => !notification.read)
                .length > 0 && (
                <div className={styles.notifCount}>
                  {
                    notifications.filter((notification) => !notification.read)
                      .length
                  }
                </div>
              )}

              <div
                className={classnames(
                  styles.dropdown,
                  notifDropdown ? styles.active : styles.inactive
                )}
                ref={notifDropdownRef}
              >
                <ul>
                  {notifications.map((notification, index) => {
                    return (
                      <Notification
                        notifications={notifications}
                        notification={notification}
                        index={index}
                        userDetails={userDetails}
                      />
                    );
                  })}
                  {notifications.length === 0 && (
                    <li>
                      <p className={styles.noNotifs}>No new notifications</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.pfpContainer} ref={pfpBtnRef}>
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
                  <li onClick={() => router.push(`/${user!.username}`)}>
                    Profile
                  </li>
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
