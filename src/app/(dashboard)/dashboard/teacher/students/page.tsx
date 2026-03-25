import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTariffs, mockTeachers, mockUsers, studentsOfTeacher } from "@/lib/mock-data";

export default function TeacherStudentsPage() {
  const teacherId = mockTeachers[0]?.id ?? "tch-1";
  const roster = studentsOfTeacher(teacherId);

  return (
    <div className="space-y-6">
      <PageHeading
        title="My students"
        description="Filtered by shared mock lessons with your teacher id."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {roster.map((s) => {
          const user = mockUsers.find((u) => u.id === s.user_id);
          const tariff = mockTariffs.find((t) => t.id === s.tariff_id);
          return (
            <Card key={s.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">
                    {user?.full_name ?? "Student"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Badge variant="outline">{s.grade_level}</Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Tariff: {tariff?.name ?? "—"}</p>
                <Button asChild size="sm">
                  <Link href={`/teacher/students/${s.id}`}>
                    View student page
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {roster.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No students linked in mock data.
          </p>
        ) : null}
      </div>
    </div>
  );
}
