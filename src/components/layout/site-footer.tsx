import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">RedLine School</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Online tutoring with structure, warmth, and measurable progress.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/diagnostic" className="hover:text-foreground">
            Diagnostic
          </Link>
          <Link href="/auth" className="hover:text-foreground">
            Sign in
          </Link>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RedLine. Online tutoring platform.
      </div>
    </footer>
  );
}
