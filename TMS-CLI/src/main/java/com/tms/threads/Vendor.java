package com.tms.threads;

import com.tms.logging.Log;
import com.tms.ticket.AbstractTicketHandler;
import com.tms.ticket.TicketPool;

public class Vendor extends AbstractTicketHandler implements Runnable {
  private final int ticketReleaseRate;
  private final int vendorId;

  public Vendor(TicketPool ticketPool, int ticketReleaseRate, int vendorId) {
    super(ticketPool);
    this.ticketReleaseRate = ticketReleaseRate;
    this.vendorId = vendorId;
  }

  @Override
  public void run() {
    try {
      while (true) {
        try {
          ticketPool.addTicket(ticketReleaseRate, vendorId);
        } catch (InterruptedException e) {
          throw new RuntimeException(e);
        }
        Thread.sleep(1000);
      }
    } catch (InterruptedException e) {
      Log.error("Vendor interrupted.", e);
    }
  }

  @Override
  public void handleTickets() {
    run();
  }
}
