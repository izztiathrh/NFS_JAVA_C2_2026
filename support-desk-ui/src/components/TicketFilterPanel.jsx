import React from 'react';
import { useTicketData } from '../context/TicketDataContext.jsx';

export default function TicketFilterPanel({
  searchText,
  setSearchText,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  const { state, loadTickets } = useTicketData();

  const { page } = state;
  return (
    <div className="ticket-filter-panel">
      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All statuses</option>
        <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CLOSED">CLOSED</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">All priorities</option>
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>

      <div className="filter-controls">
        <label>
          Page size
          <select
            value={page.size}
            onChange={(e) => loadTickets({ page: 0, size: Number(e.target.value) })}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>

        <label>
          Sort
          <select
            value={page.sortBy}
            onChange={(e) => loadTickets({ page: 0, sortBy: e.target.value })}
          >
            <option value="createdAt">createdAt</option>
            <option value="title">title</option>
          </select>
        </label>

        <label>
          Direction
          <select value={page.direction} onChange={(e) => loadTickets({ page: 0, direction: e.target.value })}>
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </label>
      </div>
    </div>
  );
}
