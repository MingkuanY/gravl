"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { formatNotificationTime } from "@/utils/date.ts";

export default function Header({ user }: { user?: User }) {
  // HARDCODED NOTIFICATIONS
  const [friendRequests, setFriendRequests] = useState([
    {
      userID: "alex",
      username: "alexkranias",
      time: new Date("2024/08/02"),
    },
    {
      userID: "sam",
      username: "sparkerly",
      time: new Date("2024/08/03"),
    },
    {
      userID: "ayush",
      username: "ayush",
      time: new Date("2024/08/04"),
    },
    {
      userID: "colin",
      username: "obamna",
      time: new Date("2024/08/04"),
    },
    {
      userID: "ally",
      username: "nosilla",
      time: new Date("2024/08/05"),
    },
    {
      userID: "tanush",
      username: "tanush",
      time: new Date("2024/08/05"),
    },
    {
      userID: "krish",
      username: "krish",
      time: new Date("2024/08/05"),
    },
  ]);

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

  const handleRequest = (friendUserID: string, response: boolean) => {
    if (response) {
      // Accept friend request
      console.log(`Accept ${friendUserID} as friend.`);
    } else {
      // Decline friend request
      console.log(`Decline ${friendUserID} as friend.`);
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
            <div className={styles.notifContainer} ref={notifBtnRef}>
              <div className={styles.notif}>
                <Icon type="notification" fill="#319fff" />
              </div>

              {friendRequests.length > 0 && (
                <div className={styles.notifCount}>{friendRequests.length}</div>
              )}

              <div
                className={classnames(
                  styles.dropdown,
                  notifDropdown ? styles.active : styles.inactive
                )}
                ref={notifDropdownRef}
              >
                <ul>
                  {friendRequests.map((friendRequest, index) => {
                    console.log(
                      `Current notification:\n${
                        friendRequest.username
                      }\nCurrent time: ${friendRequest.time}\nPrevious time: ${
                        index > 0 ? friendRequests[index - 1].time : "N/A"
                      }\nShow date? ${
                        index === 0 ||
                        friendRequests[index - 1].time.getDate() !==
                          friendRequest.time.getDate()
                      }\n\n`
                    );
                    const showDate =
                      index === 0 ||
                      friendRequests[index - 1].time.getDate() !==
                        friendRequest.time.getDate();
                    return (
                      <li key={index}>
                        {showDate && (
                          <p className={styles.date}>
                            {formatNotificationTime(friendRequest.time)}
                          </p>
                        )}
                        <p className={styles.text}>
                          <span>{friendRequest.username}</span> sent a friend
                          request
                        </p>
                        <div className={styles.btns}>
                          <button
                            className={styles.accept}
                            onClick={() =>
                              handleRequest(friendRequest.userID, true)
                            }
                          >
                            Accept
                          </button>
                          <button
                            className={styles.decline}
                            onClick={() =>
                              handleRequest(friendRequest.userID, false)
                            }
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    );
                  })}
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
