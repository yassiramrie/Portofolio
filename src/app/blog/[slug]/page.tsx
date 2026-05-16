import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return { title: post.title, description: post.summary };
  } catch {
    return {};
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  cloud: "text-sky-400",
  containers: "text-blue-400",
  "ci-cd": "text-violet-400",
  monitoring: "text-emerald-400",
  iac: "text-orange-400",
  general: "text-neutral-400",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Blog
      </Link>

      <div className="mt-8">
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
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {post.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="my-10 border-white/10" />

      <article className="prose prose-invert prose-sm sm:prose-base max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-7 prose-p:text-muted-foreground
        prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:text-primary-light prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
        prose-blockquote:border-l-primary-light prose-blockquote:text-muted-foreground
        prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
        prose-hr:border-white/10
        prose-li:text-muted-foreground prose-li:leading-7
        prose-ul:my-4 prose-ol:my-4
      ">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-16 border-t border-white/10 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
