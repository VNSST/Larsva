import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';
import type { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Services — Startup Validation, MVP Development & Launch',
  description: 'Structured services for aspiring founders — Startup Validation Sprint (₹7,999), MVP Launch Sprint (₹49,999+), and Startup Launch Pack (₹14,999). Validate, build, and launch your startup.',
  keywords: [
    'Startup Validation Services India',
    'MVP Development India',
    'Startup Idea Validation',
    'Build MVP for Startup',
    'Startup Launch Services',
  ],
  openGraph: {
    title: 'Larsva Services — Validate, Build & Launch Your Startup',
    description: 'From idea validation to MVP development and launch preparation — structured services built for founders.',
  },
};

const services = [
  {
    id: 'validation',
    title: 'Startup Validation Sprint',
    price: '₹7,999',
    priceNote: 'One-time',
    tagline: 'Validate before you invest.',
    whoFor: 'Working professionals with a startup idea they want to validate before investing significant time and money. Ideal if you have 1-3 ideas and need data-driven clarity on which to pursue.',
    deliverables: [
      'Discovery Call & Idea Deep-Dive',
      'Competitor Analysis Report',
      'TAM SAM SOM Market Sizing',
      'Customer Identification & Persona',
      'Risk Assessment Matrix',
      'Go / No-Go Validation Report',
    ],
    process: [
      'Initial discovery call to understand your ideas',
      'Market research and competitive landscape analysis',
      'Target customer identification and validation',
      'Risk assessment and feasibility analysis',
      'Structured report with clear recommendation',
    ],
    outcomes: [
      'Clear Go / No-Go recommendation for up to 3 ideas',
      'Validated understanding of market opportunity',
      'Identified target customer segments',
      'Risk-aware foundation for next steps',
    ],
    ctaText: 'Request Founder Consultation',
    ctaHref: '/contact',
    accent: 'var(--color-accent)',
  },
  {
    id: 'mvp',
    title: 'MVP Launch Sprint',
    price: 'Starting at ₹49,999',
    priceNote: 'Scope-dependent',
    tagline: 'From validated idea to live product.',
    whoFor: 'Founders with a validated startup idea ready to build. Perfect for aspiring entrepreneurs who need a professional development partner to create a launch-ready product without hiring a full team.',
    deliverables: [
      'Product Requirement Document',
      'UX/UI Design & Prototyping',
      'Full-Stack Development',
      'AI/ML Integrations (where applicable)',
      'Testing & Quality Assurance',
      'Production Deployment',
    ],
    process: [
      'Product planning and feature prioritization',
      'UX/UI design with iterative feedback',
      'Agile development with regular updates',
      'Integration of AI features where applicable',
      'Testing, deployment, and handover',
    ],
    outcomes: [
      'Production-ready MVP deployed and live',
      'Scalable architecture for future growth',
      'Complete documentation and handover',
      'Foundation for customer acquisition',
    ],
    ctaText: 'Request Founder Consultation',
    ctaHref: '/contact',
    accent: 'var(--color-accent)',
    featured: true,
  },
  {
    id: 'launch',
    title: 'Startup Launch Pack',
    price: '₹14,999',
    priceNote: 'One-time',
    tagline: 'Launch with presence and credibility.',
    whoFor: 'Founders ready to launch who need a professional online presence. Ideal if you have a product but need help with branding, social presence, SEO, and launch preparation.',
    deliverables: [
      'LinkedIn Company Page Setup',
      'Social Media Profile Configuration',
      'SEO Fundamentals Implementation',
      'Launch Content Strategy',
      'Hiring & Team Planning Guide',
    ],
    process: [
      'Brand positioning and messaging workshop',
      'Social media setup and optimization',
      'SEO foundation and keyword strategy',
      'Launch content creation and scheduling',
      'Growth planning and hiring roadmap',
    ],
    outcomes: [
      'Professional online presence across platforms',
      'SEO-optimized web presence',
      'Content calendar for launch period',
      'Clear hiring and growth roadmap',
    ],
    ctaText: 'Request Founder Consultation',
    ctaHref: '/contact',
    accent: 'var(--color-accent)',
  },
];

