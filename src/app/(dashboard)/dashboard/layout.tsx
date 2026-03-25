import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCurrentProfile } from "@/lib/auth/profile";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/auth?next=/dashboard");

  return <DashboardShell role={profile.role}>{children}</DashboardShell>;
}
