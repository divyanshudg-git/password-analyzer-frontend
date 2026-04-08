import { PasswordPredictor } from "@/components/prediction/password-predictor";

export default function PredictionPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="section-kicker">Prediction Page</p>
        <h1 className="text-4xl font-semibold leading-tight">Password Strength Intelligence Lab</h1>
        <p className="max-w-3xl text-muted-foreground">
          This workspace combines React Hook Form + Zod validation, TanStack Query mutation flow,
          and interactive Framer Motion with chart-based visual feedback.
        </p>
      </section>
      <PasswordPredictor />
    </div>
  );
}
