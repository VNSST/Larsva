import Link from 'next/link';
import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowIcon } from '@/components/ui/icons';

export default function WhatWeBuild() {
  return (
    <section className="section section-alt" aria-labelledby="what-we-build">
      <div className="container-site">
        <SectionHeading id="what-we-build" eyebrow="What we build" title="Four things we build">
          Tell us your requirement and we send a proposal with the scope, timeline and pricing before any work starts.
        </SectionHeading>
        {/* Phones: a swipeable row with the next card peeking in. Larger screens: a grid. */}
        <ul className="swipe-row mt-10 sm:mx-0 sm:mt-12 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug} className="swipe-item sm:w-auto">
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-[var(--color-ink-2)] sm:hidden" aria-hidden="true">Swipe to see all four →</p>
        <Link href="/services" className="link-arrow mt-10">
          What each service includes
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
