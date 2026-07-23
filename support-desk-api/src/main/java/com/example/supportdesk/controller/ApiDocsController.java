package com.example.supportdesk.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.supportdesk.dto.ApiDocsResponse;
import com.example.supportdesk.dto.ApiEndpointInfo;

@RestController
public class ApiDocsController {

    private static final String ROLE_ACCESS = "USER or ADMIN";

    @GetMapping("/api/docs")
    public ApiDocsResponse getApiDocs() {
        List<ApiEndpointInfo> endpoints = List.of(
                new ApiEndpointInfo("GET", "/api/v1/tickets", ROLE_ACCESS, "List support tickets."),
                new ApiEndpointInfo("GET", "/api/v1/tickets/{id}", ROLE_ACCESS, "Get a single ticket by id."),
                new ApiEndpointInfo("POST", "/api/v1/tickets", ROLE_ACCESS, "Create a new ticket."),
                new ApiEndpointInfo("GET", "/api/v1/tickets/paged", ROLE_ACCESS, "List tickets with pagination and sorting."),
                new ApiEndpointInfo("GET", "/api/v1/reports/tickets-by-status", ROLE_ACCESS, "Get ticket counts grouped by status."),
                new ApiEndpointInfo("GET", "/api/v1/reports/tickets-by-priority", ROLE_ACCESS, "Get ticket counts grouped by priority."));

        return new ApiDocsResponse("Support Desk Ticket API", "v1", "/api/v1", endpoints);
    }
}
