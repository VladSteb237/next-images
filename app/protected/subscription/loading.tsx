import { Card } from "@/components/ui/card";

export default function SubscriptionLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="h-7 w-56 bg-muted rounded animate-pulse" />
          <div className="h-4 w-80 bg-muted rounded mt-3 animate-pulse" />
        </div>

        {/* Subscription card */}
        <Card className="p-6 space-y-6">
          {/* Plan name */}
          <div className="h-6 w-40 bg-muted rounded animate-pulse" />

          {/* Status badge */}
          <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />

          {/* Price */}
          <div className="flex items-end gap-2">
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>

          {/* Period */}
          <div className="space-y-2">
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            <div className="h-4 w-52 bg-muted rounded animate-pulse" />
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-muted" />

          {/* Actions */}
          <div className="flex gap-3">
            <div className="h-10 w-40 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          </div>
        </Card>
      </div>
    </main>
  );
}
// import { Spinner } from "@/components/ui/spinner";

// export default function PricingLoading() {
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div className="flex flex-col">
//           <h1 className="text-2xl font-medium">Subscriptions</h1>
//           <p className="text-muted-foreground mt-2">
//             Manage your subscription plans
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-center h-full">
//         <div className="flex items-center gap-2">
//           <Spinner className="w-6 h-6" />
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     </>
//   );
// }
