package com.project.smfinance.models.dashboard;

import java.math.BigDecimal;
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
public class DashboardEntityItemsCountResponse {

  private Long totalCustomers;
  private Long totalLoans;
  private BigDecimal totalDuePending;
  private BigDecimal todayCollections;

  public static DashboardEntityItemsCountResponse from(
      Long customersCount, Long loansCount, BigDecimal duePending, BigDecimal todayCollections) {
    return DashboardEntityItemsCountResponse.builder()
        .totalCustomers(customersCount)
        .totalLoans(loansCount)
        .totalDuePending(duePending)
        .todayCollections(todayCollections)
        .build();
  }
}
