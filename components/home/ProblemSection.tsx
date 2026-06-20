import ScrollReveal from '@/components/common/ScrollReveal';

const painPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    text: "Don't know whether their idea is worth pursuing",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    text: 'Lack technical expertise to build their product',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: 'Waste time building unnecessary features',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    text: 'Struggle to find early customers',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    text: 'Delay execution for months without progress',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="overline text-[var(--color-accent)] mb-4 block">The Problem</span>
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 text-[var(--color-text-primary)]">
              Most Startup Ideas Fail Before They Launch
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-[560px] mx-auto leading-relaxed">
              Many aspiring founders face the same challenges:
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {painPoints.map((point, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--color-bg-primary)] border border-gray-100 hover:border-[var(--color-accent)]/20 transition-all duration-400 hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0">
                  {point.icon}
                </div>
                <p className="text-[var(--color-text-secondary)] text-[0.95rem] leading-relaxed pt-1.5">
                  {point.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-[var(--color-text-primary)] font-display font-semibold">
                Larsva provides a structured framework to move from idea to launch.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
