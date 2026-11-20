// Photos from Unsplash (https://unsplash.com/license): free for commercial use, no attribution required.
// Credits kept here for reference.
export interface Photo {
  src: string;
  alt: string;
  credit: string;
}

export const photos = {
  hero: {
    src: '/images/photos/hero-team.jpg',
    alt: 'Two developers working through code together on a laptop',
    credit: 'Christina @ wocintechchat.com, Unsplash',
  },
  websites: {
    src: '/images/photos/websites.jpg',
    alt: 'A desktop screen showing a landing page design next to its code',
    credit: 'Pankaj Patel, Unsplash',
  },
  'web-apps': {
    src: '/images/photos/web-apps.jpg',
    alt: 'A laptop showing an analytics dashboard with charts',
    credit: 'Carlos Muza, Unsplash',
  },
  'mobile-apps': {
    src: '/images/photos/mobile-apps.jpg',
    alt: 'A hand holding a phone with a dashboard app open',
    credit: 'Balázs Kétyi, Unsplash',
  },
  'ai-automation': {
    src: '/images/photos/ai-automation.jpg',
    alt: 'The letters AI rendered in blue on a digital background',
    credit: 'Steve Johnson, Unsplash',
  },
  talentSourcing: {
    src: '/images/photos/talent-sourcing.jpg',
    alt: 'A dashboard of charts and data on a screen',
    credit: 'Luke Chesser, Unsplash',
  },
  talentScreening: {
    src: '/images/photos/talent-screening.jpg',
    alt: 'A hiring manager interviewing a candidate in an office',
    credit: 'Vitaly Gariev, Unsplash',
  },
  demoCall: {
    src: '/images/photos/demo-call.jpg',
    alt: 'A man on a video call at his laptop',
    credit: 'LinkedIn Sales Solutions, Unsplash',
  },
} satisfies Record<string, Photo>;

export const servicePhotos: Record<string, Photo> = {
  websites: photos.websites,
  'web-apps': photos['web-apps'],
  'mobile-apps': photos['mobile-apps'],
  'ai-automation': photos['ai-automation'],
};
