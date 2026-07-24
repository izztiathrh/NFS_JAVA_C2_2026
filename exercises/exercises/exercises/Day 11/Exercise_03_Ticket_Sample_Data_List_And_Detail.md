// src/data/sampleTickets.js
//
// Sample ticket data for Day 11 Exercise 3.
// This is a plain JS module (not .jsx) because there's no JSX in here —
// just an exported array of plain objects.

const sampleTickets = [
  {
    id: 'ticket-1',
    title: 'Cannot access email',
    description: 'User reports being locked out of their email account since this morning. Password reset email never arrived.',
    category: 'Email',
    priority: 'HIGH',
    status: 'OPEN',
    createdBy: 'ferran@example.com',
    createdAt: '2026-07-09'
  },
  {
    id: 'ticket-2',
    title: 'Printer not responding',
    description: 'Office printer on the 3rd floor is offline. Restart did not fix it.',
    category: 'Hardware',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdBy: 'mei@example.com',
    createdAt: '2026-07-10'
  },
  {
    id: 'ticket-3',
    title: 'VPN keeps disconnecting',
    description: 'VPN drops every 10-15 minutes when working from home. Reconnecting manually works but is disruptive.',
    category: 'Network',
    priority: 'LOW',
    status: 'OPEN',
    createdBy: 'ahmad@example.com',
    createdAt: '2026-07-11'
  },
  {
    id: 'ticket-4',
    title: 'Request: Adobe Acrobat Pro license',
    description: 'Need a license installed on my laptop for editing PDF forms.',
    category: 'Software',
    priority: 'LOW',
    status: 'RESOLVED',
    createdBy: 'sara@example.com',
    createdAt: '2026-07-12'
  },
  {
    id: 'ticket-5',
    title: 'Database backup failed last night',
    description: 'Nightly backup job for the customer DB exited with a non-zero code. Need to verify and re-run.',
    category: 'Infrastructure',
    priority: 'HIGH',
    status: 'OPEN',
    createdBy: 'devops@example.com',
    createdAt: '2026-07-13'
  },
  {
    id: 'ticket-6',
    title: 'Laptop battery drains in 30 minutes',
    description: 'Battery health reported as poor by the OS. Replacement may be needed.',
    category: 'Hardware',
    priority: 'MEDIUM',
    status: 'CLOSED',
    createdBy: 'kenji@example.com',
    createdAt: '2026-07-14'
  }
];

export default sampleTickets;
