"use client";

import Link from "next/link";
import React from "react";

import { MdLibraryAdd } from "react-icons/md";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

import { useMenuContext } from "@/contexts/menuContext";
import Payments from "./components/Payments";
import ListedProduct from "./components/ListedProduct";

const DashboardPage = () => {
  const { menuOpen } = useMenuContext();

  return (
    <>
      <p className="dark:text-white font-medium text-3xl py-1">Dashboard</p>
      <main
        className={`min-h-fit w-full sm:px-5 ${
          menuOpen && "opacity-40"
        } lg:opacity-100`}
      >
        <div
          className={`h-14 w-full mt-4 flex items-center justify-between bg-white dark:bg-gray-950 text-gray-950 rounded-lg px-6`}
        >
          <p className="text-xl font-semibold dark:text-white">
            List Your Product on Cybrix
          </p>
          <Link
            href={`/dashboard/new-product`}
            className="flex justify-center gap-2 h-10 w-32 py-2 rounded-lg bg-gray-950 px-4 text-white text-lg font-semibold active:scale-95 transition-all dark:bg-gray-100 dark:text-gray-900"
          >
            Add
            <MdLibraryAdd size={24} />
          </Link>
        </div>
        <div className="min-h-fit w-full px-5">{/*coming soon */}</div>
        <div className="min-h-fit w-full mt-8">
          <div className="h-full w-full flex flex-col gap-4 lg:flex-row">
            {[
              { heading: "Revenue", growth: -11 },
              { heading: "Sales", growth: 3 },
              { heading: "Total Growth", growth: 1 },
            ].map((val) => (
              <div
                key={val.heading}
                className={`h-40 w-full relative bg-white dark:bg-gray-950 rounded-md flex justify-between `}
              >
                <p className="h-24 ml-6 text-2xl flex flex-col justify-center font-semibold">
                  {val.heading}
                  {val.growth > 0 ? (
                    <span className={`text-green-400 flex items-center gap-1`}>
                      {val.growth}%
                      <FiTrendingUp />
                    </span>
                  ) : (
                    <span className={`text-red-600 flex items-center gap-1`}>
                      {val.growth}%
                      <FiTrendingDown />
                    </span>
                  )}
                </p>
                <p className="absolute bottom-5 right-12 text-4xl font-bold ">
                  $23,434
                </p>
                {/* <LineChart /> */}
              </div>
            ))}
          </div>
          <div className="h-fit w-full 2xl:grid grid-cols-2 gap-2">
            <div
              className={`h-fit w-full bg-white dark:bg-gray-950 rounded-md mt-10`}
            >
              <h1 className="text-2xl font-bold mx-4 mt-4">Total Revenue</h1>
              <BarChart />
            </div>
            <div
              className={`h-fit w-full bg-white dark:bg-gray-950 rounded-md mt-10`}
            >
              <h1 className="text-2xl font-bold mx-4 mt-4">
                Most Sold Category
              </h1>
              <PieChart />
            </div>
          </div>
          <div
            className={`h-full w-full px-1 font-medium mt-8 transition-all rounded-lg flex flex-col xl:flex-row  gap-2`}
          >
            <ListedProduct />
            <Payments />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
