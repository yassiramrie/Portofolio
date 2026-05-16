import { TIMELINE } from "@/content/timeline";

export function Timeline() {
  return (
    <ol className="relative mt-12 space-y-10 border-l border-white/10 pl-8">
      {TIMELINE.map((entry, i) => (
        <li key={entry.date} className="relative">
          <span
            aria-hidden
            className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full bg-primary"
            style={{
              boxShadow:
                "0 0 0 4px rgba(8, 8, 8, 1), 0 0 14px rgba(74, 124, 89, 0.6)",
            }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-light">
            {entry.date}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
            {entry.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {entry.body}
          </p>
          {i === TIMELINE.length - 1 ? null : null}
        </li>
      ))}
    </ol>
  );
}
