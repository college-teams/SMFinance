package com.project.smfinance.models.customer;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.smfinance.entity.Customer;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerResponse {

    private Long id;
    private String customerName;
    private String customerPhoneNumber;
    private String customerAltNumber;
    private String customerAddress;
    private String aadhaarNumber;
    private String panNumber;
    private String rationNumber;
    private String customerEmail;
    private String customerOccupation;

    public static List<CustomerResponse> from(List<Customer> customers) {
        return customers.stream().map(CustomerResponse::from).collect(Collectors.toList());
    }

    public static CustomerResponse from(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getCustomerId() > 0 ? customer.getCustomerId() : null)
                .customerName(customer.getCustomerName())
                .customerPhoneNumber(customer.getCustomerPhoneNumber())
                .customerAddress(customer.getCustomerAddress())
                .aadhaarNumber(customer.getAadhaarNumber())
                .panNumber(customer.getPanNumber())
                .rationNumber(customer.getRationNumber())
                .customerEmail(customer.getCustomerEmail())
                .customerOccupation(customer.getCustomerOccupation())
                .build();
    }
}
