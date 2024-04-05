package com.project.smfinance.models.loan;

import com.project.smfinance.entity.Emi;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmiUpdateRequest {
  @NotNull private long customerId;

  @NotNull private Emi.PaymentStatus status;

  @NotNull private Emi.PaymentType paymentType;
}
