import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How LARSVA (OPC) PRIVATE LIMITED collects, uses and protects personal data on larsva.com, in HRDocForensics and in the Kill Chess app.',
  alternates: { canonical: '/privacy-policy' },
};

const EFFECTIVE_DATE = '14 November 2026';

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-heading font-bold text-2xl tracking-tight mt-14 mb-4 scroll-mt-28 text-[var(--color-text-primary)]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-semibold text-lg mt-8 mb-3 text-[var(--color-text-primary)]">{children}</h3>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>;
}

const Mail = ({ to }: { to: string }) => (
  <a href={`mailto:${to}`} className="text-[var(--color-accent)] hover:underline">{to}</a>
);

const contents = [
  ['who-we-are', 'Who we are'],
  ['website', 'larsva.com and the consultation form'],
  ['hrdocforensics', 'HRDocForensics'],
  ['kill-chess', 'Kill Chess app'],
  ['sharing', 'Who we share data with'],
  ['retention', 'How long we keep data'],
  ['security', 'Security'],
  ['your-rights', 'Your rights'],
  ['delete-account', 'Deleting your Kill Chess account'],
  ['children', 'Children'],
  ['changes', 'Changes to this policy'],
  ['contact', 'Contact us'],
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="gradient-hero pt-36 pb-16 px-6 md:px-10 relative overflow-hidden">
        <div className="mx-auto max-w-[800px] text-center relative z-10">
          <span className="overline text-[var(--color-accent)] mb-5 block">Legal</span>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,5vw,3.5rem)] tracking-tight leading-tight mb-5 text-white">
            Privacy Policy
          </h1>
          <p className="text-white/45">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <article className="mx-auto max-w-[760px] px-6 md:px-10 text-[var(--color-text-secondary)] leading-relaxed">
          <p className="mb-4">
            This policy explains what personal data LARSVA (OPC) PRIVATE LIMITED (“Larsva”, “we”, “us”) collects, why, and
            what choices you have. It covers our website <b>larsva.com</b>, our <b>HRDocForensics</b> tool and our{' '}
            <b>Kill Chess</b> Android app.
          </p>
          <p className="mb-8">
            We collect only what we need to run these services. We do not sell personal data. We do not show ads, and we
            do not use advertising or tracking cookies.
          </p>

          <nav aria-label="Contents" className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 mb-4">
            <p className="font-display font-semibold text-sm mb-3 text-[var(--color-text-primary)]">Contents</p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {contents.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:text-[var(--color-accent)]">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <H2 id="who-we-are">1. Who we are</H2>
          <p className="mb-4">The data fiduciary (controller) responsible for your personal data is:</p>
          <address className="not-italic mb-4">
            <b className="text-[var(--color-text-primary)]">LARSVA (OPC) PRIVATE LIMITED</b>
            <br />
            FLATNO:402 KALLAM TOWN, SHIP DHARMAKSHETRA, Piduguralla, Piduguralla, Guntur- 522413, Andhra Pradesh, India
            <br />
            Email: <Mail to="admin@larsva.com" /> · Phone: <a href="tel:+919133804790" className="text-[var(--color-accent)] hover:underline">+91 91338 04790</a>
          </address>

          <H2 id="website">2. larsva.com and the consultation form</H2>
          <H3>What we collect</H3>
          <UL>
            <li>
              <b>Consultation requests:</b> when you submit the form on our Contact page, we collect your full name, email
              address, phone number and the description of your startup idea.
            </li>
            <li>
              <b>Emails you send us:</b> the content of your message and your email address.
            </li>
            <li>
              <b>Technical data:</b> like any website, our servers receive your IP address and basic request information
              (browser type, pages requested). We use the IP address briefly to limit repeated form submissions and to keep
              the site secure.
            </li>
          </UL>
          <H3>How we use it</H3>
          <UL>
            <li>To reply to your request and discuss our services with you.</li>
            <li>To keep a record of consultation requests so we can follow up.</li>
            <li>To protect the site against spam and abuse.</li>
          </UL>
          <p className="mb-4">
            Consultation requests are saved to a private Google Sheet and sent to our team by email. We use this data
            because you gave it to us to be contacted. We don’t add you to marketing lists.
          </p>

          <H2 id="hrdocforensics">3. HRDocForensics</H2>
          <p className="mb-4">
            HRDocForensics analyses a PDF you upload, such as an offer letter, together with any optional details you enter.
          </p>
          <UL>
            <li>
              The document is processed in memory to produce your result. <b>We do not save uploaded documents</b> or their
              contents, and we do not log document text, names or the details you enter.
            </li>
            <li>
              To produce the analysis, the document’s text and page images are sent to <b>OpenAI</b>, our AI provider,
              which processes them on our behalf under its API terms.
            </li>
            <li>
              Please upload only documents you are entitled to share. Avoid documents containing sensitive data you don’t
              need analysed, such as identity numbers or bank details.
            </li>
          </UL>

          <H2 id="kill-chess">4. Kill Chess app</H2>
          <p className="mb-4">
            You can play Kill Chess without an account. An account is optional and lets you earn points, appear on the
            leaderboard and keep your progress across devices.
          </p>
          <H3>If you create an account</H3>
          <UL>
            <li><b>Name</b> you choose (shown publicly on the leaderboard with your player ID).</li>
            <li><b>Email address</b>, used to log in and to send password-reset emails. It is never shown publicly.</li>
            <li><b>Password</b>, which we store only as a secure hash. We cannot see your password.</li>
            <li><b>Game data:</b> your player ID, points, number of games, difficulty level and game results.</li>
          </UL>
          <H3>Online games with friends</H3>
          <p className="mb-4">
            When you start or join an online game, we store the game’s moves and the players’ display names so that both
            players can play. Invite links contain only a random game ID.
          </p>
          <H3>Stored on your phone</H3>
          <p className="mb-4">
            The app saves your settings (sound, timer, difficulty), your login session and your active online games on
            your device. Uninstalling the app or clearing its data removes them.
          </p>
          <H3>What the app does not do</H3>
          <UL>
            <li>No ads, no analytics or tracking SDKs, and no access to your contacts, location, camera or files.</li>
            <li>The app needs only the internet permission to talk to our server.</li>
          </UL>
          <p className="mb-4">
            We also keep anonymous totals, such as the number of games played and wins against the computer, which are
            shown on the stats page and do not identify you.
          </p>

          <H2 id="sharing">5. Who we share data with</H2>
          <p className="mb-4">
            We share personal data only with service providers that help us run our services. They process it on our
            behalf:
          </p>
          <UL>
            <li><b>Google</b>: Google Sheets (consultation records) and Gmail (notification emails).</li>
            <li><b>OpenAI</b>: document analysis for HRDocForensics.</li>
            <li><b>Upstash</b>: database for Kill Chess accounts and games.</li>
            <li><b>Resend</b>: sending Kill Chess password-reset emails.</li>
            <li><b>Hostinger</b>: our email.</li>
            <li><b>Our hosting providers</b>: running the website and its servers.</li>
          </UL>
          <p className="mb-4">
            Some of these providers process data outside India. We may also disclose data if the law requires it, or to
            protect our rights and the safety of our users.
          </p>

          <H2 id="retention">6. How long we keep data</H2>
          <UL>
            <li><b>Consultation requests and emails:</b> as long as needed to respond and follow up, and no longer than 3 years unless we work together.</li>
            <li><b>HRDocForensics uploads:</b> not stored. They are discarded once your result is produced.</li>
            <li><b>Kill Chess accounts:</b> until you delete your account. Login sessions expire after 1 year, password-reset links after 1 hour.</li>
            <li><b>Online games:</b> deleted automatically 7 days after the last move.</li>
            <li><b>IP-based limits:</b> short-lived counters that expire automatically.</li>
          </UL>

          <H2 id="security">7. Security</H2>
          <p className="mb-4">
            We use encrypted connections (HTTPS), store passwords only as hashes, keep access to data limited to people who
            need it, and avoid logging personal content. No system is perfectly secure, but we work to protect your data
            and will act promptly if a breach affects you.
          </p>

          <H2 id="your-rights">8. Your rights</H2>
          <p className="mb-4">
            Under India’s Digital Personal Data Protection Act, 2023 and other applicable laws, you can ask us to:
          </p>
          <UL>
            <li>tell you what personal data we hold about you;</li>
            <li>correct or update it;</li>
            <li>delete it;</li>
            <li>withdraw consent you gave us (this won’t affect what we did before).</li>
          </UL>
          <p className="mb-4">
            Email <Mail to="admin@larsva.com" /> from the address linked to your data. We will reply within 30 days. If
            you’re not satisfied with our response, you can contact our grievance officer at the same address, and you
            may also complain to the Data Protection Board of India.
          </p>

          <H2 id="delete-account">9. Deleting your Kill Chess account</H2>
          <p className="mb-4">To delete your Kill Chess account and its data:</p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              Email <Mail to="admin@larsva.com" /> from the email address you signed up with, with the subject{' '}
              <b>“Delete my Kill Chess account”</b>. Include your player ID if you know it (shown in the app when you’re
              logged in).
            </li>
            <li>We confirm the request and delete your account within 30 days.</li>
          </ol>
          <p className="mb-4">
            <b>What is deleted:</b> your name, email address, password hash, points, level, game results and login
            sessions, and your entry on the leaderboard. <b>What may remain:</b> anonymous game totals (which don’t
            identify you). Data on your phone is removed when you uninstall the app.
          </p>

          <H2 id="children">10. Children</H2>
          <p className="mb-4">
            Our services are not directed at children under 13, and we do not knowingly collect personal data from them.
            Kill Chess can be played without an account. Users under 18 should create an account only with a parent’s or
            guardian’s permission. If you believe a child has given us personal data, contact us and we will delete it.
          </p>

          <H2 id="changes">11. Changes to this policy</H2>
          <p className="mb-4">
            We may update this policy when our services change. We’ll post the new version on this page with a new
            effective date. If the changes are significant, we’ll make that clear on our website or in the app.
          </p>

          <H2 id="contact">12. Contact us</H2>
          <p className="mb-4">
            Questions about this policy or your data: <Mail to="admin@larsva.com" /> or <Mail to="info@larsva.com" />,
            phone <a href="tel:+919133804790" className="text-[var(--color-accent)] hover:underline">+91 91338 04790</a>, or
            write to us at the address in section 1. You can also use our <Link href="/contact" className="text-[var(--color-accent)] hover:underline">Contact page</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
