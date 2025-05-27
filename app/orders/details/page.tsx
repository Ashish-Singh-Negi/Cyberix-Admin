import Image from "next/image";
import React from "react";


const OrderDetailsPage = () => {
  return (
    <>
      <div className="h-full w-full p-20 flex rounded-md gap-10">
        <Image src={''} alt="" className="h-full w-[700px]  rounded-md" />
        <div className="h-full w-full p-4 rounded-md grid grid-cols-2">
          <p className="text-xl font-medium">username :</p>
          <span className="text-lg font-normal">Apple Gamer</span>
          <p className="text-xl font-medium">product : </p>
          <span className="text-lg font-normal">
            Galaxy S24 Ultra (Titanium Gold , 256GB)
          </span>
          <p className="text-xl font-medium">Brand : </p>
          <span className="text-lg font-normal">Samsung</span>
          <p className="text-xl font-medium">orderId : </p>
          <span className="text-lg font-normal">sgfgyiagfh34jf3948fiaifu4</span>
          <p className="text-xl font-medium">price : </p>
          <span className="text-lg font-normal">129999/-</span>
          <p className="text-xl font-medium">quantity : </p>
          <span className="text-lg font-normal">1</span>
          <p className="text-xl font-medium">category : </p>
          <span className="text-lg font-normal">mobile</span>
          <p className="text-xl font-medium">shipped : </p>
          <select className="h-10">
            <option value="pending">pending</option>
            <option value="complete">complete</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
