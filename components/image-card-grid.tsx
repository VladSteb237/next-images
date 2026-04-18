import { ImageCard } from "@/components/image-card";

const CARDS = [
  {
    id: "1",
    title: "Rick Astley : Never Gonna Give You Up",
    description:
      "Trek through dramatic landscapes where glaciers meet ancient forests.",
    tag: "Nature",
    youtubeId: "dQw4w9WgXcQ",
    aspectRatio: "video" as const,
  },
  {
    id: "2",
    title: "A-Ha : Take on Me",
    description:
      "Learn how to capture authentic moments in busy urban environments.",
    tag: "Photography",
    youtubeId: "djV11Xbc914",
    aspectRatio: "video" as const,
  },
  {
    id: "3",
    title: "Dead or Alive : You Spin Me Round",
    description: "Explore interiors where every object earns its place.",
    tag: "Design",
    youtubeId: "PGNiXGX2nLU",
    aspectRatio: "video" as const,
  },
];

export function ImageCardGrid() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="mb-8 flex flex-col gap-1.5">
        <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
          Featured Stories
        </h2>
        <p className="text-pretty text-sm text-muted-foreground sm:text-base">
          A curated selection of articles, photo essays, and deep dives.
        </p>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <ImageCard
            key={card.id}
            title={card.title}
            description={card.description}
            tag={card.tag}
            youtubeId={card.youtubeId}
            aspectRatio={card.aspectRatio}
          />
        ))}
      </div>
    </section>
  );
}
