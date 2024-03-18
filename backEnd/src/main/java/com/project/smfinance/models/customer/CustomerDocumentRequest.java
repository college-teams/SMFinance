package com.project.smfinance.models.customer;

import static com.project.smfinance.codes.ErrorCodes.UNSUPPORTED_FILE_TYPE;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.CustomerDocument;
import com.project.smfinance.exception.BaseException;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDocumentRequest {

  @NotNull private CustomerDocument.DocumentType documentType;

  @NotNull private String documentPath;

  @NotNull private String documentKey;

  @NotNull private String documentContentType;

  public static CustomerDocument from(
      CustomerDocumentRequest customerDocumentRequest, Customer customer) throws BaseException {

    if (!customerDocumentRequest.getDocumentContentType().startsWith("image/")
        && !customerDocumentRequest.getDocumentContentType().equals("application/pdf")) {
      throw new BaseException(UNSUPPORTED_FILE_TYPE);
    }

    CustomerDocument customerDocument = new CustomerDocument();
    customerDocument.setCustomer(customer);
    customerDocument.setDocumentPath(customerDocumentRequest.getDocumentPath());
    customerDocument.setDocumentType(customerDocumentRequest.getDocumentType());
    customerDocument.setDocumentContentType(customerDocumentRequest.getDocumentContentType());
    customerDocument.setDocumentKey(customerDocumentRequest.getDocumentKey());
    return customerDocument;
  }
}
