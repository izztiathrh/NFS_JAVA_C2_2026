import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketFormWizard from '../components/TicketFormWizard';
import sampleTickets from '../data/sampleTickets';

export default function TicketFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!isEdit) {
      setInitialValues(null);
      setLoadError('');
      return;
    }

    const found = sampleTickets.find((t) => t.id === id);
    if (!found) {
      setLoadError(`Ticket ${id} was not found.`);
      setInitialValues(null);
      return;
    }

    setLoadError('');
    setInitialValues({
      title: found.title ?? '',
      description: found.description ?? '',
      category: found.category ?? '',
      priority: found.priority ?? 'LOW',
      status: found.status ?? 'OPEN',
    });
  }, [id, isEdit]);

  return (
    <section className="ticket-form-page">
      <h2>{isEdit ? `Edit Ticket ${id}` : 'Create Ticket'}</h2>
      <p>
        {isEdit
          ? 'Update the fields below and save your changes to the backend.'
          : 'Please fill in the fields to create a new support ticket.'}
      </p>

      {loadError ? <p className="form-error" role="alert">{loadError}</p> : null}

      {isEdit && !initialValues && !loadError ? (
        <p>Loading ticket...</p>
      ) : (
        <TicketFormWizard
          key={id ?? 'new'}
          initialValues={initialValues ?? undefined}
          ticketId={id}
        />
      )}
    </section>
  );
}
