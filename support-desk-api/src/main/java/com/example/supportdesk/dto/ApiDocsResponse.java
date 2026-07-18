package com.example.supportdesk.dto;

import java.util.List;

public class ApiDocsResponse {

    private String application;
    private String version;
    private String baseUrl;
    private List<ApiEndpointInfo> endpoints;

    public ApiDocsResponse(String application, String version, String baseUrl, List<ApiEndpointInfo> endpoints) {
        this.application = application;
        this.version = version;
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    }

    public String getApplication() {
        return application;
    }

    public String getVersion() {
        return version;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public List<ApiEndpointInfo> getEndpoints() {
        return endpoints;
    }
}
