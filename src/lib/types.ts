export type Role = "student" | "teacher" | "admin";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
};

export type Student = {
  id: string;
  user_id: string;
  grade_level: string;
  parent_email?: string;
  tariff_id: string;
};

export type Teacher = {
  id: string;
  user_id: string;
  bio: string;
  subjects: string[];
  hourly_rate_hint?: string;
};

export type Application = {
  id: string;
  applicant_name: string;
  email: string;
  role_requested: "student" | "teacher";
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  note?: string;
};

export type Diagnostic = {
  id: string;
  student_name: string;
  email: string;
  subject_slug: string;
  goals: string;
  submitted_at: string;
  status: "new" | "reviewed";
};

export type Subject = {
  id: string;
  slug: string;
  name: string;
  description: string;
  accent: string;
};

export type Tariff = {
  id: string;
  name: string;
  price_monthly: number;
  lessons_per_month: number;
  perks: string[];
  highlighted?: boolean;
};

export type Lesson = {
  id: string;
  title: string;
  subject_slug: string;
  teacher_id: string;
  student_ids: string[];
  starts_at: string;
  ends_at: string;
  join_link_placeholder: string;
};

export type Homework = {
  id: string;
  title: string;
  subject_slug: string;
  teacher_id: string;
  student_id: string;
  due_at: string;
  status: "assigned" | "submitted" | "graded";
  description: string;
};

export type TestItem = {
  id: string;
  title: string;
  subject_slug: string;
  teacher_id: string;
  student_id: string;
  due_at: string;
  status: "scheduled" | "completed";
  duration_minutes: number;
};

export type ChatThread = {
  id: string;
  title: string;
  participant_ids: string[];
  last_message_at: string;
};

export type ChatMessage = {
  id: string;
  thread_id: string;
  sender_id: string;
  body: string;
  sent_at: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  excerpt: string;
  subject: string;
  date: string;
  published: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_minutes: number;
};
