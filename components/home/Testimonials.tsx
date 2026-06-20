import ScrollReveal from '@/components/common/ScrollReveal';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Aspiring Founder',
    company: 'HealthTech Startup',
    quote: 'Larsva helped me validate my startup idea before I invested months of savings. The validation sprint gave me the confidence to move forward with a clear strategy.',
  },
  {
    id: '2',
    name: 'Rahul Menon',
    role: 'Product Manager',
    company: 'Enterprise SaaS',
    quote: 'As a working professional, I needed a partner who understood my constraints. Larsva built my MVP while I kept my day job. The process was incredibly structured.',
  },
  {
    id: '3',
    name: 'Ananya Gupta',
    role: 'First-time Founder',
    company: 'EdTech Platform',
    quote: 'The Launch Pack was exactly what I needed. From LinkedIn to SEO, Larsva set up my entire online presence. I went from zero to launch-ready in weeks.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="overline text-[var(--color-accent)] mb-4 block">Testimonials</span>
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 text-[var(--color-text-primary)]">
              What Founders Say
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 120}>
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[var(--color-bg-primary)] border border-gray-100 hover:border-[var(--color-accent)]/15 transition-all duration-400">
                {/* Quote icon */}
                <svg className="text-[var(--color-accent)] opacity-30 mb-5" width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M10 16H6c0-2.2 1.8-4 4-4V8c-4.4 0-8 3.6-8 8v8h8v-8zm16 0h-4c0-2.2 1.8-4 4-4V8c-4.4 0-8 3.6-8 8v8h8v-8z" />
                </svg>

                <p className="text-[var(--color-text-secondary)] text-sm leading-[1.7] mb-6 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-sm text-[var(--color-accent)]">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
