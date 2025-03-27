package com.tms.config;

import java.io.Serializable;

public class Configurations implements Serializable {

  private int totalTickets;
  private int ticketReleaseRate;
  private int customerRetrievalRate;
  private int maxTicketCapacity;

  // Default Constructor
  public Configurations() {}

  // Parameterized Constructor
  public Configurations(
      int totalTickets,
      int ticketReleaseRate,
      int customerRetrievalRate,
      int maxTicketCapacity
  ) {
    this.totalTickets = totalTickets;
    this.ticketReleaseRate = ticketReleaseRate;
    this.customerRetrievalRate = customerRetrievalRate;
    this.maxTicketCapacity = maxTicketCapacity;
  }

  // Getter Methods
  public int getTotalTickets() {
    return totalTickets;
  }

  public int getTicketReleaseRate() {
    return ticketReleaseRate;
  }

  public int getCustomerRetrievalRate() {
    return customerRetrievalRate;
  }

  public int getMaxTicketCapacity() {
    return maxTicketCapacity;
  }

  // Setter Methods
  public void setTotalTickets(int totalTickets) {
    this.totalTickets = totalTickets;
  }

  public void setTicketReleaseRate(int ticketReleaseRate) {
    this.ticketReleaseRate = ticketReleaseRate;
  }

  public void setCustomerRetrievalRate(int customerRetrievalRate) {
    this.customerRetrievalRate = customerRetrievalRate;
  }

  public void setMaxTicketCapacity(int maxTicketCapacity) {
    this.maxTicketCapacity = maxTicketCapacity;
  }

  // Decrement the total tickets
  public void decTotalTickets() {
    this.totalTickets--;
  }

  // Increment the total tickets
  public void incTotalTickets() {
    this.totalTickets++;
  }

}
