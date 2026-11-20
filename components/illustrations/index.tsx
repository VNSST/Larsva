// Product illustrations drawn as inline SVG in the site's colours: they show the kinds of things
// Larsva builds, stay sharp at any size and add almost nothing to page weight.
import type { ReactNode } from 'react';

const C = {
  accent: '#1F4FD8',
  accentSoft: '#EEF2FD',
  accentMid: '#BCCBF5',
  ink: '#0F172A',
  ink2: '#475569',
  mid: '#CBD5E1',
  line: '#E2E8F0',
  alt: '#F4F5F7',
  white: '#FFFFFF',
};

// Soft shadow as a CSS filter, so several illustrations on one page don't need shared SVG ids.
const SOFT = { filter: 'drop-shadow(0 8px 12px rgba(15, 23, 42, 0.08))' };

type SvgProps = { className?: string; label: string; viewBox: string; children: ReactNode };

function Svg({ className, label, viewBox, children }: SvgProps) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className={className} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

const Bar = ({ x, y, w, h = 8, c = C.mid, r = 4 }: { x: number; y: number; w: number; h?: number; c?: string; r?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={c} />
);

function Browser({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  return (
    <g style={SOFT}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={C.white} stroke={C.line} />
      <path d={`M${x} ${y + 12}a12 12 0 0 1 12-12h${w - 24}a12 12 0 0 1 12 12v18H${x}z`} fill={C.alt} />
      <circle cx={x + 16} cy={y + 15} r="4" fill={C.mid} />
      <circle cx={x + 30} cy={y + 15} r="4" fill={C.mid} />
      <circle cx={x + 44} cy={y + 15} r="4" fill={C.mid} />
      <rect x={x + w / 2 - 70} y={y + 8} width="140" height="14" rx="7" fill={C.white} stroke={C.line} />
      <g>{children}</g>
    </g>
  );
}

function Phone({ x, y, w = 150, h = 300, children }: { x: number; y: number; w?: number; h?: number; children: ReactNode }) {
  return (
    <g style={SOFT}>
      <rect x={x} y={y} width={w} height={h} rx="24" fill={C.ink} />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx="19" fill={C.white} />
      <rect x={x + w / 2 - 22} y={y + 12} width="44" height="8" rx="4" fill={C.ink} />
      <g>{children}</g>
    </g>
  );
}

/* ---------- Pieces of UI reused across illustrations ---------- */

function WebsiteContent({ x, y, w }: { x: number; y: number; w: number }) {
  const cw = (w - 64) / 3;
  return (
    <g>
      <rect x={x + 16} y={y + 14} width="16" height="16" rx="4" fill={C.accent} />
      <Bar x={x + w - 150} y={y + 18} w={30} h={7} />
      <Bar x={x + w - 112} y={y + 18} w={30} h={7} />
      <rect x={x + w - 72} y={y + 13} width="56" height="18" rx="5" fill={C.accent} />
      <Bar x={x + 16} y={y + 56} w={w * 0.42} h={12} c={C.ink} r={6} />
      <Bar x={x + 16} y={y + 76} w={w * 0.32} h={12} c={C.ink} r={6} />
      <Bar x={x + 16} y={y + 100} w={w * 0.4} h={6} />
      <Bar x={x + 16} y={y + 112} w={w * 0.34} h={6} />
      <rect x={x + 16} y={y + 130} width="78" height="22" rx="6" fill={C.accent} />
      <rect x={x + 102} y={y + 130} width="62" height="22" rx="6" fill={C.white} stroke={C.mid} />
      <rect x={x + w * 0.56} y={y + 52} width={w * 0.4} height="104" rx="10" fill={C.accentSoft} />
      <circle cx={x + w * 0.66} cy={y + 82} r="11" fill={C.accentMid} />
      <path d={`M${x + w * 0.58} ${y + 146}l${w * 0.11} -40l${w * 0.08} 24l${w * 0.06} -14l${w * 0.11} 30z`} fill={C.accentMid} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 16 + i * (cw + 16)} y={y + 172} width={cw} height="58" rx="8" fill={C.white} stroke={C.line} />
          <rect x={x + 26 + i * (cw + 16)} y={y + 182} width="16" height="16" rx="4" fill={C.accentSoft} />
          <Bar x={x + 26 + i * (cw + 16)} y={y + 206} w={cw * 0.7} h={6} c={C.ink2} />
          <Bar x={x + 26 + i * (cw + 16)} y={y + 218} w={cw * 0.5} h={5} />
        </g>
      ))}
    </g>
  );
}

