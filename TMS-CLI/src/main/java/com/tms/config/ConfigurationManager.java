package com.tms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tms.logging.Log;
import java.io.File;
import java.io.IOException;
import java.util.InputMismatchException;
import java.util.Scanner;

public class ConfigurationManager {

  private static final ObjectMapper objectMapper = new ObjectMapper();

  // Save the configurations to a file
  public static void save(Configurations configurations, String fileName)
      throws IOException {
    objectMapper.writeValue(new File(fileName), configurations);
  }

  // Load the configurations from a file
  public static Configurations load(String fileName) throws IOException {
      return objectMapper.readValue(new File(fileName), Configurations.class);
  }

}
