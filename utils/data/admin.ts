import Stripe from "stripe";
import { getDb, UserDocument } from "@/lib/db";
import { stripe } from "@/utils/stripe/config";

export async function createOrRetrieveCustomer({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const db = await getDb();
  const users = db.collection<UserDocument>("users");
  const mongoUser = await users.findOne({ _id: userId });

  if (!mongoUser) {
    throw new Error("User record not found in MongoDB.");
  }

  if (mongoUser?.stripeCustomerId) {
    return mongoUser.stripeCustomerId;
  }

  const stripeCustomers = await stripe.customers.list({ email });
  const existingStripeCustomer = stripeCustomers.data[0];
  const stripeCustomerId =
    existingStripeCustomer?.id ??
    (
      await stripe.customers.create({
        email,
        metadata: { user_id: userId },
      })
    ).id;

  await users.updateOne(
    { _id: userId },
    {
      $set: {
        stripeCustomerId,
        updatedAt: new Date(),
      },
    },
  );

  return stripeCustomerId;
}

export async function upsertProductRecord(product: Stripe.Product) {
  const db = await getDb();
  await db.collection("products").updateOne(
    { id: product.id },
    {
      $set: {
        id: product.id,
        name: product.name ?? "Unknown",
        active: product.active ?? true,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata ?? {},
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );
}

export async function upsertPriceRecord(price: Stripe.Price) {
  const db = await getDb();
  const productId =
    typeof price.product === "string" ? price.product : price.product.id;

  await db.collection("prices").updateOne(
    { id: price.id },
    {
      $set: {
        id: price.id,
        product_id: productId,
        active: price.active ?? true,
        description: price.nickname ?? null,
        unit_amount: price.unit_amount ?? null,
        currency: price.currency,
        type: price.type ?? "recurring",
        interval: price.recurring?.interval ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        trial_period_days: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata ?? {},
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );
}

export async function deleteProductRecord(product: Stripe.Product) {
  const db = await getDb();
  await db.collection("products").deleteOne({ id: product.id });
}

export async function deletePriceRecord(price: Stripe.Price) {
  const db = await getDb();
  await db.collection("prices").deleteOne({ id: price.id });
}

export async function upsertSubscriptionRecord(subscription: Stripe.Subscription) {
  const db = await getDb();
  const userId = subscription.metadata.user_id;

  if (!userId) {
    throw new Error("Subscription metadata.user_id is missing.");
  }

  await db.collection("subscriptions").updateOne(
    { id: subscription.id },
    {
      $set: {
        id: subscription.id,
        user_id: userId,
        status: subscription.status,
        metadata: subscription.metadata ?? {},
        price_id: subscription.items.data[0]?.price.id ?? null,
        quantity: subscription.items.data[0]?.quantity ?? 1,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_start: subscription.current_period_start
          ? new Date(subscription.current_period_start * 1000).toISOString()
          : null,
        current_period_end: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
        ended_at: subscription.ended_at
          ? new Date(subscription.ended_at * 1000).toISOString()
          : null,
        cancel_at: subscription.cancel_at
          ? new Date(subscription.cancel_at * 1000).toISOString()
          : null,
        canceled_at: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000).toISOString()
          : null,
        trial_start: subscription.trial_start
          ? new Date(subscription.trial_start * 1000).toISOString()
          : null,
        trial_end: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
        created: new Date(subscription.created * 1000).toISOString(),
      },
    },
    { upsert: true },
  );
}

export async function deleteSubscriptionRecord(subscriptionId: string) {
  const db = await getDb();
  await db.collection("subscriptions").deleteOne({ id: subscriptionId });
}
