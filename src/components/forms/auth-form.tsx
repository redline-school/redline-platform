"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function homeForRole(role: Role) {
  if (role === "student") return "/student";
  if (role === "teacher") return "/teacher";
  return "/admin";
}

function normalizeNext(next: string | undefined, role: Role) {
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;

  const allow =
    (role === "student" && next.startsWith("/student")) ||
    (role === "teacher" && next.startsWith("/teacher")) ||
    (role === "admin" && next.startsWith("/admin"));

  if (allow) return next;

  if (role === "student" && next.startsWith("/dashboard/student"))
    return next.replace(/^\/dashboard\/student/, "/student");
  if (role === "teacher" && next.startsWith("/dashboard/teacher"))
    return next.replace(/^\/dashboard\/teacher/, "/teacher");
  if (role === "admin" && next.startsWith("/dashboard/admin"))
    return next.replace(/^\/dashboard\/admin/, "/admin");

  if (next === "/dashboard" || next === "/") return homeForRole(role);
  return null;
}

type AuthResponse = {
  error?: string;
  role?: Role;
  hasSession?: boolean;
};

export function AuthForm({ next }: { next?: string }) {
  const router = useRouter();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("student");

  async function postAuth<T extends AuthResponse>(
    path: string,
    payload: Record<string, unknown>,
  ) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = (await response.json().catch(() => ({}))) as T;

    if (!response.ok) {
      throw new Error(json.error ?? "Authentication failed");
    }

    return json;
  }

  function redirectAfterLogin(resolvedRole: Role) {
    const target = normalizeNext(next, resolvedRole) ?? homeForRole(resolvedRole);
    router.push(target);
    router.refresh();
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const data = await postAuth<AuthResponse>("/api/auth/login", {
        email,
        password,
      });

      redirectAfterLogin(data.role ?? "student");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const data = await postAuth<AuthResponse>("/api/auth/signup", {
        email,
        password,
        fullName,
        phone,
        role,
      });

      if (!data.hasSession) {
        setNotice("Check your email to confirm your account, then sign in.");
        setTab("login");
        return;
      }

      redirectAfterLogin(data.role ?? role);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-6">
        <form
          onSubmit={onLogin}
          className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register" className="mt-6">
        <form
          onSubmit={onRegister}
          className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-2">
            <Label htmlFor="reg-full-name">Full name</Label>
            <Input
              id="reg-full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reg-phone">Phone</Label>
            <Input
              id="reg-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
