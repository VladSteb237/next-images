"use client";
import { useState } from "react";
import { ImageCard } from "@/components/image-card";

const STORIES = [
  {
    id: "1",
    title: "Inside the Future of AI",
    description:
      "A deep dive into how generative models are transforming industries and creative workflows.",
    tag: "AI",
    youtubeId: "aircAruvnKk",
  },
  {
    id: "2",
    title: "The Rise of Indie Hackers",
    description:
      "Meet the founders building profitable internet businesses without venture capital.",
    tag: "Startup",
    youtubeId: "f02mOEt11OQ",
  },
  {
    id: "3",
    title: "Design Systems at Scale",
    description:
      "How modern companies maintain consistency across hundreds of products.",
    tag: "Design",
    youtubeId: "TmVuRMf5Ojg",
  },
  {
    id: "4",
    title: "Serverless Architecture Explained",
    description:
      "Understanding how serverless platforms simplify deployment and scaling.",
    tag: "Backend",
    youtubeId: "RzsaM6kL1FU",
  },
  {
    id: "5",
    title: "Frontend in 2026",
    description:
      "Exploring the future of React frameworks and modern UI tooling.",
    tag: "Frontend",
    youtubeId: "Sklc_fQBmcs",
  },
  {
    id: "6",
    title: "The Psychology of Great Products",
    description: "What makes some products addictive and others forgettable.",
    tag: "Product",
    youtubeId: "nFoNn4Pr6Mc",
  },
];

const TAGS = [
  "All",
  "AI",
  "Startup",
  "Design",
  "Frontend",
  "Backend",
  "Product",
];

// import Image from "next/image";

// const images = [
//   { src: "https://picsum.photos/800/600?random=1", alt: "Mountain landscape" },
//   { src: "https://picsum.photos/800/600?random=2", alt: "Ocean sunset" },
//   { src: "https://picsum.photos/800/600?random=3", alt: "Forest path" },
//   { src: "https://picsum.photos/800/600?random=4", alt: "City skyline" },
// ];

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filteredStories = STORIES.filter((story) => {
    const matchesQuery =
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.description.toLowerCase().includes(query.toLowerCase());

    const matchesTag = activeTag === "All" || story.tag === activeTag;

    return matchesQuery && matchesTag;
  });
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
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stories</h1>
            <p className="text-sm text-muted-foreground">
              Inspiring stories, insights, and interviews from creators and
              builders.
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search stories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:max-w-xs"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs transition
              ${activeTag === tag ? "bg-black text-white" : "hover:bg-muted"}`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Stories grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <ImageCard
              key={story.id}
              title={story.title}
              description={story.description}
              tag={story.tag}
              youtubeId={story.youtubeId}
              aspectRatio="video"
            />
          ))}
        </section>

        {/* Empty state */}
        {filteredStories.length === 0 && (
          <div className="mt-16 text-center text-sm text-muted-foreground">
            No stories found.
          </div>
        )}
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
}
