package com.example.supportdesk.dto;

public class ApiEndpointInfo {

    private final String method;
    private final String path;
    private final String access;
    private final String description;

    public ApiEndpointInfo(String method, String path, String access, String description) {
        this.method = method;
        this.path = path;
        this.access = access;
        this.description = description;
    }

    public String getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public String getAccess() {
        return access;
    }

    public String getDescription() {
        return description;
    }
}
