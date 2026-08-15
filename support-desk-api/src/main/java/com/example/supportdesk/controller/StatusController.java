package com.example.supportdesk.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StatusController {

    private final MongoTemplate mongoTemplate;

    public StatusController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/readiness")
    public ResponseEntity<Map<String, String>> readiness() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("service", "support-desk-api");

        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            response.put("status", "READY");
            response.put("database", "CONNECTED");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "NOT_READY");
            response.put("database", "Database readiness check failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }

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
