import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Tottho. Understand how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-white/10 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-400 font-medium">Effective Date: May 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed pb-10">
          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">1</span>
              Introduction
            </h2>
            <p>
              Welcome to Tottho. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you as to how we look after your personal data when you visit our
              website and tell you about your privacy rights.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">2</span>
              Information We Collect
            </h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-white">Identity Data:</strong> includes username, and profile image.</li>
              <li><strong className="text-white">Contact Data:</strong> includes email address.</li>
              <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
              <li><strong className="text-white">Usage Data:</strong> includes information about how you use our website, features, and links.</li>
            </ul>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">3</span>
              How We Use Your Data
            </h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>To register you as a new user.</li>
              <li>To provide and maintain our Service.</li>
              <li>To manage your account and profile page.</li>
              <li>To monitor the usage of our Service and provide analytics.</li>
              <li>To detect, prevent and address technical issues.</li>
            </ul>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">4</span>
              Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">5</span>
              Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
              used or accessed in an unauthorized way, altered or disclosed. However, no method of transmission over the
              Internet, or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">6</span>
              Third-Party Links
            </h2>
            <p>
              Our Service consists of user-generated profile pages that may contain links to third-party websites, plug-ins,
              and applications. Clicking on those links or enabling those connections may allow third parties to collect or
              share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section className="card transition-all hover:border-[#FF5240]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF5240]/10 text-[#FF5240] text-sm">7</span>
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@Tottho.app" className="text-[#FF5240] hover:text-[#ff6b42] font-medium transition-colors hover:underline">support@Tottho.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
