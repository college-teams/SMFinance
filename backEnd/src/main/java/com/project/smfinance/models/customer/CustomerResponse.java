package com.project.smfinance.models.customer;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.smfinance.entity.Customer;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerResponse {

  private Long id;
  private String name;
  private String phoneNumber;
  private String altPhoneNumber;
  private String address;
  private String aadhaarNumber;
  private String panNumber;
  private String rationNumber;
  private String email;
  private String occupation;

  public static List<CustomerResponse> from(List<Customer> customers) {
    return customers.stream().map(CustomerResponse::from).collect(Collectors.toList());
  }

  public static CustomerResponse from(Customer customer) {
    return CustomerResponse.builder()
        .id(customer.getId() > 0 ? customer.getId() : null)
        .name(customer.getName())
        .phoneNumber(customer.getPhoneNumber())
        .address(customer.getAddress())
        .aadhaarNumber(customer.getAadhaarNumber())
        .panNumber(customer.getPanNumber())
        .rationNumber(customer.getRationNumber())
        .email(customer.getEmail())
        .occupation(customer.getOccupation())
        .build();
  }
}
