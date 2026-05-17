import Hero from '@/components/home/Hero';
import ProcessSection from '@/components/home/ProcessSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSection />

      {/* CTA Banner */}
      <section className="py-28 md:py-36 bg-white grid-pattern">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(108,75,244,0.15),transparent_70%)] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_70%)] rounded-full pointer-events-none" />

            <div className="relative z-10 py-20 md:py-24 px-8 md:px-20 text-center flex flex-col items-center">
              <span className="overline text-[var(--color-accent-purple)] mb-5 block">
                Ready to Ship?
              </span>
              <h2 className="font-serif font-bold text-[clamp(2rem,4vw,3.2rem)] tracking-tight mb-5 text-white">
                Let&apos;s Build<br />Something Epic.
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-lg text-white/45 max-w-[520px] leading-relaxed mb-10">
                Got an idea? A napkin sketch? A full PRD? Whatever stage you&apos;re at — we&apos;ll ship it in 14 days flat.
              </p>
              <Link href="/contact" className="btn-primary text-lg py-5 px-12 rounded-xl">
                Start Your Project
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="mt-6 text-sm text-white/25">
                or email us at{' '}
                <a href="mailto:hello@larsva.com" className="text-[var(--color-accent-purple)] font-semibold hover:underline">
                  hello@larsva.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
