"use client";

import { useMenuContext } from "@/contexts/menuContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch } from "react";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Orders", href: "/orders" },
];

const Nav = () => {
  const pathname = usePathname();

  const { menuOpen } = useMenuContext();

  return (
    <nav
      className={`h-screen w-[216px] bg-gray-50 pt-14 dark:bg-gray-900 border-r-2 dark:border-gray-500 ${
        menuOpen ? "block absolute z-[9]" : "hidden"
      } lg:block lg:static`}
    >
      <div className="min-h-fit mt-2 border-b-2 dark:border-gray-500">
        <div className="h-fit w-[210px] mt-2 text-gray-800 flex flex-col gap-1 pb-2">
          {links.map((link) => (
            <div
              className="h-full w-full relative  flex mt-1 transition-all"
              key={link.name}
            >
              <span
                className={`h-10 w-1 absolute z-10 rounded-r-xl  transition-all ${
                  pathname.includes(link.href) && "bg-blue-400 dark:bg-blue-500"
                }`}
              ></span>
              <Link
                href={link.href}
                className={`h-10 w-full text-lg flex items-center pl-6 rounded-lg cursor-pointer hover:font-semibold transition-all dark:text-gray-400 font-normal active:scale-95 ${
                  pathname.includes(link.href) &&
                  "font-semibold bg-blue-100 dark:bg-blue-950 dark:text-gray-50 dark:font-semibold"
                }`}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
        {/* <p className=" text-center font-semibold text-gray-400 px-5 ">All CopyRight Reserved @ 2024</p> */}
    </nav>
  );
};

export default Nav;
