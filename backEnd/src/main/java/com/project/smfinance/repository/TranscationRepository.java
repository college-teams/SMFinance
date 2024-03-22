package com.project.smfinance.repository;

import com.project.smfinance.entity.Transaction;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;

public interface TranscationRepository extends AbstractRepository<Transaction> {
  Page<Transaction> findAll(Specification<Transaction> specification, Pageable pageable);

  @Query("SELECT t FROM Transaction t WHERE t.paymentDate = :todayDate")
  List<Transaction> findAllByPaymentDate(LocalDate todayDate);
}
