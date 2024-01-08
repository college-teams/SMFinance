import Card from "@/components/card";
import { LineChartComponent } from "@/components/charts";
import LatestTransactions from "@/components/latestTransactions";
import { CardProps } from "@/types/dashboard";

const Dashboard = () => {
  const cardList: CardProps[] = [
    {
      title: "Total Customers",
      redirect_link: "/dashboard/customers",
    },
    {
      title: "Total loans",
      redirect_link: "/dashboard/loans",
    },
    {
      title: "Today Due pending",
      redirect_link: "/dashboard/transactions",
    },
    {
      title: "Today collections",
      redirect_link: "/dashboard/transactions",
    },
  ];

  return (
    <div>
      <div className="relative flex mt-4 gap-4 justify-center xl:justify-between w-full flex-wrap items-center mb-6">
        {cardList.map((cardItem, i) => (
          <Card {...cardItem} key={i} />
        ))}
      </div>

      <div className="relative mb-6">
        <LatestTransactions />
      </div>

      <div className="relative bg-secondaryBg p-5 rounded-md">
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

export default Dashboard;
