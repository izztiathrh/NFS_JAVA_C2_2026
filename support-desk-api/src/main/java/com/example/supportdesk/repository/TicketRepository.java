package com.example.supportdesk.repository;

import com.example.supportdesk.model.Ticket;

public interface TicketRepository {
    long count();

    Ticket save(Ticket ticket);

    Iterable<Ticket> findAll();
}
