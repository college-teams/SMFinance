"use client";

import { useRouter } from "next/navigation";
import { LuUsers } from "react-icons/lu";

import { CardProps } from "@/types/dashboard";

const Card = ({ title, redirect_link, showStats }: CardProps) => {
  const router = useRouter();

  const handleClickhandler = () => {
    router.push(redirect_link);
  };

  return (
    <div
      onClick={handleClickhandler}
      className="relative flex items-center bg-secondaryBg gap-6 py-5 px-5 rounded-lg cursor-pointer transition hover:bg-hoverSecondaryBg  h-[150px]"
    >
      <div className="relative flex gap-6">
        <div>
          <LuUsers size={25} />
        </div>
        <div className="relative flex flex-col gap-2">
          <span>{title}</span>
          <span className="relative font-semibold text-[1.3rem]">10,278</span>
          {showStats && (
            <span className="relative text-[0.75rem]">
              <span className="relative text-green-500 pr-1">12%</span> more
              than previous week
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
