import React, { useEffect, useState } from "react";
import axios from "axios";

import { useUserInfoContext } from "@/contexts/userInfoContext";

import ProductCard from "./ProductCard";

const ListedProduct = () => {
  const [category, setCategory] = useState<Category>("Category");
  const [listedProducts, setListedProducts] = useState<
    Array<MobileProps | LaptopProps>
  >([]);

  const { info } = useUserInfoContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProductsDetails = (category: Category) => {
    if (category !== "Category") {
      (async () => {
        try {
          setIsLoading(true);
          const { email } = info;
          const { data } = await axios.post(
            `/api/product/${category.toLowerCase()}/getAll`,
            {
              email,
            }
          );
          console.log(data.data);
          setListedProducts(data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  };

  useEffect(() => {
    getProductsDetails(category);
  }, [category]);

  return (
    <div className="min-h-fit w-full bg-white dark:bg-gray-950 py-3 rounded-xl">
      <div className="font-semibold text-xl mb-2 px-6 flex justify-between dark:text-gray-200">
        Your Listed Products on Cyberix{" "}
        <div className="h-8 w-[150px] flex items-center gap-2 min-w-[15ch] max-w-[30ch]">
          <select
            name="Category"
            id="Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="h-6 w-full after:box-border text-sm before:box-border bg-transparent outline-none pl-[0.25em] pr-[0.5em] border-[0.3px] border-custom rounded-md focus:border-blue-500 dark:focus:border-blue-500 transition-all dark:bg-gray-950"
          >
            <option value="Category">Category</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Cabinate">Cabinate</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Headphone">Headphone</option>
            <option value="PSU">PSU</option>
            <option value="Processor">Processor</option>
            <option value="Graphic Card">Graphic Card</option>
            <option value="Memory">Memory</option>
            <option value="Moniter">Moniter</option>
            <option value="Storage">Storage</option>
          </select>
        </div>
      </div>
      <main className="h-[700px] w-full rounded-lg overflow-y-auto ">
        {listedProducts ? (
          isLoading ? (
            <p className="font-bold text-2xl text-center">Loading...</p>
          ) : (
            listedProducts.map((item, index) => (
              <div
                className="h-fit my-4 w-full box-border flex items-center rounded-lg"
                key={item.category + index}
              >
                <div className={` h-fit w-full flex justify-center group `}>
                  {/* <ProductCard
                    _id={item._id}
                    category={item.category}
                    brandName={item.brandName}
                    productName={item.productName}
                    defaultImgs={item.defaultImgs}
                    rams={item.rams}
                    storages={item.storages}
                    processors={item.processors}
                    gpus={item.gpus}
                    color={item.color}
                    varients={item.varients}
                    highlights={item.highlights}
                    rating={item.rating}
                    reviews={item.reviews}
                  /> */}
                  <ProductCard
                    key={item.productName}
                    pid={item._id}
                    brandName={item.brandName}
                    category={item.category}
                    productName={item.productName}
                    color={item.color[0].color}
                    varient={item.varients[0]}
                    highlights={item.highlights}
                    img={item.color[0].imgURLs[0]}
                    rating={item.rating}
                    reviews={item.reviews}
                  />
                </div>
              </div>
            ))
          )
        ) : (
          <p className="h-full flex items-center justify-center">
            Select Category
          </p>
        )}
      </main>
    </div>
  );
};

export default ListedProduct;
