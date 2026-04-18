"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Check if this is a "not implemented" error from our TODO stubs
  const isNotImplemented = error.message?.includes("not implemented");

  if (isNotImplemented) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Card className="p-6 max-w-md">
          <h2 className="text-xl font-semibold text-amber-600">
            Implementation Required
          </h2>
          <p className="mt-2 text-muted-foreground">
            This page requires Supabase client utilities that haven&apos;t been
            implemented yet.
          </p>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message}
            </p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Complete lesson 1.3 to implement the Supabase clients, then come
            back to this page.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-100 items-center justify-center">
      <Card className="p-6 text-center max-w-md">
        <h2 className="text-xl font-semibold text-destructive">
          Something went wrong
        </h2>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t load this page. This might be a temporary issue.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-4 flex gap-2 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/protected">Go to Account</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
