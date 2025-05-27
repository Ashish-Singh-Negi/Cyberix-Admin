"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SigninContext = {
  signin: boolean;
  setSignin: Dispatch<SetStateAction<boolean>>;
  signinMethod: SigninMethod;
  setSigninMethod: Dispatch<SetStateAction<SigninMethod>>;
};

type SigninMethod = "GOOGLE & GITHUB" | undefined;

const SigninContext = createContext<SigninContext | null>(null);

export default function SigninContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [signin, setSignin] = useState(false);
  const [signinMethod, setSigninMethod] = useState<SigninMethod>(undefined);

  return (
    <SigninContext.Provider
      value={{
        signin,
        setSignin,
        signinMethod,
        setSigninMethod,
      }}
    >
      {children}
    </SigninContext.Provider>
  );
}

export function useSigninContext() {
  const context = useContext(SigninContext);

  if (!context) {
    throw new Error(
      "useSigninContext must be used within a SigninContextProvider"
    );
  }

  return context;
}
