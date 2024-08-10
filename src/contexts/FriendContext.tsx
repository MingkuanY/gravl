import { User } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

type FriendContextProviderProps = {
  children: ReactNode;
};

type FriendContextType = {
  pendingFriends: User[];
  setPendingFriends: Function;
};

const FriendContext = createContext<FriendContextType | null>(null);

export default function FriendProvider({
  children,
}: FriendContextProviderProps) {
  const [pendingFriends, setPendingFriends] = useState<User[]>([]);

  return (
    <FriendContext.Provider value={{ pendingFriends, setPendingFriends }}>
      {children}
    </FriendContext.Provider>
  );
}
