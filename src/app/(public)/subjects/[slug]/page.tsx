import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { subjectBySlug } from "@/lib/mock-data";

type Props = { params: { slug: string } };

export default function SubjectDetailPage({ params }: Props) {
  const { slug } = params;
  const subject = subjectBySlug(slug);
  if (!subject) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      <div className={`rounded-2xl bg-gradient-to-br ${subject.accent} p-1`}>
        <div className="rounded-[0.9rem] bg-card p-8 shadow-sm">
          <PageHeading
            eyebrow="Subject track"
            title={subject.name}
            description={subject.description}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/diagnostic">Book diagnostic</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Weekly sprint",
            body: "Skills chunked into 7-day loops with exit tickets.",
          },
          {
            title: "Coach notes",
            body: "Teachers annotate PDFs; students reply in-thread.",
          },
          {
            title: "Guardian view",
            body: "Plain-language summaries after every milestone.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {item.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
