import Link from "next/link";

const footerLinks = [
  { href: "/prediction", label: "Prediction Lab" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Team" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/50 bg-white/55">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold">CipherNest Security Studio</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Advanced password intelligence with elegant product experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="link-pill">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-xs tracking-wide text-muted-foreground">
          Built with Next.js, React, Tailwind CSS, Framer Motion, React Hook Form, Zod, and TanStack Query.
        </p>
      </div>
    </footer>
  );
}
