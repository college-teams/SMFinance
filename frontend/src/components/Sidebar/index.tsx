import {
  MdDashboard,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
} from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/configureStore";

const sideBarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: <MdPeople />,
  },
  {
    title: "Loans",
    path: "/dashboard/loans",
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
  const location = useLocation();
  const { user } = useAppSelector((state) => state.appState);

  const { pathname } = location;

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <div className="relative gap-5 items-center my-5 pl-2 mb-10 hidden sm:flex">
          <div className="relative h-[60] w-[60]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.pngs" alt="profile" />
              <AvatarFallback className="text-black" color="#000">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="relative flex-col gap-y-1 flex">
            <span className="relative text-[1.1rem] font-medium">
              {user?.name || 'Admin'}
            </span>
            <span className="relative text-xs text-lightWhite">
              Adminstrator
            </span>
          </div>
        </div>
        <ul className="relative">
          {sideBarItems.map((item) => {
            return (
              <Link
                to={item.path}
                key={item.title}
                className={`flex gap-x-6 md:gap-x-5  items-center mb-4 hover:bg-hoverSecondaryBg py-4 px-4 rounded-md text-lightWhite hover:text-white transition-all ${
                  pathname === item.path && "text-white bg-hoverSecondaryBg"
                } `}
              >
                <span>{item.icon}</span>
                <span className="relative ">{item.title}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
