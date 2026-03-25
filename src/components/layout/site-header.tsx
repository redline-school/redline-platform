"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileNav, type NavItem } from "@/components/layout/mobile-nav";
import type { Role } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

const LINKS: NavItem[] = [
  { href: "/subjects", label: "Subjects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/teachers", label: "Teachers" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/diagnostic", label: "Diagnostic" },
];

export function SiteHeader() {
  const [dashboardHref, setDashboardHref] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const supabase = createClient();

    async function load() {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!alive) return;
      if (!user) {
        setDashboardHref(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = (profile?.role as Role | undefined) ??
        (user.user_metadata?.role as Role | undefined);

      if (role === "student") setDashboardHref("/student");
      else if (role === "teacher") setDashboardHref("/teacher");
      else if (role === "admin") setDashboardHref("/admin");
      else setDashboardHref(null);
    }

    void load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
            RL
          </span>
          <span>RedLine School</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {dashboardHref ? (
            <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
              <Link href={dashboardHref}>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
          <MobileNav links={LINKS} dashboardHref={dashboardHref} />
        </div>
      </div>
    </header>
  );
}
