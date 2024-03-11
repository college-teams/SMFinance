import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="absolute bg-secondaryBg top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 py-10 px-10 rounded-md shadow-2xl w-[80%] sm:[60%] md:w-[40%] lg:w-[30%]">
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col mb-8 gap-y-2">
          <label htmlFor="username" className="relative text-[1.2rem]">
            Email
          </label>
          <input
            type="email"
            id="username"
            className="relative py-2 outline-none"
          />
        </div>
        <div className="relative flex flex-col mb-10 gap-y-2">
          <label htmlFor="password" className="relative text-[1.2rem]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="relative py-2 outline-none"
          />
        </div>
        <div className="relative w-full">
          <button className="relative text-center w-full py-3 px-3 rounded bg-addBtnBg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
