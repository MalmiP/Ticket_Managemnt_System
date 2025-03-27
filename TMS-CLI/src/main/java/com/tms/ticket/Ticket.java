package com.tms.ticket;

public class Ticket {

  private String ticketId;
  private int VendorId;
  private int customerId;

  // Default Constructor
  public Ticket() {}

  // Parameterized Constructor
  public Ticket(String ticketId, int VendorId) {
    this.ticketId = ticketId;
    this.VendorId = VendorId;
  }

  // Getter Methods
  public String getTicketId() {
    return ticketId;
  }

  public int getVendorId() {
    return VendorId;
  }

  public int getCustomerId() {
    return customerId;
  }

  // Setter Methods
  public void setTicketId(String ticketId) {
    this.ticketId = ticketId;
  }

  public void setVendorId(int VendorId) {
    this.VendorId = VendorId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
  }

}
