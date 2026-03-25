import Link from "next/link";
import type { Role } from "@/lib/types";
import { LogoutButton } from "@/components/layout/logout-button";
import { DashboardMobileNav, type DashLink } from "./dashboard-mobile-nav";
import { DashboardSideNav } from "./dashboard-side-nav";
import { Separator } from "@/components/ui/separator";

const STUDENT: DashLink[] = [
  { href: "/student", label: "Overview" },
  { href: "/student/schedule", label: "Schedule" },
  { href: "/student/chat", label: "Chat" },
  { href: "/student/homework", label: "Homework" },
  { href: "/student/tests", label: "Tests" },
  { href: "/student/profile", label: "Profile" },
];

const TEACHER: DashLink[] = [
  { href: "/teacher", label: "Overview" },
  { href: "/teacher/students", label: "My students" },
  { href: "/teacher/schedule", label: "Schedule" },
  { href: "/teacher/chat", label: "Chat" },
  { href: "/teacher/homework/create", label: "Create homework" },
  { href: "/teacher/tests/create", label: "Create test" },
];

const ADMIN: DashLink[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/teachers", label: "Teachers" },
  { href: "/admin/diagnostics", label: "Diagnostics" },
  { href: "/admin/tariffs", label: "Tariffs" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/reviews", label: "Reviews" },
];

const LINKS: Record<Role, DashLink[]> = {
  student: STUDENT,
  teacher: TEACHER,
  admin: ADMIN,
};

const ROLE_LABEL: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

export function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const links = LINKS[role];

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-56 shrink-0 flex-col gap-4 md:flex lg:w-64">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              RedLine
            </p>
            <p className="text-lg font-semibold">{ROLE_LABEL[role]} workspace</p>
          </div>
          <Separator />
          <DashboardSideNav links={links} />
          <div className="mt-auto pt-8">
            <LogoutButton />
          </div>
        </aside>
        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex items-center justify-between gap-3 md:hidden">
            <Link href="/" className="text-sm font-semibold">
              RedLine
            </Link>
            <div className="flex items-center gap-2">
              <LogoutButton variant="outline" />
              <DashboardMobileNav links={links} />
            </div>
          </div>
          <main className="animate-fade-in">{children}</main>
        </div>
      </div>
    </div>
  );
}
