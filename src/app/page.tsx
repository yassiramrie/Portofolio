import Link from "next/link";
import { Activity, ArrowRight, Cloud, Container, GitBranch } from "lucide-react";
import { CardProvider } from "@/components/3d/card-context";
import { CardModal } from "@/components/3d/card-modal";
import { HeroSection } from "@/components/sections/hero-section";
import { PROJECTS } from "@/content/projects/projects";
import { DevOpsExtras } from "@/components/sections/devops-extras";

const highlights = [
  {
    icon: Cloud,
    label: "AWS foundations",
    body: "VPCs, EC2, S3, RDS, Lambda — built and broken on purpose.",
  },
  {
    icon: Container,
    label: "Containers",
    body: "Multi-stage Dockerfiles and compose stacks for reproducible local + prod parity.",
  },
  {
    icon: GitBranch,
    label: "CI/CD",
    body: "GitHub Actions workflows that lint, build, push images, and deploy on commit.",
  },
  {
    icon: Activity,
    label: "Observability",
    body: "Prometheus + Grafana dashboards so machines explain themselves.",
  },
];

export default function HomePage() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <CardProvider>
      <HeroSection />

      <DevOpsExtras />

      <section
        className="relative z-10 px-5 py-20 sm:px-8 lg:py-28"
        style={{ background: "rgba(8, 8, 8, 0.5)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                Current foundation
              </p>
              <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Each milestone is built so it can be demonstrated, not just listed.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Real services, real screenshots, real failures fixed. The journey is
              the proof — and this site keeps it visible.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, label, body }) => (
              <article
                key={label}
                className="rounded-xl bg-card p-5 transition-colors"
                style={{ border: "1px solid rgba(74, 124, 89, 0.2)" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative z-10 px-5 pb-24 sm:px-8"
        style={{ background: "rgba(8, 8, 8, 0.5)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 font-mono text-sm font-medium text-primary-light hover:underline"
            >
              See all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CardModal />
    </CardProvider>
  );
}
