package com.project.smfinance.service;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Loan;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.loan.LoanRequest;
import com.project.smfinance.repository.EmiRepository;
import com.project.smfinance.repository.LoanRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class LoanService {

  private final LoanRepository loanRepository;
  private final EmiRepository emiRepository;
  private final CustomerService customerService;

  @Transactional
  public void createLoanAndGenerateEMIs(LoanRequest loanRequest) throws BaseException {
    Customer customer = customerService.getCustomerById(loanRequest.getCustomerId());
    Loan loan = LoanRequest.from(loanRequest, customer);

    Loan savedLoan = loanRepository.save(loan);

    generateEMIs(loanRequest, savedLoan);
  }

  private void generateEMIs(LoanRequest loanRequest, Loan loan) {
    List<Emi> EMIs = new ArrayList<>();

    switch (loanRequest.getLoanCategory()) {
      case DAILY:
        generateEMIsForCategory(loanRequest, loan, 100, ChronoUnit.DAYS, EMIs);
        break;
      case WEEKLY:
        generateEMIsForCategory(loanRequest, loan, 15, ChronoUnit.WEEKS, EMIs);
        break;
      case MONTHLY:
        generateEMIsForCategory(
            loanRequest, loan, loanRequest.getCustomerPreference(), ChronoUnit.MONTHS, EMIs);
        break;
      case TIME_TO_TIME:
        generateSingleEMI(loanRequest, loan, EMIs);
        break;
      default:
        // Handle other cases TODO: do we need to throw an error ?
        break;
    }

    // Save all EMIs in bulk
    emiRepository.saveAll(EMIs);
  }

  private void generateEMIsForCategory(
      LoanRequest loanRequest,
      Loan loan,
      int numberOfEMIs,
      TemporalUnit temporalUnit,
      List<Emi> EMIs) {
    BigDecimal totalLoanAmount = loanRequest.getLoanAmount();
    BigDecimal emiAmount =
        totalLoanAmount.divide(BigDecimal.valueOf(numberOfEMIs), 2, RoundingMode.HALF_UP);
    BigDecimal remainingAmount =
        totalLoanAmount.subtract(emiAmount.multiply(BigDecimal.valueOf(numberOfEMIs)));

    LocalDate currentDate = loanRequest.getStartDate().toLocalDate();

    for (int i = 1; i <= numberOfEMIs; i++) {
      if (i == numberOfEMIs) {
        emiAmount = emiAmount.add(remainingAmount);
      }

      Emi emi = createEmi(loan, emiAmount, currentDate);
      EMIs.add(emi);

      currentDate = currentDate.plus(1, temporalUnit);
    }
  }

  private void generateSingleEMI(LoanRequest loanRequest, Loan loan, List<Emi> EMIs) {
    BigDecimal loanAmount = loanRequest.getLoanAmount();
    Emi emi =
        createEmi(
            loan,
            loanAmount,
            loanRequest.getStartDate().toLocalDate().plusDays(loanRequest.getCustomerPreference()));
    EMIs.add(emi);
  }

  private Emi createEmi(Loan loan, BigDecimal emiAmount, LocalDate dueDate) {
    Emi emi = new Emi();
    emi.setLoan(loan);
    emi.setEmiAmount(emiAmount);
    emi.setPaymentDueDate(dueDate);
    emi.setPaymentStatus(Emi.PaymentStatus.PENDING);
    emi.setPenaltyAmount(BigDecimal.ZERO);
    return emi;
  }
}
