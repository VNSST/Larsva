'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import type { NavLink as NavLinkType } from '@/types';

const navLinks: NavLinkType[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/works' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const QUOTE_HREF = '/#quote';

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMobileMenu();

  // Close the menu on navigation, on Escape, and when the screen grows to desktop width.
  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onResize = () => window.innerWidth >= 768 && close();
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [close]);

  const isActive = (href: string) => !href.includes('#') && pathname === href;

  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-50">
      {/* The portfolio page hides <nav>, so the header's visible chrome lives on it. */}
      {/* No backdrop-filter here: it would trap the fixed mobile menu inside the 72px bar. */}
      <nav className="bg-white border-b border-[var(--color-line)]" aria-label="Main">
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Larsva home">
            <Image
              src="/images/larsva-logo.png"
              alt="Larsva"
              width={40}
              height={40}
              className="h-10 w-10 rounded-md"
              priority
            />
            <span className="font-heading font-bold text-xl tracking-tight text-[var(--color-ink)]">Larsva</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`inline-flex items-center min-h-[44px] px-2.5 lg:px-4 rounded-lg font-display font-medium text-[0.9375rem] transition-colors ${
                    isActive(link.href)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href={QUOTE_HREF} className="btn btn-primary btn-sm hidden md:inline-flex">
            Get a quote
          </Link>

          <button
            id="mobile-toggle"
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-ink)]"
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

        <div id="mobile-menu" className={`mobile-menu md:hidden ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-[var(--color-line)]">
                <Link
                  href={link.href}
                  onClick={close}
                  tabIndex={isOpen ? undefined : -1}
                  className={`flex min-h-[56px] items-center font-display font-semibold text-lg ${
                    isActive(link.href) ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={QUOTE_HREF} onClick={close} tabIndex={isOpen ? undefined : -1} className="btn btn-primary mt-6 w-full">
            Get a quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
