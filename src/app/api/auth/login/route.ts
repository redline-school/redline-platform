import { NextResponse } from "next/server";
import type { Role } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

type LoginBody = {
  email?: string;
  password?: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;
  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    return jsonError("Email and password are required.");
  }

  const supabase = createServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return jsonError(error.message, 401);
  }

  const fallbackRole = (data.user?.user_metadata?.role as Role | undefined) ?? "student";
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = (profile?.role as Role | undefined) ?? fallbackRole;
  return NextResponse.json({ ok: true, role });
}
