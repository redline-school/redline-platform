import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLessons, mockTeachers, studentsOfTeacher } from "@/lib/mock-data";

export default function TeacherSchedulePage() {
  const teacherId = mockTeachers[0]?.id ?? "tch-1";
  const lessons = mockLessons.filter((l) => l.teacher_id === teacherId);
  const rosterIds = new Set(studentsOfTeacher(teacherId).map((s) => s.id));

  return (
    <div className="space-y-6">
      <PageHeading
        title="Schedule"
        description="Each card exposes a placeholder join URL for learners."
      />
      <div className="space-y-4">
        {lessons.map((l) => (
          <Card key={l.id}>
            <CardHeader>
              <CardTitle className="text-base">{l.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(l.starts_at), "EEEE, MMM d · p")} —{" "}
                {l.student_ids.filter((id) => rosterIds.has(id)).length || l.student_ids.length}{" "}
                enrolled
              </p>
            </CardHeader>
            <CardContent>
              <Button asChild size="sm">
                <a href={l.join_link_placeholder} target="_blank" rel="noreferrer">
                  Copy-style join link
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
