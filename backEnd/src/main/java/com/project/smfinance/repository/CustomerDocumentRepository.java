package com.project.smfinance.repository;

import com.project.smfinance.entity.CustomerDocument;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerDocumentRepository extends AbstractRepository<CustomerDocument> {
  Optional<CustomerDocument> findByCustomer_IdAndDocumentKey(Long customerId, String key);

  Optional<CustomerDocument> findByDocumentKey(String key);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM customer_document WHERE id = :id", nativeQuery = true)
  void deleteCustomerDocument(long id);
}
