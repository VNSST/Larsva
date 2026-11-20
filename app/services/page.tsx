import Link from 'next/link';
import { services, deliverables } from '@/data/services';
import { ArrowIcon, ClockIcon, TickIcon } from '@/components/ui/icons';
import HowItWorks from '@/components/home/HowItWorks';
import CtaBand from '@/components/ui/CtaBand';

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">Services</p>
          <h1 className="h-display mt-4 max-w-[760px]">What we build</h1>
          <p className="lead mt-6 max-w-[600px]">
            Every project starts with a written scope, one fixed price and a delivery date. You see a working demo
            midway and get the full source code at the end.
          </p>
          <nav aria-label="Services on this page" className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="card card-link group flex h-full flex-col p-5">
                    <span className="font-display text-lg font-bold">{s.title}</span>
                    <span className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-ink-2)]">
                      <ClockIcon size={14} />
                      {s.timeline}
                    </span>
                    <span className="mt-1 text-sm text-[var(--color-ink-2)]">
                      From <span className="font-semibold text-[var(--color-ink)]">{s.price}</span>
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-[var(--color-accent)]">
                      Details
                      <ArrowIcon className="rotate-90 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`section ${i % 2 === 0 ? 'section-alt' : ''}`}
          aria-labelledby={`${s.slug}-heading`}
        >
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id={`${s.slug}-heading`} className="h-section">{s.title}</h2>
              <p className="lead mt-4">{s.summary}</p>
              <dl className="mt-8 grid max-w-[420px] grid-cols-2 gap-4">
                <div className="card p-4">
                  <dt className="text-sm text-[var(--color-ink-2)]">Timeline</dt>
                  <dd className="mt-1 flex items-center gap-2 font-display font-bold">
                    <ClockIcon />
                    {s.timeline}
                  </dd>
                </div>
                <div className="card p-4">
                  <dt className="text-sm text-[var(--color-ink-2)]">Price</dt>
                  <dd className="mt-1 font-display font-bold">From {s.price}</dd>
                </div>
              </dl>
              <Link href={`/contact?service=${s.slug}#demo-form`} className="btn btn-primary mt-8">
                Book a demo
              </Link>
            </div>
            <div className="card p-6 md:p-8">
              <h3 className="text-lg font-bold">What&apos;s included</h3>
              <ul className="tick-list mt-5">
                {s.includes.map((item) => (
                  <li key={item}>
                    <TickIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="every-project">
        <div className="container-site">
          <p className="eyebrow">Every project</p>
          <h2 id="every-project" className="h-section mt-3">What you get, whatever we build</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li key={item} className="card flex items-start gap-3 p-6">
                <TickIcon className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-28" aria-label="Hiring">
        <div className="container-site">
          <div className="card-muted flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-lg">
              <span className="font-display font-bold">Need people, not a project?</span>{' '}
              <span className="text-[var(--color-ink-2)]">We also hire engineers, designers and sales talent for you.</span>
            </p>
            <Link href="/talent-solutions" className="btn btn-outline shrink-0">Talent Solutions</Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CtaBand title="Not sure which one you need?" text="Describe the problem instead. We'll tell you what to build and what it will cost." />
    </>
  );
}
