"use client"

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const pageName = pathname.split("/").pop();

  return <div className="relative bg-secondaryBg py-5 rounded-md px-5">
    <span className="relative capitalize text-[1.2rem]">{pageName}</span>
    <div></div>
  </div>;
};

export default Navbar;
