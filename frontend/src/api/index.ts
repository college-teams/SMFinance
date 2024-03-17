/* eslint-disable @typescript-eslint/no-explicit-any */

import useToast from "@/hooks/useToast";
import {
  AbstractResponse,
  ApiError,
  GetCurrentUser,
  GetCustomerList,
  GetLoanList,
  GetTransactionList,
  HttpMethod,
  SaveLoan,
  UploadFile,
  UserLogin,
} from "@/types/Api";
import { AdminDetails, LoginResponse } from "@/types/admin";
import { CustomerResponse } from "@/types/customer";
import { FileResponse } from "@/types/file";
import { LoanResponse } from "@/types/loan";
import { TransactionResponse } from "@/types/transaction";
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

// Loan
export const getLoanList: GetLoanList = async (api) => {
  return makeRequest<LoanResponse[]>(
    api,
    "/loan/",
    "getLoanList",
    "Error occurred while fetching loan list",
    "GET"
  );
};

export const saveLoan: SaveLoan = async (api, data) => {
  return makeRequest<LoanResponse>(
    api,
    `/loan/`,
    "saveLoan",
    "Error occurred while adding loan details",
    "POST",
    data
  );
};

// File
export const uploadFile: UploadFile = async (api, file, entityKey) => {
  const formData = new FormData();
  formData.append("file", file);

  const headers: HeadersInit = {
    "content-type": "multipart/form-data",
  };

  const params = {
    entityKey: entityKey,
  };

  return makeRequest<FileResponse>(
    api,
    `/file`,
    "uploadFile",
    "Error occurred while uploading file to the server",
    "POST",
    formData,
    params,
    headers
  );
};

// Customer
export const getCustomerList: GetCustomerList = async (api) => {
  return makeRequest<CustomerResponse[]>(
    api,
    "/customer/",
    "getCustomerList",
    "Error occurred while fetching customer list",
    "GET"
  );
};

// Loan
export const getTransactionList: GetTransactionList = async (
  api,
  limit = -1,
  customerName = ""
) => {
  const params = {
    limit,
    customerName,
  };

  return makeRequest<TransactionResponse[]>(
    api,
    "/transaction/",
    "getTransactionList",
    "Error occurred while fetching transaction list",
    "GET",
    null,
    params
  );
};
