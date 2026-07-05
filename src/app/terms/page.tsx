import Link from "next/link";

export const metadata = {
  title: "Terms of Use — NUMI",
  description: "Terms of Use governing the NUMI website, ebook, masterclass, and training services.",
};

const LAST_UPDATED = "5 July 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a
            href="https://numi-intl.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img src="/numi-logo.png" alt="NUMI" className="h-8 w-auto md:h-10" />
          </a>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-[720px] px-4 py-12 md:px-6 md:py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#D8B86A]">
          Legal
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          Terms of Use
        </h1>
        <p className="mb-10 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
          <p>
            Welcome to NUMI. These Terms of Use (&quot;Terms&quot;) govern your access to and use of the
            website located at{" "}
            <a href="https://learn.numi-intl.ai" className="text-[#D8B86A] hover:underline">
              learn.numi-intl.ai
            </a>{" "}
            and any related pages, downloads, masterclasses, training programs, or communications
            (together, the &quot;Services&quot;) operated by NUMI International (M) SDN BHD (&quot;NUMI,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Services, you agree to these Terms.
            If you do not agree, please do not use the Services.
          </p>

          <h2 className="mt-10 text-xl font-bold">1. Nature of NUMI</h2>
          <p>
            NUMI provides educational and self-reflective content grounded in birth-date pattern
            analysis. Our content is designed for personal growth and reflection. It is not, and
            should not be treated as, a substitute for professional medical, psychological, financial,
            legal, or other regulated advice. You are responsible for your own decisions.
          </p>

          <h2 className="mt-10 text-xl font-bold">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to register for our masterclass, training programs, or
            paid services. By using the Services, you represent that you meet this requirement and
            that any information you provide about yourself is accurate and current.
          </p>

          <h2 className="mt-10 text-xl font-bold">3. Registration and Account Information</h2>
          <p>
            When you register for our masterclass, download our guide, or purchase a program, you may
            provide personal information such as your name, email address, phone number, and birth
            date. You agree to provide accurate information and to keep it current. You are
            responsible for maintaining the confidentiality of any account credentials.
          </p>

          <h2 className="mt-10 text-xl font-bold">4. Intellectual Property</h2>
          <p>
            All content available through the Services — including the ebook{" "}
            <em>The Pattern Code</em>, the <em>Decode Your Life Pattern</em> masterclass, the 3-Day
            Full Training, associated frameworks (including the Sigil, the Gold Card branding, and
            related numerology-adjacent methods), text, graphics, images, logos, and software — is
            the property of NUMI or its licensors and is protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce, distribute, sell, sublicense, or create derivative works
            based on our content without our prior written permission. Registered members receive a
            limited, non-exclusive, non-transferable licence to access and use the content for their
            own personal, non-commercial use.
          </p>

          <h2 className="mt-10 text-xl font-bold">5. Purchases, Pricing, and Refunds</h2>
          <p>
            Prices for our programs, including any founding-member offers, are displayed at the point
            of purchase. Payments are processed through third-party payment providers. You agree that
            all sales are considered final unless otherwise stated on the offer page. If a specific
            refund policy applies to a program you purchased, that policy will govern.
          </p>

          <h2 className="mt-10 text-xl font-bold">6. Live Sessions and Recordings</h2>
          <p>
            By attending a live session (including the masterclass and the training), you consent to
            being present in a recorded environment. Recordings may include text chat and any audio
            or video you choose to enable. We may share recordings with registered attendees. We
            will not name or identify individual attendees in public marketing without written
            consent.
          </p>

          <h2 className="mt-10 text-xl font-bold">7. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Use the Services in violation of any law or regulation;</li>
            <li>
              Redistribute, resell, or share access to paid content, live sessions, or recordings;
            </li>
            <li>Impersonate any person or misrepresent your affiliation;</li>
            <li>
              Interfere with, disrupt, or attempt to gain unauthorised access to the Services or
              related systems;
            </li>
            <li>
              Use the Services to harass, abuse, or harm other participants, hosts, or staff.
            </li>
          </ul>

          <h2 className="mt-10 text-xl font-bold">8. Third-Party Services</h2>
          <p>
            We use third-party providers to deliver the Services, including hosting, email delivery,
            payment processing, video conferencing, and analytics. Your use of these services may be
            subject to the third parties&apos; own terms and privacy notices. We are not responsible
            for the acts or omissions of third-party providers.
          </p>

          <h2 className="mt-10 text-xl font-bold">9. Disclaimer of Warranties</h2>
          <p>
            The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the fullest
            extent permitted by law, NUMI disclaims all warranties, express or implied, including
            warranties of merchantability, fitness for a particular purpose, non-infringement, and
            uninterrupted or error-free operation. Content is provided for educational and
            self-reflection purposes only. We do not guarantee any specific personal, financial,
            professional, spiritual, or emotional outcome.
          </p>

          <h2 className="mt-10 text-xl font-bold">10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, NUMI, its directors, officers, employees, and
            affiliates will not be liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits, revenue, goodwill, data, or opportunity,
            arising out of or in connection with your use of the Services. Our aggregate liability
            for any claim arising from or relating to the Services will not exceed the amount you
            paid to NUMI in the six (6) months prior to the event giving rise to the claim.
          </p>

          <h2 className="mt-10 text-xl font-bold">11. Indemnification</h2>
          <p>
            You agree to indemnify and hold NUMI and its affiliates harmless from any claim, loss,
            liability, or expense (including reasonable legal fees) arising out of your breach of
            these Terms, your misuse of the Services, or your violation of any law or third-party
            right.
          </p>

          <h2 className="mt-10 text-xl font-bold">12. Termination</h2>
          <p>
            We may suspend or terminate your access to the Services at any time, with or without
            notice, if we believe you have violated these Terms or engaged in conduct that is
            harmful to NUMI, other participants, or third parties.
          </p>

          <h2 className="mt-10 text-xl font-bold">13. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will update the &quot;Last
            updated&quot; date at the top of this page and, where appropriate, notify you by email. Your
            continued use of the Services after changes take effect constitutes your acceptance of
            the updated Terms.
          </p>

          <h2 className="mt-10 text-xl font-bold">14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Malaysia, without regard to its conflict-of-laws
            rules. Any dispute arising out of or relating to these Terms or the Services will be
            resolved in the competent courts of Malaysia, unless otherwise required by mandatory
            local law.
          </p>

          <h2 className="mt-10 text-xl font-bold">15. Contact</h2>
          <p>
            Questions about these Terms can be sent to{" "}
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
