import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

function TicketDetail({ ticket }) {
  // Empty state: when no ticket is selected
  if (!ticket) {
    return (
      <div className="ticket-detail empty">
        <p>Select a ticket from the list to see its details.</p>
      </div>
    );
  }

  return (
    <div className="ticket-detail">
      <header className="ticket-detail-header">
        <h2>{ticket.title}</h2>
        <div className="ticket-detail-badges">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </header>

      <dl className="ticket-detail-fields">
        <dt>Category</dt>
        <dd>{ticket.category}</dd>

        <dt>Created by</dt>
        <dd>{ticket.createdBy}</dd>

        <dt>Created at</dt>
        <dd>{ticket.createdAt}</dd>

        {ticket.description && (
          <>
            <dt>Description</dt>
            <dd>{ticket.description}</dd>
          </>
        )}
      </dl>
    </div>
  );
}

export default TicketDetail;
