import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function AuthPageSignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
