import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTariffs } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Tariffs"
        title="Simple plans, honest throughput"
        description="Shown with mock numbers for the MVP — admins edit live tariffs in the console."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {mockTariffs.map((t) => (
          <Card
            key={t.id}
            className={
              t.highlighted
                ? "border-primary shadow-lg shadow-primary/10"
                : undefined
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{t.name}</CardTitle>
                {t.highlighted ? (
                  <Badge variant="default">Popular</Badge>
                ) : null}
              </div>
              <CardDescription>
                {t.lessons_per_month} live lessons / month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-bold">
                ${t.price_monthly}
                <span className="text-base font-normal text-muted-foreground">
                  / mo
                </span>
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={t.highlighted ? "default" : "outline"}>
                <Link href="/diagnostic">Start with diagnostic</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
