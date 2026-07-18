package com.example.supportdesk.dto;

public class ApiEndpointInfo {

    private String method;
    private String path;
    private String access;
    private String description;

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
