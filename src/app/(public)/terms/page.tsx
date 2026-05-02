import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Tottho. Read our rules and guidelines for using the platform.',
}

export default function TermsPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-white/10 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-400 font-medium">Effective Date: May 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed pb-10">
          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using Tottho (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
              If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">2</span>
              Description of Service
            </h2>
            <p>
              Tottho provides users with a platform to create a customizable profile page (&quot;bio link&quot;) to share
              multiple links across social media and the web. The Service is provided &quot;as is&quot; and &quot;as available&quot;.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">3</span>
              User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for safeguarding the password that you use to access the Service.</li>
              <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
              <li>You may not use as a username the name of another person or entity or that is not lawfully available for use.</li>
            </ul>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">4</span>
              Acceptable Use Policy
            </h2>
            <p className="mb-4">You agree not to use the Service to post or share content that:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Is illegal, threatening, defamatory, abusive, harassing, or hateful.</li>
              <li>Infringes on any trademark, copyright, or other intellectual property rights.</li>
              <li>Contains malicious code, viruses, or any other software intended to damage or disrupt.</li>
              <li>Promotes illegal activities, fraud, or phishing scams.</li>
              <li>Is explicitly adult in nature or constitutes unsolicited spam.</li>
            </ul>
            <p className="mt-6 text-white font-medium">
              We reserve the right to immediately terminate or suspend your account without prior notice if you violate these rules.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">5</span>
              Intellectual Property
            </h2>
            <p>
              The Service and its original content (excluding user-provided links and text), features, and functionality
              are and will remain the exclusive property of Tottho and its licensors. You retain all of your ownership
              rights in the content you submit to your profile.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">6</span>
              Limitation of Liability
            </h2>
            <p>
              In no event shall Tottho, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or
              inability to access or use the Service.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">7</span>
              Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide
              notice of any material changes by posting the new Terms on this site.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">8</span>
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@Tottho.app" className="text-[#FF5240] hover:text-[#ff6b42] font-medium transition-colors hover:underline">support@Tottho.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
