"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fireStorage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useUserInfoContext } from "@/contexts/userInfoContext";

import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import ProductColors from "@/app/dashboard/new-product/components/ProductColors";

import MobileVarients from "./components/MobileVarients";
import LaptopVarients from "./components/LaptopVarients";
import { laptopVarientshandler, mobileVarientsHandler } from "@/utils/handlers";
import Input from "@/app/components/Input";

const NewProductPage = () => {
  const [category, setCategory] = useState("category");
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");

  const [colors, setColors] = useState("");
  const [colorAre, setColorAre] = useState<string[]>([""]);

  const [imagesForAll, setImagesForAll] = useState<File[]>([]);

  const [varientsCount, setVarientCount] = useState([1]);
  const [mobileVarients, setMobileVarients] = useState<MobileVarient[]>([]);
  const [laptopVarients, setLaptopVarients] = useState<LaptopVarient[]>([]);

  const [display, setDisplay] = useState(""); // for Laptop

  const [highlightsCount, setHighlightsCount] = useState([1]);
  const [highlights, setHighlights] = useState<string[]>([]);

  const [isFilled, setIsFilled] = useState(false);

  const [imgRefs, setImgRefs] = useState<
    {
      color: string;
      imgUrls: string;
    }[]
  >([]);

  const { info } = useUserInfoContext();

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const imageIs: FileList = e.target.files!;
    if (!imageIs) return;

    uploadImagesHandler(imageIs[0], "default");

    setImagesForAll((prev) => [...prev, imageIs[0]]);
  };

  const uploadImagesHandler = async (image: File, color: string) => {
    const imagesRef =
      color === "default"
        ? ref(
            fireStorage,
            `images/${category.toLowerCase()}/${brandName.toLowerCase()}/${productName.toLowerCase()}/${
              image.name
            }`
          )
        : ref(
            fireStorage,
            `images/${category.toLowerCase()}/${brandName.toLowerCase()}/${productName.toLowerCase()}/${color}/${
              image.name
            }`
          );

    const uploadImages = await uploadBytes(imagesRef, image);

    await getDownloadURL(uploadImages.ref).then((downloadURL) => {
      setImgRefs((prev) => [...prev, { color: color, imgUrls: downloadURL }]);
    });
  };

  useEffect(() => {
    if (colors.length) setColorAre(colors.split(","));
  }, [colors]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let color = [];

    for (let i = 0; i < colorAre.length; i++) {
      let imgURLs = [];

      for (let j = 0; j < imgRefs.length; j++) {
        if (colorAre[i] === imgRefs[j].color) {
          imgURLs.push(imgRefs[j].imgUrls);
        }
      }

      color.push({
        color: colorAre[i],
        imgURLs: imgURLs,
      });
    }

    let defaultImgs = [];

    for (let i = 0; i < imgRefs.length; i++) {
      if (imgRefs[i].color === "default") {
        defaultImgs.push(imgRefs[i].imgUrls);
      }
    }

    if (category === "mobile") {
      let rams = [];
      let storages = [];

      rams.push(mobileVarients[0].memory);
      storages.push(mobileVarients[0].storage);

      // for mobile
      for (let i = 0; i < mobileVarients.length; i++) {
        if (!rams.includes(mobileVarients[i].memory)) {
          rams.push(mobileVarients[i].memory);
        }

        if (!storages.includes(mobileVarients[i].storage)) {
          storages.push(mobileVarients[i].storage);
        }
      }

      try {
        const { data } = await axios.post(`/api/product/mobile/add`, {
          ...info,
          category,
          brandName,
          productName,
          defaultImgs,
          rams,
          storages,
          mobileVarients,
          color,
          highlights,
        });
        toast.success(`${data.message} added Successfully`);
      } catch (err) {
        console.error(err);
      }
    }

    if (category === "laptop") {
      let rams = [];
      let storages = [];
      let processors = [];
      let gpus = [];

      rams.push(laptopVarients[0].memory);
      storages.push(laptopVarients[0].storage);
      processors.push(laptopVarients[0].processor);
      gpus.push(laptopVarients[0].gpu);

      for (let i = 0; i < laptopVarients.length; i++) {
        if (!rams.includes(laptopVarients[i].memory)) {
          rams.push(laptopVarients[i].memory);
        }

        if (!storages.includes(laptopVarients[i].storage)) {
          storages.push(laptopVarients[i].storage);
        }

        if (!processors.includes(laptopVarients[i].processor)) {
          processors.push(laptopVarients[i].processor);
        }

        if (!gpus.includes(laptopVarients[i].gpu)) {
          gpus.push(laptopVarients[i].gpu);
        }
      }

      try {
        const { data } = await axios.post(`/api/product/laptop/add`, {
          ...info,
          category,
          brandName,
          productName,
          defaultImgs,
          rams,
          display,
          storages,
          processors,
          gpus,
          laptopVarients,
          color,
          highlights,
        });
        toast.success(`${data.message} added Successfully`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (
      brandName.length &&
      productName.length &&
      colors.length &&
      laptopVarients.length | mobileVarients.length &&
      highlights.length &&
      category !== "category"
    )
      setIsFilled(true);
    else setIsFilled(false);
  }, [
    brandName,
    productName,
    colors,
    laptopVarients,
    mobileVarients,
    highlights,
    category,
  ]);

  return (
    <main className="h-full w-full flex justify-center">
      <form
        className={`min-h-fit w-[92%] flex flex-col gap-4 pb-6 overflow-y-auto `}
        onSubmit={submitHandler}
      >
        <h1 className="h-14 w-full text-3xl font-extrabold flex justify-center items-center text-gray-900 dark:text-gray-50 mb-6 mt-6 text-center">
          List Your Product on Cybrix
        </h1>
        <div className="h-10 w-full flex gap-3 items-center">
          <div className="h-8 w-1/3 flex items-center gap-2">
            <label htmlFor="Category" className="text-lg font-medium inline">
              Select Category:{" "}
            </label>
            <select
              name="Category"
              id="Category"
              required
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 w-[70%] px-2 border-2 rounded-lg border-gray-300 dark:border-custom focus:border-blue-500 outline-none dark:focus:border-blue-500 transition-all dark:bg-gray-900"
            >
              <option value="category">category</option>
              <option value="mobile">mobile</option>
              <option value="laptop">laptop</option>
              <option value="cabinate">Cabinate</option>
              <option value="keyboard">keyboard</option>
              <option value="mouse">mouse</option>
              <option value="headphone">headphone</option>
              <option value="psu">PSU</option>
              <option value="processor">Processor</option>
              <option value="graphic card">Graphic Card</option>
              <option value="memory">Memory</option>
              <option value="moniter">Moniter</option>
              <option value="storage">Storage</option>
            </select>
          </div>
          <div className="h-10 w-1/3 relative">
            <input
              type="text"
              name="comapany-name"
              id="comapany-name"
              onChange={(e) => setBrandName(e.target.value)}
              value={brandName}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="comapany-name"
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Company Name
            </label>
          </div>
          <div className="h-10 w-1/3 relative">
            <input
              type="text"
              name="product-name"
              id="product-name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="product-name"
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Product Name
            </label>
          </div>
        </div>
        <div className="h-10 w-full relative mt-8">
          <input
            type="text"
            name="product-color"
            id="product-color"
            onChange={(e) => setColors(e.target.value)}
            value={colors}
            required
            className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer  dark:bg-gray-900 dark:focus:border-blue-500 "
          />
          <label
            htmlFor="product-color"
            className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            Color
          </label>
        </div>
        {colors !== "" && (
          <div className="min-h-fit w-full grid grid-cols-2 gap-4 mt-2">
            {colorAre.map((colorIs) => (
              <ProductColors
                key={colorIs}
                color={colorIs}
                uploadImagesHandler={uploadImagesHandler}
              />
            ))}
            <div className="h-[108px] w-full flex gap-4 mb-6">
              <div className="h-28 w-full relative mt-6 border-gray-300  dark:border-custom border-2 dark:border-[1px] rounded-md flex flex-col justify-center cursor-pointer gap-2">
                <input
                  type="file"
                  multiple
                  className="absolute cursor-pointer h-[108px] w-f border-gray-300ull  dark:border-custom transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer border-2 opacity-0"
                  onChange={(e) => imageHandler(e)}
                />
                <div className="min-h-fit w-full flex px-1 justify-center">
                  {imagesForAll.length > 0 ? (
                    imagesForAll.map((img) => (
                      <Image
                        key={img.size}
                        src={URL.createObjectURL(img)}
                        alt="mobile images"
                        height={75}
                        width={75}
                      />
                    ))
                  ) : (
                    <p className="font-medium text-2xl">Click to Upload</p>
                  )}
                </div>
                <span className="h-4 font-medium text-xs text-center pb-[2px]">
                  Images for all color
                </span>
              </div>
            </div>
          </div>
        )}
        {category === "laptop" && (
          <div className="h-10 w-full relative mt-6">
            <input
              type="text"
              name={`display-type`}
              id={`display`}
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor={`display`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Display Type
            </label>
          </div>
        )}
        <div className="w-full flex flex-col gap-2 items-center mt-6">
          {category === "mobile" &&
            varientsCount?.map((count) => (
              <MobileVarients
                key={`varient-${count}`}
                count={count}
                colors={colorAre}
                setMobileVarients={setMobileVarients}
                varientHandler={mobileVarientsHandler}
              />
            ))}
          {category === "laptop" &&
            varientsCount?.map((count) => (
              <LaptopVarients
                key={`varient-${count}`}
                count={count}
                colors={colorAre}
                setLaptopVarients={setLaptopVarients}
                varientHandler={laptopVarientshandler}
              />
            ))}
          <button
            type="button"
            onClick={() =>
              setVarientCount((prev) => [...prev, prev.length + 1])
            }
            className="h-10 w-full rounded-md bg-gray-950 dark:bg-white transition-all active:scale-95"
          >
            <p className="text-xl font-medium text-white dark:text-gray-950">
              + more varients
            </p>
          </button>
        </div>
        <div className="w-full flex flex-col gap-2 items-center mt-6">
          {highlightsCount.map((val, index) => (
            <Input
              name={"highlight"}
              label="highlight"
              setState={setHighlights}
              count={index}
              key={10 + index}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setHighlightsCount((prev) => [...prev, prev.length + 1])
            }
            className="h-10 w-full mt-2 rounded-md bg-gray-950 dark:bg-white transition-all active:scale-95"
          >
            <p className="text-xl font-medium text-white dark:text-gray-950">
              + more Highlights
            </p>
          </button>
        </div>
        <div className="h-10 w-full flex justify-center mt-6">
          {isFilled && (
            <button
              type="submit"
              className="h-10 w-40 font-semibold border-2 py-1 dark:border-[1px] rounded-xl transition-all bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 active:scale-100 hover:scale-105 hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-50"
            >
              Add Product
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default NewProductPage;
