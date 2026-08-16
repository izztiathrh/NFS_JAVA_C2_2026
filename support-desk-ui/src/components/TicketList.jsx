import { Link } from 'react-router-dom';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { useTicketData } from '../contexts/TicketDataContext.jsx';

function TicketList({ tickets, selectedId, onSelect }) {
  const { state, loadTickets } = useTicketData();
  const { page } = state;
  return (
    <div className="ticket-list">
      <h2>Tickets ({page.totalElements ?? tickets.length})</h2>

      {tickets.length === 0 ? (
        <p className="empty">No tickets found.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className={selectedId === ticket.id ? 'ticket-item selected' : 'ticket-item'}
              onClick={() => onSelect(ticket)}
            >
              <div className="ticket-row">
                <span className="ticket-title">{ticket.title}</span>
                <PriorityBadge priority={ticket.priority} />
              </div>
              <div className="ticket-row ticket-meta">
                <span className="ticket-category">{ticket.category}</span>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="ticket-row ticket-actions" onClick={(e) => e.stopPropagation()}>
                <Link className="ticket-action-link" to={`/app/tickets/${ticket.id}/edit`}>
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination-controls">
        <button
          onClick={() => loadTickets({ page: Math.max(0, (page.page ?? 0) - 1) })}
          disabled={(page.page ?? 0) <= 0}
        >
          Previous
        </button>
        <span className="page-info">Page {(page.page ?? 0) + 1} of {(page.totalPages ?? 0) + 1}</span>
        <button
          onClick={() => loadTickets({ page: Math.min((page.totalPages ?? 0), (page.page ?? 0) + 1) })}
          disabled={(page.page ?? 0) >= (page.totalPages ?? 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketList;
