package com.project.smfinance.service;

import static com.project.smfinance.codes.SuccessCodes.TRANSACTION_LIST_FETCHED;

import com.project.smfinance.entity.Transaction;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.models.transaction.TransactionResponse;
import com.project.smfinance.repository.TranscationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class TransactionService {
  private final TranscationRepository transcationRepository;

  public ApiResponse<List<TransactionResponse>> getAllTransactions() {
    List<Transaction> transactions = transcationRepository.findAll();

    List<TransactionResponse> transactionResponses = TransactionResponse.from(transactions);
    return new ApiResponse<>(
        TRANSACTION_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, transactionResponses);
  }
}
