import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Larsva — Think It. Ship It. Done. In 14 Days.',
    template: '%s | Larsva',
  },
  description:
    'Larsva is a rapid-delivery tech consulting firm that builds MVPs, websites, and mobile apps in just 14 days. No fluff. Just fast shipping.',
  keywords: ['MVP development', 'rapid prototyping', 'tech consulting', 'web development', 'mobile apps'],
  authors: [{ name: 'Larsva' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
