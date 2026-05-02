'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Scope',
    description: 'We deep-dive into your vision, define the MVP scope, and create a razor-sharp roadmap — all in Day 1.',
    timeline: 'Day 1–2',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C14.477 4 10 10.268 10 14C10 19.523 14.477 24 20 24C25.523 24 30 19.523 30 14C30 10.268 25.523 4 20 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 24V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 32H25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Rapid Sprints',
    description: 'Our elite devs build at breakneck speed with daily check-ins and real-time previews. No surprises.',
    timeline: 'Day 3–12',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 8L6 14L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 8L34 14L28 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L18 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 28H34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 33H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch & Go',
    description: 'We deploy, optimize, and hand over a production-ready product. You launch. We celebrate. 🚀',
    timeline: 'Day 13–14',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 34L10 22L14 20L18 24V6H22V24L26 20L30 22L20 34Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10L8 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 10L32 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.process-card-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 bg-white" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px] px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-4">
            How We Work
          </span>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3">
            The Process
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[480px] mx-auto">
            Three steps. Two weeks. One epic product.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-card-reveal reveal card-border-gradient group cursor-default"
            >
              <div className="bg-white rounded-[18px] p-8 flex flex-col items-start gap-4 relative z-[1]">
                <span className="font-display font-bold text-xs text-[var(--color-accent-purple)] tracking-[2px] uppercase">
                  Step {step.number}
                </span>
                <div className="w-16 h-16 rounded-xl gradient-card text-[var(--color-accent-purple)] flex items-center justify-center transition-all duration-400 group-hover:gradient-purple group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)]">
                  {step.icon}
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                <div className="flex items-center gap-2 font-display font-semibold text-xs text-[var(--color-text-muted)] mt-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-sky)]" />
                  {step.timeline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
