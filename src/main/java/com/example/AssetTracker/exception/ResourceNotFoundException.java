package com.example.AssetTracker.exception;

/**
 * Thrown by services when a requested resource (e.g. asset, ticket) cannot
 * be found. Mapped to HTTP 404 by the application's exception handler.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
