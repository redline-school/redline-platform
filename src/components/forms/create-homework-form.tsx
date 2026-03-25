"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  homeworkAuthorSchema,
  type HomeworkAuthorValues,
} from "@/lib/validations/authoring";
import { mockSubjects, mockTeachers, mockUsers, studentsOfTeacher } from "@/lib/mock-data";
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

export function CreateHomeworkForm() {
  const [done, setDone] = useState(false);
  const teacherId = mockTeachers[0]?.id ?? "tch-1";
  const roster = studentsOfTeacher(teacherId);

  const form = useForm<HomeworkAuthorValues>({
    resolver: zodResolver(homeworkAuthorSchema),
    defaultValues: {
      title: "",
      student_id: roster[0]?.id ?? "",
      subject_slug: mockSubjects[0]?.slug ?? "",
      due_at: "",
      description: "",
    },
  });

  function onSubmit(values: HomeworkAuthorValues) {
    console.info("[RedLine MVP] homework draft", values);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Homework validated locally. Persist with Supabase from this payload in the console.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Polynomial practice set" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="student_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roster.map((s) => {
                    const u = mockUsers.find((x) => x.id === s.user_id);
                    return (
                      <SelectItem key={s.id} value={s.id}>
                        {u?.full_name ?? s.id}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject_slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockSubjects.map((s) => (
                    <SelectItem key={s.id} value={s.slug}>
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
          name="due_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Attach worksheet + rubric hints" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save homework (mock)</Button>
      </form>
    </Form>
  );
}
