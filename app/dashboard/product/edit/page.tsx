"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const editProductPage = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const pid = searchParams.get("pid");
  const colorIs = searchParams.get("color");
  const storage = searchParams.get("storage");

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setIsLoading(true);
        const productID = searchParams.get("pid");

        const { data } = await axios.post("/api/product/mobile/get", {
          productID,
        });
        console.log(data);
        setProductDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(productDetails);
  }, [productDetails]);

  return (
    <main className="h-full w-full">
      <h1 className="font-semibold text-2xl">Edit {name}</h1>
    </main>
  );
};

export default editProductPage;
