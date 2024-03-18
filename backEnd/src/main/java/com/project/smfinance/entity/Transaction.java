package com.project.smfinance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Transaction extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "emiId", nullable = false)
  private Emi emi;

  @Column(nullable = false)
  private BigDecimal amountPaid;

  @Column(nullable = false)
  private LocalDateTime paymentDate;
}
