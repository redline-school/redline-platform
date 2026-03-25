import Link from "next/link";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/types";
import { getCurrentProfile } from "@/lib/auth/profile";
import { PageHeading } from "@/components/page-heading";
import { AuthForm } from "@/components/forms/auth-form";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function homeForRole(role: Role) {
  if (role === "student") return "/student";
  if (role === "teacher") return "/teacher";
  return "/admin";
}

function singleParam(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0];
  return v;
}

function safeNext(next: string | undefined, role: Role) {
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;

  // Only allow navigation within the role areas.
  if (role === "student" && (next.startsWith("/student") || next.startsWith("/dashboard/student")))
    return next.startsWith("/dashboard/student")
      ? next.replace(/^\/dashboard\/student/, "/student")
      : next;
  if (role === "teacher" && (next.startsWith("/teacher") || next.startsWith("/dashboard/teacher")))
    return next.startsWith("/dashboard/teacher")
      ? next.replace(/^\/dashboard\/teacher/, "/teacher")
      : next;
  if (role === "admin" && (next.startsWith("/admin") || next.startsWith("/dashboard/admin")))
    return next.startsWith("/dashboard/admin")
      ? next.replace(/^\/dashboard\/admin/, "/admin")
      : next;

  if (next === "/dashboard" || next === "/") return homeForRole(role);
  return null;
}

export default async function AuthPage({ searchParams }: Props) {
  const profile = await getCurrentProfile();
  if (profile) {
    const next = singleParam(searchParams?.next);
    redirect(safeNext(next, profile.role) ?? homeForRole(profile.role));
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 px-4 py-16">
      <PageHeading
        eyebrow="Access"
        title="Sign in"
        description="Use your Supabase account. We’ll route you to the right workspace by role."
      />
      <AuthForm next={singleParam(searchParams?.next)} />
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="underline-offset-4 hover:underline">
          ← Back to marketing site
        </Link>
      </p>
    </div>
  );
}

