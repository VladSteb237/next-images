// utils/stripe/checkout.ts
import { stripe } from "./config";
import { auth } from "@/auth";
import { createOrRetrieveCustomer } from "@/utils/data/admin";
import { getSubscription } from "@/utils/data/queries";

function getURL(path: string = "") {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
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

    if (!user?.id || !user.email) {
      throw new Error("Could not get user session.");
    }

    const existingSubscription = await getSubscription();

    if (existingSubscription) {
      throw new Error("You already have an active subscription.");
    }

    const customerId = await createOrRetrieveCustomer({
      userId: user.id,
      email: user.email,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      allow_promotion_codes: true,
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: {
        user_id: user.id,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
        },
      },
      success_url: getURL(redirectPath),
      cancel_url: getURL("/protected/pricing"),
    });

    if (!checkoutSession.url) {
      throw new Error("Unable to create checkout session.");
    }

    return { url: checkoutSession.url };
  } catch (err: any) {
    console.error("❌ Stripe checkout error:", err);
    return {
      errorRedirect: `/protected/pricing?error=${encodeURIComponent(
        err.message || "Unknown error occurred",
      )}`,
    };
  }
}
