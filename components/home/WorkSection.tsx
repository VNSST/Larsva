import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowIcon } from '@/components/ui/icons';

export default function WorkSection() {
  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="container-site">
        <SectionHeading id="work-heading" eyebrow="Work" title="Recent projects">
          Live sites and apps we have built for our clients.
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <Link href="/works" className="link-arrow mt-10">
          More about these projects
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
