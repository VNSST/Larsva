import type { Service } from '@/data/services';
import { ClockIcon } from './icons';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">{service.summary}</p>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--color-ink-2)]">
        <ClockIcon />
        {service.timeline}
      </p>
      <p className="mt-auto border-t border-[var(--color-line)] pt-5 font-display">
        <span className="text-sm text-[var(--color-ink-2)]">From </span>
        <span className="text-lg font-bold">{service.price}</span>
      </p>
    </article>
  );
}
