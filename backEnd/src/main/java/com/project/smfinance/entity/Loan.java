package com.project.smfinance.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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

  @Column(nullable = false)
  private BigDecimal loanAmount;

  @Column(nullable = false)
  private BigDecimal penaltyAmount;

  @Column(nullable = false)
  private BigDecimal interestAmount;

  @Column(nullable = false)
  private LocalDate startDate;

  private LocalDate maturityDate;

  private LocalDate closeData;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private LoanCategory loanCategory;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private LoanStatus loanStatus;

  private BigDecimal totalAmountPaid;

  private boolean preClosed;

  @OneToOne
  @JoinColumn(name = "referral_id")
  private Referral referral;

  @OneToMany(mappedBy = "loan", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  private List<Emi> emis = new ArrayList<>();

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
