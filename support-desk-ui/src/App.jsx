import Layout from './components/Layout';
import './App.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <Layout>
            <main className="auth-page">
              <h2>Login</h2>
              <p>Use this route to confirm React Router is working.</p>
            </main>
          </Layout>
        }
      />
      <Route
        path="/app/dashboard"
        element={
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
        }
      />
      <Route
        path="/app/tickets"
        element={
          <Layout>
            <main className="tickets-page">
              <h2>Tickets</h2>
              <p>This route can later hold the ticket index or detail views.</p>
              <TicketList
                tickets={filteredTickets}
                selectedId={selectedTicket?.id}
                onSelect={setSelectedTicket}
              />
            </main>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
