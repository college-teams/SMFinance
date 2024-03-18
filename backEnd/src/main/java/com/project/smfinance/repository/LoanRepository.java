package com.project.smfinance.repository;

import com.project.smfinance.entity.Loan;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public interface LoanRepository extends AbstractRepository<Loan> {
  List<Loan> findAll(Specification<Loan> specification);
}
