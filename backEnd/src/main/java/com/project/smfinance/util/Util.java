package com.project.smfinance.util;

import java.util.UUID;

public class Util {

  public static String generateUniqueImageKey(String entityName, String fileName) {
    String fileKey = UUID.randomUUID() + "_" + fileName;
    return String.format("%s/%s", entityName, fileKey);
  }
}
