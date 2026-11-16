import ConsultationForm from '@/components/forms/ConsultationForm';

export default function QuoteSection() {
  return (
    <section id="quote" className="section" aria-labelledby="quote-heading">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Get a quote</p>
          <h2 id="quote-heading" className="h-section mt-3">Tell us what you need</h2>
          <p className="lead mt-4 max-w-[460px]">
            Send a short brief. Within 24 hours we reply with a written scope, one fixed price and a delivery date.
          </p>
          <p className="mt-8 text-[var(--color-ink-2)]">Prefer email?</p>
          <a href="mailto:info@larsva.com" className="mt-1 inline-block font-display text-lg font-semibold text-[var(--color-accent)] hover:underline underline-offset-4">
            info@larsva.com
          </a>
        </div>
        <div className="card p-6 md:p-8">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
