"use client";

import { useRouter } from "next/navigation";
import { LuUsers } from "react-icons/lu";

import { CardProps } from "@/types/dashboard";

const Card = ({ title, redirect_link }: CardProps) => {
  const router = useRouter();

  const handleClickhandler = () => {
    router.push(redirect_link);
  };

  return (
    <div
      onClick={handleClickhandler}
      className="relative flex bg-secondaryBg gap-6 py-5 px-6 rounded-lg cursor-pointer transition hover:bg-hoverSecondaryBg"
    >
      <div>
        <LuUsers size={25} />
      </div>
      <div className="relative flex flex-col gap-2">
        <span>{title}</span>
        <span className="relative font-semibold text-[1.3rem]">10,278</span>
        <span className="relative text-[0.75rem]">
          <span className="relative text-green-500 pr-1">12%</span> more than
          previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
