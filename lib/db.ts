import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export type UserDocument = {
  _id?: string;
  email: string;
  passwordHash: string;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductDocument = {
  _id?: ObjectId;
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PriceDocument = {
  _id?: ObjectId;
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
  createdAt?: Date;
  updatedAt?: Date;
};

export type SubscriptionDocument = {
  _id?: ObjectId;
  id: string;
  user_id: string;
  status: string;
  metadata: Record<string, string>;
  price_id: string | null;
  quantity?: number;
  cancel_at_period_end: boolean;
  created?: string;
  current_period_start: string | null;
  current_period_end: string | null;
  ended_at?: string | null;
  cancel_at?: string | null;
  canceled_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB ?? "next-images");
}

export async function ensureDbIndexes() {
  const db = await getDb();

  await Promise.all([
    db.collection<UserDocument>("users").createIndex({ email: 1 }, { unique: true }),
    db.collection<ProductDocument>("products").createIndex({ id: 1 }, { unique: true }),
    db.collection<PriceDocument>("prices").createIndex({ id: 1 }, { unique: true }),
    db.collection<PriceDocument>("prices").createIndex({ product_id: 1 }),
    db.collection<SubscriptionDocument>("subscriptions").createIndex(
      { id: 1 },
      { unique: true },
    ),
    db.collection<SubscriptionDocument>("subscriptions").createIndex({ user_id: 1 }),
  ]);
}
