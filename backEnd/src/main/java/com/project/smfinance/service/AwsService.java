package com.project.smfinance.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.MultiObjectDeleteException;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
@Slf4j
public class AwsService {

  private static final String BUCKET_NAME = "smfinance-asset";
  private final AmazonS3 amazonS3;

  public String uploadFile(String key, MultipartFile multipartFile) throws IOException {
    try (InputStream fileInputStream = multipartFile.getInputStream()) {
      // Create an ObjectMetadata object and set the Content-Type and content-disposition
      ObjectMetadata metadata = createObjectMetadata(multipartFile);
      PutObjectRequest putObjectRequest = createPutObjectRequest(key, fileInputStream, metadata);
      amazonS3.putObject(putObjectRequest);

      String publicUrl = generatePublicUrl(key);
      log.info("Uploaded file to S3. URL: {}", publicUrl);
      return publicUrl;

    } catch (IOException e) {
      log.error("Error uploading file to S3", e);
      throw e;
    }
  }

  public void deleteFile(String key) {
    try {
      if (checkFileIsExists(key)) {
        deleteObject(key);
        log.info("Deleted file from S3. Key: {}", key);
      } else {
        log.warn("File does not exist in S3. Key: {}", key);
      }
    } catch (Exception e) {
      log.error("Error deleting file from S3", e);
      throw e;
    }
  }

  public void deleteFiles(List<String> keysToDelete) {
    try {
      // Create a list of KeyVersion objects for the files to delete
      List<DeleteObjectsRequest.KeyVersion> keyVersions = new ArrayList<>();
      for (String key : keysToDelete) {
        // Check if the file exists in the bucket
        if (checkFileIsExists(key)) {
          keyVersions.add(new DeleteObjectsRequest.KeyVersion(key));
        } else {
          log.warn("File does not exist in S3. Key: {}", key);
        }
      }

      if (!keyVersions.isEmpty()) {
        try {
          deleteMultipleObjects(keyVersions);
          log.info("Deleted {} files from S3.", keyVersions.size());
        } catch (MultiObjectDeleteException e) {
          handleMultiObjectDeleteException(e);
        }
      }
    } catch (Exception ex) {
      log.error("Error deleting files from S3", ex);
      throw ex;
    }
  }

  private ObjectMetadata createObjectMetadata(MultipartFile multipartFile) {
    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType(multipartFile.getContentType());
    metadata.setContentDisposition("inline");
    metadata.setContentLength(multipartFile.getSize());
    return metadata;
  }

  private PutObjectRequest createPutObjectRequest(
      String key, InputStream fileInputStream, ObjectMetadata metadata) {
    return new PutObjectRequest(BUCKET_NAME, key, fileInputStream, metadata);
  }

  private String generatePublicUrl(String key) {
    return amazonS3.getUrl(BUCKET_NAME, key).toString();
  }

  private void deleteObject(String key) {
    DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(BUCKET_NAME, key);
    amazonS3.deleteObject(deleteObjectRequest);
  }

  private void deleteMultipleObjects(List<DeleteObjectsRequest.KeyVersion> keyVersions) {
    DeleteObjectsRequest deleteObjectsRequest =
        new DeleteObjectsRequest(BUCKET_NAME).withKeys(keyVersions);
    amazonS3.deleteObjects(deleteObjectsRequest);
  }

  private void handleMultiObjectDeleteException(MultiObjectDeleteException e) {
    for (MultiObjectDeleteException.DeleteError deleteError : e.getErrors()) {
      log.error(
          "Error deleting file from S3. Key: {}, Error: {}",
          deleteError.getKey(),
          deleteError.getMessage());
    }
    throw e;
  }

  private boolean checkFileIsExists(String key) {
    return amazonS3.doesObjectExist(BUCKET_NAME, key);
  }

  public List<S3ObjectSummary> getBucketObjectsSummary() {
    return amazonS3.listObjects(BUCKET_NAME).getObjectSummaries();
  }
}
