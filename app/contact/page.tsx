import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Ready to build something epic? Get in touch — we\'ll ship your idea in 14 days. Think it. Ship it. Done.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-36 pb-20 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent-purple)] mb-5 block">
            Let&apos;s Connect
          </span>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-tight mb-6 text-white">
            Get in Touch<span className="gradient-text">.</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/45 max-w-[520px] mx-auto leading-relaxed">
            Got an idea? A napkin sketch? A full PRD? Whatever stage you&apos;re at — we&apos;ll ship it in 14 days flat.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28 bg-white grid-pattern">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
            {/* Left: Info */}
            <div className="flex-1 max-w-[400px]">
              <h2 className="font-serif font-bold text-2xl tracking-tight mb-6">Let&apos;s build something epic together.</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">
                Fill out the form and we&apos;ll get back to you within 24 hours. Or if you prefer, reach out directly:
              </p>

              <div className="flex flex-col gap-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light-purple)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5L10 11L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1">Email</h3>
                    <a href="mailto:hello@larsva.com" className="text-sm text-[var(--color-accent-purple)] hover:underline">hello@larsva.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light-purple)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1">Response Time</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light-purple)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-purple)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L13 8L20 9L15 14L16 20L10 17L4 20L5 14L0 9L7 8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1">Free Discovery Call</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">No commitment. Let&apos;s just talk.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
