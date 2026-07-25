package com.example.supportdesk.dto;

public class LoginResponse {

    private final String token;
    private final String user;

    public LoginResponse(String token, String user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public String getUser() {
        return user;
    }
}