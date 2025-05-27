import React from "react";

type PaymentCard = {
  productName: string;
  status: "received" | "pending";
};

const PaymentCard = ({
  productName,
  status
}:PaymentCard) => {
  return (
    <div className="h-28 w-[95%] border-[1px] dark:border-none dark:bg-gray-900 rounded-xl mx-auto mb-4 px-6">
      <div className="h-full text-lg flex justify-between items-center">
        {productName}
        <span className="text-green-400 ">{status}</span>
      </div>
    </div>
  );
};

export default PaymentCard;
