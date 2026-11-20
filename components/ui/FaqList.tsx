type Item = { q: string; a: string };

// Accessible accordion built on <details>, so it works without JavaScript.
export default function FaqList({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f) => (
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
  );
}
