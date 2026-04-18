import Image from "next/image";

const AboutPage = () => {
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
        {/* Hero */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            About Our Platform
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our platform is designed to help developers and creators discover
            high-quality tutorials, articles and videos about modern web
            development.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe learning should be accessible, practical and inspiring.
              Our goal is to build a place where developers can explore new
              technologies, learn from experts and stay up-to-date with the
              rapidly evolving world of software development.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              From frontend frameworks to AI tools, we curate content that helps
              you build real applications and improve your skills.
            </p>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl border">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              alt="Developers working"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-center">
            What You’ll Find Here
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Curated Tutorials</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Carefully selected guides covering modern development tools and
                best practices.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Video Content</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Embedded learning videos from trusted creators to help you learn
                visually.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Expert Authors</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Articles written by experienced developers sharing real-world
                knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold text-center">Our Team</h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Founder",
                avatar: "https://i.pravatar.cc/300?img=1",
              },
              {
                name: "Maria Chen",
                role: "Lead Developer",
                avatar: "https://i.pravatar.cc/150?img=12",
              },
              {
                name: "Daniel Smith",
                role: "Content Editor",
                avatar: "https://i.pravatar.cc/150?img=13",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border p-6 text-center">
                <Image
                  src={member.avatar as string}
                  alt={member.name || "Team member avatar"}
                  width={80}
                  height={80}
                  className="rounded-full"
                />

                <h3 className="mt-4 font-semibold">{member.name}</h3>

                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
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

export default AboutPage;
