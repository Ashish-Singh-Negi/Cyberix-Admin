import React from "react";

import ProductDetails from "./components/ProductDetails";

const ProductsPage =async () => {
  return (
    <section className="h-full w-full flex justify-center  dark:bg-gray-900 overflow-y-auto">
      <ProductDetails />
    </section>
  );
};

export default ProductsPage;
