package com.project.smfinance.service;

import static com.project.smfinance.codes.ErrorCodes.EMPTY_FILE_REQUEST;
import static com.project.smfinance.codes.ErrorCodes.FILE_DELETE_FAILED;
import static com.project.smfinance.codes.ErrorCodes.FILE_UPLOAD_FAILED;
import static com.project.smfinance.codes.SuccessCodes.FILE_DELETE_SUCCESS;
import static com.project.smfinance.codes.SuccessCodes.FILE_UPLOAD_SUCCESS;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.File.FileResponse;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.util.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class FileService {

  private final AwsService awsService;

  public ApiResponse<FileResponse> uploadImage(String entityKey, MultipartFile multipartFile)
      throws BaseException {

    if (multipartFile.isEmpty()) {
      throw new BaseException(EMPTY_FILE_REQUEST);
    }
    String uniqueKey = Util.generateUniqueImageKey(entityKey, multipartFile.getOriginalFilename());
    try {
      String filePath = awsService.uploadFile(uniqueKey, multipartFile);
      return new ApiResponse<>(
          FILE_UPLOAD_SUCCESS,
          AbstractResponse.StatusType.SUCCESS,
          FileResponse.from(uniqueKey, filePath, entityKey, multipartFile.getContentType()));
    } catch (Exception ex) {
      log.info("Rollback the uploaded images");
      deleteImage(uniqueKey);
      log.error("Unknown exception occurred while uploading image to aws {}", ex.getMessage());
      log.error("ERROR STACK", ex);
      throw new BaseException(FILE_UPLOAD_FAILED);
    }
  }

  public ApiResponse<?> deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(FILE_DELETE_FAILED);
    }
    return new ApiResponse<>(FILE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }
}
