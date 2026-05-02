export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  timeline: string;
  icon: 'lightbulb' | 'code' | 'rocket';
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
  type: string;
  icon: 'desktop' | 'mobile' | 'cube';
}

export interface NavLink {
  label: string;
  href: string;
}
