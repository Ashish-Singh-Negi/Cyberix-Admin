"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [next, setNext] = useState(0);

  const { push } = useRouter();

  async function resetPassHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/forgotpass", {
        email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setNext((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  async function otpHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/verifyotp", {
        otp,
        email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setNext((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/changepass", {
        email,
        newPassword,
      });

      toast.success(res.data.message);
      push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {next === 0 && (
        <form
          onSubmit={resetPassHandler}
          className="h-[500px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
        >
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-20 mb-12">
            Cyberix
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Admin
            </span>
          </p>
          <h1 className="font-semibold text-2xl">Reset Your Password</h1>

          <div className="h-10 w-full relative mt-10">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="email"
              className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              email
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
          >
            Next
          </button>
        </form>
      )}
      {next === 1 && (
        <form
          onSubmit={otpHandler}
          className="h-[500px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
        >
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-20 mb-12">
            Cyberix
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Admin
            </span>
          </p>
          <h1 className="font-semibold text-2xl">Enter Verification OTP</h1>
          <div className="h-10 w-full relative mt-10">
            <input
              type="number"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="otp"
              className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              otp
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
          >
            Next
          </button>
        </form>
      )}
      {next === 2 && (
        <form
          onSubmit={submitHandler}
          className="h-[500px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
        >
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-20 mb-12">
            Cyberix
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Admin
            </span>
          </p>
          <h1 className="font-semibold text-2xl">Enter New Password</h1>
          <div className="h-10 w-full relative mt-10">
            <input
              type="text"
              name="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="password"
              className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              new password
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
          >
            {next === 2 ? "Submit" : "Next"}
          </button>
        </form>
      )}
    </>
  );
};

export default ResetPass;
