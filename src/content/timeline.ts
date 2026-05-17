export interface TimelineEntry {
  date: string;
  title: string;
  body: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    date: "2024 · Q2",
    title: "Decided to switch into cloud",
    body: "Made the call to move from my previous field into Cloud and DevOps. Started AWS Cloud Practitioner study and committed to learning in public.",
  },
  {
    date: "2024 · Q3",
    title: "First hands-on labs",
    body: "Built a custom VPC with public/private subnets, NAT Gateway, and a bastion host. Networking stopped being a black box.",
  },
  {
    date: "2024 · Q4",
    title: "Cloud Practitioner certified",
    body: "Passed the AWS Cloud Practitioner exam. Moved into Docker fundamentals and started building reproducible local environments.",
  },
  {
    date: "2025 · Q1",
    title: "Dockerized everything",
    body: "Multi-stage Dockerfiles, compose stacks, internal networks. Built the first multi-container app and made it reproducible from scratch.",
  },
  {
    date: "2025 · Q2",
    title: "CI/CD pipeline live",
    body: "GitHub Actions workflow that lints, builds, pushes a Docker image, and deploys to EC2 over SSH. First end-to-end automated deploy.",
  },
  {
    date: "2025 · Q3",
    title: "Observability stack",
    body: "Prometheus scraping Node Exporter, Grafana dashboards, alerts on saturation. Machines started explaining themselves.",
  },
  {
    date: "2026 · Q2",
    title: "Portofolio launch",
    body: "Shipped this site. Each project on the home gallery is something I actually built — not a list of tools I've heard of.",
  },
];
