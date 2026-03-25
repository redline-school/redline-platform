import { Star } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReviews } from "@/lib/mock-data";

export default function ReviewsPage() {
  const published = mockReviews.filter((r) => r.published);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Social proof"
        title="Families trust the cadence"
        description="Only published reviews appear here; admins moderate submissions in their dashboard."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {published.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <CardTitle className="text-base">{r.author}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {r.subject} · {r.date}
              </p>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              “{r.excerpt}”
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
