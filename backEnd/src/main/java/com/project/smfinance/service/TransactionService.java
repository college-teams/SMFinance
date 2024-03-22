package com.project.smfinance.service;

import static com.project.smfinance.codes.SuccessCodes.TRANSACTION_LIST_FETCHED;

import com.project.smfinance.entity.Transaction;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.models.transaction.TransactionResponse;
import com.project.smfinance.repository.TranscationRepository;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class TransactionService {
  private final TranscationRepository transcationRepository;

  public ApiResponse<List<TransactionResponse>> getAllTransactions(int limit, String customerName) {
    Page<Transaction> transactionPage;
    Pageable pageable;

    pageable =
        PageRequest.of(
            0, limit > 0 ? limit : Integer.MAX_VALUE, Sort.by(Sort.Direction.DESC, "createdAt"));

    Specification<Transaction> specification = filterByCustomerName(customerName);
    transactionPage = transcationRepository.findAll(specification, pageable);

    List<Transaction> transactions = transactionPage.getContent();
    List<TransactionResponse> transactionResponses = TransactionResponse.from(transactions);
    return new ApiResponse<>(
        TRANSACTION_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, transactionResponses);
  }

  private Specification<Transaction> filterByCustomerName(String customerName) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (StringUtils.isNotBlank(customerName)) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("emi").get("loan").get("customer").get("name")),
                "%" + customerName.toLowerCase() + "%"));
      }
      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
