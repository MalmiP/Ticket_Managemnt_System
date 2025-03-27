package com.tms.ticket;

import com.tms.config.Configurations;
import com.tms.logging.Log;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class TicketPool implements TicketOperation {

  // Need a synchronized list to avoid concurrent modification exception to Store ticket ID, Vendor ID, and Customer ID
  private final List<Ticket> tickets = Collections.synchronizedList(new LinkedList<>());
  private int totalTickets;
  private int maxCapacity;
  private final Configurations configurations;

  // Parameterized constructor
  public TicketPool(Configurations configurations) {
    for (int i = 0; i < configurations.getTotalTickets(); i++) {
      tickets.add(new Ticket());
    }
    this.configurations = configurations;
  }

  // Add a ticket to the pool
  public synchronized void addTicket(int ticketCount, int vendorId) throws InterruptedException {
    totalTickets = configurations.getTotalTickets();
    maxCapacity = configurations.getMaxTicketCapacity();
    for (int i = 0; i < ticketCount; i++) {
      while (totalTickets + ticketCount > maxCapacity) {
        System.out.println("Ticket Pool is Filled. Waiting...");
        Log.success("Ticket Pool is Filled. Waiting...");
        wait();
      }
      configurations.incTotalTickets();
      totalTickets = configurations.getTotalTickets();
      tickets.add(new Ticket("V" + vendorId + "-" + totalTickets, vendorId));
      Log.success("Vendor " + vendorId + " Added Ticket: " + "V" + vendorId + "-" + totalTickets);
      System.out.println("Vendor " + vendorId + " Added Ticket: " + "V" + vendorId + "-" + totalTickets);
    }
    Log.success("Total Ticket Count: " + totalTickets);
    System.out.println("Total Ticket Count: " + totalTickets);
    notifyAll();
  }

  // Remove a ticket from the pool
  public synchronized void removeTicket(int ticketCount, int customerId) throws InterruptedException {
    totalTickets = configurations.getTotalTickets();
    for (int i = 0; i < ticketCount; i++) {
      while (totalTickets == 0) {
        System.out.println("Ticket Pool is Empty. Waiting...");
        Log.success("Ticket Pool is Empty. Waiting...");
        wait();
      }
      Ticket tck = tickets.remove(0);
      System.out.println("Customer " + customerId + " Purchased Ticket: " + tck.getTicketId() + " from Vendor " + tck.getVendorId());
      Log.success("Customer " + customerId + " Purchased Ticket: " + tck.getTicketId() + " from Vendor " + tck.getVendorId());
      configurations.decTotalTickets();
      totalTickets = configurations.getTotalTickets();
    }
    Log.success("Total Ticket Count: " + totalTickets);
    System.out.println("Total Ticket Count: " + totalTickets);
    notifyAll();
    }

  // Get the total ticket count
  public int getTotalTickets() {
    return configurations.getTotalTickets();
  }

}