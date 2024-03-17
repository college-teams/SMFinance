import { LoanResponse } from "./loan"

export interface TransactionResponse {
    id: number
    emi: EmiResponse
    amountPaid: number
    paymentDate: string
  }
  
  export interface EmiResponse {
    id: number
    loan: LoanResponse
    emiAmount: number
    paymentDueDate: string
    penaltyAmount: number
    totalAmount: number
    paymentStatus: string
  }
  