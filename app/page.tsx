import React, { ReactNode } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import MenuContextProvider from "@/contexts/menuContext";
import UserInfoContextProvider from "@/contexts/userInfoContext";
import SigninContextProvider from "@/contexts/signinContext";
import ProductContextProvider from "@/contexts/productContext";

const HomePage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MenuContextProvider>
        <SigninContextProvider>
          <UserInfoContextProvider>
            <ProductContextProvider>
              <Header />
              <section className="flex bg-gray-50">
                <Nav />
                <section
                  className={`h-dvh w-full pt-16 px-3 pb-4 bg-gray-100 dark:bg-gray-900 overflow-y-scroll box-border`}
                >
                  {children}
                </section>
              </section>
            </ProductContextProvider>
          </UserInfoContextProvider>
        </SigninContextProvider>
      </MenuContextProvider>
    </>
  );
};

export default HomePage;
