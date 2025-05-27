"use client";

import React from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MdStar } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import ReviewsCard from "./ReviewsCard";
import Rating from "./Rating";
import ProductImages from "./ProductImages";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import ProductPrice from "./ProductPrice";
import { fireStorage } from "@/lib/firebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import DialogBox from "@/app/components/DialogBox";
import ProductVariant from "./ProductVariant";
import { useProductContextProvider } from "@/contexts/productContext";
import Loader from "@/app/components/Loader";
import Input from "@/app/components/Input";
import ProductColors from "../../new-product/components/ProductColors";

const MobileDetails = () => {
  const { back } = useRouter();

  const searchParams = useSearchParams();

  const { info } = useUserInfoContext();

  const { product, setProduct } = useProductContextProvider();

  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const pid = searchParams.get("pid");
  const storage = searchParams.get("storage");
  const memory = searchParams.get("memory");

  const [isRemoveDialogBoxOpen, setIsRemoveDialogBoxOpen] = useState(false);

  const [isColorDialogBoxOpen, setIsColorDialogBoxOpen] = useState(false);

  const [showReviews, setShowReviews] = useState<boolean>(false);

  const [color, setColor] = useState<string>(searchParams.get("color")!);
  const [img, setImg] = useState<string>("");

  const [variant, setVariant] = useState<MobileVarient | null>(null);

  const [mrp, setMRP] = useState<string | null>(null);
  const [salePrice, setSalePrice] = useState<string | null>(null);
  const [inStock, setInStock] = useState<number | null>(null);

  const [editPriceAndStock, setEditPriceAndStock] = useState(false);
  const [editVariantAndHighlight, setEditvariantAndHighlight] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMobileDetails = async (url: string, retries: number) => {
      try {
        const { data } = await axios.get(url, {
          params: {
            pid,
          },
        });

        if (!data.data)
          getMobileDetails(`/api/product/mobile/get`, retries - 1);

        setProduct(data.data);

        console.log(data);

        setLoading(false);
      } catch (error) {
        console.warn(`only ${retries} attempts left`);
        if (retries > 0)
          getMobileDetails(`/api/product/mobile/get`, retries - 1);

        console.error(error);
      }
    };

    setLoading(true);
    const id = setTimeout(() => {
      if (category) getMobileDetails(`/api/product/${category}/get`, 5);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    setColor(searchParams.get("color")!);
  }, [searchParams.get("color")]);

  useEffect(() => {
    product?.color.map((element) => {
      if (color === element.color) {
        setImg(element.imgURLs[0]);
      }
    });
  }, [color, product]);

  useEffect(() => {
    const variant = product?.varients.find(
      (element) => memory === element.memory && storage === element.storage
    );

    if (variant) {
      setVariant(variant);
      setSalePrice(variant.salePrice);
      setMRP(variant.mrp);

      const stockInfo = variant.inStock.find(
        (inStock) => color === inStock.color
      );

      setInStock(stockInfo ? stockInfo.stock : null);
    } else {
      setSalePrice(null);
      setMRP(null);
      setInStock(null);
    }
  }, [memory, storage, color, product]);

  useEffect(() => {
    if (editPriceAndStock) setEditvariantAndHighlight(false);
  }, [editPriceAndStock]);

  useEffect(() => {
    if (editVariantAndHighlight) setEditPriceAndStock(false);
  }, [editVariantAndHighlight]);

  const removeProductHandler = async () => {
    try {
      setLoading(true);

      // Delete images based on color
      await Promise.all(
        product!.color.map(async (c) => {
          const imageRefs = c.imgURLs.map((url) => ref(fireStorage, url));
          await Promise.all(
            imageRefs.map(async (imageRef) => {
              try {
                await deleteObject(imageRef);
                console.log("Image Deleted Successfully");
              } catch (err: any) {
                console.error(err.message);
              }
            })
          );
        })
      );

      // Delete default images
      await Promise.all(
        product!.defaultImgs.map(async (imgUrl) => {
          const imgRef = ref(fireStorage, imgUrl);
          try {
            await deleteObject(imgRef);
            console.log("Default Image Deleted Successfully");
          } catch (err: any) {
            console.error(err.message);
          }
        })
      );

      // Delete product from database
      const { data } = await axios.delete(
        `/api/product/${category!.toLowerCase()}/delete`,
        {
          data: {
            _id: product?._id,
          },
        }
      );

      console.log(data.data);

      setLoading(false);
      back();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div
        className={`relative h-fit w-full rounded-lg bg-white dark:bg-gray-950 px-4 py-2 flex flex-col items-center mb-2 `}
      >
        <DialogBox
          isOpen={isRemoveDialogBoxOpen}
          setIsOpen={setIsRemoveDialogBoxOpen}
          primaryBtnAction={removeProductHandler}
          primaryBtnText="Remove"
          secondaryBtnText="Cancel"
          title="Are you sure you want to remove"
          titleStyle="w-72 text-center"
          name={`${product?.brandName} ${product?.productName}`}
          children={<div className="h-10 w-full"></div>}
        />
        <DialogBox
          isOpen={isColorDialogBoxOpen}
          setIsOpen={setIsColorDialogBoxOpen}
          primaryBtnAction={() => console.log("Color Submit")}
          primaryBtnText="Submit"
          secondaryBtnText="Cancel"
          title={`Add New Color Option of ${product?.productName}`}
          titleStyle="font-medium"
          children={
            <div className="h-[620px] w-[920px] my-5 flex flex-col gap-4">
              <div className="h-10 w-full relative">
                <input
                  type="text"
                  name="product-color"
                  id="product-color"
                  required
                  className="h-10 w-72 border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer  dark:bg-gray-900 dark:focus:border-blue-500 "
                />
                <label
                  htmlFor="product-color"
                  className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
                >
                  Color
                </label>
              </div>
              <div className="min-h-fit w-full">
                <ProductColors
                  color="new color"
                  uploadImagesHandler={() =>
                    console.log("Image Upload handler called")
                  }
                />
              </div>
            </div>
          }
        />
        <div className="w-full flex items-center justify-between">
          <div className="flex items-end gap-4">
            <h1 className="text-2xl font-semibold py-1">
              {product?.brandName} {name}
            </h1>
            <button
              onClick={() => setIsRemoveDialogBoxOpen(!isRemoveDialogBoxOpen)}
              className="h-8 px-4  bg-red-100 text-red-600 font-semibold rounded-lg active:scale-95 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
        <main
          className={`h-fit w-full box-border flex pt-6 pb-4 gap-10 overflow-y-auto`}
        >
          <div className="sticky top-0 h-[500px] w-[600px] flex">
            <div className={`h-[500px] w-[86px] mr-1 ml-8 overflow-y-auto `}>
              {product && (
                <ProductImages
                  colorsImgs={product.color}
                  defaultImgs={product.defaultImgs!}
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
              {product?.brandName} {product?.productName} ( {color} , {storage}{" "}
              Storage) ( {memory} RAM )
            </p>
            <p className="font-medium text-gray-500 text-sm mt-[6px] dark:text-gray-400 mb-2">
              <span className="h-5 bg-blue-500 text-white px-1 py-[2px] rounded-md inline-flex items-center">
                {product?.rating}
                <MdStar className="inline" />
              </span>{" "}
              {product?.rating} rating & {product?.reviews.length} reviews
            </p>

            {/** Price Container */}
            <ProductPrice
              priceAndStockEdit={editPriceAndStock}
              setPriceAndStockEdit={setEditPriceAndStock}
              salePrice={salePrice}
              mrp={mrp}
              inStock={inStock}
              memory={memory}
              storage={storage}
              color={color}
              pid={pid!}
              vid={variant?._id!}
            />

            {/* color options And Varient container */}
            <div className="h-[60px] w-full mt-4">
              <div className="h-full w-full flex">
                <div className="h-full w-[120px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Color
                  </span>
                </div>
                {product?.color.map((value, index) => (
                  <Link
                    key={index}
                    href={`?category=${category}&name=${name}&color=${value.color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                    className={`h-10 px-4 flex font-semibold items-center border-2 rounded-sm mr-3 ${
                      color === value.color &&
                      "border-blue-500  dark:bg-gray-950 tracking-wide"
                    }`}
                  >
                    {value.color}
                  </Link>
                ))}
                {
                  // <button
                  //   onClick={() =>
                  //     setIsColorDialogBoxOpen(!isColorDialogBoxOpen)
                  //   }
                  //   className="h-10 w-24 text-xl font-semibold py-1 px-2 rounded-lg bg-gray-950 dark:bg-white text-white dark:text-gray-950 cursor-pointer transition-all active:scale-95"
                  // >
                  //   add
                  // </button>
                }
              </div>
            </div>
            {product?.rams.length! > 0 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      RAM
                    </span>
                  </div>
                  {product?.rams.map((ram) => (
                    <Link
                      key={ram}
                      href={`?category=${category}&name=${name}&color=${color}&storage=${storage}&memory=${ram}&pid=${pid}`}
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
            {product?.rams.length! > 0 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Storage
                    </span>
                  </div>
                  {product?.storages.map((stor) => (
                    <Link
                      key={stor}
                      href={`?category=${category}&name=${name}&color=${color}&storage=${stor}&memory=${memory}&pid=${pid}`}
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

            {/* Variants and key features container */}
            {product && (
              <ProductVariant
                pid={product?._id!}
                color={product?.color!}
                editVariantAndHighlight={editVariantAndHighlight}
                setEditVariantAndHighlight={setEditvariantAndHighlight}
              />
            )}

            <div className="h-10 w-full flex justify-between items-center pr-8 mt-4">
              <p className="text-xl font-semibold ">Ratings & Reviews</p>
            </div>
            <Rating
              rating={product?.rating!}
              totalReviews={product?.reviews.length!}
              reviews={product?.reviews!}
            />
          </main>
        </main>
      </div>
      {/* Reviews Container */}
      <div className="relative h-fit w-full rounded-lg bg-white dark:bg-gray-950 px-4 py-2 flex flex-col mb-2 ">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold py-1">
            {product?.brandName} {name}{" "}
            <span className="font-bold">Reviews</span>
          </h1>
          <button
            type="button"
            className="text-lg text-blue-500 flex items-center cursor-pointer"
            onClick={() => setShowReviews(!showReviews)}
          >
            show {showReviews ? "less" : "more"}{" "}
            <MdOutlineKeyboardArrowDown
              className={`transition-all ${showReviews ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <main
          className={`h-full box-border ${
            showReviews ? "flex" : "hidden"
          } pt-6 pb-4 lg:px-8 gap-10 overflow-y-auto`}
        >
          <div
            className={`${
              product?.reviews.length! > 5 ? "h-[600px]" : "h-fit"
            } w-full flex flex-col gap-3`}
          >
            {product?.reviews.map((review) => (
              <ReviewsCard
                userid={info?.userId!}
                user={info?.username!}
                key={review.username}
                pid={pid!}
                rid={review._id}
                rating={review.rating}
                username={review.username}
                heading={review.heading}
                review={review.review}
                likes={review.likes}
                dislikes={review.dislikes}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default MobileDetails;
