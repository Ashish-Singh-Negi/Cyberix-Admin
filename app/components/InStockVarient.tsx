// import React, {  useState } from "react";

// type Props = {
//   color: string;
//   storage: string;
//   submitted: boolean;
// };

// const InStockVarient = ({ color, storage, submitted ,setAvailableVarients}: Props) => {
//   const [productVarients, setProductVarients] = useState<{
//     color: string;
//     storage: string;
//     inStock: number;
//   }>();


//   if (submitted) {
//     setAvailableVarients(productVarients);
//   }

//   return (
//     <div className="h-10 w-full relative mt-6">
//       <input
//         type="number"
//         name={`${color + storage}`}
//         id={`${color + storage}`}
//         onChange={(e) =>
//           setProductVarients({
//             color,
//             storage,
//             inStock: Number(e.target.value),
//           })
//         }
//         value={productVarients?.inStock}
//         required
//         className="h-10 w-full border-[1px] border-gray-900 outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer  dark:bg-gray-900 dark:focus:border-blue-500 dark:border-gray-50"
//       />
//       <label
//         htmlFor={`${color + storage}`}
//         className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
//       >
//         Stock of {color} with {storage}
//       </label>
//     </div>
//   );
// };

// export default InStockVarient;
