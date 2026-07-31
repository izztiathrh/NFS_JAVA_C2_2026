import './App.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import sampleTickets from './data/sampleTickets';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import TicketFilterPanel from './components/TicketFilterPanel';
import TicketFormPage from './pages/TicketFormPage';
import AppShell from './components/AppShell';
import { Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, user } = useAuth();
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

  function DashboardPage() {
    return (
      <div className="ticket-dashboard">
        <div className="dashboard-hero">
          <div className="dashboard-hero-text">
            <h2>Welcome back{user ? `, ${user}` : ''}</h2>
            <p>Search, filter, and manage support tickets — or open a new one when something needs attention.</p>
          </div>
          <Link to="/app/tickets/new" className="btn-primary dashboard-cta">
            + Create Ticket
          </Link>
        </div>

        <div className="dashboard-grid">
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
      </div>
    );
  }

  function TicketsPage() {
    return (
      <section className="tickets-page">
        <h2>Tickets</h2>
        <p>This route shows the ticket list inside the shared app shell.</p>
        <div style={{ margin: '12px 0' }}>
          <Link to="/app/tickets/new">
            <button>Create New Ticket</button>
          </Link>
        </div>
        <TicketList
          tickets={filteredTickets}
          selectedId={selectedTicket?.id}
          onSelect={setSelectedTicket}
        />
      </section>
    );
  }

  function ReportsPage() {
    return (
      <section className="reports-page">
        <h2>Reports</h2>
        <p>Reports content goes here.</p>
      </section>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/app/dashboard' : '/login'} replace />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/app"
        element={<ProtectedRoute />}
      >
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/new" element={<TicketFormPage />} />
          <Route path="tickets/:id/edit" element={<TicketFormPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
