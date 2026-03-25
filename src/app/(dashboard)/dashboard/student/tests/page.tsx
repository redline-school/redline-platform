import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents, subjectBySlug, testsForStudent } from "@/lib/mock-data";

export default function StudentTestsPage() {
  const items = testsForStudent(mockStudents[0]?.id ?? "stu-1");

  return (
    <div className="space-y-6">
      <PageHeading
        title="Tests"
        description="Timed checkpoints — join links are placeholders like lessons."
      />
      <div className="space-y-4">
        {items.map((t) => (
          <Card key={t.id}>
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{t.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {subjectBySlug(t.subject_slug)?.name ?? t.subject_slug} ·{" "}
                  {t.duration_minutes} minutes
                </p>
              </div>
              <Badge variant="secondary">{t.status}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Scheduled for {format(new Date(t.due_at), "MMM d, p")}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
