import Input from "@/app/components/Input";

import React, { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";

const LaptopVarients = ({
  setLaptopVarients,
  varientHandler,
  colors,
  count,
}: {
  varientHandler: (
    memory: string,
    storage: string,
    mrp: string,
    salePrice: string,
    processor: string,
    gpu: string,
    inStock: InStock[],
    setLaptopVarients: React.Dispatch<React.SetStateAction<LaptopVarient[]>>
  ) => void;
  count: number;
  colors?: string[];
  setLaptopVarients: React.Dispatch<React.SetStateAction<LaptopVarient[]>>;
}) => {
  const [memory, setMemory] = useState("");
  const [storage, setStorage] = useState("");
  const [mrp, setMRP] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [processor, setProcessor] = useState("");
  const [gpu, setGpu] = useState("");
  const [inStock, setInStock] = useState<string[]>([]);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm) {
      let inStockColors = [];
      for (let i = 0; i < colors!.length; i++) {
        inStockColors.push({
          color: colors![i],
          stock: Number(inStock[i]),
        });
      }
      varientHandler(
        memory,
        storage,
        mrp,
        salePrice,
        processor,
        gpu,
        inStockColors,
        setLaptopVarients
      );
    }
  }, [confirm]);

  return (
    <div className="h-fit w-full grid grid-cols-4 gap-3 mb-6">
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`processor-${count}`}
          id={`processor-${count}`}
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`processor-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          Processor
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`gpu-${count}`}
          id={`gpu-${count}`}
          value={gpu}
          onChange={(e) => setGpu(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`gpu-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          Graphic Card
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`memory-${count}`}
          id={`memory-${count}`}
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`memory-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          RAM
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`storage-${count}`}
          id={`storage-${count}`}
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`storage-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          Storage
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`mrp-${count}`}
          id={`mrp-${count}`}
          value={mrp}
          onChange={(e) => setMRP(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`mrp-${count}`}
          className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          MRP
        </label>
      </div>
      <div className="h-10 w-full relative">
        <input
          type="text"
          name={`sale-${count}`}
          id={`sale-${count}`}
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          required
          className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor={`sale-${count}`}
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
          className={`h-10 w-10 px-2 ${
            confirm ? "text-green-400" : " text-blue-400"
          } rounded-md`}
        >
          <GiConfirmed />
        </button>
      )}
    </div>
  );
};

export default LaptopVarients;
