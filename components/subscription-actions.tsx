"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createStripePortal } from "@/utils/stripe/server";
import { SubscriptionWithPrice } from "@/utils/data/queries";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionActions({
  subscription,
}: {
  subscription: SubscriptionWithPrice;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleManageSubscription() {
    setIsLoading(true);
    try {
      const portalUrl = await createStripePortal();
      router.push(portalUrl);
    } catch (error) {
      console.error("Error opening portal:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleManageSubscription}
        disabled={isLoading}
        variant="outline"
        className="flex-1">
        <Spinner variant="primary" isLoading={isLoading} />
        {isLoading ? "Loading..." : "Manage Subscription"}
      </Button>
    </div>
  );
}
