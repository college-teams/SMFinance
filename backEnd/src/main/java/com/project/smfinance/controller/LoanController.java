package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.loan.LoanRequest;
import com.project.smfinance.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
  public void createLoan(@Valid @RequestBody LoanRequest loanRequest) throws BaseException {
    loanService.createLoanAndGenerateEMIs(loanRequest);
  }
}
