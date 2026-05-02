import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Larsva',
  description: 'We\'re a crew of builders, designers, and strategists who ship products at startup speed. Learn what makes Larsva different.',
};

const values = [
  {
    emoji: '⚡',
    title: 'Speed is a Feature',
    description: 'We believe the fastest path to validation is a shipped product. Every day counts.',
  },
  {
    emoji: '🎯',
    title: 'Ruthless Focus',
    description: 'We cut scope, not corners. Every feature earns its place in the sprint.',
  },
  {
    emoji: '🤝',
    title: 'Radical Transparency',
    description: 'Daily check-ins, live previews, zero surprises. You\'re part of the team.',
  },
  {
    emoji: '🚀',
    title: 'Ship > Perfect',
    description: 'A good product in users\' hands beats a perfect one on a whiteboard.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '14', label: 'Avg. Days to Launch' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Coverage' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-8">
        <div className="mx-auto max-w-[800px] text-center">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-6">
            About Us
          </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tighter leading-tight mb-5">
            We Build Things<br />
            <span className="gradient-text">Insanely Fast.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            Larsva is a crew of builders, designers, and strategists who turn bold ideas into production-ready products — in just two weeks.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[800px] px-8">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-6">Our Story</h2>
          <div className="flex flex-col gap-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              We started Larsva because we were tired of watching great ideas die in six-month development cycles.
              Founders were bleeding cash. Agencies were billing hours. And nothing was shipping.
            </p>
            <p>
              So we built a different kind of studio — one obsessed with velocity. Our team has collectively shipped
              over 50 products across SaaS, e-commerce, health tech, and fintech. We&apos;ve worked with bootstrapped
              founders and funded startups alike.
            </p>
            <p>
              The secret? A razor-sharp process, a stacked team, and an allergic reaction to scope creep.
              We don&apos;t do &quot;phase 2.&quot; We ship phase 1 — fast — and iterate from there.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="mx-auto max-w-[900px] px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-4xl tracking-tight text-[var(--color-text-primary)] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl tracking-tight mb-3">What We Stand For</h2>
            <p className="text-lg text-[var(--color-text-secondary)]">Our guiding principles — in everything we build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="card-border-gradient group"
              >
                <div className="bg-white rounded-[18px] p-8 relative z-[1]">
                  <span className="text-3xl mb-4 block">{value.emoji}</span>
                  <h3 className="font-display font-bold text-xl tracking-tight mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="mx-auto max-w-[600px] px-8 text-center">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-4">Want to work with us?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            We&apos;re always looking for exciting projects. Let&apos;s chat.
          </p>
          <Link href="/contact" className="btn-primary text-lg py-4 px-10 rounded-xl">
            Get in Touch
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
