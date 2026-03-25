import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { mockBlogPosts } from "@/lib/mock-data";

type Props = { params: { slug: string } };

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <PageHeading
        eyebrow={`${post.date} · ${post.read_minutes} min`}
        title={post.title}
        description={post.excerpt}
      />
      <article className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This is placeholder body copy for the MVP. Swap this route with a CMS
          or Supabase-backed markdown renderer when you wire content.
        </p>
        <p>
          RedLine coaches use short loops: teach, practice, retrieve, reflect.
          Parents see the reflection, not just the grade.
        </p>
      </article>
      <Button asChild variant="outline">
        <Link href="/blog">← Back to blog</Link>
      </Button>
    </div>
  );
}
