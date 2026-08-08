package com.example.AssetTracker.service;

import java.util.ArrayList;
import java.util.List;

import com.example.AssetTracker.dto.AssetResponse;
import com.example.AssetTracker.exception.ResourceNotFoundException;

public class AssetService {
    private final List<AssetResponse> assets = new ArrayList<>();

    public AssetService() {
        // Initialize with some sample assets
        assets.add(new AssetResponse("AT001", "1", "Laptop", "Electronics", "SN12345", "New York", "Available", null));
        assets.add(new AssetResponse("AT002", "2", "Projector", "Electronics", "SN67890", "Los Angeles", "Assigned",
                "John Doe"));
    }
    
    public List<AssetResponse> getAllAssets() {
        return assets;
    }

    public AssetResponse getAssetById(String assetId) {
        return assets.stream()
                .filter(asset -> asset.getAssetTag().equals(assetId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + assetId));
    }
}
