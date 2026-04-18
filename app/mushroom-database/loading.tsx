export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="h-10 w-24 bg-muted animate-pulse rounded" />
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <div className="h-5 w-36 bg-muted animate-pulse rounded" />
        <div className="grid gap-2">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-48" />
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-64" />
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-40" />
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-6 space-y-4">
        <div className="h-5 w-44 bg-muted animate-pulse rounded" />
        <div className="grid gap-2">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-24" />
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
