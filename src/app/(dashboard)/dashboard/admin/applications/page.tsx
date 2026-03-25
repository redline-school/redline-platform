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
import { mockApplications } from "@/lib/mock-data";

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Applications"
        description="Prospective students & teachers — approve flow not wired."
      />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApplications.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.applicant_name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell className="capitalize">{a.role_requested}</TableCell>
                <TableCell>
                  <Badge variant={a.status === "pending" ? "outline" : "secondary"}>
                    {a.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(a.submitted_at), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
