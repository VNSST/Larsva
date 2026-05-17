import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[var(--color-bg-dark)] text-white/60 pt-20 pb-10">
      <div className="container-wide">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-[320px]">
            <Link href="/" className="flex items-center mb-5">
              <span className="font-serif font-bold text-2xl tracking-tight">
                <span className="gradient-text">L</span>
                <span className="text-white">arsva</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/40">
              A rapid-delivery tech consulting firm that turns bold ideas into production-ready products — in just 14 days.
            </p>
          </div>

          <div>
            <h4 className="overline text-white/30 mb-5">
              Connect
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-300">Twitter / X</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-300">LinkedIn</a></li>
              <li><Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/6 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/25 gap-3">
          <p>&copy; 2026 Larsva. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
