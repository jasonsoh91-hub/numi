import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — NUMI",
  description: "How NUMI collects, uses, stores, and protects your personal information.",
};

const LAST_UPDATED = "5 July 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="flex items-center">
            <img src="/numi-logo.png" alt="NUMI" className="h-8 w-auto md:h-10" />
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-[720px] px-4 py-12 md:px-6 md:py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#D8B86A]">Legal</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Privacy Policy</h1>
        <p className="mb-10 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
          <p>
            NUMI International (M) SDN BHD (&quot;NUMI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
            privacy. This Privacy Policy explains what personal information we collect, how we use
            and share it, how we protect it, and the choices you have about your information.
          </p>
          <p>
            This Policy applies to the website{" "}
            <a href="https://learn.numi-intl.ai" className="text-[#D8B86A] hover:underline">
              learn.numi-intl.ai
            </a>{" "}
            and all related services, including our ebook, masterclass, training programs, and
            email communications.
          </p>

          <h2 className="mt-10 text-xl font-bold">1. Information We Collect</h2>
          <p>We collect the following categories of personal information:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Contact and identity information</strong> — such as your first name, last
              name, and email address, which you provide when you download our guide, register for
              the masterclass, or contact us.
            </li>
            <li>
              <strong>Birth date</strong> — provided voluntarily when you request a pattern-code
              reading. We use your birth date to generate personalised content and educational
              material. It is not used to make financial, medical, legal, or professional decisions
              on your behalf.
            </li>
            <li>
              <strong>Optional contact details</strong> — such as your phone number if you choose
              to provide it during registration for scheduling and reminders.
            </li>
            <li>
              <strong>Purchase information</strong> — such as billing details, transaction
              identifiers, and purchase history when you buy a program. Payment card data is
              handled by our third-party payment processors and not stored by us.
            </li>
            <li>
              <strong>Usage and device information</strong> — such as IP address, browser type,
              operating system, referring URL, and pages visited. This is collected automatically
              via cookies and similar technologies.
            </li>
          </ul>

          <h2 className="mt-10 text-xl font-bold">2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>To deliver the ebook, masterclass access links, calendar invites, and reminders;</li>
            <li>To personalise educational content based on your birth date;</li>
            <li>
              To send you marketing emails, event invitations, and follow-up sequences related to
              our programs (you can unsubscribe at any time);
            </li>
            <li>To process purchases and provide customer support;</li>
            <li>
              To measure engagement, improve the Services, and inform future content and product
              decisions;
            </li>
            <li>
              To comply with legal obligations and protect against fraud, abuse, or misuse of the
              Services.
            </li>
          </ul>

          <h2 className="mt-10 text-xl font-bold">3. Legal Bases</h2>
          <p>
            Depending on your location, we rely on one or more of the following legal bases to
            process your information: your consent (which you can withdraw at any time), the
            performance of a contract with you, our legitimate interests (such as improving the
            Services and operating our business), and compliance with legal obligations.
          </p>

          <h2 className="mt-10 text-xl font-bold">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We share your information only with the
            following categories of recipients and only to the extent needed:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Service providers</strong> — including email marketing (ActiveCampaign),
              hosting (Vercel), video conferencing platforms, analytics, and payment processors, all
              of which are contractually required to protect your information.
            </li>
            <li>
              <strong>Legal and safety</strong> — where required by law, court order, or to protect
              the rights, property, or safety of NUMI, our users, or the public.
            </li>
            <li>
              <strong>Business transfers</strong> — in connection with a merger, acquisition, or
              sale of assets, subject to the same privacy protections.
            </li>
          </ul>

          <h2 className="mt-10 text-xl font-bold">5. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to keep the Services running, remember your
            preferences, measure usage, and support marketing. You can control cookies through your
            browser settings. Disabling cookies may affect functionality.
          </p>

          <h2 className="mt-10 text-xl font-bold">6. Email Marketing</h2>
          <p>
            When you download our guide or register for our masterclass, we add you to our email
            list to send educational content, event invitations, and program offers. Every marketing
            email contains an unsubscribe link. You can also request removal at any time by
            contacting{" "}
            <a href="mailto:support@numi-intl.ai" className="text-[#D8B86A] hover:underline">
              support@numi-intl.ai
            </a>
            .
          </p>

          <h2 className="mt-10 text-xl font-bold">7. Data Retention</h2>
          <p>
            We keep your information for as long as your account is active, as needed to deliver the
            Services, or as required to comply with legal obligations, resolve disputes, and enforce
            our agreements. When your information is no longer needed, we delete it or anonymise it
            in a way that no longer identifies you.
          </p>

          <h2 className="mt-10 text-xl font-bold">8. Security</h2>
          <p>
            We use administrative, technical, and physical safeguards designed to protect your
            personal information against loss, unauthorised access, and misuse. No online service is
            completely secure, however, and we cannot guarantee absolute security. You are
            responsible for keeping any account credentials confidential.
          </p>

          <h2 className="mt-10 text-xl font-bold">9. International Transfers</h2>
          <p>
            NUMI is based in Malaysia. When we work with service providers located in other
            countries, your information may be transferred to and processed in those countries. We
            take steps to ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2 className="mt-10 text-xl font-bold">10. Your Rights</h2>
          <p>Depending on where you live, you may have the right to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Request access to the personal information we hold about you;</li>
            <li>Request correction or deletion of your information;</li>
            <li>Object to or restrict certain processing;</li>
            <li>Withdraw consent where processing is based on consent;</li>
            <li>Request portability of your information; and</li>
            <li>Lodge a complaint with your local data-protection authority.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:support@numi-intl.ai" className="text-[#D8B86A] hover:underline">
              support@numi-intl.ai
            </a>
            . We may need to verify your identity before we can respond.
          </p>

          <h2 className="mt-10 text-xl font-bold">11. Children&apos;s Privacy</h2>
          <p>
            The Services are intended for adults. We do not knowingly collect personal information
            from anyone under 18. If you believe we may have collected information from a minor,
            please contact us and we will delete it.
          </p>

          <h2 className="mt-10 text-xl font-bold">12. Changes to This Policy</h2>
          <p>
            We may update this Policy from time to time. When we do, we will update the &quot;Last
            updated&quot; date at the top of this page and, where appropriate, notify you by email.
            Continued use of the Services after changes take effect constitutes your acceptance of
            the updated Policy.
          </p>

          <h2 className="mt-10 text-xl font-bold">13. Contact</h2>
          <p>
            Questions or requests related to this Policy can be sent to{" "}
            <a href="mailto:support@numi-intl.ai" className="text-[#D8B86A] hover:underline">
              support@numi-intl.ai
            </a>
            .
          </p>

          <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
            © 2026 NUMI International (M) SDN BHD. All Rights Reserved.
          </p>
        </div>
      </article>
    </main>
  );
}
