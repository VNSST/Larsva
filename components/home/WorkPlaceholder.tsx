'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'FinTrack Dashboard',
    description: 'A real-time financial analytics dashboard with AI-powered insights. Shipped in 11 days.',
    tags: ['SaaS', 'MVP'],
    duration: '11 Days',
    type: 'Web App',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M6 18H42" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="14" r="1.5" fill="currentColor" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        <circle cx="21" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'PulseCheck',
    description: 'A health & wellness mobile app with real-time vitals tracking and smart notifications.',
    tags: ['Mobile', 'Health'],
    duration: '13 Days',
    type: 'iOS + Android',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="6" width="20" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 12H34" stroke="currentColor" strokeWidth="2" />
        <path d="M14 36H34" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="40" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Vibe Store',
    description: 'A high-converting e-commerce platform with custom checkout flow and inventory management.',
    tags: ['E-Commerce', 'Shopify'],
    duration: '10 Days',
    type: 'Full Stack',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 14L24 6L40 14V34L24 42L8 34V14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 14L24 22L40 14" stroke="currentColor" strokeWidth="2" />
        <path d="M24 22V42" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function WorkPlaceholder() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.work-card-reveal');
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
    <section className="py-28 bg-[var(--color-bg-primary)]" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-4">
            Portfolio
          </span>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3">
            Recent Wins
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[480px] mx-auto">
            A sneak peek at the projects we&apos;ve shipped at warp speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {projects.map((project) => (
            <div key={project.title} className="work-card-reveal reveal card-border-sky group cursor-pointer">
              <div className="bg-white rounded-[18px] overflow-hidden relative z-[1]">
                <div className="px-7 pt-7">
                  <div className="w-full h-44 rounded-xl gradient-card flex items-center justify-center text-[var(--color-accent-purple)] transition-all duration-400 group-hover:bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(56,189,248,0.15))]">
                    {project.icon}
                  </div>
                </div>
                <div className="px-7 pt-6 pb-7">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-[0.72rem] tracking-wide uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-xl tracking-tight mb-2">{project.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
                    <span className="flex items-center gap-1.5">⏱ {project.duration}</span>
                    <span className="text-[var(--color-accent-purple)] font-semibold">{project.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
