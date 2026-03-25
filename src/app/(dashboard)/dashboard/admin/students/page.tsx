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
import { mockStudents, mockTariffs, mockUsers } from "@/lib/mock-data";

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Students" description="Roster with mock tariff mapping." />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Tariff</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((s) => {
              const user = mockUsers.find((u) => u.id === s.user_id);
              const tariff = mockTariffs.find((t) => t.id === s.tariff_id);
              return (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">
                    {user?.full_name ?? s.id}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.grade_level}</Badge>
                  </TableCell>
                  <TableCell>{tariff?.name ?? "—"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
