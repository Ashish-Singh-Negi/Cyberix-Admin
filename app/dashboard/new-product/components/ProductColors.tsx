"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const ProductColors = ({
  color,
  uploadImagesHandler,
}: {
  color: string;
  uploadImagesHandler: (images: File, color: string) => void;
}) => {
  const [images, setImages] = useState<File[]>([]);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const imageIs: FileList | null = e.target.files;

    uploadImagesHandler(imageIs![0], color);

    console.log("Image Uploaded");

    setImages((prev) => [...prev, imageIs![0]]);
  };

  return (
    <div className="h-[108px] w-full flex gap-4 mb-6">
      <div className="h-28 w-full relative mt-6 border-2 dark:border-[1px] border-custom rounded-md flex flex-col justify-center cursor-pointer gap-2">
        <input
          type="file"
          multiple
          className="absolute cursor-pointer h-[108px] w-full transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer border-[1px] opacity-0"
          onChange={(e) => imageHandler(e)}
          required
        />
        <div className="min-h-fit w-full flex px-1 justify-center">
          {images.length > 0 ? (
            images.map((img) => (
              <div key={img.size}>
                <Image
                  src={URL.createObjectURL(img)}
                  alt="mobile images"
                  width={75}
                  height={75}
                />
              </div>
            ))
          ) : (
            <p className="font-medium text-2xl">Click to Upload</p>
          )}
        </div>
        <span className="h-4 font-medium text-xs text-center pb-[2px]">
          Images of {color} Color
        </span>
      </div>
    </div>
  );
};

export default ProductColors;
