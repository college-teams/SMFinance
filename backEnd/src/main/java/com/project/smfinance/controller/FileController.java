package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class FileController {

  private final FileService fileService;

  @PostMapping
  public ResponseEntity<ApiResponse<?>> uploadImage(
      @RequestParam(name = "entityKey") String entityKey,
      @RequestParam("file") MultipartFile multipartFile)
      throws BaseException {
    return new ResponseEntity<>(fileService.uploadImage(entityKey, multipartFile), HttpStatus.OK);
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse<?>> deleteImage(@Valid @RequestParam("fileKey") String key)
      throws BaseException {
    return new ResponseEntity<>(fileService.deleteImage(key), HttpStatus.OK);
  }
}
