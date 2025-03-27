package com.tms.ticket;

public abstract class AbstractTicketHandler {
    protected TicketPool ticketPool;

    /**
     * Constructor
     *
     * @param ticketPool The ticket pool
     */
    public AbstractTicketHandler(TicketPool ticketPool) {
        this.ticketPool = ticketPool;
    }

    /**
     * Handle tickets
     */
    public abstract void handleTickets();
}
