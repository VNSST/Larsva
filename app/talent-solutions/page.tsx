import type { Metadata } from 'next';
import Link from 'next/link';
import { talentRoles, talentSteps, talentTerms, talentFaqs, trainingTracks, trainingFormats } from '@/data/talent';
import FaqList from '@/components/ui/FaqList';
import CtaBand from '@/components/ui/CtaBand';
import { TickIcon } from '@/components/ui/icons';
import Image from 'next/image';
import { photos } from '@/data/photos';

export const metadata: Metadata = {
  title: 'Talent Solutions — Hiring and Corporate Training',
  description:
    'Larsva helps companies hire engineering, AI and data, and product and design talent, and trains their teams in the same areas. Our sourcing engines find candidates and our team screens them.',
  keywords: ['Tech Recruitment India', 'Hire Developers India', 'Hire AI Engineers', 'Corporate Training India', 'AI Training for Teams', 'IT Recruitment Agency'],
  alternates: { canonical: '/talent-solutions' },
  openGraph: {
    title: 'Larsva Talent Solutions — Hiring and corporate training',
    description: 'Pre-screened engineering, AI and product candidates, and hands-on training for your team.',
  },
};

const DEMO = '/book-a-demo?service=talent';
const TRAINING_DEMO = '/book-a-demo?service=training';

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
            <h1 className="h-display mt-4">Hire the right people. Train the team you have.</h1>
            <p className="lead mt-6 max-w-[560px]">
              Our sourcing engines find candidates and our team screens them, so you only meet people worth
              interviewing. Our corporate training upskills the people you already have.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={DEMO} className="btn btn-primary">Book a demo</Link>
              <a href="#corporate-training" className="btn btn-outline">Corporate training</a>
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

      <section id="hiring" className="section section-alt" aria-labelledby="engine-team">
        <div className="container-site">
          <p className="eyebrow">Why it works</p>
          <h2 id="engine-team" className="h-section mt-3 max-w-[640px]">A sourcing engine and a team that knows the roles</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="card overflow-hidden">
              <div className="relative aspect-[16/9] border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]">
                <Image src={photos.talentSourcing.src} alt={photos.talentSourcing.alt} fill sizes="(min-width: 768px) 528px, 100vw" className="object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold">Sourcing engines</h3>
                <p className="mt-2 text-[var(--color-ink-2)]">The same lead-generation systems we build for businesses, pointed at talent.</p>
                <ul className="tick-list mt-6">
                  {engine.map((e) => (
                    <li key={e}><TickIcon /><span>{e}</span></li>
                  ))}
                </ul>
              </div>
            </article>
            <article className="card overflow-hidden">
              <div className="relative aspect-[16/9] border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]">
                <Image src={photos.talentScreening.src} alt={photos.talentScreening.alt} fill sizes="(min-width: 768px) 528px, 100vw" className="object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold">Screening team</h3>
                <p className="mt-2 text-[var(--color-ink-2)]">People, not just filters, decide who reaches your shortlist.</p>
                <ul className="tick-list mt-6">
                  {team.map((e) => (
                    <li key={e}><TickIcon /><span>{e}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roles">
        <div className="container-site">
          <p className="eyebrow">Roles we hire for</p>
          <h2 id="roles" className="h-section mt-3">From first engineer to full team</h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
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

      <section id="corporate-training" className="section" aria-labelledby="training-heading">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Corporate training</p>
              <h2 id="training-heading" className="h-section mt-3">Upskill the team you already have</h2>
              <p className="lead mt-4">
                Hands-on training in the same areas we hire for, built around your tools and your team&apos;s level.
              </p>
              <ul className="tick-list mt-8">
                {trainingFormats.map((f) => (
                  <li key={f}>
                    <TickIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={TRAINING_DEMO} className="btn btn-primary mt-8">Book a training demo</Link>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-alt)]">
              <Image src={photos.corporateTraining.src} alt={photos.corporateTraining.alt} fill sizes="(min-width: 1024px) 528px, 100vw" className="object-cover" />
            </div>
          </div>

          <h3 className="mt-16 text-xl font-bold">Training tracks</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {trainingTracks.map((t) => (
              <li key={t.title} className="card p-6">
                <h4 className="font-display text-lg font-bold">{t.title}</h4>
                <ul className="tick-list mt-4">
                  {t.topics.map((topic) => (
                    <li key={topic}>
                      <TickIcon size={18} />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
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
