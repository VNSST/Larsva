import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Larsva',
  description: 'We\'re a crew of builders, designers, and strategists who ship products at startup speed. Learn what makes Larsva different.',
};

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17 9L24 10L19 15L20 22L14 19L8 22L9 15L4 10L11 9L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Speed is a Feature',
    description: 'We believe the fastest path to validation is a shipped product. Every day counts.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Ruthless Focus',
    description: 'We cut scope, not corners. Every feature earns its place in the sprint.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14L10 20L24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Radical Transparency',
    description: 'Daily check-ins, live previews, zero surprises. You\'re part of the team.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4V14L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
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
      <section className="gradient-hero pt-36 pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent-purple)] mb-5 block">
            About Us
          </span>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-tight mb-6 text-white">
            We Build Things<br />
            <span className="gradient-text">Insanely Fast.</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/45 max-w-[560px] mx-auto leading-relaxed">
            Larsva is a crew of builders, designers, and strategists who turn bold ideas into production-ready products — in just two weeks.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <span className="overline text-[var(--color-accent-purple)] mb-4 block">Our Story</span>
          <h2 className="font-serif font-bold text-3xl tracking-tight mb-8">Why we exist.</h2>
          <div className="flex flex-col gap-6 text-[var(--color-text-secondary)] leading-[1.8]">
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
      <section className="py-20 bg-[var(--color-bg-dark)]">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif font-bold text-4xl md:text-5xl tracking-tight text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 font-medium tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-white grid-pattern">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="overline text-[var(--color-accent-purple)] mb-4 block">Our Values</span>
            <h2 className="font-serif font-bold text-3xl tracking-tight mb-4">What We Stand For</h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-lg text-[var(--color-text-secondary)]">Our guiding principles — in everything we build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[var(--color-accent-purple)]/20 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(108,75,244,0.08)] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] flex items-center justify-center mb-5 transition-all duration-400 group-hover:bg-[var(--color-accent-purple)] group-hover:text-white group-hover:scale-105">
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[600px] px-6 md:px-10 text-center relative z-10">
          <h2 className="font-serif font-bold text-3xl tracking-tight mb-5 text-white">Want to work with us?</h2>
          <p className="text-white/40 mb-10 leading-relaxed">
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
