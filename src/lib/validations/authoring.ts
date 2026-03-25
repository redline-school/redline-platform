import { z } from "zod";

export const homeworkAuthorSchema = z.object({
  title: z.string().trim().min(3, "Title is too short"),
  student_id: z.string().min(1, "Pick a student"),
  subject_slug: z.string().min(1, "Pick a subject"),
  due_at: z.string().min(1, "Set a due date"),
  description: z.string().trim().min(10, "Add instructions (10+ chars)"),
});

export type HomeworkAuthorValues = z.infer<typeof homeworkAuthorSchema>;

export const testAuthorSchema = z.object({
  title: z.string().trim().min(3, "Title is too short"),
  student_id: z.string().min(1, "Pick a student"),
  subject_slug: z.string().min(1, "Pick a subject"),
  due_at: z.string().min(1, "Schedule the test"),
  duration_minutes: z
    .string()
    .min(1, "Set duration")
    .refine((s) => !Number.isNaN(Number(s)), "Invalid number")
    .refine((s) => Number(s) >= 5, "At least 5 minutes")
    .refine((s) => Number(s) <= 240, "Maximum 240 minutes"),
});

export type TestAuthorValues = z.infer<typeof testAuthorSchema>;
