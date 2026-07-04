package com.example.AssetTracker.dto;

/**
 * DTO is shape of data send to  or returned from API
 * RESPONSE DTO: what backend sends back
 * request DTO: what frontend send in
 * AssetResponse
 */
public class AssetResponse {
    private String assetTag;
    private String id;
    private String name;
    private String category;
    private String serialNumber;
    private String location;
    private String status;
    private String assignedTo;

    public AssetResponse(String assetTag, String id, String name, String category, String serialNumber, String location,
            String status, String assignedTo) {
        this.assetTag = assetTag;
        this.id = id;
        this.name = name;
        this.category = category;
        this.serialNumber = serialNumber;
        this.location = location;
        this.status = status;
        this.assignedTo = assignedTo;
    }
    
    public String getId() {
        return id;
    }

    public String getAssetTag() {
        return assetTag;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getSerialNumber() {
        return serialNumber;
    }


    public String getLocation() {
        return location;
    }

    public String getStatus() {
        return status;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    
    
}
