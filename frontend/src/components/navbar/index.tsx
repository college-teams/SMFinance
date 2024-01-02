"use client";

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import Sidebar from "../sidebar";

const Navbar = () => {
  const pathname = usePathname();
  const [openMenuItems, setOpenMenuItems] = useState(false);
  const pageName = pathname.split("/").pop();

  const handleResize = () => {
    if (window.innerWidth > 500) {
      setOpenMenuItems(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Fragment>
      <div className="fixed top-5 sm:mt-0 sm:mx-0 sm:relative sm:top-0 bg-secondaryBg py-5 sm:rounded-md px-5 -mt-5 -mx-8  z-40 w-full  flex items-center justify-between ">
        <span className="relative capitalize sm:block hidden text-[1.2rem]">
          {pageName}
        </span>

        <span className="sm:hidden">
          {!openMenuItems ? (
            <IoMenuOutline
              onClick={() => setOpenMenuItems((pre) => !pre)}
              className={"cursor-pointer"}
              size={28}
            />
          ) : (
            <IoMdClose
              onClick={() => setOpenMenuItems((pre) => !pre)}
              className={"cursor-pointer"}
              size={28}
            />
          )}
        </span>
        <div>{/* Add dropdown functionality */}</div>
      </div>

      {openMenuItems && (
        <Fragment>
          <div
            className="-mt-[11px] w-[65%] fixed z-40 bg-secondaryBg py-3 px-4 left-0  h-screen transition-all"
            onClick={() => setOpenMenuItems(false)}
          >
            <Sidebar />
          </div>
          <div className=" bg-black/40 w-screen h-screen z-30 fixed" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navbar;
