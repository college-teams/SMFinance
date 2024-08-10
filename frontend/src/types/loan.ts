import { CustomerResponse } from "./customer";

export interface LoanRequest {
  customerId: number;
  loanAmount: number;
  penaltyAmount: number;
  startDate: string;
  interestAmount: number;
  customerPreference: number;
  loanCategory: string;
  referral: ReferralRequest;
}

export interface ReferralRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  documents: ReferralDocumentRequest[];
}

export interface ReferralDocumentRequest {
  documentType: string;
  documentPath: string;
  documentKey: string;
  documentContentType: string;
}

export interface LoanResponse extends LoanRequest {
  id: number;
  customer: CustomerResponse;
  maturityDate: string;
  loanStatus: string;
  preClosed: boolean;
  referral: ReferralResponse;
  emis: EmiResponse[];
}

export interface ReferralResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  documents: ReferralDocumentResponse[];
}

export interface ReferralDocumentResponse extends ReferralDocumentRequest {
  id: number;
}

export interface UpdateEMIStatus {
  customerId: number;
  status: string;
  paymentType: string;
}

export interface EmiResponse {
  id: number;
  emiAmount: number;
  paymentDueDate: string;
  penaltyAmount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentType: string;
}

export enum LoanStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  PRE_CLOSED = "PRE_CLOSED",
}
