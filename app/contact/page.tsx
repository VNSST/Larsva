import type { Metadata } from 'next';
import ConsultationForm from '@/components/forms/ConsultationForm';

export const metadata: Metadata = {
  title: 'Contact — Get a Quote',
  description:
    'Tell Larsva what you need built. Within 24 hours you get a written scope, one fixed price and a delivery date.',
  keywords: ['Contact Larsva', 'Website Quote India', 'App Development Quote'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Larsva — Get a Quote',
    description: 'Send a short brief and get a fixed-price quote within 24 hours.',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display mt-4">Get a quote</h1>
          <p className="lead mt-6 max-w-[600px]">
            Send a short brief. Within 24 hours we reply with a written scope, one fixed price and a delivery date.
          </p>
        </div>
      </section>

      <section id="quote-form" className="section section-alt">
        <div className="container-site grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* The form comes first, on phones too. */}
          <div className="card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Tell us what you need</h2>
            <ConsultationForm />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Email</h2>
              <ul className="mt-2 flex flex-col gap-1">
                <li><a href="mailto:info@larsva.com" className="text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">info@larsva.com</a></li>
                <li><a href="mailto:admin@larsva.com" className="text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">admin@larsva.com</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Phone</h2>
              <a href="tel:+919133804790" className="mt-2 inline-block text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">
                +91 91338 04790
              </a>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Address</h2>
              <address className="mt-2 not-italic leading-relaxed text-[var(--color-ink-2)]">
                <span className="font-semibold text-[var(--color-ink)]">LARSVA (OPC) PRIVATE LIMITED</span>
                <br />
                FLATNO:402 KALLAM TOWN, SHIP DHARMAKSHETRA,
                <br />
                Piduguralla, Piduguralla, Guntur- 522413,
                <br />
                Andhra Pradesh
              </address>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Response time</h2>
              <p className="mt-2 text-[var(--color-ink-2)]">Within 24 hours. Everything you share stays confidential.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
