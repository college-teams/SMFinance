package com.project.smfinance.models.loan;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.Loan;
import com.project.smfinance.entity.Referral;
import com.project.smfinance.models.referral.ReferralRequest;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequest {

  @NotNull private long customerId;

  @NotNull private BigDecimal loanAmount;

  @NotNull private BigDecimal penaltyAmount;

  @NotNull private BigDecimal interestAmount;

  private Integer customerPreference;

  private LocalDate startDate;

  @NotNull private Loan.LoanCategory loanCategory;

  @NotNull private ReferralRequest referral;

  public static Loan from(LoanRequest loanRequest, Customer customer, Referral referral) {
    Loan loan = new Loan();
    loan.setCustomer(customer);
    loan.setLoanAmount(loanRequest.getLoanAmount());
    loan.setPenaltyAmount(loanRequest.getPenaltyAmount());
    loan.setStartDate(loanRequest.getStartDate());
    loan.setLoanCategory(loanRequest.getLoanCategory());
    loan.setInterestAmount(loanRequest.getInterestAmount());
    loan.setLoanStatus(Loan.LoanStatus.ACTIVE);
    loan.setPreClosed(false);
    loan.setCustomerPreference(loanRequest.getCustomerPreference());
    loan.setReferral(referral);
    return loan;
  }
}
