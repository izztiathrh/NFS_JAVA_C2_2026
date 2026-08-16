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
import { useTicketData } from './contexts/TicketDataContext.jsx';

function App() {
  const { isAuthenticated, user } = useAuth();
  let ticketCtx;
  try {
    ticketCtx = useTicketData();
  } catch (e) {
    ticketCtx = {
      filteredTickets: sampleTickets,
      selectedTicket: null,
      setSearchText: () => {},
      setStatusFilter: () => {},
      setPriorityFilter: () => {},
      selectTicket: () => {},
      state: { filters: { searchText: '', status: '', priority: '' } },
    };
  }

  const { filteredTickets, selectedTicket, setSearchText, setStatusFilter, setPriorityFilter, selectTicket } = ticketCtx;

  function DashboardPage() {
    return (
      <div className="ticket-dashboard">
        <aside className="app-sidebar-hero">
          <div className="dashboard-hero-text">
            <h2>Welcome back{user ? `, ${user}` : ''}</h2>
            <p style={{ marginTop: 12 }}>Search, filter, and manage support tickets — or open a new one when something needs attention.</p>
          </div>
          <div style={{ marginTop: 18 }}>
            <Link to="/app/tickets/new" className="sidebar-cta">+ Create Ticket</Link>
          </div>
        </aside>

        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="tickets-header-card" style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>Tickets</h2>
            </div>
            <div style={{ marginLeft: 12 }}>
              <Link to="/app/tickets/new" className="dashboard-cta">New Ticket</Link>
            </div>
          </div>

          <div className="ticket-panel">
            <TicketFilterPanel
              searchText={ticketCtx.state.filters.searchText}
              setSearchText={setSearchText}
              status={ticketCtx.state.filters.status}
              setStatus={setStatusFilter}
              priority={ticketCtx.state.filters.priority}
              setPriority={setPriorityFilter}
            />
            <TicketList tickets={filteredTickets} selectedId={selectedTicket?.id} onSelect={(t) => selectTicket(t?.id)} />
          </div>
          <TicketDetail ticket={selectedTicket} />
        </main>
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
        <TicketList tickets={filteredTickets} selectedId={selectedTicket?.id} onSelect={(t) => selectTicket(t?.id)} />
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
