package com.example.supportdesk.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.supportdesk.dto.LoginRequest;
import com.example.supportdesk.dto.LoginResponse;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String SEED_EMAIL = "support@example.com";
    private static final String SEED_PASSWORD = "support123";
    private static final String SEED_USER = "Support Agent";

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        if (!SEED_EMAIL.equalsIgnoreCase(request.getEmail()) || !SEED_PASSWORD.equals(request.getPassword())) {
            Map<String, String> response = new LinkedHashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(new LoginResponse("demo-token-support-desk", SEED_USER));
    }
}