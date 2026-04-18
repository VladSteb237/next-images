import { getProducts, getSubscription } from "@/utils/data/queries";
import PricingCard from "@/components/pricing-card";
import { PricingErrorBanner } from "@/components/PricingErrorBanner";

export default async function PricingPage() {
  const [products, subscription] = await Promise.all([
    getProducts(),
    getSubscription(),
  ]);
  const currentPriceId = subscription?.price_id;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="space-y-8">
        <PricingErrorBanner /> {/* клиентский компонент для toast */}
        <div>
          <h1 className="text-2xl font-medium">Guild Membership Tiers</h1>
          <p className="text-muted-foreground mt-2">
            Choose the membership level that matches your foraging journey
          </p>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No membership tiers available yet. Check back soon!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              (Make sure products are created in Stripe and synced into MongoDB
              via webhook)
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <PricingCard
                key={product.id}
                product={product}
                isCurrentPlan={product.prices?.some(
                  (p) => p.id === currentPriceId,
                )}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
