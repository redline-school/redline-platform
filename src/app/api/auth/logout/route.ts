import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  const response = NextResponse.json({ ok: true });
  return response;
}
