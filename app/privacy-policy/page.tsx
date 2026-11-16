import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How LARSVA (OPC) PRIVATE LIMITED collects, uses and protects personal data on larsva.com.',
  alternates: { canonical: '/privacy-policy' },
};

const EFFECTIVE_DATE = '16 November 2026';

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
  ['sharing', 'Who we share data with'],
  ['retention', 'How long we keep data'],
  ['security', 'Security'],
  ['your-rights', 'Your rights'],
  ['children', 'Children'],
  ['changes', 'Changes to this policy'],
  ['contact', 'Contact us'],
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-site">
          <p className="eyebrow">Legal</p>
          <h1 className="h-display mt-4">Privacy Policy</h1>
          <p className="mt-4 text-[var(--color-ink-2)]">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <article className="mx-auto max-w-[760px] px-6 md:px-10 text-[var(--color-text-secondary)] leading-relaxed">
          <p className="mb-4">
            This policy explains what personal data LARSVA (OPC) PRIVATE LIMITED (“Larsva”, “we”, “us”) collects, why, and
            what choices you have. It covers our website <b>larsva.com</b>.
          </p>
          <p className="mb-8">
            We collect only what we need to run these services. We do not sell personal data. We do not show ads, and we
            do not use advertising or tracking cookies.
          </p>

          <nav aria-label="Contents" className="card-muted p-6 mb-4">
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

          <H2 id="sharing">3. Who we share data with</H2>
          <p className="mb-4">
            We share personal data only with service providers that help us run our services. They process it on our
            behalf:
          </p>
          <UL>
            <li><b>Google</b>: Google Sheets (consultation records) and Gmail (notification emails).</li>
            <li><b>Hostinger</b>: our email.</li>
            <li><b>Our hosting providers</b>: running the website and its servers.</li>
          </UL>
          <p className="mb-4">
            Some of these providers process data outside India. We may also disclose data if the law requires it, or to
            protect our rights and the safety of our users.
          </p>

          <H2 id="retention">4. How long we keep data</H2>
          <UL>
            <li><b>Consultation requests and emails:</b> as long as needed to respond and follow up, and no longer than 3 years unless we work together.</li>
            <li><b>IP-based limits:</b> short-lived counters that expire automatically.</li>
          </UL>

          <H2 id="security">5. Security</H2>
          <p className="mb-4">
            We use encrypted connections (HTTPS), keep access to data limited to people who
            need it, and avoid logging personal content. No system is perfectly secure, but we work to protect your data
            and will act promptly if a breach affects you.
          </p>

          <H2 id="your-rights">6. Your rights</H2>
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

          <H2 id="children">7. Children</H2>
          <p className="mb-4">
            Our services are not directed at children under 13, and we do not knowingly collect personal data from them.
            If you believe a child has given us personal data, contact us and we will delete it.
          </p>

          <H2 id="changes">8. Changes to this policy</H2>
          <p className="mb-4">
            We may update this policy when our services change. We’ll post the new version on this page with a new
            effective date. If the changes are significant, we’ll make that clear on our website.
          </p>

          <H2 id="contact">9. Contact us</H2>
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
