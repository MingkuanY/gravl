"use client";

import React, { createContext, useContext } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { UserWithTrips } from "../utils/types";

type ProfileContextType = {
  viewingUser: UserWithTrips | null;
  isOwner: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({
  viewingUser,
  children,
}: {
  viewingUser: UserWithTrips | null;
  children: React.ReactNode;
}) {
  const sessionUser = useUserContext();

  const isOwner =
    !!sessionUser &&
    !!viewingUser &&
    sessionUser.username === viewingUser.username;

  return (
    <ProfileContext.Provider value={{ viewingUser, isOwner }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const ctx = useContext(ProfileContext);
  if (!ctx)
    throw new Error("useProfileContext must be used inside ProfileProvider");
  return ctx;
}
