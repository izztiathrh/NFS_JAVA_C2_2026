import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketFormWizard from '../components/TicketFormWizard';
import { useAuth } from '../contexts/AuthContext';
import { getTicket } from '../api/tickets';

export default function TicketFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const [initialValues, setInitialValues] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      setInitialValues(null);
      setLoadError('');
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setLoadError('');
    setInitialValues(null);
    setIsLoading(true);

    getTicket(token, id)
      .then((ticket) => {
        if (cancelled) return;
        setInitialValues({
          title: ticket.title ?? '',
          description: ticket.description ?? '',
          category: ticket.category ?? '',
          priority: ticket.priority ?? 'LOW',
          status: ticket.status ?? 'OPEN',
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err.message || `Failed to load ticket ${id}.`);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit, token]);

  return (
    <section className="ticket-form-page">
      <h2>{isEdit ? `Edit Ticket ${id}` : 'Create Ticket'}</h2>
      <p>
        {isEdit
          ? 'Update the fields below and save your changes to the backend.'
          : 'Please fill in the fields to create a new support ticket.'}
      </p>

      {loadError ? <p className="form-error" role="alert">{loadError}</p> : null}

      {isEdit && isLoading ? (
        <p>Loading ticket...</p>
      ) : isEdit && !initialValues && !loadError ? null : (
        <TicketFormWizard
          key={id ?? 'new'}
          initialValues={initialValues ?? undefined}
          ticketId={id}
        />
      )}
    </section>
  );
}
