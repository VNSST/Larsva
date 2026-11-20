import Link from 'next/link';
import { deliverables } from '@/data/services';
import { projects } from '@/data/projects';
import { TickIcon } from '@/components/ui/icons';
import Image from 'next/image';
import { photos } from '@/data/photos';

export default function Hero() {
  return (
    <section className="pt-[128px] pb-16 md:pt-[152px] md:pb-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
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

        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[var(--color-bg-alt)]">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-site mt-14">
        <aside className="card-muted px-6 py-5 md:px-8" aria-labelledby="what-you-get">
          <h2 id="what-you-get" className="text-base font-bold">What you get</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                <TickIcon size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
