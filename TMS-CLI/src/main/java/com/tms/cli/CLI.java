package com.tms.cli;

import com.tms.config.ConfigurationManager;
import com.tms.config.Configurations;
import com.tms.logging.Log;
import java.io.IOException;
import java.util.InputMismatchException;
import java.util.Scanner;

public class CLI {

  // Set the configurations from the user input
  public static Configurations initialSetup() {

    String DEFAULT_PATH = "src/main/resources/configurations/config.json";

    Scanner scanner = new Scanner(System.in);

    try {
      Log.success("Loading configurations...");
      System.out.println("Loading configurations...");
      return ConfigurationManager.load(DEFAULT_PATH);
    } catch (IOException loadError) {

      Log.error("Configurations not found. Setting up new configurations...", loadError);
      System.out.println("Configurations not found. Setting up new configurations...");

      int totalTickets = validatedInput(scanner, "Total Tickets");
      int ticketReleaseRate = validatedInput(scanner, "Ticket Release Rate");
      int customerRetrievalRate = validatedInput(scanner, "Customer Retrieval Rate");
      int maxTicketCapacity = validatedInput(scanner, "Maximum Ticket Capacity");

      Configurations configurations = new Configurations(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);

      try {
        Log.success("Saving configurations...");
        System.out.println("Saving configurations...");
        ConfigurationManager.save(configurations, DEFAULT_PATH);
      } catch (IOException saveError) {
        Log.error("Error saving configuration", saveError);
        System.out.println("Error saving configuration: " + saveError.getMessage());
      }

      return configurations;

    }
  }

  // Validate the user input
  public static int validatedInput(Scanner scanner, String message) {
    while (true) {
      try {
        System.out.printf(">>> Enter %s: ", message);
        return scanner.nextInt();
      } catch (InputMismatchException e) {
        Log.error("Try again. Invalid input to" + message, e);
        System.out.printf("%s must be an integer! Try again.\n", message);
        scanner.next();
      }
    }
  }
}
