import Stripe from "stripe";

// TODO: Initialize the Stripe client with your secret key
// Use process.env.STRIPE_SECRET_KEY
// Set apiVersion to "2025-02-24.acacia"
// Add appInfo with name: "Foragers Guild"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  typescript: true,
  // TODO: Add configuration options here
  //apiVersion: "2026-02-25.clover",
  appInfo: {
    //name: "Foragers Guild",
    name: "Next-Images",
    version: "1.0.0",
  },
});
