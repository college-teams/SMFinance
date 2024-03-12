import { LoginRequest } from "@/types/admin";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAPI } from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import { setHeaderToken } from "@/utils";
import { userLogin } from "@/api";

const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const api = useAPI();
  const showToast = useToast();
  const [loading, startLoading, endLoading] = useLoadingIndicator();
  const navigate = useNavigate();

  const loginSuccessHandler = (token: string): void => {
    reset({});
    setHeaderToken(token);
    navigate("/dashboard/");
  };

  const submitHandler = async (data: LoginRequest) => {
    startLoading("/authRequest");
    const res = await userLogin(api, data as LoginRequest);
    if (!isApiError(res)) {
      showToast(`Successfully loggedIn`, "success");
      loginSuccessHandler(res.token);
    }

    endLoading("/authRequest");
  };

  return (
    <div className="absolute bg-secondaryBg top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 py-10 px-10 rounded-md shadow-2xl w-[80%] sm:[60%] md:w-[40%] lg:w-[30%]">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="relative flex flex-col mb-6 gap-y-2">
          <label htmlFor="username" className="relative text-[1.2rem]">
            Email
          </label>
          <input
            type="email"
            id="username"
            className="relative py-2 outline-none text-black px-2 font-medium"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.email &&
              (errors?.email?.message || "Please enter valid input data")}
          </span>
        </div>
        <div className="relative flex flex-col mb-6 gap-y-2">
          <label htmlFor="password" className="relative text-[1.2rem]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="relative py-2 outline-none px-2 text-black font-medium"
            {...register("password", {
              required: "password is required",
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.password &&
              (errors?.password?.message || "Please enter valid input data")}
          </span>
        </div>
        <div className="relative w-full">
          <button
            className={`relative text-center w-full py-2 px-3 rounded bg-addBtnBg ${
              loading && "bg-gray-300"
            }  w-full text-[#fff] py-2 text-[1.3rem] font-medium`}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
