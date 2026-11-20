import Hero from '@/components/home/Hero';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import WorkSection from '@/components/home/WorkSection';
import HowItWorks from '@/components/home/HowItWorks';
import DemoSection from '@/components/home/DemoSection';
import Faq from '@/components/home/Faq';
import TalentTeaser from '@/components/home/TalentTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WorkSection />
      <TalentTeaser />
      <HowItWorks />
      <Faq />
      <DemoSection />
    </>
  );
}
