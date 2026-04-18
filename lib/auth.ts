import bcrypt from "bcryptjs";
import { getDb, UserDocument } from "@/lib/db";
import { randomUUID } from "crypto";

export type AppUser = {
  id: string;
  email: string;
  stripeCustomerId?: string | null;
};

export async function findUserByEmail(email: string) {
  const db = await getDb();
  return db
    .collection<UserDocument>("users")
    .findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id: string) {
  const db = await getDb();
  return db.collection<UserDocument>("users").findOne({ _id: id });
}

export async function createUser(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  const db = await getDb();
  const now = new Date();
  const passwordHash = await bcrypt.hash(password, 10);
  const id = randomUUID();
  const result = await db.collection<UserDocument>("users").insertOne({
    _id: id,
    email: normalizedEmail,
    passwordHash,
    stripeCustomerId: null,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: result.insertedId,
    email: normalizedEmail,
    stripeCustomerId: null,
  } satisfies AppUser;
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return {
    id: user._id,
    email: user.email,
    stripeCustomerId: user.stripeCustomerId ?? null,
  } satisfies AppUser;
}
