import { AxiosInstance } from "axios";
import { AdminDetails, LoginRequest, LoginResponse } from "./admin";
import { LoanRequest, LoanResponse } from "./loan";
import { FileResponse } from "./file";
import { CustomerResponse } from "./customer";
import { TransactionResponse } from "./transaction";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type AbstractResponse<T> = {
  statusCode: number;
  statusType: string;
  statusMessage: string;
  httpStatusCode: string;
  timestamp: string;
  data: T;
};

export type ApiError = {
  status: boolean;
  message: string;
  statusCode: number;
};

export const isApiError = (data: unknown): data is ApiError => {
  return (data as ApiError).status != null;
};

export type UserLogin = (
  api: AxiosInstance,
  data: LoginRequest
) => Promise<LoginResponse | ApiError>;

export type GetCurrentUser = (
  api: AxiosInstance
) => Promise<AdminDetails | ApiError>;

export type GetLoanList = (
  api: AxiosInstance,
  customerName?: string
) => Promise<LoanResponse[] | ApiError>;

export type UploadFile = (
  api: AxiosInstance,
  file: File,
  entityKey: string
) => Promise<FileResponse | ApiError>;

export type GetCustomerList = (
  api: AxiosInstance,
  customerName?: string
) => Promise<CustomerResponse[] | ApiError>;

export type SaveLoan = (
  api: AxiosInstance,
  data: LoanRequest
) => Promise<LoanResponse | ApiError>;

export type GetTransactionList = (
  api: AxiosInstance,
  limit?: number,
  customerName?: string
) => Promise<TransactionResponse[] | ApiError>;
