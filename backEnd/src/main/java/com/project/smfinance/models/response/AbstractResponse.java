package com.project.smfinance.models.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder(builderMethodName = "baseBuilder")
public class AbstractResponse {
  private int statusCode;
  private StatusType statusType;
  private String statusMessage = "";
  private HttpStatus httpStatusCode;

  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  private LocalDateTime timestamp = LocalDateTime.now();

  public AbstractResponse(StatusCodes codes, StatusType statusType) {
    this.statusCode = codes.getStatusCode();
    this.statusType = statusType;
    this.statusMessage = codes.getStatusMessage();
    this.httpStatusCode = codes.getHttpStatusCode();
  }

  public AbstractResponse(StatusCodes codes, StatusType statusType, String message) {
    this.statusCode = codes.getStatusCode();
    this.statusType = statusType;
    this.statusMessage = StringUtils.isNotBlank(message) ? message : codes.getStatusMessage();
    this.httpStatusCode = codes.getHttpStatusCode();
  }

  public enum StatusType {
    SUCCESS,
    FAILURE
  }
}
