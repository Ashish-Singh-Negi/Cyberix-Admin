"use client";
import React, { useState } from "react";

const StoragePrice = ({ storage, name }: { storage: string; name: string }) => {
  const [StoragePrice, setStoragePrice] = useState<string>("");

  return (
    <div className="h-10 w-full relative mt-6">
      <input
        type="number"
        name={`${storage}-price`}
        id={`${storage}-price`}
        onChange={(e) => setStoragePrice(e.target.value)}
        required
        value={StoragePrice}
        className="h-10 w-full border-[1px] border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer  dark:bg-gray-900 dark:focus:border-blue-500"
      />
      <label
        htmlFor={`${storage}-price`}
        className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
      >
        {name} Price for {storage} varient
      </label>
    </div>
  );
};

export default StoragePrice;
