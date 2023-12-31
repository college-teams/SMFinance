import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="flex">
        <div className="relative flex-[1] bg-secondaryBg py-3 px-4">
          <Sidebar />
        </div>
        <div className="relative flex-[4] p-5">
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default DashboardLayout;
