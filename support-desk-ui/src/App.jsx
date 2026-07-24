import Layout from './components/Layout';
import './App.css';
import { useState } from 'react';
import sampleTickets from './data/sampleTickets';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import TicketFilterPanel from './components/TicketFilterPanel';

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const filteredTickets = sampleTickets.filter((ticket) => {
    const q = searchText.trim().toLowerCase();
    if (q) {
      const inTitle = ticket.title.toLowerCase().includes(q);
      const inCategory = ticket.category.toLowerCase().includes(q);
      if (!inTitle && !inCategory) return false;
    }
    if (statusFilter && ticket.status !== statusFilter) return false;
    if (priorityFilter && ticket.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <Layout>
      <div className="ticket-dashboard">
        <div className="ticket-panel">
          <TicketFilterPanel
            searchText={searchText}
            setSearchText={setSearchText}
            status={statusFilter}
            setStatus={setStatusFilter}
            priority={priorityFilter}
            setPriority={setPriorityFilter}
          />
          <TicketList
            tickets={filteredTickets}
            selectedId={selectedTicket?.id}
            onSelect={setSelectedTicket}
          />
        </div>
        <TicketDetail ticket={selectedTicket} />
      </div>
    </Layout>
  );
}

export default App;
