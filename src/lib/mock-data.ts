import type {
  Application,
  BlogPost,
  ChatMessage,
  ChatThread,
  Diagnostic,
  Homework,
  Lesson,
  Review,
  Student,
  Subject,
  Tariff,
  Teacher,
  TestItem,
  User,
} from "@/lib/types";

export const mockUsers: User[] = [
  {
    id: "u-student-1",
    email: "alex@example.com",
    full_name: "Alex Morgan",
    role: "student",
    created_at: "2025-08-12T10:00:00Z",
  },
  {
    id: "u-student-2",
    email: "jamie@example.com",
    full_name: "Jamie Lee",
    role: "student",
    created_at: "2025-11-02T10:00:00Z",
  },
  {
    id: "u-teacher-1",
    email: "nina@redline.school",
    full_name: "Nina Petrova",
    role: "teacher",
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "u-teacher-2",
    email: "marcus@redline.school",
    full_name: "Marcus Chen",
    role: "teacher",
    created_at: "2024-03-18T10:00:00Z",
  },
  {
    id: "u-admin-1",
    email: "ops@redline.school",
    full_name: "Sam Admin",
    role: "admin",
    created_at: "2023-06-01T10:00:00Z",
  },
];

export const mockSubjects: Subject[] = [
  {
    id: "sub-math",
    slug: "mathematics",
    name: "Mathematics",
    description:
      "Algebra through calculus with exam strategy and weekly milestones.",
    accent: "from-rose-500/20 to-orange-400/10",
  },
  {
    id: "sub-phys",
    slug: "physics",
    name: "Physics",
    description:
      "Mechanics, waves, and electricity with problem-set routines.",
    accent: "from-sky-500/20 to-indigo-500/10",
  },
  {
    id: "sub-cs",
    slug: "computer-science",
    name: "Computer Science",
    description: "Python foundations, data structures, and CS fundamentals.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "sub-en",
    slug: "english",
    name: "English",
    description: "Reading comprehension, essays, and speaking fluency.",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
];

export const mockTariffs: Tariff[] = [
  {
    id: "tar-start",
    name: "Starter",
    price_monthly: 89,
    lessons_per_month: 4,
    perks: ["Diagnostic summary", "Messenger with teacher", "Progress snapshots"],
  },
  {
    id: "tar-focus",
    name: "Focus",
    price_monthly: 159,
    lessons_per_month: 8,
    perks: [
      "Everything in Starter",
      "Homework review queue",
      "Priority scheduling",
    ],
    highlighted: true,
  },
  {
    id: "tar-elite",
    name: "Elite",
    price_monthly: 289,
    lessons_per_month: 12,
    perks: [
      "Everything in Focus",
      "Exam sprint planning",
      "Dedicated success manager",
    ],
  },
];

export const mockStudents: Student[] = [
  {
    id: "stu-1",
    user_id: "u-student-1",
    grade_level: "Grade 10",
    parent_email: "parent@example.com",
    tariff_id: "tar-focus",
  },
  {
    id: "stu-2",
    user_id: "u-student-2",
    grade_level: "Grade 8",
    tariff_id: "tar-start",
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: "tch-1",
    user_id: "u-teacher-1",
    bio: "10+ years preparing students for national math olympiads.",
    subjects: ["mathematics", "computer-science"],
    hourly_rate_hint: "From $45 / lesson",
  },
  {
    id: "tch-2",
    user_id: "u-teacher-2",
    bio: "Physics PhD; loves turning abstract ideas into tangible demos.",
    subjects: ["physics", "mathematics"],
    hourly_rate_hint: "From $50 / lesson",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app-1",
    applicant_name: "Taylor Reed",
    email: "taylor@example.com",
    role_requested: "student",
    submitted_at: "2026-03-22T15:30:00Z",
    status: "pending",
  },
  {
    id: "app-2",
    applicant_name: "Priya Shah",
    email: "priya@example.com",
    role_requested: "teacher",
    submitted_at: "2026-03-20T09:10:00Z",
    status: "pending",
    note: "AP Calculus experience",
  },
];

export const mockDiagnostics: Diagnostic[] = [
  {
    id: "diag-1",
    student_name: "Alex Morgan",
    email: "alex@example.com",
    subject_slug: "mathematics",
    goals: "Raise mock exam score by 15% before May.",
    submitted_at: "2026-03-18T11:00:00Z",
    status: "new",
  },
  {
    id: "diag-2",
    student_name: "Visitor",
    email: "visitor@example.com",
    subject_slug: "physics",
    goals: "Need help with kinematics intuition.",
    submitted_at: "2026-03-10T08:45:00Z",
    status: "reviewed",
  },
];

export const mockLessons: Lesson[] = [
  {
    id: "les-1",
    title: "Quadratic functions deep dive",
    subject_slug: "mathematics",
    teacher_id: "tch-1",
    student_ids: ["stu-1"],
    starts_at: "2026-03-26T16:00:00Z",
    ends_at: "2026-03-26T16:55:00Z",
    join_link_placeholder: "https://lesson.redline.school/placeholder/les-1",
  },
  {
    id: "les-2",
    title: "Forces & free-body diagrams",
    subject_slug: "physics",
    teacher_id: "tch-2",
    student_ids: ["stu-1", "stu-2"],
    starts_at: "2026-03-28T14:00:00Z",
    ends_at: "2026-03-28T14:50:00Z",
    join_link_placeholder: "https://lesson.redline.school/placeholder/les-2",
  },
];

export const mockHomework: Homework[] = [
  {
    id: "hw-1",
    title: "Polynomial practice set",
    subject_slug: "mathematics",
    teacher_id: "tch-1",
    student_id: "stu-1",
    due_at: "2026-03-27T23:59:59Z",
    status: "assigned",
    description: "Complete problems 1–12 from the shared worksheet.",
  },
  {
    id: "hw-2",
    title: "Lens equation worksheet",
    subject_slug: "physics",
    teacher_id: "tch-2",
    student_id: "stu-1",
    due_at: "2026-03-25T23:59:59Z",
    status: "submitted",
    description: "Sketch ray diagrams for each prompt.",
  },
];

export const mockTests: TestItem[] = [
  {
    id: "tst-1",
    title: "Unit circle checkpoint",
    subject_slug: "mathematics",
    teacher_id: "tch-1",
    student_id: "stu-1",
    due_at: "2026-03-29T17:00:00Z",
    status: "scheduled",
    duration_minutes: 35,
  },
  {
    id: "tst-2",
    title: "Energy conservation quiz",
    subject_slug: "physics",
    teacher_id: "tch-2",
    student_id: "stu-1",
    due_at: "2026-04-02T17:00:00Z",
    status: "scheduled",
    duration_minutes: 25,
  },
];

export const mockThreads: ChatThread[] = [
  {
    id: "th-1",
    title: "Nina & Alex",
    participant_ids: ["u-teacher-1", "u-student-1"],
    last_message_at: "2026-03-23T12:01:00Z",
  },
  {
    id: "th-2",
    title: "Marcus & Alex",
    participant_ids: ["u-teacher-2", "u-student-1"],
    last_message_at: "2026-03-21T09:40:00Z",
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    thread_id: "th-1",
    sender_id: "u-teacher-1",
    body: "Bring your latest mock exam PDF—we will annotate it live.",
    sent_at: "2026-03-23T12:01:00Z",
  },
  {
    id: "msg-2",
    thread_id: "th-1",
    sender_id: "u-student-1",
    body: "Uploaded to the homework folder, thanks!",
    sent_at: "2026-03-23T11:42:00Z",
  },
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    author: "Parent of a Grade 9 student",
    rating: 5,
    excerpt:
      "Structured feedback every week—we finally see a clear study plan.",
    subject: "Mathematics",
    date: "2026-02-14",
    published: true,
  },
  {
    id: "rev-2",
    author: "International school student",
    rating: 5,
    excerpt:
      "Physics demos made velocity graphs click. Exams felt less scary.",
    subject: "Physics",
    date: "2025-12-03",
    published: true,
  },
  {
    id: "rev-3",
    author: "Adult learner",
    rating: 4,
    excerpt: "Friendly teachers, flexible evening slots.",
    subject: "English",
    date: "2025-10-21",
    published: false,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "study-sprints",
    title: "How we design two-week study sprints",
    excerpt:
      "Chunking, retrieval practice, and reflection loops that actually stick.",
    date: "2026-03-01",
    read_minutes: 6,
  },
  {
    id: "post-2",
    slug: "parent-checkins",
    title: "What parents see in the RedLine dashboard",
    excerpt:
      "Transparent milestones without overwhelming notifications—here is the balance.",
    date: "2026-02-15",
    read_minutes: 4,
  },
];

export function userById(id: string) {
  return mockUsers.find((u) => u.id === id);
}

export function teacherDisplayName(teacherId: string) {
  const t = mockTeachers.find((x) => x.id === teacherId);
  if (!t) return teacherId;
  return userById(t.user_id)?.full_name ?? teacherId;
}

export function subjectBySlug(slug: string) {
  return mockSubjects.find((s) => s.slug === slug);
}

export function lessonsForStudent(studentId: string) {
  return mockLessons.filter((l) => l.student_ids.includes(studentId));
}

export function homeworkForStudent(studentId: string) {
  return mockHomework.filter((h) => h.student_id === studentId);
}

export function testsForStudent(studentId: string) {
  return mockTests.filter((t) => t.student_id === studentId);
}

export function studentsOfTeacher(teacherId: string) {
  const ids = new Set(
    mockLessons.filter((l) => l.teacher_id === teacherId).flatMap((l) => l.student_ids)
  );
  return mockStudents.filter((s) => ids.has(s.id));
}
