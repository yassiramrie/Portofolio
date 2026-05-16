import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Build notes and learning logs from a Cloud/DevOps career switch.",
};

const CATEGORY_COLORS: Record<string, string> = {
  cloud: "text-sky-400",
  containers: "text-blue-400",
  "ci-cd": "text-violet-400",
  monitoring: "text-emerald-400",
  iac: "text-orange-400",
  general: "text-neutral-400",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
        Blog
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Build notes and learning logs.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Written as I go — what I built, what broke, and what stuck. Less
        tutorial, more lab notebook.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 font-mono text-sm text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <div className="mt-12 space-y-px">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 rounded-xl px-5 py-5 transition-colors hover:bg-white/[0.03]"
              style={{ border: "1px solid transparent" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p
                  className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${CATEGORY_COLORS[post.category] ?? "text-neutral-400"}`}
                >
                  {post.category}
                </p>
                <time
                  dateTime={post.date}
                  className="font-mono text-[10px] text-muted-foreground"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h2 className="mt-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary-light">
                {post.title}
              </h2>

              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {post.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
