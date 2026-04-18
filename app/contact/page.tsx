"use client";

import { useState } from "react";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // 👉 тут потом можно отправить на API route / email сервис
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    setSent(true);
  }

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
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="mb-8 text-gray-600">
          Have a question, feedback, or need support? Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>

        {sent ? (
          <div className="p-4 rounded-lg bg-green-100 text-green-700">
            ✅ Your message has been sent successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                name="name"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition dark:bg-amber-500 dark:text-black cursor-pointer">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        <div className="mt-10 text-sm text-gray-500">
          Or email us directly at{" "}
          <span className="underline">support@example.com</span>
        </div>
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
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
