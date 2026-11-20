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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <Link href="/services" className="link-arrow mt-10">
          What each service includes
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
