package com.project.smfinance.codes;

import com.project.smfinance.models.response.StatusCodes;
import org.springframework.http.HttpStatus;

public class ErrorCodes extends StatusCodes {

  private static final String RESOURCE_BUNDLE_NAME = "SMFinanceErrorCodes";
  public static final StatusCodes CUSTOMER_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "CUSTOMER_NOT_FOUND");

  public static final StatusCodes CONSTRAINT_VIOLATIONS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "CONSTRAINT_VIOLATIONS");

  public static final StatusCodes UNAUTHORIZED =
      new ErrorCodes(401, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED");

  public static final StatusCodes FORBIDDEN =
      new ErrorCodes(403, HttpStatus.FORBIDDEN, "FORBIDDEN");

  public static final StatusCodes INTERNAL_SERVER_ERROR =
      new ErrorCodes(500, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");

  public static final StatusCodes ADMIN_NOT_EXISTS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "ADMIN_NOT_EXISTS");

  public static final StatusCodes LOAN_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "LOAN_NOT_FOUND");

  public ErrorCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
