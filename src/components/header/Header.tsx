"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { formatNotificationTime } from "@/utils/date.ts";
import { useScreenWidth } from "@/utils/hooks.ts";
import FriendsBar from "../dashboard/FriendsBar.tsx";
import { UserWithData } from "@/utils/types.ts";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getUsernameById,
} from "@/actions/actions.ts";

export default function Header({ user }: { user?: UserWithData }) {
  const [notifications, setNotifications] = useState(
    user ? user.notifications : []
  );
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamesMap: { [key: string]: string } = {};
      for (const notification of notifications) {
        if (
          notification.userIdInConcern &&
          !usernamesMap[notification.userIdInConcern]
        ) {
          const username = await getUsernameById(notification.userIdInConcern);
          usernamesMap[notification.userIdInConcern] = username!;
        }
      }
      setUsernames(usernamesMap);
    };

    fetchUsernames();
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

  const handleRequest = async (requestId: number | null, response: boolean) => {
    if (!requestId) {
      return;
    }
    if (response) {
      // Accept friend request
      await acceptFriendRequest(requestId);
    } else {
      // Decline friend request
      await declineFriendRequest(requestId);
    }
  };

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

              {notifications.length > 0 && (
                <div className={styles.notifCount}>{notifications.length}</div>
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
                    const username = notification.userIdInConcern
                      ? usernames[notification.userIdInConcern]
                      : "";
                    const showDate =
                      index === 0 ||
                      notifications[index - 1].createdAt.getDate() !==
                        notification.createdAt.getDate();

                    let message = "";
                    switch (notification.type) {
                      case "FRIEND_REQUEST":
                        message = "sent a friend request";
                        break;
                      case "FRIEND_REQUEST_ACCEPTED":
                        message = "accepted your friend request";
                        break;
                      case "FRIEND_FINISHED_TRIP":
                        message = "finished a trip";
                        break;
                    }
                    return (
                      <li key={index}>
                        {showDate && (
                          <p className={styles.date}>
                            {formatNotificationTime(notification.createdAt)}
                          </p>
                        )}
                        <p className={styles.text}>
                          <span>{username}</span> {message}
                        </p>
                        {notification.type === "FRIEND_REQUEST" && (
                          <div className={styles.btns}>
                            <button
                              className={styles.accept}
                              onClick={() =>
                                handleRequest(notification.requestId, true)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className={styles.decline}
                              onClick={() =>
                                handleRequest(notification.requestId, false)
                              }
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </li>
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
