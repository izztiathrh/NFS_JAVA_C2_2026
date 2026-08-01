import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import apiRequest from '../../services/httpClient.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedId: null,
  loading: false,
  error: null,
  page: { page: 1, size: 50 },
  filters: { searchText: '', status: '', priority: '' },
};

export const ACTIONS = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
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

  const loadTickets = useCallback(async () => {
    dispatch({ type: ACTIONS.LOAD_START });
    try {
      const data = await apiRequest('/api/v1/tickets', { method: 'GET' });
      // expect an array
      dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: Array.isArray(data) ? data : [] });
    } catch (err) {
      dispatch({ type: ACTIONS.LOAD_ERROR, payload: err.message || String(err) });
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const value = {
    state,
    dispatch,
    loadTickets,
    setSearchText: (text) => dispatch({ type: ACTIONS.SET_SEARCH_TEXT, payload: text }),
    setStatusFilter: (status) => dispatch({ type: ACTIONS.SET_STATUS_FILTER, payload: status }),
    setPriorityFilter: (priority) => dispatch({ type: ACTIONS.SET_PRIORITY_FILTER, payload: priority }),
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
