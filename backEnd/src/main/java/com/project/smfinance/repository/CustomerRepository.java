package com.project.smfinance.repository;

import com.project.smfinance.entity.Customer;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public interface CustomerRepository extends AbstractRepository<Customer> {

  List<Customer> findAll(Specification<Customer> specification);
}
