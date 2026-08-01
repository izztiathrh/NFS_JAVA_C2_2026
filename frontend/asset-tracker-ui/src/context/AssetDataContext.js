import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { fetchPagedAssets, updateAsset } from "../services/api.js";
import { filterAssets } from "../utils/assets.js";
import { useAuth } from "./AuthContext.jsx";

const AssetDataContext = createContext(null);

const initialState = {
  items: [],
  selectedAssetId: "",
  loading: false,
  error: "",
  cacheMessage: "No cached page loaded yet.",
  updatingId: "",
  cache: {},
  pageInfo: {
    page: 0,
    size: 5,
    sortBy: "assetTag",
    direction: "asc",
    totalPages: 0,
    totalElements: 0,
  },
  filters: {
    searchText: "",
    statusFilter: "ALL",
  },
};

function makeCacheKey(params) {
  return `${params.page}|${params.size}|${params.sortBy}|${params.direction}`;
}

function replaceAsset(items, updatedAsset) {
  return items.map((asset) =>
    asset.id === updatedAsset.id ? updatedAsset : asset,
  );
}

function replaceAssetInCache(cache, updatedAsset) {
  const nextCache = {};

  Object.entries(cache).forEach(([key, pageData]) => {
    nextCache[key] = {
      ...pageData,
      content: replaceAsset(pageData.content ?? [], updatedAsset),
    };
  });

  return nextCache;
}

function toPageInfo(data, fallback) {
  return {
    page: data.number ?? fallback.page,
    size: data.size ?? fallback.size,
    sortBy: fallback.sortBy,
    direction: fallback.direction,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0,
  };
}

function assetReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state,
        loading: true,
        error: "",
        cacheMessage: action.fromCache
          ? "Reading from cache..."
          : "Fetching from backend...",
      };

    case "LOAD_SUCCESS": {
      const items = action.data.content ?? [];
      const selectedStillVisible = items.some(
        (asset) => asset.id === state.selectedAssetId,
      );
      const selectedAssetId = selectedStillVisible
        ? state.selectedAssetId
        : (items[0]?.id ?? "");
      const nextCache = action.fromCache
        ? state.cache
        : { ...state.cache, [action.cacheKey]: action.data };

      return {
        ...state,
        items,
        selectedAssetId,
        loading: false,
        error: "",
        pageInfo: toPageInfo(action.data, action.params),
        cache: nextCache,
        cacheMessage: action.fromCache
          ? "Loaded from cache."
          : "Fetched from backend and cached.",
      };
    }

    case "LOAD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.message,
        cacheMessage: "Could not load data.",
      };

    case "SET_SEARCH_TEXT":
      return {
        ...state,
        filters: { ...state.filters, searchText: action.value },
      };

    case "SET_STATUS_FILTER":
      return {
        ...state,
        filters: { ...state.filters, statusFilter: action.value },
      };

    case "SELECT_ASSET":
      return {
        ...state,
        selectedAssetId: action.assetId,
      };

    case "OPTIMISTIC_UPDATE":
      return {
        ...state,
        updatingId: action.asset.id,
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset),
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        updatingId: "",
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset),
        cacheMessage: "Optimistic update confirmed by backend.",
      };

    case "ROLLBACK_UPDATE":
      return {
        ...state,
        updatingId: "",
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset),
        error: action.message,
        cacheMessage: "Optimistic update rolled back.",
      };

    default:
      return state;
  }
}

function toUpdatePayload(asset) {}

export function AssetDataProvider({ children }) {}

export function useAssetData() {
  const value = useContext(AssetDataContext);

  if (!value) {
    throw new Error("useAssetData must be used within an AssetDataProvider");
  }

  return value;
}
