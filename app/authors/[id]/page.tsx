import Image from "next/image";
import { notFound } from "next/navigation";

interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  articles: number;
}

interface Article {
  id: string;
  title: string;
  description: string;
}

const AUTHORS: Author[] = [
  {
    id: "john-doe",
    name: "John Doe",
    bio: "Frontend engineer writing about React, performance and UI architecture.",
    avatar: "https://i.pravatar.cc/300?img=1",
    followers: 3200,
    articles: 24,
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    bio: "Technical writer covering JavaScript and developer productivity.",
    avatar: "https://i.pravatar.cc/300?img=5",
    followers: 2100,
    articles: 18,
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

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Understanding React Server Components",
    description: "How React Server Components improve performance.",
  },
  {
    id: "2",
    title: "Next.js Streaming Explained",
    description: "Learn how streaming improves page load speed.",
  },
  {
    id: "3",
    title: "Optimizing React Applications",
    description: "Techniques to improve rendering performance.",
  },
];

const AuthorProfile = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const author = AUTHORS.find((a) => a.id === id);

  if (!author) {
    notFound();
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

      {/* <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"> */}
      <main className="mx-auto max-w-4xl p-8">
        {/* Author header */}
        <section className="flex flex-col items-center text-center">
          <Image
            src={author.avatar}
            alt={author.name}
            width={120}
            height={120}
            className="rounded-full object-cover"
          />

          <h1 className="mt-4 text-3xl font-bold">{author.name}</h1>

          <p className="mt-2 max-w-xl text-muted-foreground">{author.bio}</p>

          <div className="mt-4 flex gap-6 text-sm text-gray-500">
            <span>{author.articles} articles</span>
            <span>{author.followers.toLocaleString()} followers</span>
          </div>
        </section>

        {/* Articles */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Articles</h2>

          <div className="mt-6 grid gap-4">
            {ARTICLES.map((article) => (
              <article
                key={article.id}
                className="rounded-lg border p-4 transition hover:shadow-sm">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {article.description}
                </p>
              </article>
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

export default AuthorProfile;
