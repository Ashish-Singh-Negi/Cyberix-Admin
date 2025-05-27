"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";

const VerifyPage = ({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) => {
  console.log(searchParams.email);
  const [otp, setOtp] = useState();

  const otpHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = axios.post("/api/auth/verifyotp", {
        otp,
        ...searchParams,
      });
      console.log(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={otpHandler}
      className="h-[500px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
    >
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-20 mb-12">
        Cyberix
        
      </p>
      <h1 className="font-semibold text-2xl">Enter Verification Code</h1>

      <div className="h-10 w-full relative mt-10">
        <input
          type="number"
          name="code"
          id="code"
          required
          className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor="code"
          className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          OTP
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
      >
        Next
      </button>
    </form>
  );
};

export default VerifyPage;
