import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { PROJECTS, getProjectBySlug } from "@/content/projects/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <div className="mt-8 flex items-center gap-2 font-mono">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
          {project.category}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{project.date}</span>
      </div>

      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted"
        style={{ border: "1px solid rgba(74, 124, 89, 0.2)" }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={1280}
          height={720}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Highlights</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-light" />
            {h}
          </li>
        ))}
      </ul>

      {project.githubUrl || project.liveUrl ? (
        <div className="mt-10 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 font-mono text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              View code
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 font-mono text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Live demo
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
