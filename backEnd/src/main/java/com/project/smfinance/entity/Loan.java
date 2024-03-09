package com.project.smfinance.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Loan extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "customerId")
  private Customer customer;

  private BigDecimal loanAmount;

  private BigDecimal penaltyAmount;

  private BigDecimal interestAmount;

  private LocalDate startDate;

  private LocalDate maturityDate;

  private LocalDate closeData;

  @Enumerated(EnumType.STRING)
  private LoanCategory loanCategory;

  @Enumerated(EnumType.STRING)
  private LoanStatus loanStatus;

  private BigDecimal totalAmountPaid;

  private boolean preClosed;

  @OneToOne
  @JoinColumn(name = "referral_id")
  private Referral referral;

  public enum LoanCategory {
    DAILY,
    MONTHLY,
    WEEKLY,
    TIME_TO_TIME
  }

  public enum LoanStatus {
    ACTIVE,
    CLOSED,
    PRE_CLOSED,
  }
}
