"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type DashLink = { href: string; label: string };

export function DashboardMobileNav({ links }: { links: DashLink[] }) {
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Navigate</DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col gap-1 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm hover:bg-muted",
                pathname === l.href && "bg-muted font-medium text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
