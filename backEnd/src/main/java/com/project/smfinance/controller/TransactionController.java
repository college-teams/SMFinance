package com.project.smfinance.controller;

import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.models.transaction.TransactionResponse;
import com.project.smfinance.service.TransactionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class TransactionController {

  private final TransactionService transactionService;

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<TransactionResponse>>> getLoanList() {
    return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
  }
}
