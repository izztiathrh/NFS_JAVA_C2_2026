import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createTicket, updateTicket } from '../api/tickets';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

// Returns an object of { field: errorMessage } for any required field that is empty.
function validate(values) {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  }
  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required';
  }
  if (!values.category || !values.category.trim()) {
    errors.category = 'Category is required';
  }
  if (!values.priority || !PRIORITIES.includes(values.priority)) {
    errors.priority = 'Priority is required';
  }
  if (!values.status || !STATUSES.includes(values.status)) {
    errors.status = 'Status is required';
  }

  return errors;
}

const emptyErrors = { title: '', description: '', category: '', priority: '', status: '' };

export default function TicketFormWizard({ initialValues, ticketId }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const isEdit = Boolean(ticketId);

  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [category, setCategory] = useState(initialValues?.category ?? '');
  const [priority, setPriority] = useState(initialValues?.priority ?? 'LOW');
  const [status, setStatus] = useState(initialValues?.status ?? 'OPEN');
  const [errors, setErrors] = useState(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Clear a field's error as the user types so messages don't linger once fixed.
  function clearFieldError(field) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');

    const values = { title, description, category, priority, status };
    const fieldErrors = validate(values);

    if (Object.values(fieldErrors).some((msg) => msg)) {
      setErrors({ ...emptyErrors, ...fieldErrors });
      return;
    }

    setErrors(emptyErrors);
    setIsSubmitting(true);

    const payload = { title, description, category, priority, status };

    try {
      const saved = isEdit
        ? await updateTicket(ticketId, token, payload)
        : await createTicket(token, payload);

      setSuccessMessage(
        isEdit
          ? `Ticket ${saved?.id ?? ticketId} updated successfully.`
          : `Ticket ${saved?.id ?? ''} created successfully.`,
      );

      // Give the user a moment to see the success banner, then go to the list.
      setTimeout(() => navigate('/app/tickets'), 700);
    } catch (err) {
      setSubmitError(err.message || (isEdit ? 'Failed to update ticket' : 'Failed to create ticket'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="ticket-title">Title</label>
        <input
          id="ticket-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            clearFieldError('title');
          }}
          aria-invalid={Boolean(errors.title) || undefined}
          aria-describedby={errors.title ? 'ticket-title-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.title ? <span id="ticket-title-error" className="field-error">{errors.title}</span> : null}
      </div>

      <div className="form-field">
        <label htmlFor="ticket-description">Description</label>
        <textarea
          id="ticket-description"
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearFieldError('description');
          }}
          aria-invalid={Boolean(errors.description) || undefined}
          aria-describedby={errors.description ? 'ticket-description-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.description ? (
          <span id="ticket-description-error" className="field-error">{errors.description}</span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="ticket-category">Category</label>
        <input
          id="ticket-category"
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            clearFieldError('category');
          }}
          aria-invalid={Boolean(errors.category) || undefined}
          aria-describedby={errors.category ? 'ticket-category-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.category ? (
          <span id="ticket-category-error" className="field-error">{errors.category}</span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="ticket-priority">Priority</label>
        <select
          id="ticket-priority"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            clearFieldError('priority');
          }}
          aria-invalid={Boolean(errors.priority) || undefined}
          aria-describedby={errors.priority ? 'ticket-priority-error' : undefined}
          disabled={isSubmitting}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.priority ? (
          <span id="ticket-priority-error" className="field-error">{errors.priority}</span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="ticket-status">Status</label>
        <select
          id="ticket-status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            clearFieldError('status');
          }}
          aria-invalid={Boolean(errors.status) || undefined}
          aria-describedby={errors.status ? 'ticket-status-error' : undefined}
          disabled={isSubmitting}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.status ? (
          <span id="ticket-status-error" className="field-error">{errors.status}</span>
        ) : null}
      </div>

      {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
      {successMessage ? <p className="form-success" role="status">{successMessage}</p> : null}

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isEdit ? 'Updating...' : 'Saving...') : isEdit ? 'Update Ticket' : 'Create Ticket'}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate('/app/tickets')}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
