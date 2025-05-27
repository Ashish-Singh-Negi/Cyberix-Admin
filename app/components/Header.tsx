"use client";

import React, { useEffect, useState } from "react";
import { SignInBtn, ThemeBtn } from "./Btns";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useMenuContext } from "@/contexts/menuContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useSigninContext } from "@/contexts/signinContext";

const Header = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  const [isActive, setIsActive] = useState(false);

  const { menuOpen, setMenuOpen } = useMenuContext();
  const { info, setInfo } = useUserInfoContext();
  const { signin, setSignin } = useSigninContext();

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await axios.get("/api/admin/myprofile");

        setSignin(true);
        setInfo({
          ...info,
          userId: data.data._id,
          username: data.data.username,
          email: data.data.email,
        });
      } catch (error) {
        console.error(error);

        push("/sign-in");
      }
    }

    getProfile();
  }, [signin]);

  // useEffect(() => {
  //   async function checkAuthorization() {
  //     try {
  //       await axios.get("/api/admin/myprofile");
  //     } catch (error) {
  //       console.error(error);

  //       push("/sign-in");
  //     }
  //   }

  //   checkAuthorization();
  // }, [pathname]);

  useEffect(() => {
    if (pathname === "/sign-in") {
      setIsActive(true);
    } else if (pathname === "/signup") {
      setIsActive(true);
    } else if (pathname === "/reset") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname]);

  useEffect(() => {
    console.log("SIGN in :", signin);
    console.log("Info : ", info);
  }, [info, signin]);

  return (
    <header
      className={`h-14 w-full z-10 flex justify-between ${
        isActive ? "px-3" : ""
      } lg:px-3 items-center border-b-2 fixed bg-gray-50 dark:bg-gray-900 dark:shadow-gray-700`}
    >
      <Toaster />
      <div className="h-full flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`h-12 w-12 rounded-full bottom-2 left-2 flex ${
            isActive ? "hidden" : ""
          } lg:hidden flex-col gap-1 justify-center items-center`}
        >
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen ? " translate-y-2 rotate-45 " : ""
            }`}
          ></span>
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen ? " opacity-0 scale-0" : ""
            }`}
          ></span>
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen ? " -translate-y-2 -rotate-45 " : ""
            }`}
          ></span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800 cursor-pointer dark:text-gray-50">
          <Link href={signin ? "/dashboard" : "/sign-in"}>
            Cyberix
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Admin
            </span>
          </Link>
        </h1>
      </div>
      <div className="w-[146px] flex items-center gap-4 lg:pl-2">
        <ThemeBtn />
        <SignInBtn />
      </div>
    </header>
  );
};

export default Header;
