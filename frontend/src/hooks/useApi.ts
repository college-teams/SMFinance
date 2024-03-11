import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import useToast from "./useToast";
import { clearLocalStorage, getHeaderToken } from "@/utils";

export const useAPI = () => {
  const showToast = useToast();

  const controller = new AbortController();

  const api = useRef(
    axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: { "Content-Type": "application/json" },
    })
  );

  const logoutHandler = () => {
    clearLocalStorage();
    showToast("Logged out successfully!!", "success");
  };

  useEffect(() => {
    const currentAPI = api.current;

    const requestInterceptorId = currentAPI.interceptors.request.use(
      async (config) => {
        // ADD Token assign code.
        const token = getHeaderToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
