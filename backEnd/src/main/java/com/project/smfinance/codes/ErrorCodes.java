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

  public static final StatusCodes EMI_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "EMI_NOT_FOUND");

  public static final StatusCodes EMI_ALREADY_PAID =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "EMI_ALREADY_PAID");

  public static final StatusCodes LOAN_ALREADY_PRE_CLOSED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "LOAN_ALREADY_PRE_CLOSED");

  public static final StatusCodes EMPTY_FILE_REQUEST =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "EMPTY_FILE_REQUEST");
  public static final StatusCodes FILE_UPLOAD_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "FILE_UPLOAD_FAILED");

  public static final StatusCodes FILE_DELETE_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "FILE_DELETE_FAILED");

  public static final StatusCodes UNSUPPORTED_FILE_TYPE =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "UNSUPPORTED_FILE_TYPE");

  public static final StatusCodes FILE_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "FILE_NOT_FOUND");

  public ErrorCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
