import Image from 'next/image';
import type { Project } from '@/data/projects';
import { ExternalIcon } from './icons';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p className="mt-2 leading-relaxed text-[var(--color-ink-2)]">{project.summary}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow mt-auto pt-5"
        >
          Visit site
          <ExternalIcon />
          <span className="sr-only">(opens {project.name} in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
