"use server";
import { AuthError } from "next-auth";
import { createUser } from "@/lib/auth";
import { ensureDbIndexes } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { encodedRedirect } from "@/utils/redirect";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/protected",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return encodedRedirect("error", "/sign-in", "Invalid email or password.");
    }

    throw error;
  }
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await ensureDbIndexes();
    await createUser(email, password);
  } catch (error) {
    if (error instanceof Error) {
      return encodedRedirect("error", "/sign-up", error.message);
    }

    return encodedRedirect("error", "/sign-up", "Unable to create account.");
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/protected",
  });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/sign-in" });
};
