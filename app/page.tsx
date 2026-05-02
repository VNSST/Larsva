import Hero from '@/components/home/Hero';
import ProcessSection from '@/components/home/ProcessSection';
import WorkPlaceholder from '@/components/home/WorkPlaceholder';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <WorkPlaceholder />

      {/* CTA Banner */}
      <section className="py-28 bg-white">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="relative rounded-3xl p-[3px] bg-gradient-to-br from-[var(--color-accent-purple)] via-[var(--color-accent-sky)] to-[var(--color-accent-violet)] overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.15),transparent_70%)] rounded-full pointer-events-none" />
            <div className="bg-white rounded-[calc(1.5rem-3px)] py-20 px-8 md:px-16 text-center relative z-[1] flex flex-col items-center">
              <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-4">
                Ready to Ship?
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-5">
                Let&apos;s Build<br />Something Epic.
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-[520px] leading-relaxed mb-9">
                Got an idea? A napkin sketch? A full PRD? Whatever stage you&apos;re at — we&apos;ll ship it in 14 days flat. Think it. Ship it. Done.
              </p>
              <Link href="/contact" className="btn-primary text-lg py-5 px-11 rounded-xl">
                Hit Us Up
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="mt-5 text-sm text-[var(--color-text-muted)]">
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
