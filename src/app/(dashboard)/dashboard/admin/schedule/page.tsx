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
import { mockLessons, subjectBySlug, teacherDisplayName } from "@/lib/mock-data";

export default function AdminSchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Schedule"
        description="Cross-teacher visibility with join placeholders."
      />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>Join</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLessons.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.title}</TableCell>
                <TableCell>
                  {subjectBySlug(l.subject_slug)?.name ?? l.subject_slug}
                </TableCell>
                <TableCell>{teacherDisplayName(l.teacher_id)}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {format(new Date(l.starts_at), "MMM d, p")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <a
                    className="text-primary hover:underline"
                    href={l.join_link_placeholder}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
