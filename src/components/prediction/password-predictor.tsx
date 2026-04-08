"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  Gauge,
  KeyRound,
  Loader2,
  ScanSearch,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PasswordInsight } from "@/lib/password-evaluator";

const predictionSchema = z.object({
  password: z
    .string()
    .min(8, "Please enter at least 8 characters.")
    .max(256, "Password is too long."),
  personalInfo: z.string().max(140, "Please keep this under 140 characters."),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

const labelTone: Record<PasswordInsight["label"], string> = {
  Weak: "bg-red-100 text-red-700",
  Moderate: "bg-amber-100 text-amber-700",
  Strong: "bg-emerald-100 text-emerald-700",
};

async function requestPrediction(values: PredictionFormValues) {
  const response = await fetch("/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed.");
  }

  return (await response.json()) as PasswordInsight;
}

function getStrengthBand(score: number) {
  if (score >= 78) return "High resilience";
  if (score >= 52) return "Balanced but improvable";
  return "High exposure";
}

function getCrackWindow(entropy: number) {
  if (entropy >= 80) return "Years to centuries";
  if (entropy >= 64) return "Months to years";
  if (entropy >= 48) return "Hours to weeks";
  return "Minutes to hours";
}

function getUrgencyTone(score: number) {
  if (score >= 78) return "Low risk";
  if (score >= 52) return "Medium risk";
  return "Act now";
}

export function PasswordPredictor() {
  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      password: "",
      personalInfo: "",
    },
  });

  const predictionMutation = useMutation({
    mutationFn: requestPrediction,
    onError: () => {
      toast.error("Prediction could not complete. Please try again.");
    },
  });

  const insight = predictionMutation.data;
  const password = form.watch("password");

  const chartData = useMemo(() => {
    if (!insight) return [];

    return [
      { metric: "Length", value: insight.breakdown.length },
      { metric: "Variety", value: insight.breakdown.variety },
      { metric: "Hygiene", value: insight.breakdown.hygiene },
      { metric: "Entropy", value: insight.breakdown.entropy },
    ];
  }, [insight]);

  const passedChecks = insight?.checks.filter((check) => check.passed).length ?? 0;
  const checkCompletion = insight ? Math.round((passedChecks / insight.checks.length) * 100) : 0;
  const missingChecks = insight?.checks.filter((check) => !check.passed) ?? [];
  const characterMix = [
    { label: "Uppercase", active: /[A-Z]/.test(password) },
    { label: "Lowercase", active: /[a-z]/.test(password) },
    { label: "Number", active: /[0-9]/.test(password) },
    { label: "Symbol", active: /[^A-Za-z0-9]/.test(password) },
  ];

  const submit = (values: PredictionFormValues) => {
    predictionMutation.mutate(values);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass-surface border-white/70 shadow-xl">
        <CardHeader className="space-y-2">
          <p className="section-kicker">Prediction Workspace</p>
          <CardTitle className="text-2xl">Run Live Password Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Try: W3llBuilt&Secure2026!"
                        className="h-11 bg-white/70"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your password is processed for prediction and quality signals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Info (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add known personal tokens to detect risky overlap."
                        className="min-h-24 bg-white/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-xl"
                disabled={predictionMutation.isPending}
              >
                {predictionMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" />
                    Predict Strength
                  </>
                )}
              </Button>

              <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Live input readiness</p>
                  <span className="text-xs text-muted-foreground">{password.length} chars</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {characterMix.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl px-3 py-2 text-sm ${
                        item.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="glass-surface border-white/70 shadow-xl">
        <CardHeader className="space-y-2">
          <p className="section-kicker">Insight Console</p>
          <CardTitle className="text-2xl">Security Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!insight ? (
            <div className="rounded-2xl border border-dashed border-primary/30 bg-white/60 px-5 py-7 text-sm text-muted-foreground">
              Submit a password to view score, entropy, checks, and practical hardening tips.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${labelTone[insight.label]}`}
                >
                  {insight.label}
                </span>
                <span className="text-sm text-muted-foreground">
                  Score {insight.score}/100 | Entropy {insight.entropy} bits
                </span>
                <span className="text-sm text-muted-foreground">
                  Source: {insight.source === "model" ? "ML endpoint" : "Local heuristic"}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${insight.score}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <Gauge className="size-4 text-primary" />
                    Strength band
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {getStrengthBand(insight.score)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Based on total score and password structure.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <ScanSearch className="size-4 text-primary" />
                    Check coverage
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {passedChecks}/{insight.checks.length} passed
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {checkCompletion}% of core security checks completed.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <Activity className="size-4 text-primary" />
                    Estimated resistance
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {getCrackWindow(insight.entropy)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    A simple entropy-based estimate for user understanding.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <BadgeCheck className="size-4 text-primary" />
                    Urgency
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {getUrgencyTone(insight.score)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Confidence {Math.round(insight.confidence * 100)}% on this evaluation.
                  </p>
                </div>
              </div>

              <div className="h-56 rounded-2xl bg-white/70 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="rgba(18,54,86,0.22)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#284867", fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      dataKey="value"
                      stroke="#25608d"
                      fill="#2f80b9"
                      fillOpacity={0.32}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Security completion</p>
                    <span className="text-sm text-muted-foreground">{checkCompletion}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${checkCompletion}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    This summarizes how many of the core password hygiene checks are currently being
                    satisfied.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">Priority fixes</p>
                  {missingChecks.length ? (
                    <div className="space-y-2">
                      {missingChecks.slice(0, 3).map((check) => (
                        <div
                          key={check.label}
                          className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800"
                        >
                          <TriangleAlert className="size-4 shrink-0" />
                          <span>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                      All major checks passed. Keep it unique and pair it with MFA.
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {insight.checks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm"
                  >
                    {check.passed ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <CircleAlert className="size-4 text-amber-600" />
                    )}
                    <span>{check.label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-primary/8 p-4">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <ShieldCheck className="size-4" />
                  Hardening tips
                </p>
                <ul className="space-y-1 text-sm text-foreground/85">
                  {insight.tips.map((tip) => (
                    <li key={tip}>- {tip}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
