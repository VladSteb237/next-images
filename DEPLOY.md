# Vercel Deploy

## Vercel Environment Variables

Set these in Vercel for `Production`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/next-images?retryWrites=true&w=majority
MONGODB_DB=next-images

NEXTAUTH_SECRET=generate-a-long-random-secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

STRIPE_SECRET_KEY=sk_live_or_sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

If you use a custom domain, replace `your-domain.vercel.app` with that domain after it is connected.

## Atlas Checklist

- Create a database user with read/write access.
- Allow Vercel to connect in Atlas Network Access.
- Use the Atlas connection string in `MONGODB_URI`.

## Stripe Checklist

Create a webhook endpoint in Stripe:

```text
https://your-domain.vercel.app/api/webhooks
```

Subscribe at minimum to these events:

- `product.created`
- `product.updated`
- `product.deleted`
- `price.created`
- `price.updated`
- `price.deleted`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `checkout.session.completed`

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Vercel Deploy Steps

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above.
4. Deploy.
5. Open the deployed site and create a test user.
6. In Stripe, update one product and one price to force a webhook sync.
7. Verify that `products`, `prices`, and `subscriptions` appear in Atlas.

## After First Deploy

- Replace placeholder values like `NEXTAUTH_SECRET`.
- If the site URL changes, update:
  - `NEXTAUTH_URL`
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_BASE_URL`
  - Stripe webhook endpoint URL
