import {
  PROFICIENCY_LABEL,
  PROFICIENCY_LEVEL,
  SKILL_CATEGORIES,
  type Proficiency,
} from "@/content/skills";
import { cn } from "@/lib/utils";

function ProficiencyDots({ level }: { level: Proficiency }) {
  const value = PROFICIENCY_LEVEL[level];
  return (
    <span
      className="inline-flex items-center gap-1"
      title={PROFICIENCY_LABEL[level]}
      aria-label={`Proficiency: ${PROFICIENCY_LABEL[level]}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "block h-1.5 w-1.5 rounded-full",
            i < value ? "bg-primary-light" : "bg-white/15",
          )}
        />
      ))}
    </span>
  );
}

export function SkillsGrid() {
  return (
    <div className="mt-12 space-y-14">
      {SKILL_CATEGORIES.map((category) => (
        <section key={category.id}>
          <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
                {category.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.intro}
              </p>
            </div>
          </header>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <li
                  key={skill.name}
                  className="group flex items-center justify-between gap-4 rounded-xl bg-card p-4 transition-colors"
                  style={{ border: "1px solid rgba(74, 124, 89, 0.2)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {skill.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {PROFICIENCY_LABEL[skill.proficiency]}
                      </p>
                    </div>
                  </div>
                  <ProficiencyDots level={skill.proficiency} />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
