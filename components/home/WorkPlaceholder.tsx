'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const projects = [
  {
    title: 'FinTrack Dashboard',
    description: 'A real-time financial analytics dashboard with AI-powered insights. Shipped in 11 days.',
    tags: ['SaaS', 'MVP'],
    duration: '11 Days',
    type: 'Web App',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'PulseCheck',
    description: 'A health & wellness mobile app with real-time vitals tracking and smart notifications.',
    tags: ['Mobile', 'Health'],
    duration: '13 Days',
    type: 'iOS + Android',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Vibe Store',
    description: 'A high-converting e-commerce platform with custom checkout flow and inventory management.',
    tags: ['E-Commerce', 'Shopify'],
    duration: '10 Days',
    type: 'Full Stack',
    gradient: 'from-amber-500 to-orange-600',
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
    <section className="py-28 md:py-36 bg-[var(--color-bg-dark)] grid-pattern-dark relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(108,75,244,0.08),transparent_70%)] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-20">
          <span className="overline text-[var(--color-accent-purple)] mb-4 block">
            Portfolio
          </span>
          <h2 className="font-serif font-bold text-[clamp(2rem,4vw,3.2rem)] tracking-tight mb-4 text-white">
            Recent Wins
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/40 max-w-[520px] mx-auto leading-relaxed">
            A look at the projects we&apos;ve shipped at warp speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="work-card-reveal reveal group">
              <div className="card-dark overflow-hidden">
                {/* Gradient header */}
                <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute top-6 left-6 w-14 h-14 bg-white/10 rounded-full blur-xl" />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/50 font-display font-semibold text-[0.7rem] tracking-wider uppercase border border-white/8">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-xl tracking-tight mb-2 text-white group-hover:text-[var(--color-accent-purple)] transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-5">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-white/30 font-medium">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" strokeLinecap="round" />
                      </svg>
                      {project.duration}
                    </span>
                    <span className="text-[var(--color-accent-purple)] font-semibold">{project.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-14">
          <Link href="/works" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-display font-semibold text-sm transition-colors duration-300 group/link">
            View All Projects
            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
