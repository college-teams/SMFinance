package com.project.smfinance.repository;

import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Loan;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface EmiRepository extends AbstractRepository<Emi> {

  List<Emi> findAllByLoanAndPaymentStatus(Loan loan, Emi.PaymentStatus status);

  Optional<Emi> findByIdAndLoanId(long emiId, long loanId);

  List<Emi> findAllByPaymentDueDateAndPaymentStatus(
      LocalDate paymentDueDate, Emi.PaymentStatus paymentStatus);

  List<Emi> findAllByLoan(Loan loan);

  List<Emi> findAllByPaymentDueDateBeforeAndPaymentStatus(
      LocalDate todayDate, Emi.PaymentStatus paymentStatus);

  @Query(
      "SELECT e FROM Emi e WHERE e.paymentDueDate <= :todayDate AND e.paymentStatus = :paymentStatus")
  List<Emi> findAllByPaymentDueDateBeforeOrOnAndPaymentStatus(
      LocalDate todayDate, Emi.PaymentStatus paymentStatus);

  default List<Emi> getAllPendingEMIs(Loan loan) {
    return findAllByLoanAndPaymentStatus(loan, Emi.PaymentStatus.UN_PAID);
  }
}
