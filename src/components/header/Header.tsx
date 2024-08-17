"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.scss";
import Icon from "../icons/Icon.tsx";
import { signIn, signOut, useSession } from "next-auth/react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { useScreenWidth } from "@/utils/hooks.ts";
import FriendsBar from "./FriendsBar.tsx";
import { Status, UserWithData } from "@/utils/types.ts";
import { getUserById, readNotifications } from "@/actions/actions.ts";
import { User } from "@prisma/client";
import Notification from "./Notification.tsx";

export default function Header({ user }: { user?: UserWithData }) {
  const [notifications, setNotifications] = useState(
    user ? user.notifications : []
  );

  useEffect(() => {
    sortNotifications();
  }, [user]);

  const sortNotifications = () => {
    // Sort notifications in recent-first order
    setNotifications((prevNotifications) =>
      [...prevNotifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  };

  // look up usernames by id

  const [notifsStatus, setNotifsStatus] = useState<Status>("LOADING");

  const [usernameMap, setUsernameMap] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      setNotifsStatus("LOADING");
      const detailsMap: { [key: string]: string } = {};
      for (const notification of notifications) {
        if (
          notification.userIdInConcern &&
          !detailsMap[notification.userIdInConcern]
        ) {
          let currUsername = "";
          if (notification.type === "FRIEND_REQUEST") {
            const currUser = await getUserById(notification.userIdInConcern);
            if (currUser && currUser.username) {
              currUsername = currUser.username;
            }
          } else {
            currUsername = friends.find(
              (friend) => friend.id === notification.userIdInConcern
            )?.username!;
          }
          if (currUsername) {
            detailsMap[notification.userIdInConcern] = currUsername;
          }
        }
      }
      setUsernameMap(detailsMap);
      setNotifsStatus("DEFAULT");
    };

    fetchUserDetails();
  }, [user?.notifications]);

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

  // Handle add friend when friend request accepted
  const [friends, setFriends] = useState<User[]>(user ? user.friends : []);

  // Handles the optimistic response to a friend request (i.e. accept or decline)
  const responseCallback = async (response: boolean, index: number) => {
    const updatedNotifications = [...notifications];
    const notification = updatedNotifications[index];

    // Update notification to friend request accepted
    updatedNotifications[index] = {
      ...notification,
      type: "FRIEND_REQUEST_ACCEPTED",
      createdAt: new Date(),
    };
    setNotifications(updatedNotifications);
    sortNotifications();

    if (response) {
      // Accepted friend request
      const newFriend = await getUserById(notification.userIdInConcern);
      if (newFriend) {
        setFriends((prevFriends) => [...prevFriends, newFriend]);
      }
    }
  };

  // Redirect to profile
  const goToProfile = () => {
    user && router.push(`/${user.username}`);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo} onClick={goToProfile}>
          <Icon type="car" fill="#319fff" />
        </div>
        <p className={styles.gravl} onClick={goToProfile}>
          Gravl
        </p>
        <p className={styles.testing}>Alpha</p>
      </div>
      <div className={styles.headerRightContainer}>
        {session.status === "authenticated" && user ? (
          <>
            {!isMobile && <FriendsBar user={user} friends={friends} />}
            {!isMobile && (
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
                    {notifsStatus === "DEFAULT" &&
                      notifications.map((notification, index) => {
                        const username =
                          usernameMap[notification.userIdInConcern!];
                        if (!username) return null;

                        return (
                          <Notification
                            notifications={notifications}
                            notification={notification}
                            index={index}
                            username={username}
                            key={index}
                            setClose={() => setNotifDropdown(false)}
                            responseCallback={(response: boolean) =>
                              responseCallback(response, index)
                            }
                          />
                        );
                      })}
                    {notifsStatus === "LOADING" && (
                      <div className={styles.loadingContainer}>
                        <div className={styles.wheel}>
                          <Icon type="wheel" fill="#24292f" />
                        </div>
                        <p className={styles.loading}>Loading...</p>
                      </div>
                    )}
                    {notifications.length === 0 && (
                      <li>
                        <p className={styles.noNotifs}>No new notifications</p>
                      </li>
                    )}
                  </ul>
                </div>
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
                  {!isMobile && <li onClick={goToProfile}>Profile</li>}
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
