import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homeworkForStudent, mockStudents, subjectBySlug } from "@/lib/mock-data";

export default function StudentHomeworkPage() {
  const items = homeworkForStudent(mockStudents[0]?.id ?? "stu-1");

  return (
    <div className="space-y-6">
      <PageHeading
        title="Homework"
        description="Status chips reflect mock workflow — wire to submissions table later."
      />
      <div className="space-y-4">
        {items.map((h) => (
          <Card key={h.id}>
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{h.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {subjectBySlug(h.subject_slug)?.name ?? h.subject_slug}
                </p>
              </div>
              <Badge
                variant={
                  h.status === "graded"
                    ? "default"
                    : h.status === "submitted"
                      ? "secondary"
                      : "outline"
                }
              >
                {h.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{h.description}</p>
              <p className="text-xs">
                Due {format(new Date(h.due_at), "MMM d, yyyy")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
