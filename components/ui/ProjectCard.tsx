import Image from 'next/image';
import type { Project } from '@/data/projects';
import { ExternalIcon } from './icons';

// The screenshot and the link both open the live site; the screenshot is skipped by keyboard and
// screen readers so the same link isn't announced twice.
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-link relative flex h-full flex-col overflow-hidden">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-bold">{project.name}</h3>
        <p className="mt-2 leading-relaxed text-[var(--color-ink-2)]">{project.summary}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow mt-auto pt-5">
          Visit {project.name}
          <ExternalIcon />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
