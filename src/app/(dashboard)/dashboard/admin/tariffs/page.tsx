import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTariffs } from "@/lib/mock-data";

export default function AdminTariffsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Tariffs"
        description="Admin view mirrors marketing tiers — connect to billing later."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {mockTariffs.map((t) => (
          <Card key={t.id} className={t.highlighted ? "border-primary" : undefined}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.name}</CardTitle>
              {t.highlighted ? <Badge>Highlight</Badge> : null}
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="text-2xl font-bold text-foreground">
                ${t.price_monthly}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ mo</span>
              </p>
              <p>{t.lessons_per_month} lessons / month</p>
              <ul className="list-disc space-y-1 pl-4">
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
