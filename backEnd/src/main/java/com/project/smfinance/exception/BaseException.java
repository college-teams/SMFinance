package com.project.smfinance.exception;

import com.project.smfinance.models.response.StatusCodes;
import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

@Getter
public class BaseException extends Exception implements Serializable {
  @Serial private static final long serialVersionUID = 208645400565987793L;

  private StatusCodes statusCodes;
  private String message = "";

  public BaseException(StatusCodes statusCodes) {
    super(statusCodes.getStatusMessage());
    this.statusCodes = statusCodes;
  }

  public BaseException(StatusCodes statusCodes, String message) {
    super(StringUtils.isNotBlank(message) ? message : statusCodes.getStatusMessage());
    message = StringUtils.isNotBlank(message) ? message : statusCodes.getStatusMessage();
    this.statusCodes = statusCodes;
    this.message = message;
  }
}
