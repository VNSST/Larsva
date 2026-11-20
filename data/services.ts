// The four services shown on the home page and the Services page.
// Starting prices shown as "From ..." on the home page and the Services page.
export interface Service {
  slug: string;
  title: string;
  summary: string;
  timeline: string;
  price: string;
  includes: string[];
}

export const services: Service[] = [
  {
    slug: 'websites',
    title: 'Websites',
    summary: 'Business sites that load fast, work on phones and bring in enquiries.',
    timeline: '1 to 2 weeks',
    price: '₹25,000',
    includes: [
      'Design and build for phones, tablets and desktops',
      'Contact and enquiry forms that reach your inbox',
      'Search basics: page titles, descriptions and a sitemap',
      'Domain, hosting and launch set up for you',
    ],
  },
  {
    slug: 'web-apps',
    title: 'Web apps and MVPs',
    summary: 'Dashboards, portals and first product versions with logins, payments and admin.',
    timeline: '4 to 8 weeks',
    price: '₹1,50,000',
    includes: [
      'User sign-up, logins and roles',
      'Online payments and subscriptions',
      'An admin area to manage users and data',
      'Database, hosting and deployment',
    ],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile apps',
    summary: 'Android and iOS apps, built and published to the stores under your name.',
    timeline: '6 to 10 weeks',
    price: '₹2,00,000',
    includes: [
      'One app for both Android and iOS',
      'Logins, notifications and payments where needed',
      'Store listings prepared and submitted under your developer accounts',
      'Help through the store review process',
    ],
  },
  {
    slug: 'ai-automation',
    title: 'AI automation',
    summary: 'Chat assistants, document search and workflows that remove manual work.',
    timeline: '2 to 4 weeks',
    price: '₹60,000',
    includes: [
      'Chat assistants that answer from your own documents',
      'Search across your files, policies and records',
      'Workflows that connect your existing tools',
      'Clear limits on what the AI can see and do',
    ],
  },
];

// What every project includes (home page hero card and Services page).
export const deliverables = [
  'A written scope and one price before any work starts',
  'A working demo you can click through midway',
  'Launch, handover and the full source code',
  'Optional monthly care after launch',
];

export const steps = [
  {
    title: 'Book a demo',
    text: 'A free 30-minute call. We show you similar projects we have built and understand what you need.',
  },
  {
    title: 'Get a fixed quote',
    text: 'Within 24 hours you get a written scope, one fixed price and a delivery date.',
  },
  {
    title: 'We build and hand over',
    text: 'Click through a working demo midway. At the end we launch, then hand over the source code and walk you through it.',
  },
];
