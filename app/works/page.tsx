import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Works',
  description: 'Explore the recent projects we have shipped. Think It. Ship It. Done.',
};

const works = [
  {
    title: 'Mana PG Rent',
    url: 'https://manapgrent.in/',
    displayUrl: 'manapgrent.in',
    description: 'A seamless platform for finding and managing PG accommodations. Built for speed and reliability.',
    tags: ['Web App', 'Real Estate'],
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'B School of AI',
    url: 'https://bschoolofai.com',
    displayUrl: 'bschoolofai.com',
    description: 'Empowering the next generation with cutting-edge artificial intelligence education and resources.',
    tags: ['EdTech', 'AI'],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Fly Castles',
    url: 'https://flycastles.com',
    displayUrl: 'flycastles.com',
    description: 'Premium travel and accommodation booking experience with stunning design and fluid interactions.',
    tags: ['Travel', 'Booking'],
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function WorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 md:px-10 gradient-hero relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(108,75,244,0.12),transparent_70%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_70%)] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent-purple)] mb-5 block">
            Portfolio
          </span>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-tight mb-6 text-white">
            Our Works<span className="gradient-text">.</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-white/45 max-w-[600px] mx-auto leading-relaxed">
            We don&apos;t just build software. We craft digital experiences that look premium and perform flawlessly.
          </p>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-24 md:py-28 px-6 md:px-10 bg-white grid-pattern">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <a
                key={index}
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-[var(--color-accent-purple)]/20 shadow-sm hover:shadow-[0_20px_60px_rgba(108,75,244,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Visual Header */}
                <div className={`h-52 w-full bg-gradient-to-br ${work.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/25 transform group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4">
                    {work.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-bold text-2xl mb-3 text-gray-900 group-hover:text-[var(--color-accent-purple)] transition-colors duration-300">
                    {work.title}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] mb-6 flex-grow leading-relaxed text-sm">
                    {work.description}
                  </p>

                  <div className="flex items-center text-[var(--color-accent-purple)] font-semibold text-sm mt-auto">
                    <span>Visit {work.displayUrl}</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-10 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(108,75,244,0.1),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <h2 className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 text-white">
            Ready to add your project to this list?
          </h2>
          <p className="text-white/40 mb-10 max-w-[500px] mx-auto text-lg leading-relaxed">
            Let&apos;s turn your idea into our next success story.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Start Your Project
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
