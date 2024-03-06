package com.project.smfinance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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

  private LocalDateTime startDate;

  private LocalDateTime maturityDate;

  @Enumerated(EnumType.STRING)
  private LoanCategory loanCategory;

  @Enumerated(EnumType.STRING)
  private LoanStatus loanStatus;

  private BigDecimal totalAmountPaid;

  private boolean preClosed;

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
