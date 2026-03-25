import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  homeworkForStudent,
  lessonsForStudent,
  mockStudents,
  mockTeachers,
  mockUsers,
  subjectBySlug,
  teacherDisplayName,
} from "@/lib/mock-data";

type Props = { params: { id: string } };

export default function TeacherStudentDetailPage({ params }: Props) {
  const teacherId = mockTeachers[0]?.id ?? "tch-1";
  const student = mockStudents.find((s) => s.id === params.id);
  if (!student) notFound();

  const user = mockUsers.find((u) => u.id === student.user_id);
  const lessons = lessonsForStudent(student.id).filter(
    (l) => l.teacher_id === teacherId
  );
  const homework = homeworkForStudent(student.id).filter(
    (h) => h.teacher_id === teacherId
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeading
          title={user?.full_name ?? "Student"}
          description={`${student.grade_level} · guardian ${student.parent_email ?? "n/a"}`}
        />
        <Button asChild variant="outline">
          <Link href="/teacher/students">← Roster</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shared lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {lessons.map((l) => (
              <div key={l.id} className="rounded-lg border p-3">
                <p className="font-medium">{l.title}</p>
                <p className="text-muted-foreground">
                  {subjectBySlug(l.subject_slug)?.name ?? l.subject_slug} ·{" "}
                  {format(new Date(l.starts_at), "MMM d, p")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Coached by {teacherDisplayName(l.teacher_id)}
                </p>
              </div>
            ))}
            {lessons.length === 0 ? (
              <p className="text-muted-foreground">No shared lessons yet.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homework you assigned</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {homework.map((h) => (
              <div key={h.id} className="rounded-lg border p-3">
                <p className="font-medium">{h.title}</p>
                <p className="text-muted-foreground">{h.status}</p>
                <p className="text-xs">Due {format(new Date(h.due_at), "MMM d")}</p>
              </div>
            ))}
            {homework.length === 0 ? (
              <p className="text-muted-foreground">No items yet.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
