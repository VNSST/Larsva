// Projects shown on the home page and the Work page.
export interface Project {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  image: string;
  imageAlt: string;
  url: string;
  needed: string;
  built: string;
}

export const projects: Project[] = [
  {
    slug: 'manapgrent',
    name: 'Mana PG Rent',
    summary: 'A web app for finding PG accommodation and tracking rent payments, with an owner dashboard.',
    tags: ['Web app', 'Real estate'],
    image: '/images/manapgrent.png',
    imageAlt: 'Mana PG Rent home page: "Stop chasing rent on WhatsApp"',
    url: 'https://manapgrent.in/',
    needed: 'Finding and managing PG accommodation was spread across several platforms, with nothing joined up for tenants or owners.',
    built: 'A mobile-first web platform with property listings, search filters and a management dashboard for owners.',
  },
  {
    slug: 'bschoolofai',
    name: 'B School of AI',
    summary: 'A learning platform for business uses of AI, with course modules and a resource library.',
    tags: ['Website', 'Education'],
    image: '/images/bschoolofai.png',
    imageAlt: 'B School of AI home page: "Learn by building. Grow by doing."',
    url: 'https://bschoolofai.com',
    needed: 'A clear, accessible place for professionals to learn how AI applies to real business work.',
    built: 'An education platform with course modules, a resource library and pages for workshops and projects.',
  },
  {
    slug: 'flycastles',
    name: 'Fly Castles',
    summary: 'A website for a DGCA ground training institute, built to turn visitors into enquiries.',
    tags: ['Website', 'Aviation training'],
    image: '/images/flycastles.png',
    imageAlt: 'Fly Castles home page: DGCA ground training institute',
    url: 'https://flycastles.com',
    needed: 'A professional site that explains the courses clearly and makes it easy for students to enquire.',
    built: 'A fast, phone-friendly website with course pages, clear calls to action and an enquiry flow.',
  },
];
