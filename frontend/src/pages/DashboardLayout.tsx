import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <div className="relative flex transition-all">
        <div className="hidden sm:block w-[75px] hover:w-[35%] fixed z-50 md:sticky md:w-full md:block md:flex-[1.5] lg:flex-[1] bg-secondaryBg py-3 px-4 top-[0px] h-screen transition-all shadow hover:shadow-blue-400 md:shadow-none">
          <Sidebar />
        </div>

        <div className="relative xl:flex-[5] flex-[4] py-5 px-8 overflow-x-hidden mt-14 sm:mt-0 sm:ml-[85px]  md:ml-0">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
