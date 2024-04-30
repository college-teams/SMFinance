package com.project.smfinance.service;

import static com.project.smfinance.codes.ErrorCodes.CUSTOMER_NOT_FOUND;
import static com.project.smfinance.codes.ErrorCodes.FILE_DELETE_FAILED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_CREATED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_DATA_FETCHED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_DELETE_SUCCESS;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_LIST_FETCHED;
import static com.project.smfinance.codes.SuccessCodes.CUSTOMER_UPDATED;
import static com.project.smfinance.codes.SuccessCodes.FILE_DELETE_SUCCESS;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.CustomerDocument;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.customer.CreateCustomerRequest;
import com.project.smfinance.models.customer.CustomerDocumentRequest;
import com.project.smfinance.models.customer.CustomerResponse;
import com.project.smfinance.models.customer.UpdateCustomerRequest;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.AbstractResponse.StatusType;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.CustomerDocumentRepository;
import com.project.smfinance.repository.CustomerRepository;
import com.project.smfinance.util.Util;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final CustomerDocumentRepository customerDocumentRepository;
  private final AwsService awsService;

  @Transactional
  public ApiResponse<CustomerResponse> addCustomer(CreateCustomerRequest createCustomerRequest)
      throws BaseException {
    Customer customer = CreateCustomerRequest.from(createCustomerRequest);
    Customer savedCustomer = customerRepository.save(customer);

    List<CustomerDocument> customerDocuments =
        saveCustomerDocuments(createCustomerRequest.getDocuments(), savedCustomer);
    customer.setDocuments(customerDocuments);

    CustomerResponse customerResponse = CustomerResponse.from(customer);
    return new ApiResponse<>(CUSTOMER_CREATED, StatusType.SUCCESS, customerResponse);
  }

  public ApiResponse<List<CustomerResponse>> getCustomerList(String customerName) {

    Specification<Customer> spec =
        (root, query, criteriaBuilder) -> {
          List<Predicate> predicates = new ArrayList<>();
          if (StringUtils.isNotBlank(customerName)) {
            predicates.add(
                criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")),
                    "%" + customerName.toLowerCase() + "%"));
          }
          return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

    List<Customer> customers = customerRepository.findAll(spec);
    List<CustomerResponse> customerList = CustomerResponse.from(customers);
    return new ApiResponse<>(CUSTOMER_LIST_FETCHED, StatusType.SUCCESS, customerList);
  }

  public ApiResponse<CustomerResponse> getCustomer(Long customerId) throws BaseException {
    Customer customerData = getCustomerById(customerId);

    CustomerResponse customer = CustomerResponse.from(customerData);
    return new ApiResponse<>(CUSTOMER_DATA_FETCHED, StatusType.SUCCESS, customer);
  }

  @Transactional
  public ApiResponse<CustomerResponse> updateCustomer(
      Long customerId, UpdateCustomerRequest updateCustomerRequest) throws BaseException {

    Customer existingCustomer = getCustomerById(customerId);
    updateCustomerFields(existingCustomer, updateCustomerRequest);
    Customer updatedCustomer = customerRepository.save(existingCustomer);
    updateCustomerDocuments(updateCustomerRequest, updatedCustomer);

    CustomerResponse customerResponse = CustomerResponse.from(updatedCustomer);
    return new ApiResponse<>(CUSTOMER_UPDATED, StatusType.SUCCESS, customerResponse);
  }

  public ApiResponse deleteCustomer(Long customerId) throws BaseException {
    Customer customerData = getCustomerById(customerId);
    customerRepository.delete(customerData);
    return new ApiResponse<>(CUSTOMER_DELETE_SUCCESS, StatusType.SUCCESS);
  }

  @Transactional
  public ApiResponse<?> deleteCustomerFile(Long customerId, String key) throws BaseException {
    try {
      Optional<CustomerDocument> customerDocument =
          customerDocumentRepository.findByCustomer_IdAndDocumentKey(customerId, key);

      if (!Util.isEmpty(key)) {
        awsService.deleteFile(key);
      }

      customerDocument.ifPresent(
          document -> customerDocumentRepository.deleteCustomerDocument(document.getId()));
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(FILE_DELETE_FAILED);
    }
    return new ApiResponse<>(FILE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
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
    existingCustomer.setEmail(
        StringUtils.isBlank(updateCustomerRequest.getEmail())
            ? null
            : updateCustomerRequest.getEmail());
    existingCustomer.setAltPhoneNumber(updateCustomerRequest.getAltPhoneNumber());
  }

  private List<CustomerDocument> saveCustomerDocuments(
      List<CustomerDocumentRequest> customerDocuments, Customer customer) throws BaseException {
    List<CustomerDocument> customerDocumentsList = new ArrayList<>();
    for (CustomerDocumentRequest customerDocumentRequest : customerDocuments) {
      CustomerDocument customerDocument =
          CustomerDocumentRequest.from(customerDocumentRequest, customer);
      CustomerDocument savedReferralDocument = customerDocumentRepository.save(customerDocument);
      customerDocumentsList.add(savedReferralDocument);
    }
    return customerDocumentsList;
  }

  private void updateCustomerDocuments(
      UpdateCustomerRequest updateCustomerRequest, Customer existingCustomer) throws BaseException {
    List<CustomerDocumentRequest> updatedCustomerDocuments = updateCustomerRequest.getDocuments();
    List<CustomerDocument> existingCustomerDocuments = existingCustomer.getDocuments();

    for (CustomerDocument customerDocument : existingCustomerDocuments)
      customerDocument.setCustomer(null);

    existingCustomer.getDocuments().clear();

    List<CustomerDocument> customerDocuments =
        saveCustomerDocuments(updatedCustomerDocuments, existingCustomer);
    existingCustomer.getDocuments().addAll(customerDocuments);
  }
}
