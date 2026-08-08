import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects unauthenticated users to the login page', () => {
    useAuth.mockReturnValue({ token: null });

    render(
      <MemoryRouter initialEntries={['/app/tickets']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/tickets" element={<h1>Protected Tickets</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /login page/i })).toBeInTheDocument();
  });

  it('shows the protected page for authenticated users', () => {
    useAuth.mockReturnValue({ token: 'fake-token' });

    render(
      <MemoryRouter initialEntries={['/app/tickets']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/tickets" element={<h1>Protected Tickets</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /protected tickets/i })).toBeInTheDocument();
  });
});
