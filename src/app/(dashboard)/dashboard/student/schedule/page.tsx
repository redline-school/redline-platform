import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  lessonsForStudent,
  mockStudents,
  subjectBySlug,
  teacherDisplayName,
} from "@/lib/mock-data";

export default function StudentSchedulePage() {
  const lessons = lessonsForStudent(mockStudents[0]?.id ?? "stu-1");

  return (
    <div className="space-y-8">
      <PageHeading
        title="Schedule"
        description="Placeholder join links — video calls intentionally out of scope for MVP."
      />
      <div className="space-y-4">
        {lessons.map((lesson) => {
          const teacher = teacherDisplayName(lesson.teacher_id);
          const subject = subjectBySlug(lesson.subject_slug)?.name ?? lesson.subject_slug;
          return (
            <Card key={lesson.id}>
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base md:text-lg">{lesson.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {subject} · {teacher}
                  </p>
                </div>
                <Badge variant="outline">
                  {format(new Date(lesson.starts_at), "MMM d, p")}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild size="sm" className="gap-2">
                  <a href={lesson.join_link_placeholder} target="_blank" rel="noreferrer">
                    Join lesson <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {lessons.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lessons in mock data.</p>
        ) : null}
      </div>
    </div>
  );
}
