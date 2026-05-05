import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[var(--color-text-primary)] text-white/70 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-8">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-3">
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent font-display font-extrabold text-xl tracking-tight">
                L
              </span>
              <span className="text-white font-display font-bold text-xl tracking-tight -ml-0.5">arsva</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Think It. Ship It. Done.<br />In 14 days.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-widest mb-4">
                Navigate
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="/" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">Home</Link></li>
                <li><Link href="/process" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">The Process</Link></li>
                <li><Link href="/works" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">Our Works</Link></li>
                <li><Link href="/about" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-widest mb-4">
                Connect
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">Twitter / X</a></li>
                <li><a href="#" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-sm hover:text-[var(--color-accent-sky)] transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/8 text-xs gap-2">
          <p>&copy; 2026 Larsva. All rights reserved.</p>
          <p className="text-white/40">Built with 💜 at warp speed.</p>
        </div>
      </div>
    </footer>
  );
}
