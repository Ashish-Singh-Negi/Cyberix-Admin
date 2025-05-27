import React from "react";

export default function ResetPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen absolute bg-lightGray dark:bg-darkGray flex justify-center items-center ">
      {children}
    </div>
  );
}
