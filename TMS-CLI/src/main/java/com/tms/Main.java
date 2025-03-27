package com.tms;

import com.tms.cli.CLI;
import com.tms.config.ConfigurationManager;
import com.tms.config.Configurations;
import com.tms.logging.Log;
import com.tms.threads.Customer;
import com.tms.threads.Vendor;
import com.tms.ticket.TicketPool;
import java.io.IOException;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {

    Configurations configurations = CLI.initialSetup();

    // Initialize the ticketing system
    TicketPool ticketPool = new TicketPool(configurations);

    // Commands to start the ticketing system
    System.out.println("Start the Ticketing System [Command: Start]");
    while (true) {
      Scanner scanner = new Scanner(System.in);
      String Command = scanner.nextLine();

      if (Command.equalsIgnoreCase("Start")) {
        Log.success("Ticketing system started");
        startThreads(configurations, ticketPool);
        break;
      } else {
        Log.error("Invalid Command", new IOException());
        System.out.println("Invalid Command");
      }
    }

    // Commands to stop the ticketing system
    System.out.println("Stop the Ticketing System [Command: Stop]");
    while (true) {
      Scanner scanner = new Scanner(System.in);
      String Command = scanner.nextLine();

      if (Command.equalsIgnoreCase("Stop")) {
        Log.success("Ticketing system stopped");
        System.out.println("Ticketing System Stopped");
        System.exit(0);
      } else {
        Log.error("Invalid Command", new IOException());
        System.out.println("Invalid Command");
      }
    }
  }

  // Start the ticketing system
  private static void startThreads(Configurations configurations, TicketPool ticketPool) {
    Scanner scanner = new Scanner(System.in);
    int vendors = CLI.validatedInput(scanner, "number of Vendors ");
    int customers = CLI.validatedInput(scanner, "number of Customers ");
    // Create and start vendor threads
    for (int i = 0; i < vendors; i++) {
      Log.success("Vendor of ID " + i + " Created");
      Log.success("Vendor of ID " + i + " Started");
      new Thread(new Vendor(ticketPool, configurations.getTicketReleaseRate(), i)).start();
    }

    // Create and start customer threads
    for (int i = 0; i < customers; i++) {
      Log.success("Customer of ID " + i + " Created");
      Log.success("Customer of ID " + i + " Started");
      new Thread(new Customer(ticketPool, configurations.getCustomerRetrievalRate(), i)).start();
    }
  }

}
