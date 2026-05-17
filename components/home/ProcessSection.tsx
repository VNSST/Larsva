'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Scope',
    description: 'We deep-dive into your vision, define the MVP scope, and create a razor-sharp roadmap — all in Day 1.',
    timeline: 'Day 1–2',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M22 22L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Rapid Sprints',
    description: 'Our elite devs build at breakneck speed with daily check-ins and real-time previews. No surprises.',
    timeline: 'Day 3–12',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 8L4 14L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 8L28 14L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 4L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch & Go',
    description: 'We deploy, optimize, and hand over a production-ready product. You launch. We celebrate. 🚀',
    timeline: 'Day 13–14',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28L8 18L11 16L14 19V4H18V19L21 16L24 18L16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 8L27 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 150}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 md:py-36 bg-white grid-pattern" ref={sectionRef}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="overline text-[var(--color-accent-purple)] mb-4 block">
            How We Work
          </span>
          <h2 className="font-serif font-bold text-[clamp(2rem,4vw,3.2rem)] tracking-tight mb-4 text-[var(--color-text-primary)]">
            The Process
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[520px] mx-auto leading-relaxed">
            Three steps. Two weeks. One production-ready product.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-card-reveal reveal group"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 hover:border-[var(--color-accent-purple)]/20 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(108,75,244,0.08)] hover:-translate-y-2 flex flex-col items-start gap-5 relative">
                {/* Step Number - faded background */}
                <span className="absolute top-6 right-8 font-serif font-bold text-6xl text-gray-100 select-none pointer-events-none">
                  {step.number}
                </span>

                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] flex items-center justify-center transition-all duration-400 group-hover:bg-[var(--color-accent-purple)] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_8px_24px_rgba(108,75,244,0.25)]">
                  {step.icon}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-sky)]" />
                  <span className="font-display font-semibold text-[var(--color-text-muted)] tracking-wide uppercase">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl tracking-tight relative z-[1]">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
