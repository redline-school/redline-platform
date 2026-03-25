import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBlogPosts } from "@/lib/mock-data";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Journal"
        title="Notes from our academic team"
        description="Light essays on sprint design, parent communication, and assessment hygiene."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {mockBlogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {post.date} · {post.read_minutes} min read · mock entry
              </p>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                Keep reading
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
