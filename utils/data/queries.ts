import { cache } from "react";
import { auth } from "@/auth";
import { getDb, PriceDocument, ProductDocument, SubscriptionDocument } from "@/lib/db";

export type Price = {
  id: string;
  product_id: string;
  active: boolean;
  description: string | null;
  unit_amount: number | null;
  currency: string;
  type: "one_time" | "recurring";
  interval: "day" | "week" | "month" | "year" | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, string>;
};

export type ProductWithPrices = {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, string>;
  prices: Price[];
};

export type SubscriptionWithPrice = {
  id: string;
  user_id: string;
  status: string;
  metadata: Record<string, string>;
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
  prices: Price & {
    products: ProductWithPrices;
  };
};

function sortProducts(products: ProductDocument[]) {
  return [...products].sort((a, b) => {
    const aIndex = Number(a.metadata?.index ?? 0);
    const bIndex = Number(b.metadata?.index ?? 0);
    return aIndex - bIndex;
  });
}

function sortPrices(prices: PriceDocument[]) {
  return [...prices].sort((a, b) => {
    const aAmount = a.unit_amount ?? Number.MAX_SAFE_INTEGER;
    const bAmount = b.unit_amount ?? Number.MAX_SAFE_INTEGER;
    return aAmount - bAmount;
  });
}

export const getProducts = cache(async (): Promise<ProductWithPrices[]> => {
  const db = await getDb();
  const products = await db
    .collection<ProductDocument>("products")
    .find({ active: true })
    .toArray();

  const productIds = products.map((product) => product.id);
  const prices = productIds.length
    ? await db
        .collection<PriceDocument>("prices")
        .find({ active: true, product_id: { $in: productIds } })
        .toArray()
    : [];

  const pricesByProductId = new Map<string, Price[]>();

  for (const price of sortPrices(prices)) {
    const existing = pricesByProductId.get(price.product_id) ?? [];
    existing.push({
      id: price.id,
      product_id: price.product_id,
      active: price.active,
      description: price.description,
      unit_amount: price.unit_amount,
      currency: price.currency,
      type: price.type,
      interval: price.interval,
      interval_count: price.interval_count,
      trial_period_days: price.trial_period_days,
      metadata: price.metadata ?? {},
    });
    pricesByProductId.set(price.product_id, existing);
  }

  return sortProducts(products).map((product) => ({
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description,
    image: product.image,
    metadata: product.metadata ?? {},
    prices: pricesByProductId.get(product.id) ?? [],
  }));
});

export const getSubscription = cache(
  async (): Promise<SubscriptionWithPrice | null> => {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    const db = await getDb();
    const subscription = await db
      .collection<SubscriptionDocument>("subscriptions")
      .findOne({
        user_id: session.user.id,
        status: { $in: ["trialing", "active"] },
      });

    if (!subscription?.price_id) {
      return null;
    }

    const price = await db
      .collection<PriceDocument>("prices")
      .findOne({ id: subscription.price_id });

    if (!price) {
      return null;
    }

    const product = await db
      .collection<ProductDocument>("products")
      .findOne({ id: price.product_id });

    if (!product) {
      return null;
    }

    return {
      id: subscription.id,
      user_id: subscription.user_id,
      status: subscription.status,
      metadata: subscription.metadata ?? {},
      price_id: subscription.price_id,
      quantity: subscription.quantity ?? 1,
      cancel_at_period_end: subscription.cancel_at_period_end ?? false,
      created: subscription.created ?? "",
      current_period_start: subscription.current_period_start ?? "",
      current_period_end: subscription.current_period_end ?? "",
      ended_at: subscription.ended_at ?? null,
      cancel_at: subscription.cancel_at ?? null,
      canceled_at: subscription.canceled_at ?? null,
      trial_start: subscription.trial_start ?? null,
      trial_end: subscription.trial_end ?? null,
      prices: {
        id: price.id,
        product_id: price.product_id,
        active: price.active,
        description: price.description,
        unit_amount: price.unit_amount,
        currency: price.currency,
        type: price.type,
        interval: price.interval,
        interval_count: price.interval_count,
        trial_period_days: price.trial_period_days,
        metadata: price.metadata ?? {},
        products: {
          id: product.id,
          active: product.active,
          name: product.name,
          description: product.description,
          image: product.image,
          metadata: product.metadata ?? {},
          prices: [],
        },
      },
    };
  },
);

export const hasActiveSubscription = cache(async (): Promise<boolean> => {
  const subscription = await getSubscription();
  return !!subscription;
});
