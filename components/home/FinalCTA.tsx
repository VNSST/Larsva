import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-dark)] relative overflow-hidden">
      <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(0,194,168,0.08),transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[40%] bg-[radial-gradient(circle,rgba(0,194,168,0.05),transparent_70%)] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[640px] mx-auto">
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-5 text-white">
              Ready to Explore Your Startup Idea?
            </h2>
            <p className="text-lg text-white/40 mb-10 leading-relaxed">
              Book a founder consultation and understand whether your startup idea is worth pursuing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg py-5 px-10 rounded-xl justify-center">
                Request Founder Consultation
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline-light py-5 px-10 rounded-xl justify-center">
                Contact Larsva
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
