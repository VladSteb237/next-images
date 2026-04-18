"use client";
import { useState } from "react";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  articles: number;
  followers: number;
}

const AUTHORS: Author[] = [
  {
    id: "john-doe",
    name: "John Doe",
    bio: "Frontend engineer writing about React, UI architecture and performance.",
    avatar: "https://i.pravatar.cc/150?img=1",
    articles: 24,
    followers: 3200,
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    bio: "Technical writer focused on JavaScript and developer productivity.",
    avatar: "https://i.pravatar.cc/150?img=5",
    articles: 18,
    followers: 2100,
  },
  {
    id: "mike-brown",
    name: "Mike Brown",
    bio: "Full-stack developer sharing guides on scalable web applications.",
    avatar: "https://i.pravatar.cc/150?img=8",
    articles: 31,
    followers: 4100,
  },
  {
    id: "anna-lee",
    name: "Anton Lee",
    bio: "Product designer exploring UX, accessibility and design systems.",
    avatar: "https://i.pravatar.cc/150?img=12",
    articles: 12,
    followers: 1500,
  },
];

export const numberFormat = new Intl.NumberFormat("en-US");

const AuthorsPage = () => {
  const [query, setQuery] = useState("");

  const filteredAuthors = AUTHORS.filter((author) =>
    author.name.toLowerCase().includes(query.toLowerCase()),
  );

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
      {/* <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"> */}
      <main className="mx-auto max-w-4xl p-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Authors</h1>
          <p className="text-muted-foreground">
            Discover writers and creators behind our articles and tutorials.
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Authors grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAuthors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="group flex flex-col rounded-xl border bg-card p-6 transition hover:shadow-lg">
              <div className="flex items-center gap-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold group-hover:underline">
                    {author.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {author.articles} articles
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">{author.bio}</p>

              <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <span>{author.articles} posts</span>
                {/* <span>{author.followers.toLocaleString()} followers</span> */}
                <span>{numberFormat.format(author.followers)} followers</span>
              </div>
            </Link>
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

export default AuthorsPage;
