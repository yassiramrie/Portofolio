"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PROJECTS } from "@/content/projects/projects";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "all" },
  { value: "cloud", label: "cloud" },
  { value: "devops", label: "devops" },
  { value: "ci-cd", label: "ci-cd" },
  { value: "monitoring", label: "monitoring" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const acc: Record<string, number> = { all: PROJECTS.length };
    for (const p of PROJECTS) {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
    }
    return acc;
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-5 pb-24 pt-32 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
        Projects
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Things built, broken, and rebuilt.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Each entry is a real build, with the highlights that matter. Filter by
        what you want to dig into.
      </p>

      <div
        className="mt-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTERS.map(({ value, label }) => {
          const active = filter === value;
          const count = counts[value] ?? 0;
          const disabled = count === 0 && value !== "all";
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => setFilter(value)}
              className={cn(
                "font-mono text-xs px-3 py-1.5 rounded-md transition-all",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                active
                  ? "bg-[#4A7C59]/15 text-white border border-[#4A7C59]/35"
                  : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent",
              )}
            >
              {label}
              <span className="ml-2 text-[10px] text-muted-foreground">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 font-mono text-sm text-muted-foreground">
          Nothing in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group rounded-xl bg-card overflow-hidden transition-all hover:[border-color:rgba(74,124,89,0.5)]"
              style={{ border: "1px solid rgba(74, 124, 89, 0.2)" }}
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
                  {project.category}
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
