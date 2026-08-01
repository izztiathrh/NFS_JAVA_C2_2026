import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import apiRequest from '../../services/httpClient.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedId: null,
  loading: false,
  error: null,
  page: { page: 0, size: 10, totalPages: 0, totalElements: 0, sortBy: 'createdAt', direction: 'desc' },
  filters: { searchText: '', status: '', priority: '' },
};

export const ACTIONS = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
    LOAD_SUCCESS_PAGE: 'LOAD_SUCCESS_PAGE',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  SET_PRIORITY_FILTER: 'SET_PRIORITY_FILTER',
  SELECT_TICKET: 'SELECT_TICKET',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_START:
      return { ...state, loading: true, error: null };
    case ACTIONS.LOAD_SUCCESS:
      return { ...state, loading: false, tickets: action.payload, error: null };
    case ACTIONS.LOAD_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.LOAD_SUCCESS_PAGE:
      return { ...state, page: { ...state.page, ...action.payload } };
    case ACTIONS.SET_SEARCH_TEXT:
      return { ...state, filters: { ...state.filters, searchText: action.payload } };
    case ACTIONS.SET_STATUS_FILTER:
      return { ...state, filters: { ...state.filters, status: action.payload } };
    case ACTIONS.SET_PRIORITY_FILTER:
      return { ...state, filters: { ...state.filters, priority: action.payload } };
    case ACTIONS.SELECT_TICKET:
      return { ...state, selectedId: action.payload };
    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadTickets = useCallback(
    // options may include page, size, sortBy, direction, filters
    async (opts = {}) => {
      dispatch({ type: ACTIONS.LOAD_START });
      const page = opts.page ?? state.page.page ?? 0;
      const size = opts.size ?? state.page.size ?? 10;
      const sortBy = opts.sortBy ?? state.page.sortBy ?? 'createdAt';
      const direction = opts.direction ?? state.page.direction ?? 'desc';
      const filters = { ...(state.filters || {}), ...(opts.filters || {}) };

      const qs = new URLSearchParams();
      qs.set('page', String(page));
      qs.set('size', String(size));
      qs.set('sortBy', sortBy);
      qs.set('direction', direction);
      if (filters.searchText) qs.set('search', filters.searchText);
      if (filters.status) qs.set('status', filters.status);
      if (filters.priority) qs.set('priority', filters.priority);

      try {
        // Try server-side paged endpoint first
        const url = `/api/v1/tickets/paged?${qs.toString()}`;
        const data = await apiRequest(url, { method: 'GET' });

        // If server returns a Spring-style Page (content + totalPages), use it
        if (data && Array.isArray(data.content)) {
          dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: data.content });
          dispatch({ type: ACTIONS.LOAD_SUCCESS_PAGE, payload: { page, size, totalPages: data.totalPages ?? 0, totalElements: data.totalElements ?? 0, sortBy, direction } });
        } else if (Array.isArray(data)) {
          // Server returned all tickets (fallback) — perform client-side paging
          const start = page * size;
          const pageItems = data.slice(start, start + size);
          dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: pageItems });
          const totalElements = data.length;
          const totalPages = Math.max(0, Math.ceil(totalElements / size) - 1);
          dispatch({ type: ACTIONS.LOAD_SUCCESS_PAGE, payload: { page, size, totalPages, totalElements, sortBy, direction } });
        } else {
          // Unexpected shape — clear
          dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: [] });
          dispatch({ type: ACTIONS.LOAD_SUCCESS_PAGE, payload: { page, size, totalPages: 0, totalElements: 0, sortBy, direction } });
        }
      } catch (err) {
        // If paged endpoint not found (404), fallback to non-paged endpoint
        if (err.status === 404 || /404/.test(err.message)) {
          try {
            const all = await apiRequest('/api/v1/tickets', { method: 'GET' });
            const start = page * size;
            const pageItems = Array.isArray(all) ? all.slice(start, start + size) : [];
            dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: pageItems });
            const totalElements = Array.isArray(all) ? all.length : 0;
            const totalPages = Math.max(0, Math.ceil(totalElements / size) - 1);
            dispatch({ type: ACTIONS.LOAD_SUCCESS_PAGE, payload: { page, size, totalPages, totalElements, sortBy, direction } });
          } catch (err2) {
            dispatch({ type: ACTIONS.LOAD_ERROR, payload: err2.message || String(err2) });
          }
        } else {
          dispatch({ type: ACTIONS.LOAD_ERROR, payload: err.message || String(err) });
        }
      }
    },
    [state.filters, state.page.page, state.page.size, state.page.sortBy, state.page.direction],
  );

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const value = {
    state,
    dispatch,
    loadTickets,
    setSearchText: (text) => {
      dispatch({ type: ACTIONS.SET_SEARCH_TEXT, payload: text });
      // reload from first page with new search text
      loadTickets({ page: 0, filters: { ...state.filters, searchText: text } });
    },
    setStatusFilter: (status) => {
      dispatch({ type: ACTIONS.SET_STATUS_FILTER, payload: status });
      loadTickets({ page: 0, filters: { ...state.filters, status } });
    },
    setPriorityFilter: (priority) => {
      dispatch({ type: ACTIONS.SET_PRIORITY_FILTER, payload: priority });
      loadTickets({ page: 0, filters: { ...state.filters, priority } });
    },
    selectTicket: (id) => dispatch({ type: ACTIONS.SELECT_TICKET, payload: id }),
    // derived
    filteredTickets: state.tickets.filter((ticket) => {
      const q = state.filters.searchText?.trim().toLowerCase();
      if (q) {
        const inTitle = (ticket.title || '').toLowerCase().includes(q);
        const inCategory = (ticket.category || '').toLowerCase().includes(q);
        if (!inTitle && !inCategory) return false;
      }
      if (state.filters.status && ticket.status !== state.filters.status) return false;
      if (state.filters.priority && ticket.priority !== state.filters.priority) return false;
      return true;
    }),
    selectedTicket: state.tickets.find((t) => t.id === state.selectedId) || null,
  };

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

export function useTicketData() {
  const ctx = useContext(TicketDataContext);
  if (!ctx) throw new Error('useTicketData must be used within TicketDataProvider');
  return ctx;
}

export default TicketDataProvider;
