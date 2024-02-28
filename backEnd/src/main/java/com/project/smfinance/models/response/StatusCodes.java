package com.project.smfinance.models.response;

import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@Slf4j
public class StatusCodes {
  private int statusCode;
  private String internalKey;
  private HttpStatus httpStatusCode;
  private String bundleName;

  protected void setAll(
      int statusCode, HttpStatus httpStatusCode, String internalKey, String resourceBundle) {
    this.statusCode = statusCode;
    this.httpStatusCode = httpStatusCode;
    this.internalKey = internalKey;
    this.bundleName = resourceBundle;
  }

  public String getStatusMessage() {
    ResourceBundle RESOURCE_BUNDLE = null;

    try {
      RESOURCE_BUNDLE = ResourceBundle.getBundle(this.bundleName, new Locale("en", "US"));
    } catch (MissingResourceException var3) {
      log.error("Error occurred while fetching message from system files");
    }

    return RESOURCE_BUNDLE == null ? this.internalKey : RESOURCE_BUNDLE.getString(this.internalKey);
  }
}
