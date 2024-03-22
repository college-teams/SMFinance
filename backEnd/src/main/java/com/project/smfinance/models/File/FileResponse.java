package com.project.smfinance.models.File;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FileResponse {
  private String entityKey;
  private String filePath;
  private String fileKey;
  private String fileType;

  public static FileResponse from(
      String fileKey, String filePath, String entityKey, String fileType) {
    return FileResponse.builder()
        .fileKey(fileKey)
        .entityKey(entityKey)
        .filePath(filePath)
        .fileType(fileType)
        .build();
  }
}
