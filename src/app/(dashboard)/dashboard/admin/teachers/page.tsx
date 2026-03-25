import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTeachers, mockUsers, subjectBySlug } from "@/lib/mock-data";

export default function AdminTeachersPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Teachers" description="Faculty records + subject coverage." />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Rate hint</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTeachers.map((t) => {
              const user = mockUsers.find((u) => u.id === t.user_id);
              return (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">
                    {user?.full_name ?? t.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((slug) => (
                        <Badge key={slug} variant="secondary">
                          {subjectBySlug(slug)?.name ?? slug}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.hourly_rate_hint}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
