import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readMeta(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "general",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((f) => readMeta(f.replace(/\.mdx$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "general",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    content,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
