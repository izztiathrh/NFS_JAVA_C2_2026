import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-brand">
          <div className="brand-title">Support Desk UI</div>
          <div className="brand-sub">Day 11 React Fundamentals</div>
        </div>

        <nav className="app-nav">
          <NavLink to="/app/dashboard" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Dashboard</NavLink>
          <NavLink to="/app/tickets" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Tickets</NavLink>
          <NavLink to="/app/reports" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Reports</NavLink>
        </nav>

        <div className="app-user">
          <div style={{textAlign: 'right'}}>
            <div className="user-email">{user ?? 'admin@example.com'}</div>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="app-header-live">Live</div>
    </header>
  );
}