package com.tms.threads;

import com.tms.logging.Log;
import com.tms.ticket.AbstractTicketHandler;
import com.tms.ticket.TicketPool;

public class Customer extends AbstractTicketHandler implements Runnable {

  private final int customerRetrievalRate;
  private final int customerId;

  public Customer(TicketPool ticketPool, int customerRetrievalRate, int customerId) {
    super(ticketPool);
    this.customerRetrievalRate = customerRetrievalRate;
    this.customerId = customerId;
  }

  @Override
  public void run() {
    try {
      while (true) {
        try {
          ticketPool.removeTicket(customerRetrievalRate, customerId);
        } catch (InterruptedException e) {
          throw new RuntimeException(e);
        }
        Thread.sleep(1000);
      }
    } catch (InterruptedException e) {
      Log.error("Customer interrupted.", e);
    }
  }

  @Override
  public void handleTickets() {
    run();
  }
}
