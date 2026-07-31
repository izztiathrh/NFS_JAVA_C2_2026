package com.example.supportdesk.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.supportdesk.model.Ticket;

@Component
public class InMemoryTicketRepository implements TicketRepository {
    private final List<Ticket> tickets = Collections.synchronizedList(new ArrayList<>());

    @Override
    public long count() {
        return tickets.size();
    }

    @Override
    public Ticket save(Ticket ticket) {
        if (ticket.getId() == null) {
            ticket.setId(UUID.randomUUID().toString());
        } else {
            // remove any existing with same id
            tickets.removeIf(t -> t.getId().equals(ticket.getId()));
        }
        tickets.add(ticket);
        return ticket;
    }

    @Override
    public Iterable<Ticket> findAll() {
        return new ArrayList<>(tickets);
    }
}
