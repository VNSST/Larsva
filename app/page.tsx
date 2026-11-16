import Hero from '@/components/home/Hero';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import WorkSection from '@/components/home/WorkSection';
import HowItWorks from '@/components/home/HowItWorks';
import Founder from '@/components/home/Founder';
import QuoteSection from '@/components/home/QuoteSection';
import Faq from '@/components/home/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WorkSection />
      <HowItWorks />
      <section className="section" aria-label="Who builds it">
        <div className="container-site">
          <Founder />
        </div>
      </section>
      <Faq />
      <QuoteSection />
    </>
  );
}
