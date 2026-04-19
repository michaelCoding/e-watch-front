export const runtime = 'edge';

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Aevuno',
  description: 'How Aevuno SA collects, uses, and protects your personal data.',
}

const sections = [
  {
    title: '1. Who We Are',
    body: [
      'Aevuno SA ("Aevuno", "we", "our", or "us") is a luxury timepiece company registered in Geneva, Switzerland (CHE-412.830.991). Our registered office is at 14 Rue de la Corraterie, 1204 Geneva, Switzerland.',
      'We operate the e-commerce storefront at aevuno.com and are the data controller for all personal data collected through this platform.',
    ],
  },
  {
    title: '2. Data We Collect',
    body: [
      'We collect the following categories of personal data when you interact with our services:',
      '**Account Information** — name, email address, and password (hashed) when you register an account.',
      '**Order Information** — billing address, shipping address, items purchased, order value, and order history.',
      '**Payment Data** — we do not store payment card details. All payment transactions are processed by PayPal (PayPal Holdings, Inc.) under their own privacy policy. We receive only a transaction reference and confirmation status.',
      '**Device & Usage Data** — IP address, browser type, operating system, pages visited, and time spent on site. This data is collected via first-party analytics and is anonymised within 90 days.',
      '**Communications** — if you contact our support team or sign up for our newsletter, we retain the content of those communications and your contact details.',
    ],
  },
  {
    title: '3. How We Use Your Data',
    body: [
      'We process your personal data on the following legal bases:',
      '**Contract performance** — to process and fulfil your orders, issue invoices, arrange shipping, and handle returns or exchanges.',
      '**Legitimate interests** — to detect and prevent fraud, improve our website experience, and conduct internal analytics. Our legitimate interests never override your fundamental rights.',
      '**Consent** — to send you marketing emails about new collections, exclusive drops, and brand news. You may withdraw consent at any time by clicking "Unsubscribe" in any email or contacting us directly.',
      '**Legal obligation** — to comply with applicable tax, accounting, and regulatory requirements in Switzerland and the countries to which we ship.',
    ],
  },
  {
    title: '4. Sharing Your Data',
    body: [
      'Aevuno does not sell, rent, or trade your personal data. We share data only with the following categories of trusted service providers, bound by data processing agreements:',
      '**Logistics partners** — shipping carriers and fulfilment centres receive your name and delivery address solely to dispatch and track your order.',
      '**Payment processors** — PayPal receives transaction data necessary to authorise and complete your payment.',
      '**Cloud infrastructure** — our platform runs on Railway (Railway Corporation, USA) and Cloudflare (Cloudflare Inc., USA). Data transfers to these providers are governed by Standard Contractual Clauses approved by the European Commission.',
      '**Email delivery** — transactional and marketing emails are sent via Resend (Resend Inc., USA) under equivalent transfer safeguards.',
      'We may disclose data if required by a court order, regulatory authority, or to protect the rights, property, or safety of Aevuno or others.',
    ],
  },
  {
    title: '5. Cookies',
    body: [
      'We use a minimal set of cookies essential to the operation of the store:',
      '**Session & authentication cookies** — `_medusa_jwt` stores your login token (7-day expiry, HttpOnly, Secure). `_medusa_cart_id` persists your shopping cart across sessions.',
      'We do not use third-party advertising cookies or cross-site tracking pixels. You may clear cookies at any time through your browser settings; doing so will sign you out and clear your cart.',
    ],
  },
  {
    title: '6. Data Retention',
    body: [
      'Account data is retained for as long as your account is active. If you request deletion, we will remove your personal data within 30 days, except where retention is required by law (e.g., transaction records are kept for 10 years under Swiss accounting law).',
      'Anonymised analytics data may be retained indefinitely as it can no longer identify you.',
      'Marketing contact data is retained until you unsubscribe or request erasure.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'Depending on your jurisdiction, you may have the following rights regarding your personal data:',
      '**Right of access** — request a copy of the personal data we hold about you.',
      '**Right to rectification** — correct inaccurate or incomplete data.',
      '**Right to erasure** — request deletion of your data ("right to be forgotten"), subject to legal retention obligations.',
      '**Right to restriction** — ask us to pause processing of your data in certain circumstances.',
      '**Right to data portability** — receive your data in a structured, machine-readable format.',
      '**Right to object** — object to processing based on legitimate interests or direct marketing.',
      'To exercise any of these rights, email our Data Protection Officer at privacy@aevuno.com. We will respond within 30 days. If you are unsatisfied with our response, you may lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or the supervisory authority in your EU member state.',
    ],
  },
  {
    title: '8. Security',
    body: [
      'We implement industry-standard technical and organisational measures to protect your data, including TLS encryption in transit, hashed credential storage, and access controls that restrict data to personnel who need it to perform their role.',
      'No method of transmission over the internet is 100% secure. In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will notify you and the relevant authority within 72 hours of becoming aware.',
    ],
  },
  {
    title: '9. Children\'s Privacy',
    body: [
      'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.',
    ],
  },
  {
    title: '10. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will notify registered customers by email and update the "Last revised" date below. Continued use of our services after the effective date constitutes acceptance of the revised policy.',
    ],
  },
  {
    title: '11. Contact Us',
    body: [
      'For any privacy-related questions, requests, or concerns:',
      '**Data Protection Officer** — privacy@aevuno.com',
      '**Postal address** — Aevuno SA, Attn: Data Protection Officer, 14 Rue de la Corraterie, 1204 Geneva, Switzerland',
      '**Response time** — we aim to acknowledge all requests within 5 business days and resolve them within 30 calendar days.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-surface">

      {/* Header */}
      <header className="py-24 px-8 border-b border-outline-variant">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-4">
            Legal
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-6">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant text-lg">
            Last revised: <time dateTime="2025-01-01">1 January 2025</time>
          </p>
          <p className="text-on-surface-variant mt-3 leading-relaxed">
            At Aevuno, precision extends beyond our timepieces. We handle your
            personal data with the same exacting standards we apply to
            watchmaking — nothing unnecessary, nothing wasted.
          </p>
        </div>
      </header>

      {/* Sections */}
      <div className="py-20 px-8">
        <div className="max-w-3xl mx-auto space-y-16">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold text-on-surface mb-6 pb-3 border-b border-outline-variant">
                {s.title}
              </h2>
              <div className="space-y-4">
                {s.body.map((para, i) => {
                  // Render **bold** markdown-style inline
                  const parts = para.split(/(\*\*[^*]+\*\*)/)
                  return (
                    <p key={i} className="text-on-surface-variant leading-relaxed">
                      {parts.map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={j} className="text-on-surface font-semibold">{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

    </main>
  )
}
