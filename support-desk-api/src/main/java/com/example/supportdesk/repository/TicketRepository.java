package com.example.supportdesk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.supportdesk.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    java.util.List<Ticket> findByStatus(String status);

    java.util.List<Ticket> findByPriority(String priority);

    java.util.List<Ticket> findByCategory(String category);

    Page<Ticket> findAll(Pageable pageable);
}
