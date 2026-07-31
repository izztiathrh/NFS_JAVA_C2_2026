import { Link } from 'react-router-dom';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

function TicketList({ tickets, selectedId, onSelect }) {
  return (
    <div className="ticket-list">
      <h2>Tickets ({tickets.length})</h2>

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
    </div>
  );
}

export default TicketList;
