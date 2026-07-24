import React from 'react';

export default function TicketFilterPanel({
  searchText,
  setSearchText,
  status,
  setStatus,
  priority,
  setPriority,
}) {
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
    </div>
  );
}
