package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.customer.CreateCustomerRequest;
import com.project.smfinance.models.customer.CustomerResponse;
import com.project.smfinance.models.customer.UpdateCustomerRequest;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.CustomerService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CustomerController {

  private final CustomerService customerService;

  @PostMapping("/")
  public ResponseEntity<ApiResponse<CustomerResponse>> addCustomer(
      @Valid @RequestBody CreateCustomerRequest createCustomerRequest) throws BaseException {
    return new ResponseEntity<>(
        customerService.addCustomer(createCustomerRequest), HttpStatus.CREATED);
  }

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<CustomerResponse>>> getCustomerList(
      @RequestParam(name = "customerName", defaultValue = "") String customerName) {
    return new ResponseEntity<>(customerService.getCustomerList(customerName), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CustomerResponse>> getCustomer(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(customerService.getCustomer(id), HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<CustomerResponse>> updateCustomer(
      @PathVariable Long id, @Valid @RequestBody UpdateCustomerRequest updateCustomerRequest)
      throws BaseException {
    return new ResponseEntity<>(
        customerService.updateCustomer(id, updateCustomerRequest), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse> deleteCustomer(@PathVariable Long id) throws BaseException {
    return new ResponseEntity<>(customerService.deleteCustomer(id), HttpStatus.OK);
  }
}
