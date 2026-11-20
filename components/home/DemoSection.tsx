import ConsultationForm from '@/components/forms/ConsultationForm';
import { TickIcon } from '@/components/ui/icons';

const agenda = [
  'Projects like yours that we have already built',
  'A walkthrough of how we would approach your idea',
  'Honest answers on timeline, cost and what to build first',
];

export default function DemoSection() {
  return (
    <section id="demo" className="section" aria-labelledby="demo-heading">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Book a demo</p>
          <h2 id="demo-heading" className="h-section mt-3">See how we would build it</h2>
          <p className="lead mt-4 max-w-[460px]">
            A free 30-minute call. Within 24 hours of it, you get a written scope, one fixed price and a delivery date.
          </p>
          <ul className="tick-list mt-8">
            {agenda.map((item) => (
              <li key={item}>
                <TickIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[var(--color-ink-2)]">Prefer email?</p>
          <a href="mailto:info@larsva.com" className="mt-1 inline-block font-display text-lg font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline">
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
