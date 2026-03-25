import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  mockStudents,
  mockTariffs,
  mockUsers,
} from "@/lib/mock-data";

export default function StudentProfilePage() {
  const student = mockStudents[0] ?? null;
  const user = student ? mockUsers.find((u) => u.id === student.user_id) : null;
  const tariff = student
    ? mockTariffs.find((t) => t.id === student.tariff_id)
    : null;

  return (
    <div className="space-y-6">
      <PageHeading
        title="Profile"
        description="Static snapshot of mock user + guardian contact."
      />
      <Card>
        <CardHeader>
          <CardTitle>{user?.full_name ?? "Student"}</CardTitle>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Grade
            </p>
            <p>{student?.grade_level ?? "—"}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Parent / guardian email
            </p>
            <p>{student?.parent_email ?? "Not on file (mock)"}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Tariff
            </p>
            <p>{tariff?.name ?? "—"}</p>
            <p className="text-muted-foreground">
              {tariff
                ? `$${tariff.price_monthly}/mo · ${tariff.lessons_per_month} lessons`
                : ""}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
