import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';

export const metadata: Metadata = {
  title: 'Kill Chess — Download the Android App',
  description:
    'Kill Chess (antichess): captures are forced and you win by losing all your pieces. Download the free Android app and play the computer, a friend on the same phone, or a friend online.',
  alternates: { canonical: '/games/killchess' },
  openGraph: {
    title: 'Kill Chess — chess where you try to LOSE',
    description: 'Captures are forced. Lose all your pieces to win. Get the free Android app.',
  },
};

// Built from mobile/killchess (see its README). Update APK_SIZE and APK_VERSION when you publish a new build.
const APK_URL = '/downloads/killchess.apk';
const APK_VERSION = '1.0.0';
const APK_SIZE = '3.3 MB';
const APP_ID = 'com.larsva.killchess';

const rules = [
  ['Pieces move like normal chess.', ''],
  ['If you can capture, you must.', 'Pieces that are forced to capture glow red.'],
  ['Win by losing all your pieces', '— or by having no legal move left.'],
  ['The king is just a normal piece.', 'No check, no checkmate, no castling.'],
];

const steps = [
  'Tap “Download for Android” on your phone.',
  'Open the downloaded file. If Android asks, allow your browser to install apps from this source.',
  'Tap Install, then open Kill Chess.',
];

type Props = { searchParams: Promise<{ play?: string | string[] }> };

export default async function KillChessPage({ searchParams }: Props) {
  const { play } = await searchParams;
  // Invite links from the app look like /games/killchess?play=<game id>.
  const inviteId = typeof play === 'string' && /^[a-z2-9]{8}$/.test(play) ? play : null;
  const fallback = encodeURIComponent(`https://larsva.com${APK_URL}`);
  const openInApp = inviteId
    ? `intent://play?id=${inviteId}#Intent;scheme=killchess;package=${APP_ID};S.browser_fallback_url=${fallback};end`
    : null;

  return (
    <>
      <section className="gradient-hero pt-36 pb-20 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(255,61,90,0.08),transparent_70%)] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-[760px] text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-[rgba(0,194,168,0.1)] border border-[rgba(0,194,168,0.2)] rounded-full px-5 py-1.5 text-sm text-[var(--color-accent)] font-medium mb-8">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse-dot" />
              Free Android game by Larsva
            </div>
          </ScrollReveal>

          {inviteId && openInApp && (
            <ScrollReveal>
              <div className="mb-10 rounded-2xl border border-[rgba(255,184,77,0.3)] bg-[rgba(255,184,77,0.08)] p-6 text-left">
                <p className="font-heading font-bold text-xl text-white mb-2">😈 You’ve been invited to a game</p>
                <p className="text-white/60 mb-5">
                  Open it in the Kill Chess app. If you don’t have the app yet, install it first, then tap “Open in app” again.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={openInApp} className="btn-primary py-3 px-6 rounded-xl">Open in app</a>
                  <a href={APK_URL} download className="py-3 px-6 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-colors">
                    Download the app
                  </a>
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={100}>
            <h1 className="font-heading font-bold text-[clamp(2.75rem,7vw,5rem)] tracking-tight leading-[1.05] mb-6 text-white">
              KILL<span className="text-[#ff3d5a]">CHESS</span> 😈
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-lg text-white/55 max-w-[560px] mx-auto leading-relaxed mb-10">
              Chess where captures are forced and you <b className="text-white">win by losing all your pieces</b>. Play the
              computer, a friend on the same phone, or a friend online.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a href={APK_URL} download className="btn-primary text-lg py-4 px-10 rounded-xl">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download for Android
            </a>
            <p className="text-sm text-white/35 mt-4">
              Version {APK_VERSION} · {APK_SIZE} · Android 7.0 or newer
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-bg-dark)] px-6 md:px-10 relative">
        <div className="absolute inset-0 grid-pattern-dark pointer-events-none" />
        <div className="mx-auto max-w-[1000px] relative z-10 grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <h2 className="font-heading font-bold text-2xl text-white mb-6">How to install</h2>
              <ol className="space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-4 text-white/60 leading-relaxed">
                    <span className="flex-none w-7 h-7 rounded-full bg-[rgba(0,194,168,0.15)] text-[var(--color-accent)] text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-white/35 mt-6">
                The app is downloaded straight from larsva.com, not the Play Store, so Android asks you to allow the install once.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <h2 className="font-heading font-bold text-2xl text-white mb-6">How to play</h2>
              <ul className="space-y-4">
                {rules.map(([b, rest]) => (
                  <li key={b} className="text-white/60 leading-relaxed">
                    <b className="text-white">{b}</b> {rest}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-white/35 mt-6">
                Log in to earn points against the computer and climb the leaderboard.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="mx-auto max-w-[1000px] relative z-10 mt-10 text-center">
          <Link href="/products" className="text-white/40 hover:text-white transition-colors">← More from Larsva</Link>
        </div>
      </section>
    </>
  );
}
