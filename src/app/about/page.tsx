import { Timeline } from "@/components/sections/timeline";

export const metadata = {
  title: "About",
  description: "Career switch into Cloud / DevOps, told as a timeline of what was actually built.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
        About
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Career switch, told as a timeline.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
        I'm moving into Cloud and DevOps from a different field. Instead of
        claiming mastery, I'm writing down what I built each quarter — the
        services I configured, the things I broke, the dashboards I wired up.
        This page is that log.
      </p>

      <section className="mt-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          The plan in one paragraph
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Learn AWS by deploying real services into it. Containerize everything
          so it's reproducible. Wire up CI/CD so deploys are one commit away.
          Make systems explain themselves with Prometheus and Grafana. Move
          toward infrastructure-as-code once the foundations are visible. Share
          every step in public so the journey is the proof.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Milestones
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Each entry is something I shipped or earned, not something I read
          about.
        </p>
        <Timeline />
      </section>

      <section className="mt-20 rounded-xl border border-white/10 bg-card p-6 sm:p-8">
        <h2 className="text-balance text-xl font-semibold tracking-tight">
          What's next
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-light" />
            Turn each AWS service I've used into a small public build note.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-light" />
            Ship an end-to-end project: AWS + Docker + GitHub Actions +
            monitoring, all in one repo.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-light" />
            Start writing troubleshooting stories, not just polished outcomes.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-light" />
            Move toward Terraform once the manual foundations feel automatic.
          </li>
        </ul>
      </section>
    </div>
  );
}
