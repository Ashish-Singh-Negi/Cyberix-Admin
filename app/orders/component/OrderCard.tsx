"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

type OrderCardProps = {
  user: string;
  orderId: string;
  productName: string;
  img: string;
  price: number;
  quantity: number;
  shipped: boolean;
};

const OrderCard = ({
  user,
  orderId,
  productName,
  price,
  quantity,
  shipped,
  img,
}: OrderCardProps) => {
  return (
    <div className="h-20 w-full relative m-auto border-b-[0.5px] border-gray-300 dark:border-gray-600 grid grid-cols-6 items-center">
      <div className="h-full w-full flex justify-center items-center">
        <Image
          src={img}
          alt="product image"
          height={50}
          width={50}
          className="rounded-md "
        />
      </div>
      <span className="flex justify-center">{productName}</span>

      <span className="flex justify-center">{user}</span>
      <span className="flex justify-center">{quantity}</span>
      <span className="flex justify-center">{price}/-</span>
      <span className="flex justify-center font-medium">
        {shipped ? (
          <span className="text-green-500 dark:text-green-400">shipped</span>
        ) : (
          <span className="text-red-500 dark:text-red-400">pending</span>
        )}
      </span>
      <Link
        href={`orders/details?id=${orderId}`}
        className="absolute top-8 right-4 text-blue-400"
      >
        <FaEdit />
      </Link>
    </div>
  );
};

export default OrderCard;
