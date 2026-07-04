package com.example.supportdesk.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StatusController {

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "support-desk-api");
        return response;
    }

    @GetMapping("/about")
    public Map<String, String> about() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("appName", "Support Desk API");
        response.put("version", "1.0.0");
        response.put("description", "API for managing IT support tickets");
        return response;
    }
}
