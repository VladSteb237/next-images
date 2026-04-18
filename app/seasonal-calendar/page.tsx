import { Card } from "@/components/ui/card";

const seasons = [
  {
    name: "Spring",
    emoji: "🌸",
    description:
      "A season of emergence. Look for young growth, tender greens, and early mushrooms.",
    items: [
      "Wild garlic (ramps)",
      "Dandelion greens",
      "Morels",
      "Young nettles",
    ],
  },
  {
    name: "Summer",
    emoji: "☀️",
    description:
      "Abundance and diversity. Fruits, berries, and many medicinal plants peak now.",
    items: ["Chanterelles", "Wild berries", "Yarrow", "Plantain"],
  },
  {
    name: "Autumn",
    emoji: "🍂",
    description:
      "A time of grounding and storage. Roots, nuts, and late mushrooms dominate.",
    items: ["Porcini", "Chestnuts", "Burdock root", "Rose hips"],
  },
  {
    name: "Winter",
    emoji: "❄️",
    description:
      "Quiet observation. Focus on tree identification, preservation, and learning.",
    items: [
      "Pine needles",
      "Chaga (where legal)",
      "Tree bark studies",
      "Dried stores",
    ],
  },
];

export default function SeasonalCalendarPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 mt-12">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          <a href="/subscribe">🌱 Seasonal Calendar</a>
        </h1>
        <p className="text-muted-foreground text-lg">
          Know what to forage — and when — by following the rhythm of the year.
        </p>
      </header>

      {/* Intro */}
      <Card className="p-6">
        <p className="text-muted-foreground">
          Foraging isn’t about collecting everything. It’s about noticing what
          the season is offering right now.
        </p>
        <p className="text-muted-foreground mt-2">
          This calendar is a guide, not a checklist. Availability always depends
          on region, weather, and local ecology.
        </p>
      </Card>

      {/* Seasons */}
      <div className="grid gap-6 md:grid-cols-2">
        {seasons.map((season) => (
          <Card key={season.name} className="p-6 space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <span className="text-2xl">{season.emoji}</span>
              {season.name}
            </h2>

            <p className="text-muted-foreground text-sm">
              {season.description}
            </p>

            <ul className="text-sm text-muted-foreground list-disc list-inside">
              {season.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-sm text-muted-foreground text-center pt-8 mb-6">
        Always verify locally. Never forage without certainty.
      </p>
    </div>
  );
}
