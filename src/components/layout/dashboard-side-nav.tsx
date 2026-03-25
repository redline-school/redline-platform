"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DashLink } from "./dashboard-mobile-nav";

export function DashboardSideNav({ links }: { links: DashLink[] }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
            pathname === l.href && "bg-muted font-medium text-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
