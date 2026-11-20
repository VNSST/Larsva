import Link from 'next/link';

type Props = { title?: string; text?: string; href?: string };

export default function CtaBand({
  title = 'Have a project in mind?',
  text = 'Book a free 30-minute demo. Within 24 hours you get a written scope, a delivery date and pricing.',
  href = '/book-a-demo',
}: Props) {
  return (
    <section className="section section-dark">
      <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[560px]">
          <h2 className="h-section">{title}</h2>
          <p className="lead mt-4">{text}</p>
        </div>
        <Link href={href} className="btn btn-primary shrink-0">Book a demo</Link>
      </div>
    </section>
  );
}
