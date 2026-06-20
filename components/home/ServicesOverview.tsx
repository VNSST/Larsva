import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';

const services = [
  {
    title: 'Startup Validation Sprint',
    price: '₹7,999',
    description: 'Validate up to 3 startup ideas and receive a structured Go / No-Go recommendation.',
    highlights: [
      'Discovery Call',
      'Competitor Analysis',
      'TAM SAM SOM',
      'Customer Identification',
      'Risk Assessment',
      'Validation Report',
    ],
    href: '/services#validation',
    accent: 'var(--color-accent)',
  },
  {
    title: 'MVP Launch Sprint',
    price: 'Starting at ₹49,999',
    description: 'Transform your validated idea into a launch-ready MVP.',
    highlights: [
      'Product Planning',
      'UX/UI Design',
      'Development',
      'AI Integrations',
      'Deployment',
    ],
    href: '/services#mvp',
    accent: 'var(--color-accent)',
    featured: true,
  },
  {
    title: 'Startup Launch Pack',
    price: '₹14,999',
    description: 'Build your startup\'s online presence and prepare for customer acquisition.',
    highlights: [
      'LinkedIn Setup',
      'Social Profiles',
      'SEO Fundamentals',
      'Launch Content',
      'Hiring Planning',
    ],
    href: '/services#launch',
    accent: 'var(--color-accent)',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 bg-white grid-pattern">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="overline text-[var(--color-accent)] mb-4 block">Our Services</span>
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 text-[var(--color-text-primary)]">
              Services Built for Founders
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-[520px] mx-auto leading-relaxed">
              Three structured offerings to take you from idea to launch.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <div className={`group relative h-full bg-white rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                service.featured
                  ? 'border-[var(--color-accent)]/20 shadow-[0_4px_24px_rgba(0,194,168,0.08)] hover:shadow-[0_20px_60px_rgba(0,194,168,0.12)]'
                  : 'border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]'
              }`}>
                {service.featured && (
                  <div className="absolute -top-3 left-8">
                    <span className="px-4 py-1.5 rounded-full text-xs font-display font-bold tracking-wider uppercase gradient-teal text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="font-heading font-bold text-xl tracking-tight mb-2">{service.title}</h3>
                  <span className="price-badge">{service.price}</span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <svg className="flex-shrink-0 text-[var(--color-accent)]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 font-display font-semibold text-sm text-[var(--color-accent)] hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
