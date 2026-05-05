'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import type { NavLink as NavLinkType } from '@/types';

const navLinks: NavLinkType[] = [
  { label: 'Home', href: '/' },
  { label: 'The Process', href: '/process' },
  { label: 'Our Works', href: '/works' },
  { label: 'About Larsva', href: '/about' },
  { label: 'Hit Us Up', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMobileMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? 'glass-solid border-purple-200/30 shadow-sm'
          : 'glass border-purple-200/12'
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-8 h-[72px]">
        {/* Logo */}
        <Link href="/" className="group flex items-center font-display font-bold text-2xl z-10 transition-all duration-300 hover:opacity-80">
          <span className="gradient-text text-2xl font-extrabold tracking-tight">
            L
          </span>
          <span className="text-[var(--color-text-primary)] tracking-tight -ml-0.5">arsva</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-display font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 tracking-wide ${
                  pathname === link.href
                    ? 'text-[var(--color-accent-purple)] bg-[var(--color-accent-light-purple)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-purple)] hover:bg-[var(--color-accent-light-purple)]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-lg gradient-purple text-white font-display font-semibold text-sm tracking-wide transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)]"
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile Hamburger */}
        <button
          id="mobile-toggle"
          className="flex md:hidden flex-col gap-[5px] p-2 z-10"
          onClick={toggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-[2.5px] bg-[var(--color-text-primary)] rounded-sm transition-all duration-200 ${
              isOpen ? 'rotate-45 translate-y-[7.5px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2.5px] bg-[var(--color-text-primary)] rounded-sm transition-all duration-200 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2.5px] bg-[var(--color-text-primary)] rounded-sm transition-all duration-200 ${
              isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col items-center gap-2 w-full">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-display font-semibold text-xl p-4 transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[var(--color-accent-purple)]'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-purple)]'
                }`}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-4 px-10 py-4 rounded-xl gradient-purple text-white font-display font-semibold text-lg transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)]"
          onClick={close}
        >
          Let&apos;s Build Something Epic
        </Link>
      </div>
    </header>
  );
}
