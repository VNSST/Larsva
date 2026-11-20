import type { Metadata } from 'next';
import Founder from '@/components/home/Founder';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'About — Who We Are and How We Work',
  description:
    'Larsva is a build shop: we build websites, web apps, mobile apps and AI automations on a clear timeline, and help companies hire.',
  keywords: ['About Larsva', 'Recruitment India', 'Software Development India'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Larsva',
    description: 'We build websites, apps and AI automations, and help companies hire.',
  },
};

const principles = [
  {
    title: 'Clear scope, agreed up front',
    text: 'You get a written scope and pricing before we start, so you know exactly what you are paying for.',
  },
  {
    title: 'A date you can plan around',
    text: 'Every proposal has a delivery date. Midway, you click through a working demo, so there are no surprises at the end.',
  },
  {
    title: 'You own everything',
    text: 'At handover you get the full source code, the accounts and a walkthrough. No lock-in.',
  },
  {
    title: 'Plain answers',
    text: 'We tell you what is worth building and what is not, in language that does not need a translator.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">About</p>
          <h1 className="h-display mt-4 max-w-[800px]">A small team that builds and ships</h1>
          <p className="lead mt-6 max-w-[620px]">
            Larsva builds websites, web apps, mobile apps and AI automations for businesses. Each project starts with a
            written scope and a delivery date, agreed before any work starts.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="how-we-work">
        <div className="container-site">
          <p className="eyebrow">How we work</p>
          <h2 id="how-we-work" className="h-section mt-3">What you can expect from us</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <article key={p.title} className="card p-6 md:p-8">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <Founder />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="company">
        <div className="container-site">
          <h2 id="company" className="h-section">Company details</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-display font-semibold">Registered name</dt>
              <dd className="mt-1 text-[var(--color-ink-2)]">LARSVA (OPC) PRIVATE LIMITED</dd>
            </div>
            <div>
              <dt className="font-display font-semibold">Registered office</dt>
              <dd className="mt-1 text-[var(--color-ink-2)]">
                FLATNO:402 KALLAM TOWN, SHIP DHARMAKSHETRA, Piduguralla, Piduguralla, Guntur- 522413, Andhra Pradesh
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
