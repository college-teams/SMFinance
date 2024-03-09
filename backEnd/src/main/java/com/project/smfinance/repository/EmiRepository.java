package com.project.smfinance.repository;

import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Loan;
import java.util.List;
import java.util.Optional;

public interface EmiRepository extends AbstractRepository<Emi> {

  List<Emi> findAllByLoanAndPaymentStatus(Loan loan, Emi.PaymentStatus status);

  Optional<Emi> findByIdAndLoanId(long emiId, long loanId);

  List<Emi> findAllByLoan(Loan loan);

  default List<Emi> getAllPendingEMIs(Loan loan) {
    return findAllByLoanAndPaymentStatus(loan, Emi.PaymentStatus.UN_PAID);
  }
}
