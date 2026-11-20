// Photos from Unsplash (https://unsplash.com/license): free for commercial use, no attribution required.
// Credits kept here for reference.
export interface Photo {
  src: string;
  alt: string;
  credit: string;
}

export const photos = {
  hero: {
    src: '/images/photos/hero-team-in.jpg',
    alt: 'An Indian team in a meeting room while a colleague presents',
    credit: 'Smartworks Coworking, Unsplash',
  },
  websites: {
    src: '/images/photos/websites-in.jpg',
    alt: 'A smiling developer working at his desk with two screens',
    credit: 'litoon dev, Unsplash',
  },
  'web-apps': {
    src: '/images/photos/web-apps-in.jpg',
    alt: 'A developer writing code across two monitors',
    credit: 'Ofspace LLC, Unsplash',
  },
  'mobile-apps': {
    src: '/images/photos/mobile-apps-in.jpg',
    alt: 'A young woman smiling as she uses an app on her phone',
    credit: 'Rupinder Singh, Unsplash',
  },
  'ai-automation': {
    src: '/images/photos/ai-automation.jpg',
    alt: 'The letters AI rendered in blue on a digital background',
    credit: 'Steve Johnson, Unsplash',
  },
  talentSourcing: {
    src: '/images/photos/talent-sourcing-in.jpg',
    alt: 'A recruiter at her desk with a laptop',
    credit: 'Skytech Aviation, Unsplash',
  },
  talentScreening: {
    src: '/images/photos/talent-screening-in.jpg',
    alt: 'A candidate in a job interview across the desk from an interviewer',
    credit: 'Mina Rad, Unsplash',
  },
  demoCall: {
    src: '/images/photos/demo-call-in.jpg',
    alt: 'A woman on a call at her laptop, taking notes',
    credit: 'Sweet Life, Unsplash',
  },
} satisfies Record<string, Photo>;

export const servicePhotos: Record<string, Photo> = {
  websites: photos.websites,
  'web-apps': photos['web-apps'],
  'mobile-apps': photos['mobile-apps'],
  'ai-automation': photos['ai-automation'],
};
