package com.tms.ticket;

public interface TicketOperation {

  void addTicket(int ticketCount, int vendorId)  throws InterruptedException;
  void removeTicket(int ticketCount, int CustomerId) throws InterruptedException;

}
