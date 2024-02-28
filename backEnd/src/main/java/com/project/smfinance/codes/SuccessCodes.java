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

  public static final StatusCodes ADMIN_REGISTER_SUCCESS =
      new SuccessCodes(201, HttpStatus.CREATED, "ADMIN_REGISTER_SUCCESS");

  public static final StatusCodes ADMIN_LOGIN_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "ADMIN_LOGIN_SUCCESS");

  public static final StatusCodes FORGOT_PASSWORD_REQUEST_SENDS =
      new SuccessCodes(200, HttpStatus.OK, "FORGOT_PASSWORD_REQUEST_SENDS");

  public static final StatusCodes All_ADMIN_DETAILS_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "All_ADMIN_DETAILS_FETCHED");

  public SuccessCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
