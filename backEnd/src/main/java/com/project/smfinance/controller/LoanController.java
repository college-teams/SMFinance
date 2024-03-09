package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.loan.LoanRequest;
import com.project.smfinance.models.loan.LoanResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loan")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class LoanController {

  private final LoanService loanService;

  @PostMapping("/")
  public ResponseEntity<ApiResponse<LoanResponse>> createLoan(
      @Valid @RequestBody LoanRequest loanRequest) throws BaseException {
    return new ResponseEntity<>(
        loanService.createLoanAndGenerateEMIs(loanRequest), HttpStatus.CREATED);
  }
}
