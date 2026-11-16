import Image from 'next/image';
import Link from 'next/link';

type Props = { headingLevel?: 'h2' | 'h3' };

export default function Founder({ headingLevel = 'h2' }: Props) {
  const Heading = headingLevel;
  return (
    <div>
      <p className="eyebrow">Who builds it</p>
      <Heading className="h-section mt-3">The person behind your project</Heading>
      <article className="card mt-10 flex max-w-[640px] flex-col gap-6 p-6 sm:flex-row sm:items-center md:p-8">
        <Image
          src="/images/vnsst-photo.jpg"
          alt="V.N.S. Satya Teja"
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="font-display text-xl font-bold text-[var(--color-ink)]">V.N.S. Satya Teja</p>
          <p className="mt-1 font-medium text-[var(--color-accent)]">CTO, Larsva</p>
          <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">
            Five years building software products and AI, including work at Goldman Sachs and Deloitte. Leads every
            Larsva build from scope to handover.
          </p>
          <Link href="/portfolios/vnsst" className="link-arrow mt-4">
            Full profile
          </Link>
        </div>
      </article>
    </div>
  );
}
