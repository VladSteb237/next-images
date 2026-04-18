"use client";
import { ImageCard } from "@/components/image-card";
import { useState } from "react";

const TOPICS = [
  {
    id: "react",
    title: "React",
    description: "Modern UI development with components, hooks, and state.",
    tag: "Frontend",
    youtubeId: "Ke90Tje7VS0",
    aspectRatio: "video" as const,
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "Full-stack React framework with routing, SSR, and streaming.",
    tag: "Framework",
    youtubeId: "Sklc_fQBmcs",
    aspectRatio: "video" as const,
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Typed JavaScript for scalable applications.",
    tag: "Language",
    youtubeId: "BCg4U1FzODs",
    aspectRatio: "video" as const,
  },
  {
    id: "node",
    title: "Node.js",
    description: "Build fast backend services using JavaScript.",
    tag: "Backend",
    youtubeId: "TlB_eWDSMt4",
    aspectRatio: "video" as const,
  },
  {
    id: "css",
    title: "Advanced CSS",
    description: "Layouts, animations, and modern responsive design.",
    tag: "Frontend",
    youtubeId: "1Rs2ND1ryYc",
    aspectRatio: "video" as const,
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Introduction to AI concepts and practical ML tools.",
    tag: "AI",
    youtubeId: "aircAruvnKk",
    aspectRatio: "video" as const,
  },
];

const TopicsPage = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // const filteredTopics =
  //   activeFilter === "All"
  //     ? TOPICS
  //     : TOPICS.filter((t) => t.tag === activeFilter);

  // const searchTopics = TOPICS.filter((topic) =>
  //   topic.title.toLowerCase().includes(query.toLowerCase()),
  // );
  const filteredTopics = TOPICS.filter((topic) => {
    const matchesFilter = activeFilter === "All" || topic.tag === activeFilter;

    const matchesSearch =
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.description.toLowerCase().includes(query.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background font-sans">
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
        {/* Header */}
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
          <p className="text-muted-foreground">
            Explore curated topics and learn through articles, videos, and
            guides.
          </p>
        </header>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Frontend", "Backend", "AI", "Design"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1 text-xs
            ${
              activeFilter === filter ? "bg-black text-white" : "hover:bg-muted"
            }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Topics grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <ImageCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              tag={topic.tag}
              youtubeId={topic.youtubeId}
              aspectRatio={topic.aspectRatio}
            />
          ))}
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

export default TopicsPage;
