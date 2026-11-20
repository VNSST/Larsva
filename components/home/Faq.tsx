import { faqs } from '@/data/faq';
import FaqList from '@/components/ui/FaqList';

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
        <FaqList items={faqs} />
      </div>
    </section>
  );
}
