import "server-only";

import type { Role } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  role: Role;
  full_name: string | null;
  phone: string | null;
};

export type CurrentUserProfile = {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
  phone: string | null;
};

export async function getCurrentProfile() {
  const supabase = createServerClient();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) return null;

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("id, role, full_name, phone")
    .eq("id", userRes.user.id)
    .single();

  if (profileErr || !profile) return null;

  if (
    profile.role !== "student" &&
    profile.role !== "teacher" &&
    profile.role !== "admin"
  ) {
    return null;
  }

  return profile as Profile;
}

export async function getCurrentUserProfile(): Promise<CurrentUserProfile | null> {
  const supabase = createServerClient();
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) return null;

  const profile = await getCurrentProfile();
  if (!profile) return null;

  return {
    id: profile.id,
    role: profile.role,
    full_name: profile.full_name,
    phone: profile.phone,
    email: userRes.user.email ?? null,
  };
}

