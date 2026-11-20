import type { Metadata } from 'next';
import Link from 'next/link';
import { talentRoles, talentSteps, talentTerms, talentFaqs } from '@/data/talent';
import FaqList from '@/components/ui/FaqList';
import CtaBand from '@/components/ui/CtaBand';
import { TickIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Talent Solutions — Hiring and Recruitment',
  description:
    'Larsva helps companies hire engineers, AI, product, design, sales and marketing talent. Our sourcing engines find candidates and our team screens them. You pay only after your hire joins.',
  keywords: ['Recruitment India', 'Tech Hiring', 'Hire Developers India', 'IT Recruitment Agency', 'Talent Acquisition'],
  alternates: { canonical: '/talent-solutions' },
  openGraph: {
    title: 'Larsva Talent Solutions — Hire faster with sourcing engines and a screening team',
    description: 'Pre-screened candidates within 7 working days. Pay only after your hire joins.',
  },
};

const DEMO = '/book-a-demo?service=talent';

const engine = [
  'Reaches active and passive candidates across job boards, LinkedIn and our network',
  'Targets by skills, experience, location, salary and notice period',
  'Runs continuously, so the pipeline keeps filling while you interview',
];

const team = [
  'Recruiters who speak to every candidate before you do',
  'Engineers who check technical skills for tech roles',
  'One point of contact from the first call to the joining date',
];

export default function TalentSolutionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Talent Solutions</p>
            <h1 className="h-display mt-4">Hire the right people, faster</h1>
            <p className="lead mt-6 max-w-[560px]">
              Our sourcing engines find the candidates. Our team screens them. You meet only the people worth
              interviewing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={DEMO} className="btn btn-primary">Book a demo</Link>
              <a href="#how-it-works" className="btn btn-outline">How it works</a>
            </div>
          </div>
          <aside className="card-muted p-6 md:p-8" aria-labelledby="terms-heading">
            <h2 id="terms-heading" className="text-lg font-bold">Simple terms</h2>
            <dl className="mt-5 divide-y divide-[var(--color-line)]">
              {talentTerms.map((t) => (
                <div key={t.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <dt className="text-[var(--color-ink-2)]">{t.label}</dt>
                  <dd className="text-right font-display font-semibold">{t.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="engine-team">
        <div className="container-site">
          <p className="eyebrow">Why it works</p>
          <h2 id="engine-team" className="h-section mt-3 max-w-[640px]">A sourcing engine and a team that knows the roles</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="card p-6 md:p-8">
              <h3 className="text-xl font-bold">Sourcing engines</h3>
              <p className="mt-2 text-[var(--color-ink-2)]">The same lead-generation systems we build for businesses, pointed at talent.</p>
              <ul className="tick-list mt-6">
                {engine.map((e) => (
                  <li key={e}><TickIcon /><span>{e}</span></li>
                ))}
              </ul>
            </article>
            <article className="card p-6 md:p-8">
              <h3 className="text-xl font-bold">Screening team</h3>
              <p className="mt-2 text-[var(--color-ink-2)]">People, not just filters, decide who reaches your shortlist.</p>
              <ul className="tick-list mt-6">
                {team.map((e) => (
                  <li key={e}><TickIcon /><span>{e}</span></li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roles">
        <div className="container-site">
          <p className="eyebrow">Roles we hire for</p>
          <h2 id="roles" className="h-section mt-3">From first engineer to full team</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {talentRoles.map((r) => (
              <li key={r.title} className="card p-6">
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--color-ink-2)]">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how-it-works" className="section section-dark" aria-labelledby="talent-steps">
        <div className="container-site">
          <p className="eyebrow">How it works</p>
          <h2 id="talent-steps" className="h-section mt-3">Four steps from role to joining date</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {talentSteps.map((s, i) => (
              <li key={s.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-lg font-bold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="talent-faq">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="talent-faq" className="h-section mt-3">About hiring with us</h2>
          </div>
          <FaqList items={talentFaqs} />
        </div>
      </section>

      <CtaBand
        title="Hiring now?"
        text="Book a free 30-minute demo. Tell us the role and we will show you how we would fill it."
        href={DEMO}
      />
    </>
  );
}
