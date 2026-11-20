import type { Metadata } from 'next';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { TickIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Book a free 30-minute demo with Larsva about a website, app, AI automation or a role you need to hire for. We reply within 24 hours to set a time.',
  alternates: { canonical: '/book-a-demo' },
  openGraph: {
    title: 'Book a demo with Larsva',
    description: 'A free 30-minute call about your project or hiring needs.',
  },
};

const agenda = [
  'Projects like yours that we have already built',
  'How we would approach your requirement',
  'Honest answers on timeline, cost and what to do first',
];

// Every "Book a demo" button on the site opens this page. Links from a service or Talent Solutions
// add ?service=<slug>, which the form uses to start the requirement for the visitor.
export default function BookADemoPage() {
  return (
    <section className="pt-[120px] pb-20 md:pt-[152px] md:pb-28 bg-[var(--color-bg-alt)] min-h-screen">
      {/* Phones: heading, form, then details. Desktop: heading and details on the left, form on the right. */}
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-x-16 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow">Book a demo</p>
          <h1 className="h-display mt-4">Let&apos;s talk about what you need</h1>
          <p className="lead mt-6 max-w-[480px]">
            A free 30-minute call about your project or hiring needs. Send the form and we reply within 24 hours to set
            a time.
          </p>
        </div>

        <div className="card self-start p-6 md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ConsultationForm />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:mt-10">
          <h2 className="font-display text-lg font-bold">In the demo</h2>
          <ul className="tick-list mt-4">
            {agenda.map((item) => (
              <li key={item}>
                <TickIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-[var(--color-line)] pt-8 text-[var(--color-ink-2)]">
            <p>Prefer to reach us directly?</p>
            <p className="mt-2">
              <a href="mailto:info@larsva.com" className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline">info@larsva.com</a>
              <span aria-hidden="true"> · </span>
              <a href="tel:+919133804790" className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline">+91 91338 04790</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
