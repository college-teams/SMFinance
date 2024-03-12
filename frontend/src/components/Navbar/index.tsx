import { Fragment, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
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
        <div className="relative pr-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center">
              <FaRegCircleUser size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative bg-secondaryBg text-white mt-2 hover:bg-primaryBg">
              <DropdownMenuItem className="relative cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
