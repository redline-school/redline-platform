import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUserProfile } from "@/lib/auth/profile";

export default async function TeacherOverviewPage() {
  const profile = await getCurrentUserProfile();
  const displayName = profile?.full_name || profile?.email || "Teacher";

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Teacher"
        title={`Welcome, ${displayName}`}
        description="Your workspace is ready. Student rosters and calendar data will show automatically once records are connected."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Active students</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No students assigned yet.
            <Button asChild variant="outline" size="sm">
              <Link href="/teacher/students">Open roster</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Lessons this week</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Schedule data is empty for now.
            <Button asChild variant="outline" size="sm">
              <Link href="/teacher/schedule">View schedule</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Action center</CardDescription>
            <CardTitle className="text-3xl">Ready</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Create homework and tests when your roster is live.
            <Button asChild variant="outline" size="sm">
              <Link href="/teacher/homework/create">Assign more</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Open your teacher workflows</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/teacher/homework/create">Create homework</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/teacher/tests/create">Create test</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
