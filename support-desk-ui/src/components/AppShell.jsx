import { NavLink, Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useAuth } from '../contexts/AuthContext';

export default function AppShell() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <AppHeader />
      <nav className="app-nav">
        <NavLink to="/app/dashboard" end>
          Dashboard
        </NavLink>
        <NavLink to="/app/tickets">Tickets</NavLink>
        <NavLink to="/app/reports">Reports</NavLink>
      </nav>
      <div className="app-shell-bar">
        <span>{user}</span>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
      <main className="app-shell-content">
        <Outlet />
      </main>
    </div>
  );
}