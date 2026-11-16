import { faqs } from '@/data/faq';

export default function Faq() {
  return (
    <section id="faq" className="section section-alt" aria-labelledby="faq-heading">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-heading" className="h-section mt-3">Before you ask</h2>
          <p className="lead mt-4">
            Something else on your mind? Email{' '}
            <a href="mailto:info@larsva.com" className="text-[var(--color-accent)] underline underline-offset-4">info@larsva.com</a>.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="faq card group">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold">
                {f.q}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-[var(--color-ink-2)] transition-transform group-open:rotate-45">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-[var(--color-ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
