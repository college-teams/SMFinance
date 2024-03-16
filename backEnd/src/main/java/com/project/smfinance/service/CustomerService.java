package com.project.smfinance.service;

import static com.project.smfinance.codes.ErrorCodes.CUSTOMER_NOT_FOUND;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_CREATED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_DATA_FETCHED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_DELETE_SUCCESS;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_LIST_FETCHED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_UPDATED;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.customer.CreateCustomerRequest;
import com.project.smfinance.models.customer.CustomerResponse;
import com.project.smfinance.models.customer.UpdateCustomerRequest;
import com.project.smfinance.models.response.AbstractResponse.StatusType;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.CustomerRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CustomerService {

  private final CustomerRepository customerRepository;

  public ApiResponse<CustomerResponse> addCustomer(CreateCustomerRequest createCustomerRequest) {

    Customer customer = CreateCustomerRequest.from(createCustomerRequest);
    customerRepository.save(customer);

    CustomerResponse customerResponse = CustomerResponse.from(customer);
    return new ApiResponse<>(CUSTOMER_CREATED, StatusType.SUCCESS, customerResponse);
  }

  public ApiResponse<List<CustomerResponse>> getCustomerList() {
    List<Customer> customers = customerRepository.findAll();
    List<CustomerResponse> customerList = CustomerResponse.from(customers);
    return new ApiResponse<>(CUSTOMER_LIST_FETCHED, StatusType.SUCCESS, customerList);
  }

  public ApiResponse<CustomerResponse> getCustomer(Long customerId) throws BaseException {
    Customer customerData = getCustomerById(customerId);

    CustomerResponse customer = CustomerResponse.from(customerData);
    return new ApiResponse<>(CUSTOMER_DATA_FETCHED, StatusType.SUCCESS, customer);
  }

  public ApiResponse<CustomerResponse> updateCustomer(
      Long customerId, UpdateCustomerRequest updateCustomerRequest) throws BaseException {

    Customer existingCustomer = getCustomerById(customerId);
    updateCustomerFields(existingCustomer, updateCustomerRequest);
    Customer updatedCustomer = customerRepository.save(existingCustomer);

    CustomerResponse customerResponse = CustomerResponse.from(updatedCustomer);
    return new ApiResponse<>(CUSTOMER_UPDATED, StatusType.SUCCESS, customerResponse);
  }

  public ApiResponse deleteCustomer(Long customerId) throws BaseException {
    Customer customerData = getCustomerById(customerId);
    customerRepository.delete(customerData);
    return new ApiResponse<>(CUSTOMER_DELETE_SUCCESS, StatusType.SUCCESS);
  }

  public Customer getCustomerById(Long id) throws BaseException {
    Optional<Customer> category = customerRepository.findById(id);

    if (category.isEmpty()) {
      throw new BaseException(CUSTOMER_NOT_FOUND);
    }

    return category.get();
  }

  private void updateCustomerFields(
      Customer existingCustomer, UpdateCustomerRequest updateCustomerRequest) {
    existingCustomer.setName(updateCustomerRequest.getName());
    existingCustomer.setPhoneNumber(updateCustomerRequest.getPhoneNumber());
    existingCustomer.setAddress(updateCustomerRequest.getAddress());
    existingCustomer.setOccupation(updateCustomerRequest.getOccupation());
    existingCustomer.setEmail(updateCustomerRequest.getEmail());
    existingCustomer.setAltPhoneNumber(updateCustomerRequest.getAltPhoneNumber());
    existingCustomer.setAadhaarNumber(updateCustomerRequest.getAadhaarNumber());
    existingCustomer.setPanNumber(updateCustomerRequest.getPanNumber());
    existingCustomer.setRationNumber(updateCustomerRequest.getRationNumber());
  }
}
