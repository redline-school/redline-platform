import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockSubjects } from "@/lib/mock-data";

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Catalog"
        title="Subjects we teach with intent"
        description="Each subject page outlines pacing, outcomes, and how we measure confidence — not just scores."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {mockSubjects.map((s) => (
          <Card key={s.id} className="flex flex-col overflow-hidden">
            <div className={`h-1.5 bg-gradient-to-r ${s.accent}`} />
            <CardHeader>
              <CardTitle>{s.name}</CardTitle>
              <CardDescription>{s.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild>
                <Link href={`/subjects/${s.slug}`}>Open subject</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