function AppScreen({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <Bar x={x + 14} y={y + 34} w={60} h={10} c={C.ink} r={5} />
      <circle cx={x + w - 24} cy={y + 39} r="8" fill={C.accentSoft} />
      <rect x={x + 12} y={y + 56} width={w - 24} height="66" rx="12" fill={C.accent} />
      <Bar x={x + 24} y={y + 70} w={50} h={6} c={C.accentMid} />
      <Bar x={x + 24} y={y + 84} w={70} h={12} c={C.white} r={6} />
      <rect x={x + 24} y={y + 104} width="44" height="10" rx="5" fill={C.white} opacity="0.35" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 12} y={y + 134 + i * 38} width={w - 24} height="30" rx="8" fill={C.alt} />
          <circle cx={x + 28} cy={y + 149 + i * 38} r="8" fill={i === 0 ? C.accentMid : C.mid} />
          <Bar x={x + 42} y={y + 142 + i * 38} w={w * 0.4} h={6} c={C.ink2} />
          <Bar x={x + 42} y={y + 153 + i * 38} w={w * 0.28} h={5} />
        </g>
      ))}
      <rect x={x + 6} y={y + 252} width={w - 12} height="36" fill={C.white} stroke={C.line} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={x + 6 + ((w - 12) / 4) * (i + 0.5)} cy={y + 270} r="6" fill={i === 0 ? C.accent : C.mid} />
      ))}
    </g>
  );
}

function ChatCard({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g style={SOFT}>
      <rect x={x} y={y} width={w} height="112" rx="12" fill={C.white} stroke={C.line} />
      <rect x={x + w - 128} y={y + 14} width="114" height="26" rx="10" fill={C.alt} />
      <Bar x={x + w - 118} y={y + 23} w={92} h={7} c={C.ink2} />
      <circle cx={x + 24} cy={y + 64} r="11" fill={C.accent} />
      <text x={x + 24} y={y + 68} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.white} fontFamily="inherit">AI</text>
      <rect x={x + 42} y={y + 50} width={w - 56} height="48" rx="10" fill={C.accentSoft} />
      <Bar x={x + 54} y={y + 61} w={w - 90} h={6} c={C.accent} />
      <Bar x={x + 54} y={y + 73} w={w - 110} h={6} c={C.accentMid} />
      <Bar x={x + 54} y={y + 85} w={w - 130} h={6} c={C.accentMid} />
    </g>
  );
}

/* ---------- Illustrations ---------- */

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 560 450" label="A website, a mobile app and an AI assistant built by Larsva">
      <Browser x={10} y={10} w={430} h={290}>
        <WebsiteContent x={10} y={40} w={430} />
      </Browser>
      <Phone x={392} y={120} w={156} h={300}>
        <AppScreen x={392} y={120} w={156} />
      </Phone>
      <ChatCard x={30} y={320} w={300} />
    </Svg>
  );
}

export function WebsiteIllustration({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 480 300" label="A business website on desktop">
      <Browser x={20} y={20} w={440} h={262}>
        <WebsiteContent x={20} y={44} w={440} />
      </Browser>
    </Svg>
  );
}

export function WebAppIllustration({ className }: { className?: string }) {
  const bars = [44, 70, 56, 92, 78, 108, 96];
  return (
    <Svg className={className} viewBox="0 0 480 300" label="A web app dashboard with a sidebar, stats and a chart">
      <Browser x={20} y={20} w={440} h={262}>
        <rect x={21} y={50} width="96" height="231" fill={C.alt} />
        <rect x={34} y={62} width="16" height="16" rx="4" fill={C.accent} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            {i === 0 && <rect x={30} y={92} width="78" height="22" rx="6" fill={C.accentSoft} />}
            <rect x={38} y={99 + i * 28} width="8" height="8" rx="2" fill={i === 0 ? C.accent : C.mid} />
            <Bar x={52} y={100 + i * 28} w={46} h={6} c={i === 0 ? C.accent : C.mid} />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={130 + i * 108} y={62} width="98" height="58" rx="8" fill={C.white} stroke={C.line} />
            <Bar x={142 + i * 108} y={74} w={44} h={6} />
            <Bar x={142 + i * 108} y={90} w={56} h={14} c={i === 0 ? C.accent : C.ink} r={4} />
          </g>
        ))}
        <rect x={130} y={132} width="206" height="138" rx="8" fill={C.white} stroke={C.line} />
        <Bar x={142} y={144} w={70} h={7} c={C.ink2} />
        {bars.map((h, i) => (
          <rect key={i} x={146 + i * 26} y={258 - h} width="16" height={h} rx="3" fill={i === 5 ? C.accent : C.accentMid} />
        ))}
        <rect x={346} y={132} width="98" height="138" rx="8" fill={C.white} stroke={C.line} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={362} cy={156 + i * 28} r="8" fill={C.alt} />
            <Bar x={376} y={150 + i * 28} w={52} h={5} c={C.ink2} />
            <Bar x={376} y={160 + i * 28} w={34} h={4} />
          </g>
        ))}
      </Browser>
    </Svg>
  );
}

