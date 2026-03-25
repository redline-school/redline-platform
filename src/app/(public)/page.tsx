import Link from "next/link";
import { ArrowRight, BookOpen, LineChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockSubjects, mockTariffs } from "@/lib/mock-data";

export default function HomePage() {
  const featured = mockSubjects.slice(0, 3);
  const highlight = mockTariffs.find((t) => t.highlighted);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(225,29,72,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 lg:flex lg:items-center lg:gap-16">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Live lessons · Structured homework · Human feedback
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Straight-line growth for curious students.
            </h1>
            <p className="text-lg text-muted-foreground">
              RedLine pairs bright learners with expert tutors, tight pacing,
              and dashboards everyone can trust — without replacing the human
              touch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/diagnostic">
                  Start diagnostic <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid flex-1 gap-4 sm:grid-cols-2 lg:mt-0">
            <Card className="border-primary/15 shadow-md">
              <CardHeader>
                <LineChart className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Visible progress</CardTitle>
                <CardDescription>
                  Weekly milestones, rubric-based feedback, and guardian-friendly
                  summaries.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="translate-y-4 border-primary/15 shadow-md sm:translate-y-8">
              <CardHeader>
                <BookOpen className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Subject depth</CardTitle>
                <CardDescription>
                  Math, physics, CS, and language arts tracks aligned to exam
                  seasons.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Explore subjects</h2>
            <p className="text-muted-foreground">
              Every track blends conceptual clarity with exam craft.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/subjects">All subjects</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${s.accent}`} />
              <CardHeader>
                <CardTitle>{s.name}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/subjects/${s.slug}`}>View track</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {highlight ? (
        <section className="border-y bg-muted/40">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Spotlight plan
              </p>
              <h2 className="mt-2 text-3xl font-bold">{highlight.name}</h2>
              <p className="mt-2 text-muted-foreground">
                {highlight.lessons_per_month} live lessons / month ·{" "}
                {highlight.perks.slice(0, 2).join(" · ")}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">${highlight.price_monthly}</span>
              <span className="text-muted-foreground">/ month · mock preview</span>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
