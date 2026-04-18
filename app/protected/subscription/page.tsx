import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { getSubscription } from "@/utils/data/queries";
import SubscriptionActions from "@/components/subscription-actions";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const subscription = await getSubscription();

  const formatDate = (date?: string | null) => {
    if (!date) return "Not available";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatPrice = (amount: number | null, currency: string) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "usd",
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">My Membership</h1>
            <p className="text-muted-foreground mt-2">
              Manage your guild membership
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!subscription ? (
            <Card className="p-6">
              <h2 className="font-medium">No Active Membership</h2>
              <p className="text-muted-foreground mt-2">
                You haven't joined a membership tier yet. Visit the Membership
                page to choose a tier and unlock guild benefits.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/protected/pricing">View Membership Tiers</Link>
              </Button>
            </Card>
          ) : (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-lg">
                  {subscription.prices?.products?.name || "Subscription"}
                </h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    subscription.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : subscription.status === "trialing"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}>
                  {subscription.status}
                </span>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Price:</strong>{" "}
                  {formatPrice(
                    subscription.prices?.unit_amount,
                    subscription.prices?.currency,
                  )}
                  /{subscription.prices?.interval}
                </p>
                <p>
                  <strong>Current period:</strong>{" "}
                  {subscription.current_period_start &&
                  subscription.current_period_end
                    ? `${formatDate(subscription.current_period_start)} – ${formatDate(subscription.current_period_end)}`
                    : "—"}
                </p>
                {subscription.cancel_at_period_end && (
                  <p className="text-yellow-600 dark:text-yellow-400">
                    Your subscription will cancel at the end of the current
                    billing period.
                  </p>
                )}
              </div>

              <p className="text-muted-foreground">
                Subscription data is now sourced from MongoDB and kept in sync
                through Stripe webhooks.
              </p>
              <SubscriptionActions subscription={subscription} />
            </Card>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Signed in as: {user?.email}
        </p>
      </div>
    </main>
  );
}