export function MobileAppIllustration({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 480 300" label="An Android and iOS app shown on two phones, ready for the app stores">
      <g transform="translate(96 12) scale(0.92)">
        <Phone x={0} y={0} w={150} h={300}>
          <AppScreen x={0} y={0} w={150} />
        </Phone>
      </g>
      <g transform="translate(250 30) scale(0.86)">
        <Phone x={0} y={0} w={150} h={300}>
          <Bar x={14} y={34} w={70} h={10} c={C.ink} r={5} />
          <rect x={12} y={56} width="126" height="96" rx="12" fill={C.accentSoft} />
          <circle cx={46} cy={92} r="16" fill={C.accentMid} />
          <path d="M20 146l38-36l26 22l22-16l28 30z" fill={C.accentMid} />
          <Bar x={14} y={166} w={110} h={8} c={C.ink2} />
          <Bar x={14} y={182} w={90} h={6} />
          <Bar x={14} y={194} w={100} h={6} />
          <rect x={12} y={222} width="126" height="30" rx="9" fill={C.accent} />
          <Bar x={52} y={234} w={46} h={6} c={C.white} />
        </Phone>
      </g>
      <g style={SOFT}>
        <rect x={30} y={226} width="92" height="30" rx="8" fill={C.ink} />
        <path d="M44 234l12 7l-12 7z" fill={C.white} />
        <Bar x={62} y={237} w={48} h={7} c={C.white} />
        <rect x={358} y={226} width="92" height="30" rx="8" fill={C.ink} />
        <circle cx={374} cy={241} r="7" fill={C.white} />
        <Bar x={388} y={237} w={50} h={7} c={C.white} />
      </g>
    </Svg>
  );
}

export function AiIllustration({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 480 300" label="An AI assistant answering from documents, connected to a workflow">
      <g style={SOFT}>
        <rect x={20} y={20} width="290" height="262" rx="12" fill={C.white} stroke={C.line} />
        <path d="M20 32a12 12 0 0 1 12-12h266a12 12 0 0 1 12 12v22H20z" fill={C.alt} />
        <circle cx={40} cy={37} r="8" fill={C.accent} />
        <Bar x={54} y={33} w={70} h={8} c={C.ink2} />
      </g>
      <rect x={150} y={70} width="146" height="34" rx="12" fill={C.alt} />
      <Bar x={162} y={80} w={110} h={6} c={C.ink2} />
      <Bar x={162} y={91} w={80} h={6} c={C.mid} />
      <circle cx={46} cy={134} r="12" fill={C.accent} />
      <text x={46} y={138} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.white} fontFamily="inherit">AI</text>
      <rect x={66} y={118} width="230" height="84" rx="12" fill={C.accentSoft} />
      <Bar x={80} y={132} w={190} h={6} c={C.accent} />
      <Bar x={80} y={145} w={170} h={6} c={C.accentMid} />
      <Bar x={80} y={158} w={180} h={6} c={C.accentMid} />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={80 + i * 92} y={174} width="84" height="18" rx="9" fill={C.white} stroke={C.accentMid} />
          <rect x={88 + i * 92} y={179} width="8" height="9" rx="1.5" fill={C.accent} />
          <Bar x={100 + i * 92} y={180} w={54} h={5} c={C.ink2} />
        </g>
      ))}
      <rect x={36} y={240} width="258" height="28" rx="14" fill={C.white} stroke={C.line} />
      <Bar x={52} y={251} w={120} h={6} />
      <circle cx={278} cy={254} r="9" fill={C.accent} />
      {[
        { y: 60, label: 'mail' },
        { y: 140, label: 'ai' },
        { y: 220, label: 'sheet' },
      ].map((n, i) => (
        <g key={n.label} style={SOFT}>
          <rect x={352} y={n.y} width="108" height="44" rx="10" fill={i === 1 ? C.accent : C.white} stroke={i === 1 ? C.accent : C.line} />
          <rect x={364} y={n.y + 13} width="18" height="18" rx="5" fill={i === 1 ? C.white : C.accentSoft} opacity={i === 1 ? 0.3 : 1} />
          <Bar x={390} y={n.y + 15} w={54} h={6} c={i === 1 ? C.white : C.ink2} />
          <Bar x={390} y={n.y + 26} w={36} h={5} c={i === 1 ? C.accentMid : C.mid} />
        </g>
      ))}
      <path d="M406 104v36M406 184v36" stroke={C.accent} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M401 134l5 6l5-6M401 214l5 6l5-6" stroke={C.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SourcingIllustration({ className }: { className?: string }) {
  const dots = Array.from({ length: 24 }, (_, i) => ({ x: 40 + (i % 8) * 26, y: 40 + Math.floor(i / 8) * 26 }));
  return (
    <Svg className={className} viewBox="0 0 480 240" label="Sourcing engine narrowing a large pool of candidates down to a shortlist">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="9" fill={i % 5 === 0 ? C.accentMid : C.mid} />
      ))}
      <path d="M30 120h210l-50 50v40h-110v-40z" fill={C.accentSoft} stroke={C.accentMid} />
      <Bar x={98} y={140} w={74} h={7} c={C.accent} />
      <Bar x={110} y={156} w={50} h={6} c={C.accentMid} />
      <path d="M250 165h60" stroke={C.accent} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M304 159l7 6l-7 6" stroke={C.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g style={SOFT}>
        <rect x={322} y={70} width="138" height="150" rx="12" fill={C.white} stroke={C.line} />
        <Bar x={336} y={84} w={66} h={7} c={C.ink2} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={346} cy={118 + i * 34} r="10" fill={C.accentMid} />
            <Bar x={362} y={112 + i * 34} w={58} h={6} c={C.ink2} />
            <Bar x={362} y={123 + i * 34} w={40} h={5} />
            <circle cx={440} cy={118 + i * 34} r="8" fill={C.accent} />
            <path d={`M436 ${118 + i * 34}l3 3l5-6`} stroke={C.white} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </g>
    </Svg>
  );
}

