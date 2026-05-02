import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Process',
  description: 'Our battle-tested 3-step process takes your idea from concept to production in just 14 days.',
};

const steps = [
  {
    number: '01',
    title: 'Discovery & Scope',
    subtitle: 'Day 1–2',
    description: 'We kick off with a deep-dive into your vision. Our team works alongside you to understand the problem, define the MVP scope, map out user flows, and create a razor-sharp roadmap that sets the pace for the entire sprint.',
    details: [
      'Stakeholder alignment & vision workshop',
      'Feature prioritization with MoSCoW method',
      'Technical architecture & stack selection',
      'Sprint plan with daily milestones',
    ],
    color: 'purple',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6C17.372 6 12 13.322 12 18C12 24.627 17.372 30 24 30C30.628 30 36 24.627 36 18C36 13.322 30.628 6 24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 30V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 40H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Rapid Sprints',
    subtitle: 'Day 3–12',
    description: 'This is where the magic happens. Our elite development team builds at breakneck speed using agile micro-sprints. You get daily check-ins, real-time preview links, and the ability to pivot instantly. No black boxes, no surprises.',
    details: [
      'Daily standups & progress demos',
      'Real-time staging environment',
      'Iterative UI/UX refinement',
      'Automated testing & CI/CD pipeline',
    ],
    color: 'indigo',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M14 10L7 17L14 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 10L41 17L34 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 6L21 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 34H41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 40H31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch & Go',
    subtitle: 'Day 13–14',
    description: 'We deploy your product to production, run final QA, optimize performance, and hand everything over with full documentation. You press the big red button. We celebrate. Then we\'re there for post-launch support.',
    details: [
      'Production deployment & domain setup',
      'Performance optimization & caching',
      'Comprehensive documentation handoff',
      '30-day post-launch support included',
    ],
    color: 'sky',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 42L12 27L17 25L22 29V8H26V29L31 25L36 27L24 42Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 12L9 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 12L39 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 7L10 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 7L38 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-8">
        <div className="mx-auto max-w-[800px] text-center">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-6">
            Our Methodology
          </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tighter leading-tight mb-5">
            From Idea to Launch<br />
            <span className="gradient-text">in 14 Days</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            Our battle-tested 3-step process eliminates waste, maximizes velocity, and delivers production-ready products at startup speed.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-8">
          <div className="flex flex-col gap-20">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Icon side */}
                <div className="flex-shrink-0 w-full md:w-[280px]">
                  <div className="w-24 h-24 rounded-2xl gradient-card text-[var(--color-accent-purple)] flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <span className="font-display font-bold text-6xl tracking-tighter text-purple-100">
                    {step.number}
                  </span>
                </div>

                {/* Content side */}
                <div className="flex-1">
                  <span className="inline-block px-4 py-1 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-3">
                    {step.subtitle}
                  </span>
                  <h2 className="font-display font-bold text-3xl tracking-tight mb-4">{step.title}</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">{step.description}</p>
                  <ul className="flex flex-col gap-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                        <svg className="flex-shrink-0 mt-0.5 text-[var(--color-accent-purple)]" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M4 9L7.5 12.5L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="mx-auto max-w-[600px] px-8 text-center">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-4">Ready to start your sprint?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Book a free discovery call and let&apos;s scope your project together.
          </p>
          <Link href="/contact" className="btn-primary text-lg py-4 px-10 rounded-xl">
            Let&apos;s Go
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
