import { format } from "date-fns";
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
import { mockDiagnostics, subjectBySlug } from "@/lib/mock-data";

export default function AdminDiagnosticsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Diagnostics"
        description="Inbound forms awaiting academic review."
      />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDiagnostics.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  <div className="font-medium">{d.student_name}</div>
                  <div className="text-xs text-muted-foreground">{d.email}</div>
                </TableCell>
                <TableCell>
                  {subjectBySlug(d.subject_slug)?.name ?? d.subject_slug}
                </TableCell>
                <TableCell>
                  <Badge variant={d.status === "new" ? "default" : "outline"}>
                    {d.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(d.submitted_at), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
