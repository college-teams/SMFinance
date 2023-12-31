"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
} from "react-icons/md";

const sideBarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Customers",
    path: "/dashboard/customer",
    icon: <MdPeople />,
  },
  {
    title: "Loans",
    path: "/dashboard/loan",
    icon: <MdShoppingBag />,
  },
  {
    title: "Transactions",
    path: "/dashboard/transactions",
    icon: <MdAttachMoney />,
  },
  {
    title: "Revenue",
    path: "/dashboard/revenue",
    icon: <MdWork />,
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: <MdAnalytics />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="relative">
      <div className="relative flex gap-5 items-center my-5 pl-2">
        <div>
          <Image
            src={"/images/noavatar.png"}
            alt="avatar"
            width={60}
            height={60}
            className="relative rounded-full"
          />
        </div>

        <div className="relative flex flex-col gap-y-1">
          <span className="relative text-[1.1rem] font-medium">Nanthagopal</span>
          <span className="relative text-xs text-lightWhite">Adminstrator</span>
        </div>
      </div>
      <ul>
        {sideBarItems.map((item) => {
          return (
            <Link
              href={item.path}
              key={item.title}
              className={`flex gap-x-4 items-center mb-4 hover:bg-[#2e374a] py-4 px-4 rounded-md text-lightWhite hover:text-white transition-all ${
                pathname === item.path && "text-white bg-[#2e374a]"
              } `}
            >
              <span>{item.icon}</span>
              <span className="relative">{item.title}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
