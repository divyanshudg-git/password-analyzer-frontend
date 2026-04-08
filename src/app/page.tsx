"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  LockKeyhole,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    icon: ShieldAlert,
    title: "Security-First Prediction",
    description:
      "Blend machine learning and heuristic confidence so users get fast and explainable risk signals.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Actionable UX Metrics",
    description:
      "Every result includes score, entropy, and hygiene indicators to drive better password behavior.",
  },
  {
    icon: Zap,
    title: "Smooth Micro-Interactions",
    description:
      "Framer Motion transitions keep each page lively and premium without reducing clarity or speed.",
  },
];

const stats = [
  { label: "Prediction Engine", value: "ML + Heuristic" },
  { label: "Experience", value: "Multi-Page App" },
  { label: "Design Style", value: "Elegant Security UI" },
];

const heroSignals = [
  { label: "Threat Detection", value: "94%", tone: "bg-emerald-500" },
  { label: "Response Clarity", value: "Explainable", tone: "bg-sky-500" },
  { label: "UX Flow", value: "Guided", tone: "bg-amber-500" },
];

export default function HomePage() {
  return (
    <div className="space-y-14 pb-6">
      <section className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <p className="section-kicker">Cyber Intelligence Studio</p>
          <h1 className="hero-title">
            Build <span className="ink-gradient">confident security decisions</span> with a
            modern password platform.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            Your project is now structured for a complete product flow: polished home page,
            interactive prediction lab, portfolio storytelling, and team-first credibility pages.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/prediction">
                Launch Prediction Lab
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl bg-white/60">
              <Link href="/portfolio">Explore Portfolio</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/70 bg-white/62 px-3 py-3 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="glass-surface relative overflow-hidden rounded-[2rem] border border-white/70 p-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,134,190,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(190,142,72,0.18),transparent_32%)]" />
          <div className="relative space-y-4 rounded-[1.6rem] border border-white/65 bg-slate-950 px-5 py-5 text-white shadow-[0_22px_60px_rgba(15,23,42,0.24)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Security Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Live Password Intelligence</h2>
              </div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                User-friendly analytics
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                >
                  <div className={`mb-3 h-1.5 w-12 rounded-full ${signal.tone}`} />
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {signal.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{signal.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Security health score</span>
                  <span>84 / 100</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-300"
                    initial={{ width: 0 }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                  />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/6 p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <LockKeyhole className="size-4 text-cyan-300" />
                      Entropy reading
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Measures complexity so users understand why a result is strong or weak.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/6 p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <Sparkles className="size-4 text-amber-300" />
                      Guided improvement
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Converts technical output into direct next actions for faster decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                {[
                  { title: "Prediction", value: "Strong", helper: "ML-backed confidence layer" },
                  { title: "Risk Pattern", value: "Low", helper: "No repeated token sequence" },
                  { title: "Recommendation", value: "Reuse not advised", helper: "Pair with MFA" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-white/6 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {item.title}
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
          >
            <Card className="glass-surface h-full border-white/70">
              <CardHeader className="space-y-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <card.icon className="size-5" />
                </span>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="glass-surface rounded-3xl border border-white/70 p-6 md:p-8"
      >
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            <p className="section-kicker">What You Can Demo</p>
            <h2 className="text-3xl font-semibold leading-tight">
              A complete flow from first impression to actionable prediction.
            </h2>
            <p className="text-sm text-muted-foreground">
              The architecture now supports storytelling, usability, and technical confidence in one
              cohesive website.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Multi-page IA with clear navigation",
              "Advanced form flow with validation",
              "Animated data visualization for results",
              "Portfolio and team credibility pages",
            ].map((point) => (
              <div
                key={point}
                className="rounded-xl border border-white/70 bg-white/65 px-4 py-3 text-sm text-foreground/90"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
