package com.example.supportdesk.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.ResourceNotFoundException;

@Service
public class TicketService {
    private final List<TicketResponse> tickets = new ArrayList<>();

    public TicketService() {
        tickets.add(new TicketResponse(
                "T001",
                "Cannot access email",
                "User cannot login to company email account.",
                "Email",
                "HIGH",
                "OPEN",
                "amir@example.com",
                "2026-07-03"));

        tickets.add(new TicketResponse(
                "T002",
                "Laptop is slow",
                "User reports laptop takes a long time to boot and open apps.",
                "Hardware",
                "MEDIUM",
                "OPEN",
                "siti@example.com",
                "2026-07-02"));

        tickets.add(new TicketResponse(
                "T003",
                "VPN connection not working",
                "User is unable to connect to the company VPN from home.",
                "Network",
                "HIGH",
                "IN_PROGRESS",
                "hafiz@example.com",
                "2026-07-01"));
    }

    public List<TicketResponse> getAllTickets() {
        return tickets;
    }

    public TicketResponse getTicketById(String id) {
        return tickets.stream()
                .filter(ticket -> ticket.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }
}
