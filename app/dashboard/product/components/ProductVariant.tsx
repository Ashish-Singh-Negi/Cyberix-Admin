"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { MdOutlineEdit } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";

import Input from "@/app/components/Input";
import MobileVarients from "../../new-product/components/MobileVarients";
import SmallLoader from "@/app/components/SmallLoader";
import { useProductContextProvider } from "@/contexts/productContext";

const ProductVariant = ({
  pid,
  color,
  // varients,
  // highlights,
  editVariantAndHighlight,
  setEditVariantAndHighlight,
}: {
  pid: string;
  color: Color[];
  // varients: MobileVarient[];
  // highlights: string[];
  editVariantAndHighlight: boolean;
  setEditVariantAndHighlight: Dispatch<SetStateAction<boolean>>;
}) => {
  const { product, setProduct } = useProductContextProvider();

  const [newMobileVarient, setNewMobileVarient] = useState<MobileVarient[]>([]);
  const [newVarientCount, setNewVarientCount] = useState<number[]>([]);

  const [newHighlightsCount, setNewHighlightsCount] = useState<number[]>([]);
  const [newHighlights, setNewHighlights] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const updateVariantsAndHighlights = async () => {
    try {
      const { data } = await axios.put(`/api/product/mobile/update/variant`, {
        pid,
        newMobileVarient,
        newHighlights,
      });

      console.log(data);

      setProduct(data.data);

      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVariantHandler = async (
    vid: string,
    memory: string,
    storage: string
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/product/mobile/delete/variant`,
        {
          data: {
            pid,
            vid,
            memory,
            storage,
          },
        }
      );

      setProduct(data.data);

      setLoading(false);

      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (loading)
    return (
      <div className="min-h-8 w-full flex justify-center">
        <SmallLoader size="h-10 w-10" />
      </div>
    );

  return (
    <>
      {editVariantAndHighlight && (
        <div className="w-full mt-4 mb-6">
          {product!.varients.map((val, index) => (
            <div className="h-full w-full flex" key={index}>
              <div className="h-full w-[135px]">
                <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                  varient {index + 1}
                </span>
              </div>
              <div className="w-full flex gap-3">
                <div className="h-10 w-full relative mb-4">
                  <input
                    type="text"
                    name={`ram-${index}`}
                    id={`ram-${index}`}
                    defaultValue={val.memory}
                    readOnly
                    className="h-10 w-full cursor-not-allowed border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                  />
                </div>
                <div className="h-10 w-full relative mb-4">
                  <input
                    type="text"
                    name={`storage-${index}`}
                    id={`storage-${index}`}
                    defaultValue={val.storage}
                    readOnly
                    className="h-10 w-full cursor-not-allowed border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                  />
                </div>
                <button
                  onClick={() =>
                    deleteVariantHandler(val._id!, val.memory, val.storage)
                  }
                  className="h-10 flex items-center font-semibold text-red-500 dark:text-red-100 rounded-xl px-3 py-1 bg-red-100 dark:bg-red-500 active:scale-95"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="w-full pl-[120px]">
            {newVarientCount.map((count) => (
              <MobileVarients
                key={count}
                count={count}
                colors={color}
                setNewMobileVarients={setNewMobileVarient}
              />
            ))}
            <button
              onClick={() =>
                setNewVarientCount((prev) => [...prev, prev.length + 1])
              }
              className="w-full font-semibold py-1 px-2 rounded-lg bg-gray-950 dark:bg-white text-white dark:text-gray-950 cursor-pointer active:scale-95 transition-all"
            >
              add
            </button>
          </div>
        </div>
      )}
      <div className="h-fit w-full mt-2">
        <div className="h-full w-full flex items-start">
          <div className="h-full w-[135px]">
            <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
              Key Features
            </span>
          </div>
          {editVariantAndHighlight ? (
            <div className="w-full flex flex-col">
              {product!.highlights.map((val, index) => (
                <div key={val} className="h-10 w-full relative mb-[10px]">
                  <input
                    type="text"
                    name={`features-${index}`}
                    id={`features-${index}`}
                    value={val}
                    required
                    className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                  />
                  <label
                    htmlFor={`features-${index}`}
                    className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
                  ></label>
                </div>
              ))}
              {newHighlightsCount.map((val, index) => (
                <Input
                  key={index + 10}
                  count={index}
                  label="New Highlight"
                  name={"New Highlight"}
                  setState={setNewHighlights}
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewHighlightsCount((prev) => [...prev, prev.length + 1])
                }
                className="h-10 w-full mt-2 rounded-md bg-gray-950 dark:bg-white transition-all active:scale-95"
              >
                <p className="text-xl font-medium text-white dark:text-gray-950">
                  + more Highlights
                </p>
              </button>
            </div>
          ) : (
            <ul className="list-disc text-gray-800  text-sm">
              {product!.highlights.map((value) => (
                <li
                  key={value}
                  className="text-gray-600 dark:text-gray-300 mt-1"
                >
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {editVariantAndHighlight ? (
        <div className="h-10 mt-4 w-full flex items-start justify-start gap-3 px-1 font-semibold">
          <button
            onClick={() => setEditVariantAndHighlight(!editVariantAndHighlight)}
            className="h-9 w-fit flex items-center text-red-500 dark:text-red-100 rounded-xl px-6 py-1 bg-red-100 dark:bg-red-500"
          >
            <MdOutlineEdit className="h-5 w-5" /> cancel
          </button>
          <button
            onClick={() => {
              updateVariantsAndHighlights();
              setEditVariantAndHighlight(!editVariantAndHighlight);
            }}
            className="h-9 w-fit flex items-center text-blue-500 dark:text-blue-100 rounded-xl px-6 py-1 bg-blue-100 dark:bg-blue-500"
          >
            <BiCloudUpload className="h-6 w-6" /> save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditVariantAndHighlight(!editVariantAndHighlight)}
          className="h-9 w-fit mt-4 flex items-center rounded-xl px-2 py-1 font-semibold text-blue-800 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        >
          <MdOutlineEdit className="h-5 w-5" />
          edit variant & highlights
        </button>
      )}
    </>
  );
};

export default ProductVariant;
