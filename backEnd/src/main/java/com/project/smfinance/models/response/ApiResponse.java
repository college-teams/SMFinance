package com.project.smfinance.models.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ApiResponse<T> extends AbstractResponse {
  private T data;

  public ApiResponse(StatusCodes statusCodes, StatusType statusType, T data) {
    super(statusCodes, statusType);
    this.data = data;
  }

  public ApiResponse(StatusCodes statusCodes, StatusType statusType) {
    super(statusCodes, statusType);
  }

  public ApiResponse(StatusCodes statusCodes, StatusType statusType, String message) {
    super(statusCodes, statusType, message);
  }
}
