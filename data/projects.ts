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
    slug: 'flycastles',
    name: 'Flycastles',
    summary: 'A website for a private jet and charter flight service, where travellers plan a trip and request a quote.',
    tags: ['Website', 'Private aviation'],
    image: '/images/flycastles.jpg',
    imageAlt: 'Flycastles home page: "Travel on your terms", with a trip planner for private charter flights',
    url: 'https://flycastles.in',
    needed: 'A premium online presence for private jet and charter flights in India that turns visitors into charter enquiries.',
    built: 'A website with a trip planner for one-way, round-trip and multi-city charters, fleet and service pages, and quote and call-back requests.',
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
];
