"use client";

import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserInfo = {
  userId: string;
  username: string;
  email: string;
  profileImg?: string;
};

type UserInfoContext = {
  info: UserInfo | null;
  setInfo: Dispatch<SetStateAction<UserInfo | null>>;
};

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default function UserInfoContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [info, setInfo] = useState<UserInfo | null>(null);

  return (
    <UserInfoContext.Provider
      value={{
        info,
        setInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoContextProvider"
    );
  }

  return context;
}
