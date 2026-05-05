import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Works | Larsva',
  description: 'Explore the recent projects we have shipped. Think It. Ship It. Done.',
};

const works = [
  {
    title: 'Mana PG Rent',
    url: 'https://manapgrent.in/',
    displayUrl: 'manapgrent.in',
    description: 'A seamless platform for finding and managing PG accommodations. Built for speed and reliability.',
    tags: ['Web App', 'Real Estate'],
    color: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'B School of AI',
    url: 'https://bschoolofai.com',
    displayUrl: 'bschoolofai.com',
    description: 'Empowering the next generation with cutting-edge artificial intelligence education and resources.',
    tags: ['EdTech', 'AI'],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Fly Castles',
    url: 'https://flycastles.com',
    displayUrl: 'flycastles.com',
    description: 'Premium travel and accommodation booking experience with stunning design and fluid interactions.',
    tags: ['Travel', 'Booking'],
    color: 'from-orange-400 to-pink-500'
  }
];

export default function WorksPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 gradient-hero relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent-purple)] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[var(--color-accent-sky)] rounded-full blur-[100px] opacity-20"></div>
        </div>

        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="inline-block px-5 py-1.5 rounded-full bg-[var(--color-accent-light-purple)] text-[var(--color-accent-purple)] font-display font-semibold text-xs tracking-widest uppercase mb-6">
            Portfolio
          </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tighter leading-tight mb-5">
            Our Works<span className="gradient-text">.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            We don't just build software. We craft digital experiences that look premium and perform flawlessly. Here's what we've shipped recently.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <a 
                key={index} 
                href={work.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Visual Header Placeholder */}
                <div className={`h-48 w-full bg-gradient-to-br ${work.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4">
                    {work.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl mb-2 text-gray-900 group-hover:text-[var(--color-accent-purple)] transition-colors">
                    {work.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                    {work.description}
                  </p>
                  
                  <div className="flex items-center text-[var(--color-accent-purple)] font-semibold text-sm mt-auto">
                    <span>Visit {work.displayUrl}</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <section className="py-24 px-8 bg-gray-50 text-center">
        <div className="mx-auto max-w-[800px]">
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-6">
            Ready to add your project to this list?
          </h2>
          <p className="text-gray-500 mb-8 max-w-[500px] mx-auto text-lg">
            Let's turn your idea into our next success story. We build fast, beautiful, and scalable applications.
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
