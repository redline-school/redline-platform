import { NextResponse } from "next/server";
import type { Role } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

type SignupBody = {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  role?: Role;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function isRole(value: string | undefined): value is Role {
  return value === "student" || value === "teacher" || value === "admin";
}

export async function POST(request: Request) {
  const body = (await request.json()) as SignupBody;
  const email = body.email?.trim();
  const password = body.password;
  const fullName = body.fullName?.trim();
  const phone = body.phone?.trim() ?? "";
  const role: Role = isRole(body.role) ? body.role : "student";

  if (!email || !password || !fullName) {
    return jsonError("Full name, email, and password are required.");
  }

  const supabase = createServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role,
      },
    },
  });

  if (error) {
    return jsonError(error.message, 400);
  }

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
      phone,
      role,
    });
  }

  return NextResponse.json({
    ok: true,
    role,
    hasSession: Boolean(data.session),
  });
}
