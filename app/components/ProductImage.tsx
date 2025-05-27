// "use client";
// import React, { useState } from "react";
// import { AddToCartBtn, BuyNowBtn } from "@/app/client_components/Btns";

// import purple_img from "@/public/mobile/samsung/purple/-original-imagx9eg3nze8ctg.webp";
// import purple_img1 from "@/public/mobile/samsung/purple/-original-imagx9egfn7zbvtq.webp";
// import purple_img2 from "@/public/mobile/samsung/purple/-original-imagx9egfss2thwt.webp";
// import purple_img4 from "@/public/mobile/samsung/purple/-original-imagx9egsdguvtyb.webp";

// import gold_img from "@/public/mobile/samsung/gold/-original-imagx9egm9mgmvab.webp";
// import gold_img1 from "@/public/mobile/samsung/gold/-original-imagx9egd2csrur5.webp";
// import gold_img2 from "@/public/mobile/samsung/gold/-original-imagx9egdetafafz.webp";
// import gold_img3 from "@/public/mobile/samsung/gold/-original-imagx9egwjgtgwqf.webp";

// import img from "@/public/mobile/samsung/-original-imagx9pf7dd5ny7n.webp";
// import img1 from "@/public/mobile/samsung/-original-imagx9pfdevtsjey.webp";
// import img2 from "@/public/mobile/samsung/-original-imagx9pff4gxepfy.webp";
// import img3 from "@/public/mobile/samsung/-original-imagx9pfuguwhfhe.webp";
// import Image from "next/image";

// const ProductImage = () => {
//   const [imgIs, setImgIs] = useState(gold_img);

//   return (
//     <div className="h-[500px] w-[600px] flex justify-center">
//       <div className="h-[500px] w-20 mr-5">
//         {[gold_img, gold_img1, gold_img2, gold_img3, img, img1, img2, img3].map(
//           (value, ind) => (
//             <div
//               key={ind}
//               className={`h-20 w-20 mt-1 border-2 transition-all cursor-pointer$ ${
//                 imgIs == value && "border-blue-600"
//               }`}
//               onMouseOver={() => setImgIs(value)}
//             >
//               <Image src={value} alt="img" key={ind} />
//             </div>
//           )
//         )}
//       </div>
//       <div className="h-[500px] w-[416px] flex flex-col">
//         <Image
//           className="border-2 border-gray-300 h-[416px] w-[416px]"
//           src={imgIs}
//           alt="image"
//         />
//         <div className="h-[84px] w-full text-lg font-semibold flex items-center gap-1">
//           <AddToCartBtn />
//           <BuyNowBtn />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductImage;
