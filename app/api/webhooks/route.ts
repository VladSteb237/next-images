import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";
import {
  deletePriceRecord,
  deleteProductRecord,
  deleteSubscriptionRecord,
  upsertPriceRecord,
  upsertProductRecord,
  upsertSubscriptionRecord,
} from "@/utils/data/admin";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("⚠️ Invalid signature", err);
    return new Response("Invalid signature", { status: 400 });
  }

  console.log("Stripe event received:", event.type);

  try {
    switch (event.type) {
      case "product.created":
      case "product.updated":
        await upsertProductRecord(event.data.object as Stripe.Product);
        break;

      case "product.deleted":
        await deleteProductRecord(event.data.object as Stripe.Product);
        break;

      case "price.created":
      case "price.updated": {
        const price = event.data.object as Stripe.Price;

        if (typeof price.product === "string") {
          const product = await stripe.products.retrieve(price.product);
          if (!product.deleted) {
            await upsertProductRecord(product);
          }
        } else if (!price.product.deleted) {
          await upsertProductRecord(price.product);
        }

        await upsertPriceRecord(price);
        break;
      }

      case "price.deleted":
        await deletePriceRecord(event.data.object as Stripe.Price);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const incoming = event.data.object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(incoming.id);

        if (
          !subscription.current_period_start ||
          !subscription.current_period_end
        ) {
          console.log("Still no period — skipping");
          break;
        }

        const userId = subscription.metadata.user_id;
        if (!userId) break;

        await upsertSubscriptionRecord(subscription);

        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        if (subscription.status === "canceled") {
          await deleteSubscriptionRecord(subscription.id);
          console.log("Subscription deleted after cancel:", subscription.id);
        }

        break;
      }

      case "checkout.session.completed":
        console.log(
          "Checkout session completed:",
          (event.data.object as Stripe.Checkout.Session).id,
        );
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    return new Response("Webhook handler error", { status: 500 });
  }
}
