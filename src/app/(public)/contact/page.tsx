import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Tottho team.',
}

export default function ContactPage() {
  return (
    <div className="py-16 px-4">
      <div className="container-page max-w-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact us</h1>
          <p className="text-gray-500">Have a question, found a bug, or just want to say hi?</p>
        </div>

        <div className="card">
          <form className="flex flex-col gap-4">
            <div className="field">
              <label htmlFor="name" className="label">Name</label>
              <input id="name" name="name" className="input" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" className="input" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="message" className="label">Message</label>
              <textarea id="message" name="message" rows={5} className="input resize-none" placeholder="How can we help?" />
            </div>
            <div className="p-3 rounded-xl bg-[#FF5240]/10 border border-[#FF5240]/15 text-sm text-[#e8432f]">
              Contact form will be wired to email soon. For urgent issues, open a GitHub issue.
            </div>
            <button type="button" disabled className="btn btn-primary">
              Send message (coming soon)
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
