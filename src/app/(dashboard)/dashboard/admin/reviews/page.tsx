import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockReviews } from "@/lib/mock-data";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Reviews"
        description="Moderate testimonials before they reach the marketing site."
      />
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="font-medium">{r.author}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {r.excerpt}
                  </p>
                </TableCell>
                <TableCell>{r.rating} ★</TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell>
                  <Badge variant={r.published ? "default" : "outline"}>
                    {r.published ? "live" : "hidden"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" disabled>
                    Toggle (mock)
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
