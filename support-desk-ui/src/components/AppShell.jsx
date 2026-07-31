import { NavLink, Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useAuth } from '../contexts/AuthContext';

export default function AppShell() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-shell-content">
        <Outlet />
      </main>
    </div>
  );
}