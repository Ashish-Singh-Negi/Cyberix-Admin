import React from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MdStar } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { LaptopProps, LaptopVarient } from "@/lib/definations";

import ReviewsCard from "./ReviewsCard";
import Rating from "./Rating";
import ProductImages from "./ProductImages";
import { elements } from "chart.js";
import { laptopVarientshandler } from "@/utils/handlers";
import LaptopVarients from "../../new-product/components/LaptopVarients";
import Input from "@/app/components/Input";

const LaptopDetails = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const pid = searchParams.get("pid");
  const storage = searchParams.get("storage");
  const memory = searchParams.get("memory");
  const cpu = searchParams.get("cpu");
  const gpu = searchParams.get("gpu");

  const [laptopDetails, setlaptopDetails] = useState<LaptopProps | null>(null);

  const [color, setColor] = useState<string>(searchParams.get("color")!);
  const [img, setImg] = useState<string>("");

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const [mrp, setMRP] = useState<string | null>();
  const [salePrice, setSalePrice] = useState<string | null>();
  const [inStock, setInStock] = useState<number | null>(null);

  const [newVarientCount, setNewVarientCount] = useState<number[]>([]);
  const [newLaptopVarient, setNewLaptopVarient] = useState<LaptopVarient[]>([]);

  const [newHighlightsCount, setNewHighlightsCount] = useState<number[]>([]);
  const [newHighlights, setNewHighlights] = useState<string[]>([]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getLaptopDetails = async () => {
    if (laptopDetails) {
      setShowDetails(!showDetails);
      return;
    }

    try {
      setError(false);
      setIsLoading(true);
      const productID = searchParams.get("pid");
      const { data } = await axios.post(`/api/product/${category}/get`, {
        productID,
      });
      setShowDetails(!showDetails);
      setlaptopDetails(data.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setColor(searchParams.get("color")!);
  }, [searchParams.get("color")]);

  useEffect(() => {
    laptopDetails?.color.map((element) => {
      if (color === element.color) {
        setImg(element.imgURLs[0]);
      }
    });
  }, [color, laptopDetails]);

  useEffect(() => {
    let temp = 0;

    laptopDetails?.varients.map((element) => {
      if (
        memory === element.memory &&
        storage === element.storage &&
        cpu === element.processor &&
        gpu === element.gpu
      ) {
        setSalePrice(element.salePrice);
        setMRP(element.mrp);
        element.inStock.forEach((inStock) => {
          if (color === inStock.color) {
            setInStock(inStock.stock);
          }
        });
      } else {
        temp++;
      }
      console.log(element);
    });

    if (temp === laptopDetails?.varients.length) {
      setSalePrice(null);
      setMRP(null);
      setInStock(null);
    }
  }, [memory, storage, color, cpu, gpu, laptopDetails]);

  return (
    <>
      <div
        className={`relative ${
          edit ? "h-full" : "h-fit"
        }  w-full rounded-lg bg-white dark:bg-gray-950 px-4 py-2 flex flex-col items-center mb-2 `}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold py-1">{name} </h1>
          <button
            type="button"
            className="text-lg text-blue-500 flex items-center cursor-pointer"
            onClick={getLaptopDetails}
          >
            show {showDetails ? "less" : "more"}{" "}
            <MdOutlineKeyboardArrowDown
              className={`transition-all ${showDetails ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <main
          className={` h-fit w-full box-border ${
            showDetails ? "flex" : "hidden"
          } pt-6 pb-4 gap-10 overflow-y-auto`}
        >
          <button
            onClick={() => setEdit(!edit)}
            className={`absolute h-10 px-4 bottom-4 left-4 rounded-full flex items-center justify-center ${
              edit ? "bg-red-500" : "bg-blue-500"
            } text-white  active:scale-95`}
          >
            {edit ? (
              <>
                <MdOutlineEdit className="h-6 w-6" />
                <span className="text-lg ml-1 tracking-wide">cancel</span>
              </>
            ) : (
              <>
                <MdOutlineEdit className="h-6 w-6" />
                <span className="text-lg ml-1 tracking-wide">edit</span>
              </>
            )}
          </button>

          <div className="sticky top-0 h-[500px] w-[600px] flex">
            <div className={`h-[500px] w-[86px] mr-1 ml-8 overflow-y-auto `}>
              {laptopDetails && (
                <ProductImages
                  colorsImgs={laptopDetails.color}
                  defaultImgs={laptopDetails.defaultImgs!}
                  color={color}
                  img={img}
                  setImg={setImg}
                />
              )}
            </div>
            <div className="h-[416px] w-[416px] flex flex-col">
              <Image
                className="border-gray-300 h-[416px] w-[416px] "
                src={img}
                alt="Image"
                height={416}
                width={416}
              />
            </div>
          </div>
          <main className="h-fit w-full overflow-y-auto">
            <p className="text-xl font-medium">
              {laptopDetails?.brandName} {laptopDetails?.productName} ( {color}{" "}
              , {storage} Storage) ( {memory} RAM ) , {laptopDetails?.display}
            </p>
            <p className="font-medium text-gray-500 text-sm mt-[6px] dark:text-gray-400">
              <span className="h-5 bg-blue-500 text-white px-1 py-[2px] rounded-md inline-flex items-center">
                {laptopDetails?.rating}
                <MdStar className="inline" />
              </span>{" "}
              {laptopDetails?.rating} rating & {laptopDetails?.reviews.length}
              reviews
            </p>
            {/** Price Container */}
            <div className="font-semibold text-gray-700 flex items-end gap-2 mt-2 tracking-wide dark:text-gray-200">
              {edit && salePrice ? (
                <div className="h-10 w-1/3 relative my-3">
                  <input
                    type="text"
                    name={`sale-price`}
                    id={`sale-price`}
                    value={salePrice!}
                    onChange={(e) => setSalePrice(e.target.value)}
                    required
                    className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                  />
                  <label
                    htmlFor={`sale-price`}
                    className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
                  >
                    Sale Price
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

              {edit && mrp ? (
                <div className="h-10 w-1/3 relative my-3">
                  <input
                    type="text"
                    name={`mrp`}
                    id={`mrp`}
                    value={mrp!}
                    onChange={(e) => setMRP(e.target.value)}
                    required
                    className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                  />
                  <label
                    htmlFor={`mrp`}
                    className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
                  >
                    MRP
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

              {!edit && inStock! < 5 && inStock !== null && (
                <span className="text-red-500 text-xl">
                  Only {inStock} left
                </span>
              )}
            </div>
            {/* color options And Varient container */}
            <div className="h-[60px] w-full mt-4">
              <div className="h-full w-full flex">
                <div className="h-full w-[120px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Color
                  </span>
                </div>
                {laptopDetails?.color.map((value, index) => (
                  <Link
                    key={index}
                    href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${value.color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                    className={`h-10 px-4 flex font-semibold items-center border-2 rounded-sm mr-3 ${
                      color === value.color &&
                      "border-blue-500  dark:bg-gray-950 tracking-wide"
                    }`}
                  >
                    {value.color}
                  </Link>
                ))}
                {edit && (
                  <button className="h-10 w-24 text-xl font-semibold py-1 px-2 rounded-lg bg-gray-950 dark:bg-white text-white dark:text-gray-950 cursor-pointer ">
                    add
                  </button>
                )}
              </div>
            </div>
            {laptopDetails?.processors.length! > 1 ? (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      CPU
                    </span>
                  </div>
                  {laptopDetails?.processors.map((processor) => (
                    <Link
                      key={processor}
                      href={`?category=${category}&name=${name}&cpu=${processor}&gpu=${gpu}&color=${color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        cpu === processor && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{processor}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {laptopDetails?.rams.length !== 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      RAM
                    </span>
                  </div>
                  {laptopDetails?.rams.map((ram) => (
                    <Link
                      key={ram}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${color}&storage=${storage}&memory=${ram}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        memory === ram && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{ram}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {laptopDetails?.storages.length! > 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Storage
                    </span>
                  </div>
                  {laptopDetails?.storages.map((stor) => (
                    <Link
                      key={stor}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${color}&storage=${stor}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        storage === stor && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{stor}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {laptopDetails?.gpus.length! > 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Graphic Card
                    </span>
                  </div>
                  {laptopDetails?.processors.map((graphic) => (
                    <Link
                      key={graphic}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${graphic}&color=${color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        gpu === graphic && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{graphic}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {edit && (
              <div className="w-full mt-4 mb-6">
                {laptopDetails?.varients.map((val, index) => (
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
                          name={`rams-${index}`}
                          id={`rams-${index}`}
                          value={val.memory}
                          readOnly
                          className="h-10 w-full cursor-not-allowed border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                        />
                      </div>
                      <div className="h-10 w-full relative mb-4">
                        <input
                          type="text"
                          name={`storage-${index}`}
                          id={`storage-${index}`}
                          value={val.storage}
                          readOnly
                          className="h-10 w-full cursor-not-allowed border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full pl-[120px]">
                  {newVarientCount.map((count) => (
                    <LaptopVarients
                      key={count}
                      count={count}
                      setLaptopVarients={setNewLaptopVarient}
                      varientHandler={laptopVarientshandler}
                    />
                  ))}
                  <button
                    onClick={() =>
                      setNewVarientCount((prev) => [...prev, prev.length + 1])
                    }
                    className="w-full font-semibold py-1 px-2 rounded-lg bg-gray-950 dark:bg-white text-white dark:text-gray-950 cursor-pointer "
                  >
                    add
                  </button>
                </div>
              </div>
            )}
            {/** Specs container */}
            <div className="h-fit w-full mt-2">
              <div className="h-full w-full flex items-start">
                <div className="h-full w-[120px]">
                  <span className="h-full w-20 font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Key Features
                  </span>
                </div>
                {edit ? (
                  <div className="w-full flex flex-col">
                    {laptopDetails?.highlights.map((val, index) => (
                      <div className="h-10 w-full relative mb-[10px]">
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
                        count={index}
                        label="New Highlight"
                        name={"New Highlight"}
                        setState={setNewHighlights}
                        key={index + 10}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setNewHighlightsCount((prev) => [
                          ...prev,
                          prev.length + 1,
                        ])
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
                    {laptopDetails?.highlights.map((value) => (
                      <li
                        className="text-gray-600 dark:text-gray-300 mt-1"
                        key={value}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="h-10 w-full flex justify-between items-center pr-8 mt-4">
              <p className="text-xl font-semibold ">Ratings & Reviews</p>
            </div>
            <Rating
              rating={laptopDetails?.rating!}
              reviews={laptopDetails?.reviews.length!}
            />
          </main>
        </main>
      </div>
      <div className="relative h-fit w-full rounded-lg bg-white dark:bg-gray-950 px-4 py-2 flex flex-col mb-2 ">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold py-1">
            {name} <span className="font-bold">Reviews</span>
          </h1>
          <button
            type="button"
            className="text-lg text-blue-500 flex items-center cursor-pointer"
            onClick={() => setShowReviews(!showReviews)}
          >
            show {showReviews ? "less" : "more"}{" "}
            <MdOutlineKeyboardArrowDown
              className={`transition-all ${showDetails ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <main
          className={`h-full box-border ${
            showReviews ? "flex" : "hidden"
          } pt-6 pb-4 px-8 gap-10 overflow-y-auto`}
        >
          <div
            className={`${
              laptopDetails?.reviews.length! > 5 ? "h-[600px]" : "h-fit"
            } w-full flex flex-col gap-3`}
          >
            <ReviewsCard />
            <ReviewsCard />
          </div>
        </main>
      </div>
    </>
  );
};

export default LaptopDetails;
