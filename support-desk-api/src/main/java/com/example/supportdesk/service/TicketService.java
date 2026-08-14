package com.example.supportdesk.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@Service
public class TicketService {
    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt());
    }

    public List<TicketResponse> getAllTickets(String status, String priority, String category) {
        log.info("Fetching tickets with filters status={}, priority={}, category={}", status, priority, category);

        List<Ticket> tickets;
        if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<TicketResponse> getPagedTickets(int page, int size, String sortBy, String direction) {
        log.info("Fetching paginated tickets page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);

        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        return ticketRepository.findAll(pageable).map(this::toResponse);
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
        return toResponse(ticket);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        Ticket existing = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));

        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setCategory(request.getCategory());
        existing.setPriority(request.getPriority());
        existing.setStatus(request.getStatus());

        return toResponse(ticketRepository.save(existing));
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        String createdBy = request.getCreatedBy();
        if (createdBy == null || createdBy.isBlank()) {
            createdBy = "web-user";
        }

        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus("OPEN");
        ticket.setCreatedBy(createdBy);
        ticket.setCreatedAt(java.time.LocalDate.now().toString());

        Ticket saved = ticketRepository.save(ticket);
        log.info("Created ticket with id={}", saved.getId());

        return toResponse(saved);
    }
}
