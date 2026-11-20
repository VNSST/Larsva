import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="page-hero border-b-0">
      <div className="container-site">
        <p className="eyebrow">404</p>
        <h1 className="h-display mt-4">This page doesn&apos;t exist</h1>
        <p className="lead mt-6 max-w-[520px]">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Go to the home page</Link>
          <Link href="/contact#demo-form" className="btn btn-outline">Book a demo</Link>
        </div>
      </div>
    </section>
  );
}
