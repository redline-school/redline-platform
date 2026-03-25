import { PageHeading } from "@/components/page-heading";
import { DiagnosticForm } from "@/components/forms/diagnostic-form";

export default function DiagnosticPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 px-4 py-12">
      <PageHeading
        eyebrow="Onboarding"
        title="Diagnostic intake"
        description="Tell us what you are preparing for. Your request is saved to our admissions queue for review."
      />
      <DiagnosticForm />
    </div>
  );
}
