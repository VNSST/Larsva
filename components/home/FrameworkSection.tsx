import ScrollReveal from '@/components/common/ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Startup Validation Sprint',
    description: 'Validate your idea before investing significant time and money.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v6l4 2" />
        <path d="M8 6L6 4M24 6l2-2" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'MVP Launch Sprint',
    description: 'Build a launch-ready MVP focused on learning and execution.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8L4 14L10 20" />
        <path d="M22 8L28 14L22 20" />
        <path d="M18 4L14 24" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Startup Launch Pack',
    description: 'Create an online presence and prepare for growth.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28L8 18L11 16L14 19V4H18V19L21 16L24 18L16 28Z" />
        <path d="M8 8L5 9M24 8L27 9" />
      </svg>
    ),
  },
];

export default function FrameworkSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-dark)] grid-pattern-dark relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(0,194,168,0.06),transparent_70%)] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="overline text-[var(--color-accent)] mb-4 block">The Larsva Framework</span>
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 text-white">
              Validate <span className="gradient-text">→</span> Build <span className="gradient-text">→</span> Launch
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-lg text-white/45 max-w-[520px] mx-auto leading-relaxed">
              A structured path from startup idea to a live product.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div className="hidden md:block absolute top-[64px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-[var(--color-accent)]/20 via-[var(--color-accent)]/40 to-[var(--color-accent)]/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 150}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative z-10 w-[128px] h-[128px] rounded-full bg-[var(--color-bg-dark-card)] border border-white/10 flex flex-col items-center justify-center mb-8 transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_40px_rgba(0,194,168,0.1)]">
                    <div className="text-[var(--color-accent)] mb-1">
                      {step.icon}
                    </div>
                    <span className="text-xs font-display font-bold text-white/30 tracking-widest uppercase">
                      Step {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
