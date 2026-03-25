"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { diagnosticSchema, type DiagnosticValues } from "@/lib/validations/diagnostic";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SubjectOption = {
  id: string;
  name: string;
};

export function DiagnosticForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const form = useForm<DiagnosticValues>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      grade: "",
      goal: "",
      comment: "",
      subject_id: "",
    },
  });

  useEffect(() => {
    let alive = true;

    async function loadSubjects() {
      setLoadingSubjects(true);
      const { data, error } = await supabase
        .from("subjects")
        .select("id, name")
        .order("name", { ascending: true });

      if (!alive) return;

      if (error) {
        setSubjects([]);
      } else {
        setSubjects((data ?? []) as SubjectOption[]);
      }
      setLoadingSubjects(false);
    }

    void loadSubjects();
    return () => {
      alive = false;
    };
  }, [supabase]);

  async function onSubmit(values: DiagnosticValues) {
    setSubmitLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("applications").insert({
      full_name: values.full_name,
      phone: values.phone,
      grade: values.grade,
      goal: values.goal,
      comment: values.comment ?? "",
      subject_id: values.subject_id,
    });

    if (error) {
      setSubmitError(error.message);
      setSubmitLoading(false);
      return;
    }

    setSubmitLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="text-lg font-semibold">Thanks — we received your diagnostic.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We’ll review it and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Alex Morgan" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+1 555 123 4567"
                  autoComplete="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="Grade 10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject focus</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={loadingSubjects ? "Loading subjects..." : "Choose a subject"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Exam season, topic struggles, learning style..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any extra context for our team"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError ? (
          <p className="text-sm text-destructive">{submitError}</p>
        ) : null}

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={submitLoading || loadingSubjects}
        >
          {submitLoading ? "Submitting..." : "Submit diagnostic"}
        </Button>
      </form>
    </Form>
  );
}