export function ScreeningIllustration({ className }: { className?: string }) {
  const people = [
    { initials: 'AK', tags: [56, 44] },
    { initials: 'RS', tags: [48, 60] },
    { initials: 'MP', tags: [64, 40] },
  ];
  return (
    <Svg className={className} viewBox="0 0 480 240" label="A shortlist of screened candidates with skills checked">
      <g style={SOFT}>
        <rect x={40} y={20} width="400" height="204" rx="12" fill={C.white} stroke={C.line} />
      </g>
      <Bar x={60} y={38} w={100} h={8} c={C.ink} />
      <rect x={364} y={34} width="58" height="18" rx="9" fill={C.accentSoft} />
      <Bar x={374} y={40} w={38} h={6} c={C.accent} />
      {people.map((p, i) => (
        <g key={p.initials}>
          <rect x={56} y={64 + i * 52} width="368" height="44" rx="8" fill={i === 0 ? C.accentSoft : C.alt} />
          <circle cx={80} cy={86 + i * 52} r="14" fill={i === 0 ? C.accent : C.mid} />
          <text x={80} y={90 + i * 52} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.white} fontFamily="inherit">{p.initials}</text>
          <Bar x={104} y={77 + i * 52} w={90} h={7} c={C.ink2} />
          <Bar x={104} y={90 + i * 52} w={60} h={5} />
          {p.tags.map((t, j) => (
            <rect key={j} x={214 + j * 70} y={79 + i * 52} width={t} height="14" rx="7" fill={C.white} stroke={C.line} />
          ))}
          <rect x={364} y={77 + i * 52} width="48" height="18" rx="9" fill={C.accent} />
          <path d={`M376 ${86 + i * 52}l3 3l5-6`} stroke={C.white} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Bar x={388} y={83 + i * 52} w={16} h={5} c={C.white} />
        </g>
      ))}
    </Svg>
  );
}

export function DemoCallIllustration({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 480 280" label="A video call where Larsva shows a project on a shared screen">
      <g style={SOFT}>
        <rect x={20} y={10} width="440" height="254" rx="14" fill={C.ink} />
      </g>
      <rect x={34} y={24} width="300" height="188" rx="8" fill={C.white} />
      <g transform="translate(34 24) scale(0.68)">
        <WebsiteContent x={0} y={0} w={440} />
      </g>
      <rect x={346} y={24} width="100" height="90" rx="8" fill="#1E293B" />
      <circle cx={396} cy={60} r="18" fill={C.accent} />
      <text x={396} y={65} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.white} fontFamily="inherit">L</text>
      <Bar x={372} y={92} w={48} h={6} c="#475569" />
      <rect x={346} y={122} width="100" height="90" rx="8" fill="#1E293B" />
      <circle cx={396} cy={158} r="18" fill="#334155" />
      <text x={396} y={163} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.mid} fontFamily="inherit">You</text>
      <Bar x={372} y={190} w={48} h={6} c="#475569" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={196 + i * 34} cy={238} r="11" fill={i === 2 ? '#DC2626' : '#334155'} />
      ))}
    </Svg>
  );
}

export const serviceIllustrations: Record<string, (p: { className?: string }) => ReactNode> = {
  websites: WebsiteIllustration,
  'web-apps': WebAppIllustration,
  'mobile-apps': MobileAppIllustration,
  'ai-automation': AiIllustration,
};
