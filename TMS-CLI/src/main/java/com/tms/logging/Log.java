package com.tms.logging;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class Log {

  private static final String LOG_FILE = "src/main/resources/logs/system.log.txt";

  /**
   * Log an information message
   *
   * @param message The information message
   */
  public static void success(String message) {
    String timeStampedSuccessMessage = "SUCCESS (" + LocalDateTime.now() + "): " + message;
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOG_FILE, true))) {
      writer.write(timeStampedSuccessMessage);
      writer.newLine();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * Log an error message
   *
   * @param message The error message
   * @param throwable The exception that caused the error
   */
  public static void error(String message, Throwable throwable) {
    String timeStampedErrorMessage = "ERROR (" + LocalDateTime.now() + "): " + message;
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOG_FILE, true))) {
      writer.write(timeStampedErrorMessage);
      writer.newLine();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}



