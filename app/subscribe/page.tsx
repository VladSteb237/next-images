import { Button } from "@/components/ui/button";
import Link from "next/link";

const SubscribePage = () => {
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
        <div className="mx-auto max-w-xl flex flex-col">
          <div className="flex gap-4 justify-start w-full items-center">
            <span className="text-4xl">🌿</span>
            <h1 className="text-3xl font-bold tracking-tight">
              Forager's Guild
            </h1>
          </div>
          <p className="text-3xl lg:text-4xl leading-tight! mt-4">
            Your field guide to <span className="font-bold">wild edibles</span>,{" "}
            <span className="font-bold">mushrooms</span>, and{" "}
            <span className="font-bold">survival knowledge</span>
          </p>
          <p className="text-muted-foreground mt-4">
            Join the guild to access our database of edible plants, mushroom
            identification guides, seasonal foraging calendars, and expert
            survival tips. From Scout to Elder, unlock the wisdom of the wild.
          </p>
          <div className="flex gap-2 mt-4">
            <Button asChild className="mt-4 w-fit">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="outline" asChild className="mt-4 w-fit">
              <Link href="/sign-up">Join the Guild</Link>
            </Button>
          </div>
          <div className="h-[1px] w-full bg-border my-12" />
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">🍄 Mushroom Database</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Identify edible vs toxic species with our comprehensive field
                guide.
              </p>
              <Button variant="secondary" asChild size="sm">
                <Link href="/mushroom-database">Get Access</Link>
              </Button>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">🌱 Seasonal Calendar</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Know what to forage and when, based on your region.
              </p>
              <Button variant="secondary" asChild size="sm">
                <Link href="/seasonal-calendar">Get Access</Link>
              </Button>
            </div>
          </div>
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

export default SubscribePage;
