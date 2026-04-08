import { Fingerprint, Layers3, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  {
    icon: Fingerprint,
    title: "Trust by Design",
    description:
      "Every interaction is designed to make security understandable and less intimidating for real users.",
  },
  {
    icon: Layers3,
    title: "Systematic UI Architecture",
    description:
      "Reusable components, clear spacing rhythm, and consistent motion make this product easy to maintain.",
  },
  {
    icon: Sparkles,
    title: "Elegant Product Personality",
    description:
      "Balanced color strategy, typography hierarchy, and micro-interactions create a premium feel.",
  },
  {
    icon: Users,
    title: "Team-Centered Delivery",
    description:
      "This website is shaped for demos, portfolio reviews, and collaboration with mentors, clients, and peers.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="section-kicker">About Us</p>
        <h1 className="text-4xl font-semibold leading-tight">We build secure products with polished UX</h1>
        <p className="max-w-3xl text-muted-foreground">
          CipherNest combines product design thinking with practical frontend engineering so security
          tools feel understandable, usable, and trustworthy.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {principles.map((principle) => (
          <Card key={principle.title} className="glass-surface border-white/70">
            <CardHeader className="space-y-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <principle.icon className="size-5" />
              </span>
              <CardTitle>{principle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="glass-surface rounded-3xl border border-white/70 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Implemented stack highlights</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          React + Next.js for architecture, Tailwind for design system execution, Framer Motion for
          animation, React Hook Form + Zod for robust input UX, and TanStack Query for async data flow.
        </p>
      </section>
    </div>
  );
}
