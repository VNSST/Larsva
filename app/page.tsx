import Hero from '@/components/home/Hero';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import WorkSection from '@/components/home/WorkSection';
import HowItWorks from '@/components/home/HowItWorks';
import Founder from '@/components/home/Founder';
import QuoteSection from '@/components/home/QuoteSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WorkSection />
      <HowItWorks />
      <section className="section section-alt" aria-label="Who builds it">
        <div className="container-site">
          <Founder />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
