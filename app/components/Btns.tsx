"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import axios from "axios";
import { useSigninContext } from "@/contexts/signinContext";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useRouter } from "next/navigation";

export const SignInBtn = () => {
  const { signin, setSignin, signinMethod, setSigninMethod } =
    useSigninContext();

  const { setInfo } = useUserInfoContext();

  const { push } = useRouter();

  const signoutHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/signout");

      setSignin(false);
      setInfo(null);

      toast.success(data.message);

      push(`/sign-in`);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => {
    signOut(auth);
    setSignin(false);
    setInfo(null);
    setSigninMethod(undefined);
    toast.success("Sign Out Successfully");
  };

  return signin ? (
    signinMethod === "GOOGLE & GITHUB" ? (
      <button
        onClick={signout}
        className="bg-gray-950 border-[1px] border-gray-950 text-white px-3 py-1 rounded-xl text-center font-semibold hover:bg-white hover:border-gray-950 hover:text-gray-950 transition-all hover:scale-105 active:scale-100 dark:bg-gray-50 dark:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-50"
      >
        Sign out
      </button>
    ) : (
      <button
        onClick={signoutHandler}
        className="bg-gray-950 border-[1px] border-gray-950 text-white px-3 py-1 rounded-xl text-center font-semibold hover:bg-white hover:border-gray-950 hover:text-gray-950 transition-all hover:scale-105 active:scale-100 dark:bg-gray-50 dark:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-50"
      >
        Sign out
      </button>
    )
  ) : (
    <Link
      href={"/sign-in"}
      className="bg-gray-950  border-[1px] border-gray-950 text-white px-4 py-1 rounded-xl text-center font-semibold hover:bg-white hover:border-gray-950 hover:text-gray-950 transition-all hover:scale-105 active:scale-100 dark:bg-gray-50 dark:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-50"
    >
      Sign in
    </Link>
  );
};

export const ThemeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`h-8 w-8 group relative  flex justify-center items-center cursor-pointer
       duration-300 transition-all hover:rotate-[360deg] 
      rounded-3xl`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <MdDarkMode size={24} />
      ) : (
        <MdOutlineLightMode size={24} />
      )}

      <div className="h-10 w-10 rounded-3xl absolute -z-10 duration-200 transition-all group-active:bg-gray-900 group-active:scale-[100]"></div>
    </button>
  );
};
