"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    name: "Password Analyzer Platform",
    summary:
      "End-to-end UX redesign from a single utility page into a complete product website with dedicated routes.",
    outcome: "Improved clarity, trust, and presentation quality for demos and portfolio reviews.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TanStack Query"],
  },
  {
    name: "Prediction Experience Upgrade",
    summary:
      "Introduced validated input flow, resilient API bridge, and visualization-driven reporting cards.",
    outcome: "Faster feedback loop with explainable outputs and better failure handling.",
    tech: ["React Hook Form", "Zod", "Recharts", "Next API Route"],
  },
  {
    name: "Design Language System",
    summary:
      "Built reusable theme tokens, glass surfaces, and responsive layout primitives to keep pages consistent.",
    outcome: "Elegant feel across desktop and mobile with stronger brand personality.",
    tech: ["Design Tokens", "Responsive Grid", "Accessibility-First Components"],
  },
];

const stackCapabilities = [
  "Design-ready information architecture",
  "Reusable component system with shadcn patterns",
  "Motion that supports narrative, not distraction",
  "Form accessibility and semantic structure",
  "Performance-friendly SSR-ready page routing",
];

export default function PortfolioPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="section-kicker">Our Portfolio</p>
        <h1 className="text-4xl font-semibold leading-tight">Security Products with premium UX quality</h1>
        <p className="max-w-3xl text-muted-foreground">
          This portfolio page highlights your product engineering approach: design intention, technical
          rigor, and measurable interaction quality.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
          >
            <Card className="glass-surface h-full border-white/70">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.summary}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  <span className="font-medium">Outcome:</span> {project.outcome}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="glass-surface rounded-3xl border border-white/70 p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="section-kicker">Capability Matrix</p>
            <h2 className="text-3xl font-semibold">What this stack now demonstrates</h2>
            <p className="text-sm text-muted-foreground">
              Your requested advanced stack appears in practical implementation choices, not just a tools list.
            </p>
          </div>
          <div className="space-y-2">
            {stackCapabilities.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Production-ready direction
          <ArrowUpRight className="size-4" />
        </div>
      </section>
    </div>
  );
}
