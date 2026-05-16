export type ProjectCategory = "cloud" | "devops" | "monitoring" | "ci-cd";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  highlights: string[];
}

export interface NavLink {
  href: string;
  label: string;
}
