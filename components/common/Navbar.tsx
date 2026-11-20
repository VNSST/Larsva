'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { services } from '@/data/services';
import { ArrowIcon, ClockIcon } from '@/components/ui/icons';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', dropdown: true },
  { label: 'Talent Solutions', href: '/talent-solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// On the home page "Book a demo" scrolls to the form there; elsewhere it opens the Contact page form.
const demoHref = (pathname: string) => (pathname === '/' ? '#demo' : '/contact#demo-form');

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMobileMenu();
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on navigation.
  useEffect(() => {
    close();
    setServicesOpen(false);
  }, [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      close();
      if (servicesOpen) {
        setServicesOpen(false);
        dropdownRef.current?.querySelector('button')?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close();
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousedown', onClick);
    };
  }, [close, servicesOpen]);

  // Open on hover for mouse users, with a short delay on leave so the panel doesn't flicker.
  const hoverOpen = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const hoverClose = () => {
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const DEMO_HREF = demoHref(pathname);
  const linkClass = (href: string) =>
    `inline-flex items-center gap-1.5 min-h-[44px] px-3 xl:px-4 rounded-lg font-display font-medium text-[0.9375rem] transition-colors ${
      isActive(href) ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'
    }`;

  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-50">
      {/* The portfolio page hides <nav>, so the header's visible chrome lives on it.
          No backdrop-filter: it would trap the fixed mobile menu inside the bar. */}
      <nav className="border-b border-[var(--color-line)] bg-white" aria-label="Main">
        <div className="container-site flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Larsva home">
            <Image src="/images/larsva-logo.png" alt="Larsva" width={40} height={40} className="h-10 w-10 rounded-md" priority />
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-ink)]">Larsva</span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) =>
              link.dropdown ? (
                <li key={link.href} ref={dropdownRef} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    className={linkClass(link.href)}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((o) => !o)}
                  >
                    {link.label}
                    <Chevron open={servicesOpen} />
                  </button>

                  <div
                    id="services-menu"
                    className={`absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                      servicesOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                  >
                    <div className="card overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services#${s.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="block rounded-lg p-4 transition-colors hover:bg-[var(--color-bg-alt)]"
                            >
                              <span className="block font-display font-semibold text-[var(--color-ink)]">{s.title}</span>
                              <span className="mt-1 block text-sm leading-snug text-[var(--color-ink-2)]">{s.summary}</span>
                              <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-2)]">
                                <ClockIcon size={13} />
                                Typically {s.timeline}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between border-t border-[var(--color-line)] bg-[var(--color-bg-alt)] px-7 py-4 font-display text-sm font-semibold text-[var(--color-accent)] hover:underline underline-offset-4"
                      >
                        All services and what&apos;s included
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            {/* Visible at every width: it is the one thing most visitors came to do. */}
            <Link href={DEMO_HREF} className="btn btn-primary btn-sm px-4">
              Book a demo
            </Link>
            <button
              id="mobile-toggle"
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-ink)] lg:hidden"
              onClick={toggle}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`mobile-menu overflow-y-auto lg:hidden ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
          <ul className="flex flex-col">
            {links.map((link) =>
              link.dropdown ? (
                <li key={link.href} className="border-b border-[var(--color-line)]">
                  <button
                    type="button"
                    tabIndex={isOpen ? undefined : -1}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    className={`flex min-h-[56px] w-full items-center justify-between font-display text-lg font-semibold ${
                      isActive(link.href) ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'
                    }`}
                  >
                    {link.label}
                    <Chevron open={mobileServicesOpen} />
                  </button>
                  <ul id="mobile-services" hidden={!mobileServicesOpen} className="pb-3 pl-4">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services#${s.slug}`}
                          onClick={close}
                          tabIndex={isOpen ? undefined : -1}
                          className="flex min-h-[44px] items-center justify-between text-[var(--color-ink-2)]"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services" onClick={close} tabIndex={isOpen ? undefined : -1} className="flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--color-accent)]">
                        All services
                        <ArrowIcon />
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li key={link.href} className="border-b border-[var(--color-line)]">
                  <Link
                    href={link.href}
                    onClick={close}
                    tabIndex={isOpen ? undefined : -1}
                    className={`flex min-h-[56px] items-center font-display text-lg font-semibold ${
                      pathname === link.href ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
