import React from "react";
import PaymentCard from "./PaymentCard";

const Payments = () => {
  return (
    <div className="min-h-fit w-full bg-white dark:bg-gray-950 rounded-xl">
      <div className="h-12 flex items-center justify-between px-5 mb-2 mt-1">
        <p className="font-semibold text-xl dark:text-white ">Payments</p>
        <div className="h-8 w-[150px] flex items-center gap-1">
          <select
            name="Category"
            id="Category"
            required
            className="h-6 w-full after:box-border text-sm before:box-border bg-transparent outline-none pl-[0.25em] pr-[0.5em] border-[0.3px] border-custom rounded-md focus:border-blue-500 dark:focus:border-blue-500 transition-all dark:bg-gray-950"
          >
            <option value="category">Recieved</option>
            <option value="category">Pending</option>
          </select>
        </div>
      </div>
      <main className="h-[700px] w-full bg-white dark:bg-gray-950 rounded-lg overflow-y-scroll py-2">
        <PaymentCard productName="Galaxy S24 Ultra" status="received" />
      </main>
    </div>
  );
};

export default Payments;
