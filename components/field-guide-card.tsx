"use client";
import { Card } from "@/components/ui/card 2";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/styles";

type ForageItem = {
  name: string;
  type: "plant" | "mushroom" | "berry";
  edibility: "edible" | "caution" | "poisonous-lookalike";
  season: string;
  habitat: string;
  description: string;
  image: string;
  tips: string;
};

export default function FieldGuideCard({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ForageItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDiscover() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/field-guide", {
        method: "POST",
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError("Membership required to access the Field Guide");
        } else {
          setError("Failed to fetch entry");
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setIsLoading(false);
  }

  const edibilityBadge = {
    edible: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    caution:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "poisonous-lookalike":
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return (
    <Card className={cn("overflow-hidden", className)}>
      <h2 className="font-medium">Discover Wild Edibles</h2>
      <p className="text-muted-foreground">
        Explore our database of forageable plants, mushrooms, and berries.
      </p>
      <Button className="mt-4" onClick={handleDiscover} disabled={isLoading}>
        <Spinner variant="primary" isLoading={isLoading} />
        {isLoading ? "Searching..." : "Discover Something New"}
      </Button>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {data && (
        <div className="mt-8 border rounded-lg overflow-hidden">
          {/* 🌄 Картинка */}
          {data.image && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={data.image}
                alt={data.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  edibilityBadge[data.edibility],
                )}>
                {data.edibility === "poisonous-lookalike"
                  ? "Has toxic lookalikes"
                  : data.edibility}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {data.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Season:</span>{" "}
                <span className="text-muted-foreground">{data.season}</span>
              </div>
              <div>
                <span className="font-medium">Habitat:</span>{" "}
                <span className="text-muted-foreground">{data.habitat}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <span className="font-medium text-sm">💡 Foraging Tip:</span>
              <p className="text-sm text-muted-foreground mt-1">{data.tips}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
