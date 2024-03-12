import NotfoundImg from "/images/notfound.webp";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="relative mt-[10rem]">
      <div className="relative flex flex-col items-center justify-center">
        <div>
          <img src={NotfoundImg} alt="notfoundImg" />
        </div>
        <div className="relative flex flex-col items-center justify-center mb-10">
          <h2 className="relative text-[2.8rem] font-semibold text-center mb-10">
            Whoooops! Not Found!
          </h2>
          <button className="relative bg-[#008000] text-white px-[6rem] py-6 text-[1.6rem]" onClick={clickHandler}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
