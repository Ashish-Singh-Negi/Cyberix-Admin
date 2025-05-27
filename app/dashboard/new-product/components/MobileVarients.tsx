import Input from "@/app/components/Input";

import React, { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";

const MobileVarients = ({
  setNewMobileVarients,
  colors,
  count,
}: {
  count: number;
  colors?: string[];
  setNewMobileVarients: React.Dispatch<React.SetStateAction<MobileVarient[]>>;
}) => {
  const [memory, setMemory] = useState("");
  const [storage, setStorage] = useState("");
  const [mrp, setMRP] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [inStock, setInStock] = useState<string[]>([]);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm) {
      let inStockColors: InStock[] =
        colors?.map((color, i) => ({
          color: color[i],
          stock: Number(inStock[i]),
        })) || [];

      console.log(inStockColors);

      setNewMobileVarients((prev) => [
        ...prev,
        {
          memory: memory,
          storage: storage,
          mrp: mrp,
          salePrice: salePrice,
          inStock: inStockColors,
        },
      ]);
    }
  }, [confirm]);

  return (
    <div className="h-fit w-full grid grid-cols-4 gap-3 mb-3">
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`new-memory-${count}`}
          id={`new-memory-${count}`}
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`new-memory-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          RAM
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`new-storage-${count}`}
          id={`new-storage-${count}`}
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`new-storage-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          Storage
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`new-mrp-${count}`}
          id={`new-mrp-${count}`}
          value={mrp}
          onChange={(e) => setMRP(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`new-mrp-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          MRP
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`new-sale-${count}`}
          id={`new-sale-${count}`}
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`new-sale-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          Sale Price
        </label>
      </div>
      {colors &&
        colors.map((color) => (
          <Input
            name={color}
            count={count}
            label={`Stock of ${color}`}
            setState={setInStock}
            key={color + 10}
          />
        ))}
      {memory && storage && mrp && salePrice && inStock && (
        <button
          onClick={() => setConfirm(true)}
          type="button"
          className={`h-10 px-2 ${
            confirm ? "text-green-400" : " text-blue-400"
          } rounded-md`}
        >
          <GiConfirmed />
        </button>
      )}
    </div>
  );
};

export default MobileVarients;
