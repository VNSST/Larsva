import Link from 'next/link';
import { talentTerms } from '@/data/talent';
import { ArrowIcon } from '@/components/ui/icons';

export default function TalentTeaser() {
  return (
    <section className="section" aria-labelledby="talent-heading">
      <div className="container-site">
        <div className="card grid gap-10 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Talent Solutions</p>
            <h2 id="talent-heading" className="h-section mt-3">Hiring too? We find the people.</h2>
            <p className="lead mt-4">
              Our sourcing engines find candidates and our team screens them, so you only meet people worth
              interviewing. Engineering, AI, product, design, sales and marketing roles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/talent-solutions" className="btn btn-outline">
                How hiring works
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {talentTerms.map((t) => (
              <div key={t.label} className="card-muted p-4">
                <dt className="text-sm text-[var(--color-ink-2)]">{t.label}</dt>
                <dd className="mt-1 font-display font-semibold leading-snug">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
