import { redirect } from "next/navigation";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const next = searchParams?.next;
  const nextSingle = Array.isArray(next) ? next[0] : next;
  redirect(nextSingle ? `/auth?next=${encodeURIComponent(nextSingle)}` : "/auth");
}
