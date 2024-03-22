import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { clearLocalStorage, getHeaderToken } from "@/utils";
import { useAppDispatch } from "@/store/configureStore";
import { clearUserDetails } from "@/store/slices/user";
import { useNavigate } from "react-router-dom";

export const useAPI = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const controller = new AbortController();

  const api = useRef(
    axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: { "Content-Type": "application/json" },
    })
  );

  const logoutHandler = () => {
    dispatch(clearUserDetails());
    clearLocalStorage();
    navigate("/");
  };

  useEffect(() => {
    const currentAPI = api.current;

    const requestInterceptorId = currentAPI.interceptors.request.use(
      async (config) => {
        if (!config.url?.includes("/login")) {
          const token = getHeaderToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      }
    );

    const responseInterceptorId = currentAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        // if (axios.isCancel(error)) {
        //   // Request was canceled
        //   return Promise.resolve(null);
        // }

        if (error.response && error.response.status === 401) {
          logoutHandler();
          // Example:
          // removeToken(); // Assuming you have a function to remove the token
          // performLogout(); // Assuming you have a function to handle logout

          // You can also redirect to a login page if needed
          // Example:
          // window.location.href = '/login';
        }

        return Promise.reject(error);
      }
    );

    return () => {
      controller.abort();
      currentAPI.interceptors.request.eject(requestInterceptorId);
      currentAPI.interceptors.response.eject(responseInterceptorId);
    };
  });

  return api.current;
};
