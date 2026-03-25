import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Role } from "@/lib/types";
import { createServerClient } from "@supabase/ssr";

const HOME_BY_ROLE: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return { url, anonKey };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  const { url, anonKey } = supabaseEnv();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const redirectToAuth = (nextPath: string) => {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
  };

  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) {
    return redirectToAuth(pathname);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userRes.user.id)
    .single();

  const role = profile?.role as Role | undefined;
  if (!role || !HOME_BY_ROLE[role]) {
    return redirectToAuth(pathname);
  }

  const home = HOME_BY_ROLE[role];

  // Canonicalize /dashboard* -> role aliases.
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const url = request.nextUrl.clone();
    url.pathname = home;
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/dashboard/student")) {
    if (role !== "student") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard\/student/, "/student");
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/dashboard/teacher")) {
    if (role !== "teacher") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard\/teacher/, "/teacher");
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/dashboard/admin")) {
    if (role !== "admin") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard\/admin/, "/admin");
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Gate + rewrite role aliases to existing dashboard routes (keep UI/layout).
  if (pathname === "/student" || pathname.startsWith("/student/")) {
    if (role !== "student") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/student/, "/dashboard/student");
    response = NextResponse.rewrite(url);
    return response;
  }
  if (pathname === "/teacher" || pathname.startsWith("/teacher/")) {
    if (role !== "teacher") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/teacher/, "/dashboard/teacher");
    response = NextResponse.rewrite(url);
    return response;
  }
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (role !== "admin") return NextResponse.redirect(new URL(home, request.url));
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/admin/, "/dashboard/admin");
    response = NextResponse.rewrite(url);
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/student/:path*", "/teacher/:path*", "/admin/:path*"],
};
