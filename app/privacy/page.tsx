export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top nav bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-lg font-bold tracking-tight text-foreground">
            <a href="/">Curated</a>
          </span>
          <nav className="hidden gap-6 text-sm font-medium text-muted-foreground sm:flex">
            <a
              href="/stories"
              className="transition-colors hover:text-foreground">
              Stories
            </a>
            <a
              href="/topics"
              className="transition-colors hover:text-foreground">
              Topics
            </a>
            <a
              href="/authors"
              className="transition-colors hover:text-foreground">
              Authors
            </a>
            <a
              href="/about"
              className="transition-colors hover:text-foreground">
              About
            </a>
          </nav>
          <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <a href="/subscribe">Subscribe</a>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6">
          <p>
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our application.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your email address,
              account details, and usage data when you interact with our
              service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to provide and improve our services,
              process payments, communicate with you, and ensure security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Payments and Billing
            </h2>
            <p>
              Payments are securely processed through a third-party provider. We
              do not store your full payment details on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share information with
              trusted services only when necessary to operate our application.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              information from unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal
              data at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at support@example.com.
            </p>
          </div>
        </section>
        <footer className="mt-16 border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
            <span>© 2026 Curated. All rights reserved.</span>
            <div className="flex gap-4">
              <a
                href="/privacy"
                className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a
                href="/terms"
                className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
