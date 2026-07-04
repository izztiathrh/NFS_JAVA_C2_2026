package com.example.AssetTracker.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController // Tells Spring this class is a Controller, Handles HTTP requests
public class HealthController {
    @GetMapping("/api/health")  // maps a GET request to a Java method
    public Map<String, String> health() {
        return Map.of(
            "status", "UP",
            "service", "asset-tracker-api"
        );
    }
}