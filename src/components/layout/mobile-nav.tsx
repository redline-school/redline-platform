"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type NavItem = { href: string; label: string };

export function MobileNav({
  links,
  dashboardHref,
}: {
  links: NavItem[];
  dashboardHref: string | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col gap-2 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          {dashboardHref ? (
            <Link
              href={dashboardHref}
              className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
            >
              Sign in
            </Link>
          )}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
