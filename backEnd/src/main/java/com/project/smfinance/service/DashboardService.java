package com.project.smfinance.service;

import static com.project.smfinance.codes.SuccessCodes.ENTITIES_ITEM_COUNT_FETCHED;

import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Transaction;
import com.project.smfinance.models.dashboard.DashboardEntityItemsCountResponse;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.CustomerRepository;
import com.project.smfinance.repository.EmiRepository;
import com.project.smfinance.repository.LoanRepository;
import com.project.smfinance.repository.TranscationRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class DashboardService {

  private final CustomerRepository customerRepository;
  private final LoanRepository loanRepository;
  private final EmiRepository emiRepository;
  private final TranscationRepository transactionRepository;

  public ApiResponse<DashboardEntityItemsCountResponse> getEntityItemsCount() {
    long customerCount = customerRepository.count();
    long loanCount = loanRepository.count();
    BigDecimal duePendingEMIs = sumTotalAmountOfUnpaidEMIsToday();
    BigDecimal totalCollectionAmount = sumTotalAmountOfTransactionsToday();

    DashboardEntityItemsCountResponse dashboardEntityItemsCountResponse =
        DashboardEntityItemsCountResponse.from(
            customerCount, loanCount, duePendingEMIs, totalCollectionAmount);
    return new ApiResponse<>(
        ENTITIES_ITEM_COUNT_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        dashboardEntityItemsCountResponse);
  }

  private BigDecimal sumTotalAmountOfUnpaidEMIsToday() {
    LocalDate today = LocalDate.now();
    List<Emi> unpaidEmis =
        emiRepository.findAllByPaymentDueDateBeforeOrOnAndPaymentStatus(
            today, Emi.PaymentStatus.UN_PAID);
    return unpaidEmis.stream().map(Emi::getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  private BigDecimal sumTotalAmountOfTransactionsToday() {
    LocalDate today = LocalDate.now();
    List<Transaction> transactions = transactionRepository.findAllByPaymentDate(today);
    return transactions.stream()
        .map(Transaction::getAmountPaid)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
