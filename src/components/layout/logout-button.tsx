"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({
  variant = "ghost",
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant={variant} size="sm" onClick={logout} className="gap-2">
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  );
}
