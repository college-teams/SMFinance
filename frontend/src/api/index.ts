/* eslint-disable @typescript-eslint/no-explicit-any */

import useToast from "@/hooks/useToast";
import { AbstractResponse, ApiError, GetCurrentUser, HttpMethod, UserLogin } from "@/types/Api";
import { AdminDetails, LoginResponse } from "@/types/admin";
import axios, { AxiosResponse } from "axios";

// eslint-disable-next-line react-hooks/rules-of-hooks
const showToast = useToast();

const handleError = (
  e: any,
  methodName: string,
  errorMessage: string,
  statusCode: number
): ApiError => {
  if (axios.isCancel(e)) {
    console.log("Request is cancelled by abort controller!!");
  } else {
    if (import.meta.env.VITE_DEBUG) {
      console.error(
        "MethodName: ",
        methodName,
        "Message :",
        errorMessage,
        "StatusCode :",
        statusCode,
        "Error stack : ",
        JSON.stringify(e)
      );
    }

    showToast(errorMessage || "Something went wrong", "error");
  }

  return {
    status: false,
    statusCode: statusCode,
    message: errorMessage || "Something went wrong",
  };
};

const makeRequest = async <T>(
  api: any,
  url: string,
  methodName: string,
  errorMessage: string,
  method: HttpMethod,
  data?: any,
  params?: any,
  headers?: HeadersInit
): Promise<T> => {
  try {
    const options = {
      method,
      data,
      headers,
      params,
    };

    const res: AxiosResponse<AbstractResponse<T>> = await api.request({
      url,
      ...options,
    });
    const response = res.data;

    if (response.statusType === "FAILURE") {
      return handleError(
        null,
        methodName,
        response.statusMessage,
        response.statusCode
      ) as unknown as T;
    }

    return response.data;
  } catch (error) {
    let statusCode;
    if (axios.isAxiosError(error)) {
      const responseStatusMessage = error?.response?.data?.statusMessage;
      const responseStatusCode = error?.response?.data?.statusCode;
      errorMessage = responseStatusMessage;
      statusCode = responseStatusCode;
    } else {
      errorMessage =
        errorMessage || "Error occurred while making the HTTP request";
      statusCode = 500;
    }

    return handleError(
      error,
      methodName,
      errorMessage,
      statusCode
    ) as ApiError as T;
  }
};

export const userLogin: UserLogin = async (api, data) => {
  return makeRequest<LoginResponse>(
    api,
    "/admin/login",
    "userLogin",
    "Error occurred while login to the system",
    "POST",
    data
  );
};

export const getCurrentUser: GetCurrentUser = async (api) => {
  return makeRequest<AdminDetails>(
    api,
    "/admin/self",
    "getCurrentUser",
    "Error occurred while fetching loggedIn account details",
    "GET"
  );
};