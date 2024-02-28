package com.project.smfinance.models.customer;

import com.project.smfinance.entity.Customer;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomerRequest {

  @NotNull private String customerName;
  @NotNull private String customerPhoneNumber;
  private String customerAltNumber;
  @NotNull private String customerAddress;
  @NotNull private String aadhaarNumber;
  @NotNull private String panNumber;
  @NotNull private String rationNumber;
  private String customerEmail;
  @NotNull private String customerOccupation;

  public static Customer from(CreateCustomerRequest createCustomerRequest) {
    Customer customer = new Customer();
    customer.setCustomerName(createCustomerRequest.getCustomerName());
    customer.setCustomerPhoneNumber(createCustomerRequest.getCustomerPhoneNumber());
    customer.setCustomerAddress(createCustomerRequest.getCustomerAddress());
    customer.setCustomerAltNumber(createCustomerRequest.getCustomerAltNumber());
    customer.setAadhaarNumber(createCustomerRequest.getAadhaarNumber());
    customer.setPanNumber(createCustomerRequest.getPanNumber());
    customer.setRationNumber(createCustomerRequest.getRationNumber());
    customer.setCustomerEmail(createCustomerRequest.getCustomerEmail());
    customer.setCustomerOccupation(createCustomerRequest.getCustomerOccupation());

    return customer;
  }
}
