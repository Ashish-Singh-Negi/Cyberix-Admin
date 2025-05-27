"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

const DialogBox = ({
  isOpen,
  setIsOpen,
  title,
  titleStyle,
  name,
  primaryBtnText,
  primaryBtnAction,
  secondaryBtnText,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  titleStyle?: string;
  name?: string;
  primaryBtnText: string;
  primaryBtnAction: () => void;
  secondaryBtnText: string;
  children?: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) openDailogBox();
    else closeDailogBox();
  }, [isOpen]);

  function openDailogBox() {
    dialogRef.current?.showModal();
  }

  function closeDailogBox() {
    dialogRef.current?.close();
  }

  const primaryBtnhandler = () => {
    primaryBtnAction();
    closeDailogBox();
  };

  const secondryBtnHandler = () => {
    closeDailogBox();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-20 h-full w-full bg-black bg-opacity-60 flex justify-center items-center">
          <dialog
            ref={dialogRef}
            className="h-fit w-fit p-10 bg-white dark:bg-black outline-none rounded-lg flex flex-col"
          >
            <p className={`${titleStyle}`}>
              {title} <span className="font-medium block">{name}</span>
            </p>
            {children}
            <div className="w-full flex justify-between">
              <button
                onClick={primaryBtnhandler}
                className="px-8 py-1 bg-gray-950 text-white dark:bg-white dark:text-gray-950 border-none  dark:border-2 active:scale-95 transition-all"
              >
                {primaryBtnText}
              </button>
              <button
                onClick={secondryBtnHandler}
                className="px-8 py-1 border-2 dark:border-white active:scale-95 transition-all"
              >
                {secondaryBtnText}
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default DialogBox;
