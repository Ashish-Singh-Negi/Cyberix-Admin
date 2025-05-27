"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

import { MdEdit } from "react-icons/md";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileEdit = () => {
  const [editUsername, seteditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const { info, setInfo } = useUserInfoContext();

  const updateUserDataHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seteditUsername(false);
    setEditEmail(false);
    try {
      const res = await axios.post("/api/admin/updateprofile", {
        ...info,
      });
      if (!res.data.success) {
        toast.error("Profile not Updated");
        return;
      }
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => updateUserDataHandler(e)}
      className="flex flex-col items-center gap-4"
    >
      <Image
        src={''}
        alt="avatar"
        height={150}
        width={150}
        className="rounded-full mt-6"
      />
      <p className="font-extrabold tracking-wide -mt-2">Apple G</p>
      <div className="h-10 w-[400px] relative my-4">
        {editUsername ? (
          <input
            type="text"
            name="username"
            id="username"
            value={info.username}
            onChange={(e) => setInfo({ ...info, username: e.target.value })}
            required
            className="h-10 w-full border-2 border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
          />
        ) : (
          <input
            type="text"
            name="username"
            id="username"
            value={info.username}
            required
            readOnly
            className="h-10 w-full border-2 border-custom outline-none transition-colors duration-[0.3s] px-2 rounded-lg peer dark:bg-gray-900 cursor-not-allowed"
          />
        )}
        {editUsername ? (
          <label
            htmlFor="username"
            className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            username
          </label>
        ) : (
          <MdEdit
            className="h-[20px] w-[20px] text-blue-500 absolute top-[10px] cursor-pointer right-2 "
            onClick={() => seteditUsername(!editUsername)}
          />
        )}
      </div>
      <div className="h-10 w-[400px] relative mt-6 mb-4">
        {editEmail ? (
          <input
            type="text"
            name="email"
            id="email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            required
            className="h-10 w-full border-2 border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
          />
        ) : (
          <input
            type="text"
            name="email"
            id="email"
            value={info.email}
            required
            readOnly
            className="h-10 w-full border-2 border-custom outline-none transition-colors duration-[0.3s] px-2 rounded-lg peer dark:bg-gray-900 cursor-not-allowed"
          />
        )}
        {editEmail ? (
          <label
            htmlFor="email"
            className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            email
          </label>
        ) : (
          <MdEdit
            className="h-[20px] w-[20px] text-blue-500 absolute top-[10px] cursor-pointer right-2"
            onClick={() => setEditEmail(!editEmail)}
          />
        )}
      </div>
      <button className="h-10 w-32 my-4 bg-blue-500 text-gray-50 font-medium rounded-3xl tracking-wide">
        Save
      </button>
    </form>
  );
};

export default ProfileEdit;
