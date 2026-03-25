import "server-only";

import { createServerClient } from "@/lib/supabase/server";

type CountResult = { count: number; ok: boolean };

async function safeCount(table: string): Promise<CountResult> {
  const supabase = createServerClient();
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) return { count: 0, ok: false };
  return { count: count ?? 0, ok: true };
}

export async function getDashboardCounts() {
  const [applications, subjects] = await Promise.all([
    safeCount("applications"),
    safeCount("subjects"),
  ]);

  return {
    applicationsCount: applications.count,
    applicationsReady: applications.ok,
    subjectsCount: subjects.count,
    subjectsReady: subjects.ok,
  };
}

export type RecentApplication = {
  id: string;
  full_name: string | null;
  grade: string | null;
  goal: string | null;
  created_at: string | null;
};

export async function getRecentApplications(limit = 5) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("applications")
    .select("id, full_name, grade, goal, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return { items: [] as RecentApplication[], ok: false };
  return { items: (data ?? []) as RecentApplication[], ok: true };
}

