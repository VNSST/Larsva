import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Hit Us Up',
  description: 'Ready to build something epic? Get in touch — we\'ll ship your idea in 14 days. Think it. Ship it. Done.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 px-8">
        <div className="mx-auto max-w-[800px] text-center">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-6">
            Let&apos;s Connect
          </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tighter leading-tight mb-5">
            Hit Us Up<span className="gradient-text">.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[520px] mx-auto leading-relaxed">
            Got an idea? A napkin sketch? A full PRD? Whatever stage you&apos;re at — we&apos;ll ship it in 14 days flat. Think it. Ship it. Done.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1100px] px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left: Info */}
            <div className="flex-1 max-w-[400px]">
              <h2 className="font-display font-bold text-2xl tracking-tight mb-6">Let&apos;s build something epic together.</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Fill out the form and we&apos;ll get back to you within 24 hours. Or if you prefer, reach out directly:
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5L10 11L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-0.5">Email</h3>
                    <a href="mailto:hello@larsva.com" className="text-sm text-[var(--color-accent-purple)] hover:underline">hello@larsva.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-0.5">Response Time</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L13 8L20 9L15 14L16 20L10 17L4 20L5 14L0 9L7 8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-0.5">Free Discovery Call</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">No commitment. Let&apos;s just talk.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full">
              <div className="card-border-gradient">
                <div className="bg-white rounded-[18px] p-8 md:p-10 relative z-[1]">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
