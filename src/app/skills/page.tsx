import { SkillsGrid } from "@/components/sections/skills-grid";

export const metadata = {
  title: "Skills",
  description:
    "Cloud, containers, CI/CD, observability, and IaC — grouped by what I've actually used.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-5 pb-24 pt-32 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
        Skills
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Tools, services, and how far I've taken each one.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Grouped by what each tool does, not by how impressive the logo looks.
        Each dot count is honest about where I am — exploring, comfortable, or
        actively shipping with it.
      </p>

      <div
        className="mt-8 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl bg-card px-5 py-3 font-mono text-[11px] text-muted-foreground"
        style={{ border: "1px solid rgba(74, 124, 89, 0.2)" }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </span>
          exploring
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </span>
          comfortable
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
          </span>
          shipping
        </span>
      </div>

      <SkillsGrid />
    </div>
  );
}
