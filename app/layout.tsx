import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_TITLE = 'Larsva — Websites, Apps and AI Automation at a Fixed Price';
const SITE_DESCRIPTION =
  'Larsva builds websites, web apps, mobile apps and AI automations at a fixed price on a fixed timeline. Tell us what you need and get a clear quote within 24 hours.';

export const metadata: Metadata = {
  metadataBase: new URL('https://larsva.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: SITE_TITLE,
    template: '%s | Larsva',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Website Development India',
    'Web App Development',
    'MVP Development India',
    'Mobile App Development',
    'AI Automation',
    'Fixed Price Software Development',
  ],
  authors: [{ name: 'Larsva' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://larsva.com',
    siteName: 'Larsva',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Larsva',
              legalName: 'LARSVA (OPC) PRIVATE LIMITED',
              url: 'https://larsva.com',
              telephone: '+91 91338 04790',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'FLATNO:402 KALLAM TOWN, SHIP DHARMAKSHETRA, Piduguralla',
                addressLocality: 'Piduguralla',
                addressRegion: 'Andhra Pradesh',
                postalCode: '522413',
                addressCountry: 'IN',
              },
              logo: 'https://larsva.com/images/larsva-logo.png',
              description: SITE_DESCRIPTION,
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@larsva.com',
                telephone: '+91 91338 04790',
                contactType: 'customer service',
              },
              sameAs: [
                'https://www.linkedin.com/company/larsva-opc/',
                'https://www.instagram.com/larsva_official',
                'https://www.youtube.com/@Larsva',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
