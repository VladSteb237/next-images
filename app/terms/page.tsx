import React from "react";

const TermsPage = () => {
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
            <a href="#" className="transition-colors hover:text-foreground">
              About
            </a>
          </nav>
          <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <a href="/subscribe">Subscribe</a>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6">
          <p>
            These Terms of Service ("Terms") govern your use of our application.
            By accessing or using our service, you agree to be bound by these
            Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
            <p>
              You agree to use the service only for lawful purposes and in
              accordance with these Terms. You must not misuse the service or
              attempt to access it using unauthorized means.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Subscriptions & Billing
            </h2>
            <p>
              Some features require a paid subscription. Payments are processed
              securely through a third-party provider. Subscriptions may renew
              automatically unless canceled.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Cancellation</h2>
            <p>
              You may cancel your subscription at any time. Access to paid
              features may continue until the end of the billing period, unless
              stated otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and intellectual property related to the
              service remain the property of the application owner.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from the use of our service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access if you
              violate these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              service constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
            <p>
              If you have any questions about these Terms, contact us at
              support@example.com.
            </p>
          </div>
        </section>
      </main>
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
            <a
              href="/contact"
              className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;
