package com.project.smfinance.models.loan;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.Loan;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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

  private int customerPreference;

  private LocalDateTime startDate = LocalDateTime.now();

  @NotNull private Loan.LoanCategory loanCategory;

  public static Loan from(LoanRequest loanRequest, Customer customer) {
    Loan loan = new Loan();
    loan.setCustomer(customer);
    loan.setLoanAmount(loanRequest.getLoanAmount());
    loan.setPenaltyAmount(loanRequest.getPenaltyAmount());
    loan.setStartDate(loanRequest.getStartDate());
    loan.setLoanCategory(loanRequest.getLoanCategory());
    loan.setLoanStatus(Loan.LoanStatus.ACTIVE);
    loan.setPreClosed(false);
    return loan;
  }
}
