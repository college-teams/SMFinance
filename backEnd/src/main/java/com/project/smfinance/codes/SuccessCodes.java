package com.project.smfinance.codes;

import com.project.smfinance.models.response.StatusCodes;
import org.springframework.http.HttpStatus;

public class SuccessCodes extends StatusCodes {
  private static final String RESOURCE_BUNDLE_NAME = "SMFinanceSuccessCodes";

  public static final StatusCodes CUSTOMER_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "CUSTOMER_LIST_FETCHED");

  public static final StatusCodes CUSTOMER_DATA_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "CUSTOMER_DATA_FETCHED");

  public static final StatusCodes CUSTOMER_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "CUSTOMER_DELETE_SUCCESS");

  public static final StatusCodes CUSTOMER_CREATED =
      new SuccessCodes(200, HttpStatus.CREATED, "CUSTOMER_CREATED");

  public static final StatusCodes CUSTOMER_UPDATED =
      new SuccessCodes(200, HttpStatus.OK, "CUSTOMER_UPDATED");

  public static final StatusCodes CURRENT_ADMIN_DETAILS_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "CURRENT_ADMIN_DETAILS_FETCHED");

  public static final StatusCodes ADMIN_LOGIN_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "ADMIN_LOGIN_SUCCESS");

  public static final StatusCodes LOAN_CREATED =
      new SuccessCodes(201, HttpStatus.CREATED, "LOAN_CREATED");

  public static final StatusCodes EMI_UPDATED = new SuccessCodes(200, HttpStatus.OK, "EMI_UPDATED");

  public static final StatusCodes LOAN_UPDATED =
      new SuccessCodes(200, HttpStatus.OK, "LOAN_UPDATED");

  public static final StatusCodes LOAN_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "LOAN_LIST_FETCHED");

  public static final StatusCodes LOAN_DATA_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "LOAN_DATA_FETCHED");

  public static final StatusCodes FILE_UPLOAD_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "FILE_UPLOAD_SUCCESS");

  public static final StatusCodes FILE_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "FILE_DELETE_SUCCESS");

  public SuccessCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
