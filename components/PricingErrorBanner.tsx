"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function PricingErrorBanner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [error]);
  return null;
}
