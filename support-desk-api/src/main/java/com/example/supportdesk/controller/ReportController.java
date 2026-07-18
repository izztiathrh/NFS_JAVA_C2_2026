package com.example.supportdesk.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.supportdesk.dto.ReportCountResponse;
import com.example.supportdesk.service.TicketReportService;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final TicketReportService ticketReportService;

    public ReportController(TicketReportService ticketReportService) {
        this.ticketReportService = ticketReportService;
    }

    @GetMapping("/tickets-by-status")
    public List<ReportCountResponse> getTicketCountsByStatus() {
        return ticketReportService.getTicketCountsByStatus();
    }

    @GetMapping("/tickets-by-priority")
    public List<ReportCountResponse> countTicketsByPriority() {
        return ticketReportService.countTicketsByPriority();
    }
}
