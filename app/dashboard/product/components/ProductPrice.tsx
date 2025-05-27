"use client";

import SmallLoader from "@/app/components/SmallLoader";
import { useProductContextProvider } from "@/contexts/productContext";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCloudUpload } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";

const ProductPrice = ({
  priceAndStockEdit,
  setPriceAndStockEdit,
  salePrice,
  mrp,
  inStock,
  memory,
  storage,
  color,
  pid,
  vid,
}: {
  priceAndStockEdit: boolean;
  salePrice: string | null;
  mrp: string | null;
  inStock: number | null;
  memory: string | null;
  storage: string | null;
  pid: string;
  color: string;
  vid: string;
  setPriceAndStockEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [newSalePrice, setNewSalePrice] = useState<string | null>(null);
  const [newMRP, setNewMRP] = useState<string | null>(null);
  const [newInStock, setNewInStock] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const { setProduct } = useProductContextProvider();

  const updatePriceAndStock = async () => {
    try {
      setLoading(true);

      const { data } = await axios.put(`/api/product/mobile/update/price`, {
        pid,
        vid,
        color,
        newSalePrice,
        newMRP,
        newInStock,
      });

      setProduct(data.data);

      console.log(data.data);

      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNewInStock(inStock);
    setNewSalePrice(salePrice);
    setNewMRP(mrp);
  }, [salePrice, inStock, mrp]);

  if (loading)
    return (
      <div className="min-h-8 w-full flex justify-center">
        <SmallLoader size="h-10 w-10" />
      </div>
    );

  return (
    <>
      <div className="font-semibold text-gray-700 flex items-center gap-2 tracking-wide dark:text-gray-200">
        {priceAndStockEdit ? (
          <div className="h-10 w-1/3 relative my-3">
            <input
              type="text"
              name={`sale-price`}
              id={`sale-price`}
              value={newSalePrice ? newSalePrice! : ""}
              onChange={(e) => setNewSalePrice(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor={`sale-price`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Sale Price of {memory} with {storage}
            </label>
          </div>
        ) : salePrice ? (
          <p className="text-3xl flex items-start gap-1">
            <span className="text-lg ">&#8377;</span>
            {salePrice}
          </p>
        ) : (
          <p className="text-3xl text-red-400">Not Available</p>
        )}

        {priceAndStockEdit ? (
          <div className="h-10 w-1/3 relative my-3">
            <input
              type="text"
              name={`mrp`}
              id={`mrp`}
              value={newMRP ? newMRP! : ""}
              onChange={(e) => setNewMRP(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
            />
            <label
              htmlFor={`mrp`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              MRP of {memory} with {storage}
            </label>
          </div>
        ) : (
          mrp && (
            <p className="h-full text-base line-through text-gray-500 flex items-end">
              <span>&#8377;</span>
              {mrp}
            </p>
          )
        )}
        {!priceAndStockEdit && inStock! < 5 && inStock !== null && (
          <span className="text-red-500 text-xl">Only {inStock} left</span>
        )}
        {!salePrice && !mrp && !inStock ? null : priceAndStockEdit ? (
          <div className="h-8 flex items-start gap-3 mx-5 font-semibold">
            <button
              onClick={() => setPriceAndStockEdit(!priceAndStockEdit)}
              className="h-full w-fit flex items-center text-red-500 dark:text-red-100 rounded-lg px-2 py-1 bg-red-100 dark:bg-red-500"
            >
              <MdOutlineEdit className="h-5 w-5" /> cancel
            </button>
            <button
              onClick={() => {
                updatePriceAndStock();
                setPriceAndStockEdit(!priceAndStockEdit);
              }}
              className="h-full w-fit flex items-center text-blue-500 dark:text-blue-100 rounded-lg px-2 py-1 bg-blue-100 dark:bg-blue-500"
            >
              <BiCloudUpload className="h-6 w-6" /> save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setPriceAndStockEdit(!priceAndStockEdit)}
            className="w-fit mx-4 flex items-center rounded-xl px-2 py-1 text-blue-800 dark:text-blue-50 bg-blue-100 dark:bg-blue-500"
          >
            <MdOutlineEdit className="h-5 w-5" />
            edit price & stock
          </button>
        )}
      </div>
      {priceAndStockEdit ? (
        <div className="h-10 w-full flex items-center">
          <div className="h-10 w-1/3 relative my-3">
            <input
              type="number"
              name={`In-Stock`}
              id={`In-Stock`}
              value={newInStock ? newInStock! : ""}
              onChange={(e) => setNewInStock(Number(e.target.value))}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor={`In-Stock`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Stock of {memory} with {storage}
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
      {priceAndStockEdit ? (
        <p className="text-sm mt-2 text-red-500">
          Note : Sale price and MRP will be changed for all color options of{" "}
          {memory} with {storage}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductPrice;
