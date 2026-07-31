import TicketFormWizard from '../components/TicketFormWizard';

export default function TicketFormPage() {
  return (
    <section className="ticket-form-page">
      <h2>Create Ticket</h2>
      <p>Please fill in the fields to create a new support ticket.</p>
      <TicketFormWizard />
    </section>
  );
}
