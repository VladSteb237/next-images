import { Card } from "@/components/ui/card";

const mushroomGroups = [
  {
    title: "Edible Species",
    emoji: "✅",
    description:
      "Well-known edible mushrooms with clear identification features.",
    examples: [
      "Chanterelle (Cantharellus cibarius)",
      "Porcini (Boletus edulis)",
      "Morel (Morchella spp.)",
    ],
  },
  {
    title: "Toxic Lookalikes",
    emoji: "⚠️",
    description:
      "Mushrooms that resemble edible species but can cause illness or worse.",
    examples: [
      "False Chanterelle (Hygrophoropsis aurantiaca)",
      "Galerina marginata",
      "False Morel (Gyromitra spp.)",
    ],
  },
  {
    title: "Deadly Species",
    emoji: "☠️",
    description:
      "Highly toxic mushrooms that should never be consumed under any circumstances.",
    examples: [
      "Death Cap (Amanita phalloides)",
      "Destroying Angel (Amanita virosa)",
      "Deadly Webcap (Cortinarius rubellus)",
    ],
  },
];

export default function MushroomDatabasePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 mt-12">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          <a href="/subscribe">🍄 Mushroom Database</a>
        </h1>
        <p className="text-muted-foreground text-lg">
          Identify edible and toxic species with a careful, field-first
          approach.
        </p>
      </header>

      {/* Intro */}
      <Card className="p-6 space-y-3">
        <p className="text-muted-foreground">Mushrooms demand respect.</p>
        <p className="text-muted-foreground">
          This database focuses on visual traits, habitat context, and common
          confusion points — not shortcuts.
        </p>
        <p className="text-muted-foreground">
          Never rely on a single characteristic. Identification requires
          multiple confirmations.
        </p>
      </Card>

      {/* Groups */}
      <div className="space-y-6">
        {mushroomGroups.map((group) => (
          <Card key={group.title} className="p-6 space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <span className="text-2xl">{group.emoji}</span>
              {group.title}
            </h2>

            <p className="text-muted-foreground text-sm">{group.description}</p>

            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {group.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Safety Notice */}
      <Card className="p-6 border border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ Safety notice: This guide is educational only. If there is doubt,
          do not consume.
        </p>
      </Card>

      {/* Footer */}
      <p className="text-sm text-muted-foreground text-center pt-8 mb-8">
        When in doubt — leave it in the forest.
      </p>
    </div>
  );
}
