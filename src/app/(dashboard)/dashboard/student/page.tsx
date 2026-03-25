import Link from "next/link";
import { BookMarked, CalendarClock, UserRound } from "lucide-react";
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

export default async function StudentOverviewPage() {
  const profile = await getCurrentUserProfile();
  const displayName = profile?.full_name || profile?.email || "Student";

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Student"
        title={`Welcome, ${displayName}`}
        description="Your learning workspace is active. As scheduling and homework tables fill up, this page will reflect them."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Assigned teacher</CardDescription>
              <CardTitle className="text-lg">
                Not assigned yet
              </CardTitle>
            </div>
            <UserRound className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>We will connect your teacher profile after your first approved application.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Upcoming lessons</CardDescription>
              <CardTitle className="text-lg">0 scheduled</CardTitle>
            </div>
            <CalendarClock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>No upcoming lessons yet.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/student/schedule">Open schedule</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Homework</CardDescription>
              <CardTitle className="text-lg">0 pending</CardTitle>
            </div>
            <BookMarked className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Your assignments will appear here once your teacher publishes tasks.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/student/homework">Review tasks</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
