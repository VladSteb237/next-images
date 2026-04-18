//////////////////////////////////////////////////////////////////////////////
import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

// TODO: Implement getStripe function
// - Check if stripePromise already exists
// - If not, call loadStripe with NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// - Return the promise

export const getStripe = () => {
  // TODO: Implement this function
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    );
  }
  return stripePromise;
};
