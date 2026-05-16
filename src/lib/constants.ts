export const SITE = {
  // TODO: replace with real values before deploying
  name: "yassir.dev",
  role: "Cloud / DevOps Engineer in Training",
  description:
    "A public learning log for the move into Cloud and DevOps: AWS foundations, containerized delivery, CI/CD habits, and monitoring that makes systems explain themselves.",
  url: "https://example.com",
  email: "yassiramrie97@gmail.com",
  social: {
    github: "https://github.com/your-handle",
    linkedin: "https://www.linkedin.com/in/yassir-amrie-nasrullah/",
    twitter: "https://x.com/your-handle",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/skills", label: "skills" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
] as const;

export const CONTACT_LINK = { href: "/contact", label: "contact" } as const;
