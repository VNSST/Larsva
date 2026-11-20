import Link from 'next/link';
import { deliverables } from '@/data/services';
import { projects } from '@/data/projects';
import { TickIcon } from '@/components/ui/icons';

export default function Hero() {
  return (
    <section className="pt-[136px] pb-20 md:pt-[168px] md:pb-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Websites, apps and AI automation</p>
          <h1 className="h-display mt-4">We build it. You launch it.</h1>
          <p className="lead mt-6 max-w-[540px]">
            Built around your requirement, delivered on a clear timeline. Book a free 30-minute demo and get a proposal
            within 24 hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book-a-demo" className="btn btn-primary">Book a demo</Link>
            <Link href="/works" className="btn btn-outline">See our work</Link>
          </div>
          <p className="mt-8 text-sm text-[var(--color-ink-2)]">
            Recently built:{' '}
            {projects.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-ink)] underline decoration-[var(--color-line)] underline-offset-4 hover:decoration-[var(--color-ink)]">
                  {p.name}
                </a>
              </span>
            ))}
          </p>
        </div>

        <aside className="card-muted p-6 md:p-8" aria-labelledby="what-you-get">
          <h2 id="what-you-get" className="text-lg font-bold">What you get</h2>
          <ul className="tick-list mt-5">
            {deliverables.map((item) => (
              <li key={item}>
                <TickIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
