import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex-[1] bg-secondaryBg py-3 px-4 sticky top-[0px] h-screen">
          <Sidebar />
        </div>
        <div className="relative xl:flex-[5] lg:flex-[4] py-5 px-8 overflow-x-hidden">
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default DashboardLayout;
