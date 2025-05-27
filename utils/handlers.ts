

export const mobileVarientsHandler = (
  // _id: string,
  memory: string,
  storage: string,
  mrp: string,
  salePrice: string,
  inStock: InStock[],
  setMobileVarients: React.Dispatch<React.SetStateAction<MobileVarient[]>>
) => {
  setMobileVarients((prev) => [
    ...prev,
    {
      // _id: _id,
      memory: memory,
      storage: storage,
      mrp: mrp,
      salePrice: salePrice,
      inStock: inStock,
    },
  ]);
};

export const laptopVarientshandler = (
  // _id: string,
  memory: string,
  storage: string,
  mrp: string,
  salePrice: string,
  processor: string,
  gpu: string,
  inStock: InStock[],
  setLaptopVarients: React.Dispatch<React.SetStateAction<LaptopVarient[]>>
) => {
  setLaptopVarients((prev) => [
    ...prev,
    {
      // _id: _id,
      memory: memory,
      storage: storage,
      processor: processor,
      gpu: gpu,
      mrp: mrp,
      salePrice: salePrice,
      inStock: inStock,
    },
  ]);
};
