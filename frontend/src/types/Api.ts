import { AxiosInstance } from "axios";
import { AdminDetails, LoginRequest, LoginResponse } from "./admin";
import { LoanRequest, LoanResponse, UpdateEMIStatus } from "./loan";
import { FileResponse } from "./file";
import { CustomerRequest, CustomerResponse } from "./customer";
import { TransactionResponse } from "./transaction";
import { DashboardEntityItemsCount } from "./Dashboard copy";

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

export type GetLoanDetailsById = (
  api: AxiosInstance,
  id:number
) => Promise<LoanResponse | ApiError>;

export type PreCloseLoan = (
  api: AxiosInstance,
  id:number
) => Promise<void | ApiError>;

export type UpdateEmiStatus = (
  api: AxiosInstance,
  loanId:number,
  emiId:number,
  data:UpdateEMIStatus
) => Promise<void | ApiError>;

export type UploadFile = (
  api: AxiosInstance,
  file: File,
  entityKey: string
) => Promise<FileResponse | ApiError>;

export type DeleteFile = (
  api: AxiosInstance,
  fileKey: string
) => Promise<void | ApiError>;

export type DeleteCustomerFile = (
  api: AxiosInstance,
  customerId: number,
  fileKey: string
) => Promise<void | ApiError>;

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

export type SaveCustomer = (
  api: AxiosInstance,
  data: CustomerRequest
) => Promise<CustomerResponse | ApiError>;

export type GetCustomerById = (
  api: AxiosInstance,
  id: number
) => Promise<CustomerResponse | ApiError>;

export type UpdateCustomer = (
  api: AxiosInstance,
  id: number,
  data: CustomerRequest
) => Promise<CustomerResponse | ApiError>;

export type GetDashboardEntityItemsCount = (
  api: AxiosInstance
) => Promise<DashboardEntityItemsCount | ApiError>;
