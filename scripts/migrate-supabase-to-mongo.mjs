import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import pg from "pg";
import { MongoClient } from "mongodb";

const { Client } = pg;

const projectRoot = path.resolve(process.cwd());
const envPath = path.join(projectRoot, ".env.local");
const dryRun = process.argv.includes("--dry-run");
const dropFirst = process.argv.includes("--drop-first");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const contents = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    env[key] = value;
  }

  return env;
}

const fileEnv = parseEnvFile(envPath);

function getEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key] ?? fileEnv[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function requireEnv(...keys) {
  const value = getEnv(...keys);
  if (!value) {
    throw new Error(`Missing required environment variable. Tried: ${keys.join(", ")}`);
  }
  return value;
}

function deriveSupabaseDbUrl() {
  const explicitUrl = getEnv("SUPABASE_DB_URL", "SUPABASE_POSTGRES_URL");
  if (explicitUrl) {
    return explicitUrl;
  }

  const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const dbPassword = requireEnv("SUPABASE_DB_PASSWORD", "SUPABASE-Database password");
  const projectRefMatch = supabaseUrl.match(/^https:\/\/([^.]+)\.supabase\.co$/);

  if (!projectRefMatch) {
    throw new Error("Could not derive Supabase project ref from NEXT_PUBLIC_SUPABASE_URL.");
  }

  const projectRef = projectRefMatch[1];
  return `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`;
}

function toDate(value) {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function toIsoString(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function fetchRows(client, query) {
  const result = await client.query(query);
  return result.rows;
}

async function main() {
  const supabaseDbUrl = deriveSupabaseDbUrl();
  const mongoUri = requireEnv("MONGODB_URI");
  const mongoDbName = getEnv("MONGODB_DB") ?? "next-images";

  const pgClient = new Client({
    connectionString: supabaseDbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const mongoClient = new MongoClient(mongoUri);

  console.log(`Mode: ${dryRun ? "dry-run" : "write"}`);
  console.log(`Reset collections first: ${dropFirst ? "yes" : "no"}`);

  await pgClient.connect();
  await mongoClient.connect();

  const db = mongoClient.db(mongoDbName);

  try {
    const [users, customers, products, prices, subscriptions] = await Promise.all([
      fetchRows(
        pgClient,
        `
          select
            id,
            email,
            encrypted_password,
            raw_user_meta_data,
            created_at,
            updated_at
          from auth.users
          where email is not null
        `,
      ),
      fetchRows(
        pgClient,
        `
          select id, stripe_customer_id
          from public.customers
        `,
      ),
      fetchRows(
        pgClient,
        `
          select id, active, name, description, image, metadata
          from public.products
        `,
      ),
      fetchRows(
        pgClient,
        `
          select
            id,
            product_id,
            active,
            description,
            unit_amount,
            currency,
            type,
            interval,
            interval_count,
            trial_period_days,
            metadata
          from public.prices
        `,
      ),
      fetchRows(
        pgClient,
        `
          select
            id,
            user_id,
            status,
            metadata,
            price_id,
            quantity,
            cancel_at_period_end,
            created,
            current_period_start,
            current_period_end,
            ended_at,
            cancel_at,
            canceled_at,
            trial_start,
            trial_end
          from public.subscriptions
        `,
      ),
    ]);

    const customerByUserId = new Map(
      customers.map((customer) => [customer.id, customer.stripe_customer_id ?? null]),
    );

    const migratedUsers = users.map((user) => ({
      replaceOne: {
        filter: { _id: user.id },
        replacement: {
          _id: user.id,
          email: user.email.toLowerCase().trim(),
          passwordHash:
            user.encrypted_password ||
            bcrypt.hashSync(randomUUID(), 10),
          stripeCustomerId: customerByUserId.get(user.id) ?? null,
          createdAt: toDate(user.created_at),
          updatedAt: toDate(user.updated_at),
          metadata: user.raw_user_meta_data ?? {},
        },
        upsert: true,
      },
    }));

    const migratedProducts = products.map((product) => ({
      replaceOne: {
        filter: { id: product.id },
        replacement: {
          id: product.id,
          active: Boolean(product.active),
          name: product.name ?? "Unknown",
          description: product.description ?? null,
          image: product.image ?? null,
          metadata: product.metadata ?? {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        upsert: true,
      },
    }));

    const migratedPrices = prices.map((price) => ({
      replaceOne: {
        filter: { id: price.id },
        replacement: {
          id: price.id,
          product_id: price.product_id,
          active: Boolean(price.active),
          description: price.description ?? null,
          unit_amount: price.unit_amount ?? null,
          currency: price.currency,
          type: price.type,
          interval: price.interval ?? null,
          interval_count: price.interval_count ?? null,
          trial_period_days: price.trial_period_days ?? null,
          metadata: price.metadata ?? {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        upsert: true,
      },
    }));

    const migratedSubscriptions = subscriptions.map((subscription) => ({
      replaceOne: {
        filter: { id: subscription.id },
        replacement: {
          id: subscription.id,
          user_id: subscription.user_id,
          status: subscription.status,
          metadata: subscription.metadata ?? {},
          price_id: subscription.price_id ?? null,
          quantity: subscription.quantity ?? 1,
          cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
          created: toIsoString(subscription.created) ?? new Date().toISOString(),
          current_period_start: toIsoString(subscription.current_period_start),
          current_period_end: toIsoString(subscription.current_period_end),
          ended_at: toIsoString(subscription.ended_at),
          cancel_at: toIsoString(subscription.cancel_at),
          canceled_at: toIsoString(subscription.canceled_at),
          trial_start: toIsoString(subscription.trial_start),
          trial_end: toIsoString(subscription.trial_end),
          createdAt: toDate(subscription.created),
          updatedAt: new Date(),
        },
        upsert: true,
      },
    }));

    console.log("Supabase rows fetched:");
    console.log(`- users: ${users.length}`);
    console.log(`- customers: ${customers.length}`);
    console.log(`- products: ${products.length}`);
    console.log(`- prices: ${prices.length}`);
    console.log(`- subscriptions: ${subscriptions.length}`);

    if (dryRun) {
      return;
    }

    if (dropFirst) {
      await Promise.all([
        db.collection("users").deleteMany({}),
        db.collection("products").deleteMany({}),
        db.collection("prices").deleteMany({}),
        db.collection("subscriptions").deleteMany({}),
      ]);
    }

    await Promise.all([
      db.collection("users").createIndex({ email: 1 }, { unique: true }),
      db.collection("products").createIndex({ id: 1 }, { unique: true }),
      db.collection("prices").createIndex({ id: 1 }, { unique: true }),
      db.collection("prices").createIndex({ product_id: 1 }),
      db.collection("subscriptions").createIndex({ id: 1 }, { unique: true }),
      db.collection("subscriptions").createIndex({ user_id: 1 }),
    ]);

    if (migratedUsers.length) {
      await db.collection("users").bulkWrite(migratedUsers, { ordered: false });
    }
    if (migratedProducts.length) {
      await db.collection("products").bulkWrite(migratedProducts, { ordered: false });
    }
    if (migratedPrices.length) {
      await db.collection("prices").bulkWrite(migratedPrices, { ordered: false });
    }
    if (migratedSubscriptions.length) {
      await db
        .collection("subscriptions")
        .bulkWrite(migratedSubscriptions, { ordered: false });
    }

    console.log("Migration completed successfully.");
  } finally {
    await Promise.allSettled([pgClient.end(), mongoClient.close()]);
  }
}

main().catch((error) => {
  console.error("Migration failed.");
  console.error(error);
  process.exitCode = 1;
});
