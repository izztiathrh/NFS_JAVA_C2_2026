package com.example.supportdesk.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.supportdesk.dto.ApiDocsResponse;
import com.example.supportdesk.dto.ApiEndpointInfo;

@RestController
public class ApiDocsController {

    @GetMapping("/api/docs")
    public ApiDocsResponse getApiDocs() {
        List<ApiEndpointInfo> endpoints = List.of(
                new ApiEndpointInfo("GET", "/api/v1/tickets", "USER or ADMIN", "List support tickets."),
                new ApiEndpointInfo("GET", "/api/v1/tickets/{id}", "USER or ADMIN", "Get a single ticket by id."),
                new ApiEndpointInfo("POST", "/api/v1/tickets", "USER or ADMIN", "Create a new ticket."),
                new ApiEndpointInfo("GET", "/api/v1/tickets/paged", "USER or ADMIN", "List tickets with pagination and sorting."),
                new ApiEndpointInfo("GET", "/api/v1/reports/tickets-by-status", "USER or ADMIN", "Get ticket counts grouped by status."),
                new ApiEndpointInfo("GET", "/api/v1/reports/tickets-by-priority", "USER or ADMIN", "Get ticket counts grouped by priority."));

        return new ApiDocsResponse("Support Desk Ticket API", "v1", "/api/v1", endpoints);
    }
}
