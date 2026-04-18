"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductWithPrices } from "@/utils/data/queries";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  product: ProductWithPrices;
  isCurrentPlan: boolean;
}

export default function PricingCard({
  product,
  isCurrentPlan,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function getCurrencySymbol(currency: string) {
    switch (currency?.toLowerCase()) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      case "cad":
      case "aud":
        return "$";
      default:
        return currency?.toUpperCase() || "$";
    }
  }

  async function handleSelectPlan(priceId: string) {
    setIsLoading(true);
    try {
      const { url, errorRedirect } = await checkoutWithStripe(priceId);

      if (errorRedirect) {
        router.push(errorRedirect);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get the monthly price (or first available price)

  const price =
    product.prices?.find((p) => p.interval === "month") || product.prices?.[0];

  if (!price) {
    return null;
  }

  const { name, description } = product;
  const symbol = getCurrencySymbol(price.currency);
  const priceString = price.unit_amount
    ? `${symbol}${(price.unit_amount / 100).toFixed(2)}`
    : "Custom";

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{priceString}</span>
          {price.interval && (
            <span className="text-muted-foreground">/{price.interval}</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Button
        className="w-full"
        onClick={() => handleSelectPlan(price.id)}
        disabled={isLoading || isCurrentPlan}
        variant={isCurrentPlan ? "secondary" : "default"}>
        {isLoading
          ? "Loading..."
          : isCurrentPlan
            ? "Current Plan"
            : "Select Plan"}
      </Button>
    </Card>
  );
}
