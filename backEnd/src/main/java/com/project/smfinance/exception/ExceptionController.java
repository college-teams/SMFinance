package com.project.smfinance.exception;

import static com.project.smfinance.codes.ErrorCodes.CONSTRAINT_VIOLATIONS;
import static com.project.smfinance.codes.ErrorCodes.FORBIDDEN;
import static com.project.smfinance.codes.ErrorCodes.UNAUTHORIZED;

import com.project.smfinance.codes.ErrorCodes;
import com.project.smfinance.models.response.AbstractResponse.StatusType;
import com.project.smfinance.models.response.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ApiResponse> handleApplicationException(BaseException baseException) {
    ApiResponse apiResponse =
        new ApiResponse(
            baseException.getStatusCodes(), StatusType.FAILURE, baseException.getMessage());
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException ex) {
    BindingResult result = ex.getBindingResult();
    final List<FieldError> fieldErrors = result.getFieldErrors();
    Optional<String> errors =
        fieldErrors.stream()
            .map(
                fieldError ->
                    "'"
                        + fieldError.getField()
                        + "'"
                        + " parameter "
                        + fieldError.getDefaultMessage())
            .findFirst();
    String error = null;
    if (errors.isPresent()) error = errors.get();
    ApiResponse apiResponse = new ApiResponse(CONSTRAINT_VIOLATIONS, StatusType.FAILURE, error);
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiResponse> handleConstraintViolationException(
      ConstraintViolationException ex) {
    ApiResponse apiResponse = new ApiResponse(CONSTRAINT_VIOLATIONS, StatusType.FAILURE);
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ApiResponse> handleAuthException(AuthenticationException ex) {
    StringBuilder sb = new StringBuilder();
    if (StringUtils.isNotBlank(ex.getMessage())) {
      sb.append(ex.getMessage());
    }
    ApiResponse apiResponse = new ApiResponse(UNAUTHORIZED, StatusType.FAILURE, sb.toString());
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiResponse> handleAccessDeniedException(AccessDeniedException ex) {
    StringBuilder sb = new StringBuilder();
    if (StringUtils.isNotBlank(ex.getMessage())) {
      sb.append(ex.getMessage());
    }
    ApiResponse apiResponse = new ApiResponse(FORBIDDEN, StatusType.FAILURE, sb.toString());
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse> handleGlobalApplicationException(Exception ex) {
    StringBuilder sb = new StringBuilder();
    if (StringUtils.isNotBlank(ex.getMessage())) {
      sb.append(ex.getMessage());
    }
    ApiResponse apiResponse =
        new ApiResponse(ErrorCodes.INTERNAL_SERVER_ERROR, StatusType.FAILURE, sb.toString());
    return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatusCode());
  }
}
