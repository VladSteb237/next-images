"use server";
import { stripe } from "./config";
import { auth } from "@/auth";
import { createOrRetrieveCustomer } from "@/utils/data/admin";
import { getSubscription } from "@/utils/data/queries";

// Helper to build URLs for redirects
function getURL(path: string = "") {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  return path ? `${url}${path}` : url;
}

export type CheckoutResponse = {
  url?: string;
  errorRedirect?: string;
};

export async function checkoutWithStripe(
  priceId: string,
  redirectPath: string = "/protected/subscription",
): Promise<CheckoutResponse> {
  try {
    const authSession = await auth();
    const user = authSession?.user;
    const subscription = await getSubscription();

    if (subscription) {
      throw new Error(
        "You already have an active subscription. Please cancel it before upgrading.",
      );
    }

    if (!user?.id || !user.email) {
      throw new Error("Could not get user session.");
    }

    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        userId: user.id,
        email: user.email,
      });
    } catch {
      throw new Error("Unable to access customer record.");
    }
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      allow_promotion_codes: true,
      customer,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      metadata: {
        user_id: user.id,
      },
      subscription_data: {
        metadata: { user_id: user.id },
      },
      success_url: getURL(redirectPath),
      cancel_url: getURL("/protected/pricing"),
    });

    if (checkoutSession.url) {
      return { url: checkoutSession.url };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: `/protected/pricing?error=${encodeURIComponent(error.message)}`,
      };
    }
    return {
      errorRedirect: `/protected/pricing?error=Unknown error occurred`,
    };
  }
}

export async function createStripePortal(
  currentPath: string = "/protected/subscription",
): Promise<string> {
  try {
    const authSession = await auth();
    const user = authSession?.user;

    if (!user?.id || !user.email) {
      throw new Error("Could not get user session.");
    }
    const customer = await createOrRetrieveCustomer({
      userId: user.id,
      email: user.email,
    });
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getURL(currentPath),
    });

    if (!url) {
      throw new Error("Could not create billing portal session.");
    }
    return url;
  } catch (error) {
    console.error(" ⚠️ Error creating Stripe portal:", error);
    throw error;
  }
}
