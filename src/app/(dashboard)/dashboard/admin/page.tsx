import Link from "next/link";
import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserProfile } from "@/lib/auth/profile";
import { getDashboardCounts, getRecentApplications } from "@/lib/supabase/dashboard";

export default async function AdminOverviewPage() {
  const profile = await getCurrentUserProfile();
  const displayName = profile?.full_name || profile?.email || "Admin";
  const [counts, recent] = await Promise.all([
    getDashboardCounts(),
    getRecentApplications(5),
  ]);

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Admin"
        title={`Welcome, ${displayName}`}
        description="Operational overview from Supabase data sources."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {counts.applicationsCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {counts.subjectsCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-medium">
            {counts.applicationsReady && counts.subjectsReady
              ? "Connected"
              : "Partial access"}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {recent.items.length === 0 ? (
              <p className="text-muted-foreground">No applications yet.</p>
            ) : (
              recent.items.map((app) => (
                <div key={app.id} className="rounded-lg border p-3">
                  <p className="font-medium">{app.full_name ?? "Unnamed applicant"}</p>
                  <p className="text-muted-foreground">
                    {app.grade ?? "Grade n/a"} •{" "}
                    {app.created_at ? format(new Date(app.created_at), "MMM d, yyyy") : "Date n/a"}
                  </p>
                  {app.goal ? <p className="mt-1 text-muted-foreground">{app.goal}</p> : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/admin/applications" className="underline">
          Applications
        </Link>
        <Link href="/admin/students" className="underline">
          Students
        </Link>
        <Link href="/admin/teachers" className="underline">
          Teachers
        </Link>
      </div>
    </div>
  );
}
