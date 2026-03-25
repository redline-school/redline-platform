import { PageHeading } from "@/components/page-heading";
import { CreateTestForm } from "@/components/forms/create-test-form";

export default function TeacherCreateTestPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Create test"
        description="Scheduling metadata only — delivery integrates later."
      />
      <CreateTestForm />
    </div>
  );
}
