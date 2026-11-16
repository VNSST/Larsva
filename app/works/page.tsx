import type { Metadata } from 'next';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { ExternalIcon } from '@/components/ui/icons';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Our Work — Websites and Apps We Have Built',
  description: 'Websites and web apps built by Larsva, including Mana PG Rent, B School of AI and Fly Castles.',
  keywords: ['Larsva Portfolio', 'Website Development Projects', 'Web App Case Studies'],
  alternates: {
    canonical: '/works',
  },
  openGraph: {
    title: 'Our Work — Larsva',
    description: 'Websites and web apps built by Larsva.',
  },
};

export default function WorksPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">Work</p>
          <h1 className="h-display mt-4">Our work</h1>
          <p className="lead mt-6 max-w-[600px]">Live sites and apps we have built, what each client needed and what we delivered.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-site flex flex-col gap-16 md:gap-24">
          {projects.map((p, i) => (
            <article key={p.slug} className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14" aria-labelledby={`${p.slug}-heading`}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="card card-link relative block aspect-[16/10] overflow-hidden bg-[var(--color-bg-alt)]"
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover object-top"
                />
              </a>
              <div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <h2 id={`${p.slug}-heading`} className="mt-4 text-3xl font-bold">{p.name}</h2>
                <p className="lead mt-3">{p.summary}</p>
                <dl className="mt-6 flex flex-col gap-4">
                  <div>
                    <dt className="font-display font-semibold">What they needed</dt>
                    <dd className="mt-1 leading-relaxed text-[var(--color-ink-2)]">{p.needed}</dd>
                  </div>
                  <div>
                    <dt className="font-display font-semibold">What we built</dt>
                    <dd className="mt-1 leading-relaxed text-[var(--color-ink-2)]">{p.built}</dd>
                  </div>
                </dl>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6">
                  Visit {p.name}
                  <ExternalIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
