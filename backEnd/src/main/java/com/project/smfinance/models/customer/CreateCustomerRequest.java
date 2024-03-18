package com.project.smfinance.models.customer;

import com.project.smfinance.entity.Customer;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomerRequest {

  @NotNull private String name;
  @NotNull private String phoneNumber;
  private String altPhoneNumber;
  @NotNull private String address;
  private String email;
  @NotNull private String occupation;
  @NotEmpty private List<CustomerDocumentRequest> documents = new ArrayList<>();

  public static Customer from(CreateCustomerRequest createCustomerRequest) {
    Customer customer = new Customer();
    customer.setName(createCustomerRequest.getName());
    customer.setPhoneNumber(createCustomerRequest.getPhoneNumber());
    customer.setAddress(createCustomerRequest.getAddress());
    customer.setAltPhoneNumber(createCustomerRequest.getAltPhoneNumber());
    customer.setEmail(createCustomerRequest.getEmail());
    customer.setOccupation(createCustomerRequest.getOccupation());

    return customer;
  }
}
