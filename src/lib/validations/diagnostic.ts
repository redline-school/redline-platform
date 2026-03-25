import { z } from "zod";

export const diagnosticSchema = z.object({
  full_name: z.string().trim().min(2, "Add at least 2 characters"),
  phone: z.string().trim().min(5, "Add a valid phone number"),
  grade: z.string().trim().min(1, "Add a grade"),
  goal: z.string().trim().min(10, "Share a bit more detail (10+ characters)"),
  comment: z.string().trim().default(""),
  subject_id: z.string().min(1, "Pick a subject"),
});

export type DiagnosticValues = z.input<typeof diagnosticSchema>;
