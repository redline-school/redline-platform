import { PageHeading } from "@/components/page-heading";
import { CreateHomeworkForm } from "@/components/forms/create-homework-form";

export default function TeacherCreateHomeworkPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Create homework"
        description="Client-side validation with zod; roster limited to your mock students."
      />
      <CreateHomeworkForm />
    </div>
  );
}
