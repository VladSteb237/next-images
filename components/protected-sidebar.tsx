import InPageSidebar from "@/components/in-page-sidebar";
import { hasActiveSubscription } from "@/utils/data/queries";

export default async function ProtectedSidebar() {
  const hasAccess = await hasActiveSubscription();

  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "My Account",
          href: "/",
        },
        {
          label: "Membership",
          href: "/pricing",
        },
        {
          label: "Subscription",
          href: "/subscription",
        },
        {
          label: "Field Guide",
          href: "/paid-content",
          disabled: !hasAccess, // Will enable once hasActiveSubscription is implemented
        },
      ]}
    />
  );
}
