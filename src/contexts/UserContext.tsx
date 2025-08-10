"use client";

import { createContext, useContext } from "react";
import { UserWithTrips } from "../utils/types";

type UserContextType = {
  sessionUser: UserWithTrips | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  sessionUser,
  children,
}: {
  sessionUser: UserWithTrips | null;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={{ sessionUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx.sessionUser;
}
