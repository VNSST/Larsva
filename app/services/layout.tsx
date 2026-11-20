import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Websites, Web Apps, Mobile Apps and AI Automation',
  description:
    'Larsva builds websites, web apps and MVPs, mobile apps and AI automations. Every project starts with a written scope and a delivery date. Contact us for pricing.',
  keywords: [
    'Website Development India',
    'Web App Development',
    'MVP Development India',
    'Android and iOS App Development',
    'AI Automation Services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Larsva Services — Websites, Apps and AI Automation',
    description: 'Websites, web apps, mobile apps and AI automation. Contact us for pricing.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
