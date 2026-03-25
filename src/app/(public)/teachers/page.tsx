import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTeachers, mockUsers, subjectBySlug } from "@/lib/mock-data";

export default function TeachersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Faculty"
        title="Teachers who teach, not just assign"
        description="Meet our team and continue to registration for a matched learning plan."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {mockTeachers.map((t) => {
          const user = mockUsers.find((u) => u.id === t.user_id);
          return (
            <Card key={t.id}>
              <CardHeader>
                <CardTitle>{user?.full_name ?? "Teacher"}</CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  {t.subjects.map((slug) => (
                    <Badge key={slug} variant="secondary">
                      {subjectBySlug(slug)?.name ?? slug}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{t.bio}</p>
                <p className="font-medium text-foreground">{t.hourly_rate_hint}</p>
                <Link href="/auth" className="text-primary hover:underline">
                  Sign in as teacher to view roster →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
