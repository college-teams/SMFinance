package com.project.smfinance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Emi extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "loanId")
  private Loan loan;

  private BigDecimal emiAmount;

  private LocalDate paymentDueDate;

  private BigDecimal penaltyAmount;

  private BigDecimal totalAmount;

  @Enumerated(EnumType.STRING)
  private PaymentStatus paymentStatus;

  public enum PaymentStatus {
    PENDING,
    PAID
  }
}
