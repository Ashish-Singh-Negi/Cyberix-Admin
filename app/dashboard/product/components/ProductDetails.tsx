"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import MobileDetails from "./MobileDetails";
import LaptopDetails from "./LaptopDetails";

const ProductDetails = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  return (
    <main className="h-full w-[98%] box-border pt-2 flex flex-col gap-2 mt-2 ">
      {category === "mobile" && <MobileDetails />}
      {category === "laptop" && <LaptopDetails />}
    </main>
  );
};

export default ProductDetails;
