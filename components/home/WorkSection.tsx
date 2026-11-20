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
        {/* Phones: a swipeable row with the next card peeking in. Larger screens: a grid. */}
        <ul className="swipe-row mt-10 md:mx-0 md:mt-12 md:overflow-visible md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug} className="swipe-item md:w-auto">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-[var(--color-ink-2)] md:hidden" aria-hidden="true">Swipe to see more →</p>
        <Link href="/works" className="link-arrow mt-10">
          More about these projects
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
