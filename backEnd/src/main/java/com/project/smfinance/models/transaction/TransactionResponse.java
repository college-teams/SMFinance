package com.project.smfinance.models.transaction;

import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Transaction;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionResponse {
  private Long id;

  private Emi emi;

  private BigDecimal amountPaid;

  private LocalDate paymentDate;

  public static List<TransactionResponse> from(List<Transaction> transactions) {
    return transactions.stream().map(TransactionResponse::from).collect(Collectors.toList());
  }

  public static TransactionResponse from(Transaction transaction) {
    return TransactionResponse.builder()
        .id(transaction.getId())
        .emi(transaction.getEmi())
        .amountPaid(transaction.getAmountPaid())
        .paymentDate(transaction.getPaymentDate())
        .build();
  }
}
