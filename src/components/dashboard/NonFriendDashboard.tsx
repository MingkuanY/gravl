"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/nonfrienddashboard.module.scss";
import Icon from "../icons/Icon";
import SignUpButton from "../landing/SignUpButton";
import Profile from "./Profile";
import { UserWithData, UserWithTrips } from "@/utils/types";
import { User } from "@prisma/client";
import { fetchPendingFriends, sendFriendRequest } from "@/actions/actions";

export default function NonFriendDashboard({
  accessedUser,
  loggedIn,
}: {
  accessedUser: UserWithTrips;
  loggedIn: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Profile
          user={accessedUser}
          viewOnly={true}
          trips={accessedUser.trips}
        />
        {loggedIn ? (
          <div className={styles.sendFriendRequestContainer}>
            <p>Send a Friend Request To View</p>
          </div>
        ) : (
          <SignUpButton />
        )}
      </div>
    </div>
  );
}
