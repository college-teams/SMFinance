import { getDashboardEntityItemsCount } from "@/api";
import Card from "@/components/Card";
import { LineChartComponent } from "@/components/Charts";
import LatestTransactions from "@/components/LatestTransactions";
import { useAPI } from "@/hooks/useApi";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import { CardProps } from "@/types/dashboard";
import { DashboardEntityItemsCount } from "@/types/Dashboard copy";
import { useEffect, useState } from "react";

const DashboardHome = () => {
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  // States
  const [entityItemsCount, setEntityItemsCount] =
    useState<DashboardEntityItemsCount>();

  const fetchEntityItemsCount = async () => {
    startLoading("/getDashboardEntityItemsCount");
    try {
      const res = await getDashboardEntityItemsCount(api);
      if (!isApiError(res)) {
        setEntityItemsCount(res);
      }
    } finally {
      endLoading("/getDashboardEntityItemsCount");
    }
  };

  // Api calls
  useEffect(() => {
    fetchEntityItemsCount();
  }, []);

  const cardList: CardProps[] = [
    {
      title: "Total Customers",
      redirect_link: "/dashboard/customers",
      showStats: false,
      value: `${entityItemsCount?.totalCustomers}`,
    },
    {
      title: "Total loans",
      redirect_link: "/dashboard/loans",
      showStats: true,
      value: `${entityItemsCount?.totalLoans}`,
    },
    {
      title: "Today Due pending",
      redirect_link: "/dashboard/loans",
      showStats: true,
      value: `₹${entityItemsCount?.totalDuePending}`,
    },
    {
      title: "Today collections",
      redirect_link: "/dashboard/transactions",
      showStats: true,
      value: `₹${entityItemsCount?.todayCollections}`,
    },
  ];

  return (
    <div>
      <div
        className="relative flex mt-4 gap-5 w-full flex-wrap items-center mb-6 justify-around"
        // style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
      >
        {cardList.map((cardItem, i) => (
          <Card {...cardItem} loading={loading} key={i} />
        ))}
      </div>

      <div className="relative mb-6">
        <LatestTransactions />
      </div>

      <div className="relative bg-secondaryBg p-3 md:p-5 rounded-md">
        <p className="relative capitalize font-light mb-10 text-lightWhite text-[1.5rem]">
          weekly recap
        </p>

        <div className="relative h-full">
          <LineChartComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
