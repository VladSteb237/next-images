import { Card } from "@/components/ui/card";

export default function PricingLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div>
          <div className="h-7 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-72 bg-muted rounded mt-3 animate-pulse" />
        </div>

        {/* Pricing cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 space-y-6">
              {/* Plan name */}
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />

              {/* Price */}
              <div className="flex items-end gap-2">
                <div className="h-10 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-12 bg-muted rounded animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>

              {/* Features */}
              <div className="space-y-2">
                {[1, 2, 3].map((f) => (
                  <div
                    key={f}
                    className="h-4 w-3/4 bg-muted rounded animate-pulse"
                  />
                ))}
              </div>

              {/* Button */}
              <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
// import { Spinner } from "@/components/ui/spinner";

// export default function PricingLoading() {
//   return (
//     <>
//       <div>
//         <h1 className="text-2xl font-medium">Cat Photo Generator</h1>
//         <p className="text-muted-foreground mt-2">Generate cat photos</p>
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
