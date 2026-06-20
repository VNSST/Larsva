import ScrollReveal from '@/components/common/ScrollReveal';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3L17 9L24 10L19 15L20 22L14 19L8 22L9 15L4 10L11 9L14 3Z" />
      </svg>
    ),
    title: 'Founder Focused',
    description: 'We work specifically with aspiring founders and startup builders.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <circle cx="14" cy="14" r="4" />
        <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Business First',
    description: 'We validate ideas before writing code.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="20" height="20" rx="4" />
        <path d="M10 10L14 14M14 14L18 10M14 14V20" />
      </svg>
    ),
    title: 'Modern Technology',
    description: 'Scalable solutions designed for future growth.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4V14L20 20" />
        <circle cx="14" cy="14" r="10" />
      </svg>
    ),
    title: 'Execution Oriented',
    description: 'Move from planning to launch quickly.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H12a4 4 0 00-4 4v2" />
        <circle cx="14" cy="9" r="4" />
      </svg>
    ),
    title: 'Built for Professionals',
    description: 'Designed for working professionals with limited time.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V7l-8-3-8 3v5c0 6 8 10 8 10z" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
    title: 'Risk Reduction',
    description: 'Make informed startup decisions before major investments.',
  },
];

export default function WhyLarsva() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="overline text-[var(--color-accent)] mb-4 block">Why Us</span>
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 text-[var(--color-text-primary)]">
              Why Founders Choose Larsva
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 80}>
              <div className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-accent)]/20 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center mb-5 transition-all duration-400 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:scale-105">
                  {reason.icon}
                </div>
                <h3 className="font-heading font-bold text-lg tracking-tight mb-2">{reason.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{reason.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
