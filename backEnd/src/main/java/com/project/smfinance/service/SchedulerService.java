package com.project.smfinance.service;

import com.project.smfinance.entity.Emi;
import com.project.smfinance.repository.EmiRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
@Slf4j
public class SchedulerService {

  private final EmiRepository emiRepository;

  @Scheduled(cron = "0 0 0 * * *")
  public void processOverdueEMIs() {
    LocalDate previousDay = LocalDate.now().minusDays(0); // Get previous day

    // Fetch overdue EMIs
    List<Emi> overdueEMIs =
        emiRepository.findAllByPaymentDueDateAndPaymentStatus(
            previousDay, Emi.PaymentStatus.UN_PAID);

    // Process each overdue EMI
    for (Emi emi : overdueEMIs) {
      BigDecimal penaltyAmount = emi.getLoan().getPenaltyAmount();
      emi.setPenaltyAmount(penaltyAmount);
      emi.setTotalAmount(emi.getEmiAmount().add(penaltyAmount));
      emiRepository.save(emi);
    }
  }
}
