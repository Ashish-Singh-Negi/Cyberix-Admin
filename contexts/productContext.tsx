"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ProductContext = {
  product: MobileProps | null;
  setProduct: Dispatch<SetStateAction<MobileProps | null>>;
};

const ProductContext = createContext<ProductContext | null>(null);

export default function ProductContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [product, setProduct] = useState<MobileProps | null>(null);

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContextProvider() {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error(
      `useProductContextProvider must be used within ProductContextProvider`
    );

  return context;
}
