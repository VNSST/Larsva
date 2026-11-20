import Link from 'next/link';
import Image from 'next/image';

const pageLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Talent Solutions', href: '/talent-solutions' },
  { label: 'Our work', href: '/works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/larsva-opc/' },
  { label: 'Instagram', href: 'https://www.instagram.com/larsva_official' },
  { label: 'YouTube', href: 'https://www.youtube.com/@Larsva' },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[var(--color-dark)] text-[var(--color-on-dark)]">
      <div className="container-site py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[360px]">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Larsva home">
              <Image src="/images/larsva-logo.png" alt="Larsva" width={40} height={40} className="h-10 w-10 rounded-md" />
              <span className="font-heading font-bold text-xl text-white">Larsva</span>
            </Link>
            <p className="mt-4 leading-relaxed">
              Websites, apps and AI automation, and hiring help backed by our own sourcing engines.
            </p>
            <a href="mailto:info@larsva.com" className="mt-4 inline-block text-white underline underline-offset-4 hover:no-underline">
              info@larsva.com
            </a>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <h2 className="font-display text-sm font-semibold text-white mb-4">Pages</h2>
              <ul className="flex flex-col gap-3">
                {pageLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold text-white mb-4">Follow</h2>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-line-dark)] pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} LARSVA (OPC) PRIVATE LIMITED</p>
          <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
