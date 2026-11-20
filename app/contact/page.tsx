import type { Metadata } from 'next';
import ConsultationForm from '@/components/forms/ConsultationForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact LARSVA (OPC) PRIVATE LIMITED: email info@larsva.com, phone +91 91338 04790, registered office in Piduguralla, Guntur, Andhra Pradesh.',
  keywords: ['Contact Larsva', 'Book a Demo', 'Software Development India', 'Recruitment India'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Larsva',
    description: 'Email, phone and registered address of LARSVA (OPC) PRIVATE LIMITED.',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display mt-4">Contact us</h1>
          <p className="lead mt-6 max-w-[600px]">
            Email, call or book a demo below. We reply within 24 hours.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="company-details">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Company details come first: they are what store and business verification checks. */}
          <div>
            <h2 id="company-details" className="text-2xl font-bold">Company details</h2>
            <dl className="mt-8 flex flex-col gap-7">
              <div>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Company</dt>
                <dd className="mt-2 text-lg font-semibold">LARSVA (OPC) PRIVATE LIMITED</dd>
              </div>
              <div>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Address</dt>
                <dd className="mt-2">
                  <address className="not-italic leading-relaxed text-[var(--color-ink)]">
                    LARSVA (OPC) PRIVATE LIMITED
                    <br />
                    FLATNO:402 KALLAM TOWN, SHIP DHARMAKSHETRA,
                    <br />
                    Piduguralla, Piduguralla, Guntur- 522413,
                    <br />
                    Andhra Pradesh
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Email</dt>
                <dd className="mt-2 flex flex-col gap-1">
                  <a href="mailto:info@larsva.com" className="tap-link text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">info@larsva.com</a>
                  <a href="mailto:admin@larsva.com" className="tap-link text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">admin@larsva.com</a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Phone</dt>
                <dd className="mt-2">
                  <a href="tel:+919133804790" className="tap-link text-lg font-medium text-[var(--color-accent)] hover:underline underline-offset-4">+91 91338 04790</a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-2)]">Response time</dt>
                <dd className="mt-2 text-[var(--color-ink-2)]">Within 24 hours</dd>
              </div>
            </dl>
          </div>

          <div id="demo-form" className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold">Book a demo</h2>
            <p className="mb-6 mt-2 text-[var(--color-ink-2)]">
              A free 30-minute call about your project or hiring needs. We reply within 24 hours to set a time.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
