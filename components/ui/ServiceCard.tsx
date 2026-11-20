import Link from 'next/link';
import type { Service } from '@/data/services';
import Image from 'next/image';
import { servicePhotos } from '@/data/photos';
import { ArrowIcon, ClockIcon } from './icons';

// The whole card is one link to that service's details, so it can be tapped anywhere.
export default function ServiceCard({ service }: { service: Service }) {
  const photo = servicePhotos[service.slug];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="card card-link group flex h-full flex-col overflow-hidden"
      aria-label={`${service.title}: ${service.summary} Typical timeline ${service.timeline}. See details`}
    >
      {photo && (
        <div className="relative aspect-[16/10] border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 264px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">{service.summary}</p>
        <p className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-[var(--color-ink-2)]">
          <ClockIcon />
          {service.timeline}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--color-line)] pt-5">
          <p className="whitespace-nowrap text-sm text-[var(--color-ink-2)]">Contact for pricing</p>
          <span className="inline-flex shrink-0 items-center gap-1 font-display text-sm font-semibold text-[var(--color-accent)]">
            Details
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
