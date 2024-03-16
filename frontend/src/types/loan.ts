import { CustomerResponse } from "./customer";

export interface LoanRequest {
  customerId: number;
  loanAmount: number;
  penaltyAmount: number;
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
  startDate: string;
  maturityDate: string;
  loanStatus: string;
  preClosed: boolean;
  referral: ReferralResponse;
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
