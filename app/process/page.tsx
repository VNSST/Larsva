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
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M28 28L36 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
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
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 10L5 17L12 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 10L35 17L28 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 6L17 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 34L10 22L14 20L18 24V6H22V24L26 20L30 22L20 34Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 10L32 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-36 pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent-purple)] mb-5 block">
            Our Methodology
          </span>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-tight mb-6 text-white">
            From Idea to Launch<br />
            <span className="gradient-text">in 14 Days</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/45 max-w-[560px] mx-auto leading-relaxed">
            Our battle-tested 3-step process eliminates waste, maximizes velocity, and delivers production-ready products at startup speed.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 md:py-32 bg-white grid-pattern">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="flex flex-col gap-24">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col md:flex-row gap-12 md:gap-16 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Icon side */}
                <div className="flex-shrink-0 w-full md:w-[280px]">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <span className="font-serif font-bold text-7xl tracking-tighter text-gray-100 select-none">
                    {step.number}
                  </span>
                </div>

                {/* Content side */}
                <div className="flex-1">
                  <span className="overline text-[var(--color-accent-purple)] mb-3 block">
                    {step.subtitle}
                  </span>
                  <h2 className="font-serif font-bold text-3xl tracking-tight mb-5">{step.title}</h2>
                  <p className="text-[var(--color-text-secondary)] leading-[1.8] mb-7">{step.description}</p>
                  <ul className="flex flex-col gap-3.5">
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
      <section className="py-24 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[600px] px-6 md:px-10 text-center relative z-10">
          <h2 className="font-serif font-bold text-3xl tracking-tight mb-5 text-white">Ready to start your sprint?</h2>
          <p className="text-white/40 mb-10 leading-relaxed">
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
