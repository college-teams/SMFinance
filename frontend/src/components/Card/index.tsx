import { LuUsers } from "react-icons/lu";

import { CardProps } from "@/types/dashboard";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Card = ({ title, redirect_link, loading, value }: CardProps) => {
  const navigate = useNavigate();

  const handleClickhandler = () => {
    navigate(redirect_link);
  };

  return (
    <div
      onClick={handleClickhandler}
      className="relative flex items-center bg-secondaryBg gap-6 py-5 px-5 rounded-lg cursor-pointer transition hover:bg-hoverSecondaryBg h-[150px] w-full sm:w-[250px]"
    >
      <div className="relative flex gap-6">
        <div>
          <LuUsers size={25} />
        </div>
        <div className="relative flex flex-col gap-2">
          <span>{title}</span>
          {loading ? (
            <Loader />
          ) : (
            <>
              <span className="relative font-semibold text-[1.3rem]">
                {value}
              </span>
              {/* {showStats && (
                <span className="relative text-[0.75rem]">
                  <span className="relative text-green-500 pr-1">12%</span> more
                  than previous week
                </span>
              )} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
