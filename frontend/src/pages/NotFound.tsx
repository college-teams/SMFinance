import NotfoundImg from "/images/notfound.webp";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="relative mt-[5rem]">
      <div className="relative flex flex-col items-center justify-center">
        <div>
          <img src={NotfoundImg} alt="notfoundImg" />
        </div>
        <div className="relative flex flex-col items-center justify-center mt-8 mb-10">
          <h2 className="relative text-[1.6rem] font-semibold text-center mb-8">
            Whoooops! Not Found!
          </h2>
          <button className="relative bg-[#008000] text-white px-[2rem] py-3 text-[1rem]" onClick={clickHandler}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