const faqs: FAQ[] = [
  {
    question: 'Do I need a technical background?',
    answer: 'Not at all. Larsva is specifically designed for non-technical founders and working professionals. We handle all the technical complexity — from architecture decisions to deployment — so you can focus on your vision and business strategy.',
  },
  {
    question: 'Can you help validate multiple ideas?',
    answer: 'Yes! Our Startup Validation Sprint allows you to validate up to 3 startup ideas. We provide a structured Go / No-Go recommendation for each idea, helping you choose the one with the highest potential.',
  },
  {
    question: 'How long does the MVP take?',
    answer: 'Timeline depends on scope and complexity. Simple MVPs can be delivered in 2-4 weeks, while more complex products may take 6-8 weeks. We provide a detailed timeline estimate during our initial consultation.',
  },
  {
    question: 'Can I launch without quitting my job?',
    answer: 'Absolutely — this is exactly what Larsva is built for. Our services are designed for working professionals who want to build a startup alongside their career. We handle the heavy lifting so you can maintain your income while building your dream.',
  },
  {
    question: 'What happens after the MVP is built?',
    answer: 'After your MVP is live, you can use our Startup Launch Pack to build your online presence and prepare for customer acquisition. We also offer ongoing support and can help with iterations based on user feedback.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-36 pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(0,194,168,0.06),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent)] mb-5 block">Our Services</span>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-tight mb-6 text-white">
            Services Built for{' '}
            <span className="gradient-text">Founders</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/45 max-w-[560px] mx-auto leading-relaxed">
            Structured offerings to take your startup from idea to market — without hiring a full team.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 md:py-28 px-6 md:px-10 ${
            index % 2 === 0 ? 'bg-white' : 'bg-[var(--color-bg-primary)]'
          }`}
        >
          <div className="mx-auto max-w-[1000px]">
            <ScrollReveal>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="overline text-[var(--color-accent)] mb-3 block">
                    Service {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-heading font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] tracking-tight mb-3">
                    {service.title}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-lg">{service.tagline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="price-badge text-lg">{service.price}</span>
                  {service.priceNote && (
                    <span className="text-xs text-[var(--color-text-muted)] font-display">{service.priceNote}</span>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left column */}
              <div className="flex flex-col gap-8">
                <ScrollReveal>
                  <div className="p-7 rounded-2xl bg-[var(--color-bg-primary)] border border-gray-100">
                    <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                        <circle cx="10" cy="7" r="4" />
                      </svg>
                      Who It&apos;s For
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {service.whoFor}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="p-7 rounded-2xl bg-[var(--color-bg-primary)] border border-gray-100">
                    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="14" height="14" rx="2" />
                        <path d="M7 7h6M7 10h6M7 13h4" />
                      </svg>
                      Deliverables
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                          <svg className="flex-shrink-0 text-[var(--color-accent)]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-8">
                <ScrollReveal delay={150}>
                  <div className="p-7 rounded-2xl bg-[var(--color-bg-primary)] border border-gray-100">
                    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="10" cy="10" r="8" />
                        <polyline points="10 6 10 10 13 13" />
                      </svg>
                      Process
                    </h3>
                    <ol className="flex flex-col gap-3">
                      {service.process.map((step, i) => (
                        <li key={step} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center text-xs font-display font-bold">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div className="p-7 rounded-2xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/10">
                    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Expected Outcomes
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {service.outcomes.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-primary)] font-medium">
                          <svg className="flex-shrink-0 text-[var(--color-accent)]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={250}>
                  <Link href={service.ctaHref} className="btn-primary w-full justify-center py-4 rounded-xl">
                    {service.ctaText}
                    <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="overline text-[var(--color-accent)] mb-4 block">FAQ</span>
              <h2 className="font-heading font-bold text-[clamp(2rem,4vw,2.5rem)] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <div className="section-divider mx-auto" />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <details className="faq-item group rounded-2xl border border-gray-100 hover:border-[var(--color-accent)]/15 transition-colors duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <span className="font-heading font-semibold text-[0.95rem] pr-4">{faq.question}</span>
                    <svg className="faq-chevron flex-shrink-0 text-[var(--color-text-muted)]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(0,194,168,0.06),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[600px] px-6 md:px-10 text-center relative z-10">
          <h2 className="font-heading font-bold text-3xl tracking-tight mb-5 text-white">
            Not sure which service is right for you?
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">
            Request a founder consultation and we&apos;ll help you determine the best path forward for your startup idea.
          </p>
          <Link href="/contact" className="btn-primary text-lg py-4 px-10 rounded-xl">
            Request Founder Consultation
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
