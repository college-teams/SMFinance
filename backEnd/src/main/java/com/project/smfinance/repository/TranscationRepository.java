package com.project.smfinance.repository;

import com.project.smfinance.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface TranscationRepository extends AbstractRepository<Transaction> {
  Page<Transaction> findAll(Specification<Transaction> specification, Pageable pageable);
}
