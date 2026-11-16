import Link from 'next/link';

type Props = { title?: string; text?: string };

export default function CtaBand({
  title = 'Have a project in mind?',
  text = 'Send a short brief and get a written scope, one fixed price and a delivery date within 24 hours.',
}: Props) {
  return (
    <section className="section section-dark">
      <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[560px]">
          <h2 className="h-section">{title}</h2>
          <p className="lead mt-4">{text}</p>
        </div>
        <Link href="/contact#quote-form" className="btn btn-primary shrink-0">Get a quote</Link>
      </div>
    </section>
  );
}
