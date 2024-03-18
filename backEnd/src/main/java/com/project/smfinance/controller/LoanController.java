package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.loan.EmiUpdateRequest;
import com.project.smfinance.models.loan.LoanRequest;
import com.project.smfinance.models.loan.LoanResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.LoanService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class LoanController {

  private final LoanService loanService;

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<LoanResponse>>> getLoanList(
      @RequestParam(name = "customerName", defaultValue = "") String customerName) {
    return new ResponseEntity<>(loanService.getAllLoans(customerName), HttpStatus.OK);
  }

  @GetMapping("/{loanId}")
  public ResponseEntity<ApiResponse<LoanResponse>> getLoanDetails(@PathVariable long loanId)
      throws BaseException {
    return new ResponseEntity<>(loanService.getLoanDetails(loanId), HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<ApiResponse<LoanResponse>> createLoan(
      @Valid @RequestBody LoanRequest loanRequest) throws BaseException {
    return new ResponseEntity<>(
        loanService.createLoanAndGenerateEMIs(loanRequest), HttpStatus.CREATED);
  }

  @PutMapping("/{loanId}/emi/{emiId}")
  public ResponseEntity<ApiResponse> updateEmiStatus(
      @PathVariable Long loanId,
      @PathVariable Long emiId,
      @Valid @RequestBody EmiUpdateRequest emiUpdateRequest)
      throws BaseException {
    return new ResponseEntity<>(
        loanService.updateEMI(emiUpdateRequest, loanId, emiId), HttpStatus.OK);
  }

  @PutMapping("/{loanId}/pre-close")
  public ResponseEntity<ApiResponse> preCloseLoan(@PathVariable Long loanId) throws BaseException {
    return new ResponseEntity<>(loanService.preCloseLoan(loanId), HttpStatus.OK);
  }
}
