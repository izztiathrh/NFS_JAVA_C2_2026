import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketFormWizard({ initialValues }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [category, setCategory] = useState(initialValues?.category ?? '');
  const [priority, setPriority] = useState(initialValues?.priority ?? 'LOW');
  const [status, setStatus] = useState(initialValues?.status ?? 'OPEN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const payload = { title, description, category, priority, status };

    try {
      const res = await fetch('/api/v1/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || 'Failed to create ticket');
      }

      // If backend returns created ticket, parse it (optional)
      // const created = await res.json();

      navigate('/app/tickets');
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>

      <label>
        Category
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>

      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </label>

      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <div>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Create Ticket'}</button>
      </div>
    </form>
  );
}
