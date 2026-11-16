import type { ReactNode } from 'react';

type Props = { eyebrow: string; title: string; children?: ReactNode; id?: string };

export default function SectionHeading({ eyebrow, title, children, id }: Props) {
  return (
    <div className="max-w-[640px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h-section mt-3">{title}</h2>
      {children && <p className="lead mt-4">{children}</p>}
    </div>
  );
}
