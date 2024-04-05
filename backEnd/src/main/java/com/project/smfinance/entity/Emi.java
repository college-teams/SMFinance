package com.project.smfinance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
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
  @JsonIgnore
  @JoinColumn(name = "loanId")
  private Loan loan;

  @Column(nullable = false)
  private BigDecimal emiAmount;

  @Column(nullable = false)
  private LocalDate paymentDueDate;

  @Column(nullable = false)
  private BigDecimal penaltyAmount;

  @Column(nullable = false)
  private BigDecimal totalAmount;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private PaymentStatus paymentStatus;

  @Enumerated(EnumType.STRING)
  private PaymentType paymentType;

  public enum PaymentStatus {
    UN_PAID,
    PAID
  }

  public enum PaymentType {
    ONLINE,
    CASH
  }
}
