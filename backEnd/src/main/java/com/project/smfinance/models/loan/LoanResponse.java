package com.project.smfinance.models.loan;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Loan;
import com.project.smfinance.entity.Referral;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoanResponse {
  private Long id;

  private Customer customer;

  private BigDecimal loanAmount;

  private BigDecimal penaltyAmount;

  private BigDecimal interestAmount;

  private LocalDate startDate;

  private LocalDate maturityDate;

  private Loan.LoanCategory loanCategory;

  private Loan.LoanStatus loanStatus;

  private BigDecimal totalAmountPaid;

  private boolean preClosed;

  private Referral referral;

  private List<Emi> emis;

  public static List<LoanResponse> from(List<Loan> loans) {
    return loans.stream().map(LoanResponse::from).collect(Collectors.toList());
  }

  public static LoanResponse from(Loan loan) {
    return LoanResponse.builder()
        .id(loan.getId())
        .customer(loan.getCustomer())
        .loanAmount(loan.getLoanAmount())
        .penaltyAmount(loan.getPenaltyAmount())
        .interestAmount(loan.getInterestAmount())
        .startDate(loan.getStartDate())
        .maturityDate(loan.getMaturityDate())
        .loanCategory(loan.getLoanCategory())
        .loanStatus(loan.getLoanStatus())
        .totalAmountPaid(loan.getTotalAmountPaid())
        .preClosed(loan.isPreClosed())
        .referral(loan.getReferral())
        .emis(loan.getEmis())
        .build();
  }
}
