import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Websites, Web Apps, Mobile Apps and AI Automation',
  description:
    'Larsva builds websites, web apps and MVPs, mobile apps and AI automations. Every project has a written scope, a fixed price and a fixed timeline.',
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
    description: 'Four things we build, each with a written scope, a fixed price and a fixed timeline.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
