import type { Project } from "@/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=90`;

export const PROJECTS: Project[] = [
  {
    id: "vpc-architecture",
    slug: "vpc-architecture",
    title: "VPC Architecture",
    description:
      "Custom AWS VPC with public and private subnets, NAT Gateway, route tables, and a bastion host for safe private-subnet access.",
    imageUrl: "/vpc.png",
    tags: ["AWS", "VPC", "Networking", "Bastion"],
    category: "cloud",
    date: "2025-01-12",
    highlights: [
      "Three-tier subnet layout across two AZs",
      "Hardened security groups and NACLs",
      "Bastion host with key-only SSH access",
    ],
  },
  {
    id: "auto-scaling-app",
    slug: "auto-scaling-app",
    title: "Auto-Scaling Web App",
    description:
      "EC2 Auto Scaling Group fronted by an Application Load Balancer with health checks and rolling launch template updates.",
    imageUrl: "/auto-scaling.png", // Sesuaikan dengan nama gambar Anda di folder public
    tags: ["AWS", "EC2", "ASG", "ALB"],
    category: "cloud",
    date: "2025-02-04",
    highlights: [
      "Launch template with user-data bootstrap",
      "Target tracking on CPU utilization",
      "Zero-downtime instance refresh",
    ],
  },
  {
    id: "s3-static-cloudfront",
    slug: "s3-static-cloudfront",
    title: "S3 Static Site + CDN",
    description:
      "Static site hosted on S3, distributed through CloudFront with HTTPS, custom domain, and cache invalidation on deploy.",
    imageUrl: "/s3.png", // Sesuaikan dengan nama gambar Anda di folder public
    tags: ["AWS", "S3", "CloudFront", "Route 53"],
    category: "cloud",
    date: "2025-02-18",
    highlights: [
      "Private bucket with OAC-only access",
      "ACM certificate for custom domain",
      "Deploy script with cache invalidation",
    ],
  },
  {
    id: "rds-database",
    slug: "rds-database",
    title: "RDS Database Setup",
    description:
      "PostgreSQL on RDS with private-subnet placement, parameter groups, automated backups, and least-privilege application users.",
    imageUrl: img("1544383835-bda2bc66a55d"),
    tags: ["AWS", "RDS", "PostgreSQL", "Backups"],
    category: "cloud",
    date: "2025-03-02",
    highlights: [
      "Private subnet with strict security group",
      "Automated daily snapshots",
      "App user with scoped grants only",
    ],
  },
  {
    id: "serverless-api",
    slug: "serverless-api",
    title: "Serverless API",
    description:
      "Lambda functions behind API Gateway with DynamoDB persistence and per-route IAM policies for least privilege.",
    imageUrl: img("1518770660439-4636190af475"),
    tags: ["AWS", "Lambda", "API Gateway", "DynamoDB"],
    category: "cloud",
    date: "2025-03-19",
    highlights: [
      "Per-function IAM scoping",
      "DynamoDB single-table design",
      "Cold-start friendly handler structure",
    ],
  },
  {
    id: "dockerized-microservices",
    slug: "dockerized-microservices",
    title: "Dockerized Microservices",
    description:
      "Multi-container application orchestrated with docker-compose, including a reverse proxy and shared internal network.",
    imageUrl: img("1605379399642-870262d3d051"),
    tags: ["Docker", "Compose", "NGINX", "Microservices"],
    category: "devops",
    date: "2025-04-07",
    highlights: [
      "Multi-stage Dockerfiles per service",
      "Internal-only network for service-to-service",
      "NGINX reverse proxy as the public edge",
    ],
  },
  {
    id: "github-actions-cicd",
    slug: "github-actions-cicd",
    title: "CI/CD Pipeline",
    description:
      "GitHub Actions workflow that lints, builds, pushes a Docker image, and deploys to EC2 over SSH on every main-branch commit.",
    imageUrl: img("1556075798-4825dfaaf498"),
    tags: ["GitHub Actions", "Docker", "EC2", "SSH"],
    category: "ci-cd",
    date: "2025-04-22",
    highlights: [
      "Cached dependencies for fast builds",
      "Image tagged by commit SHA",
      "Secrets injected through Actions vault",
    ],
  },
  {
    id: "monitoring-stack",
    slug: "monitoring-stack",
    title: "Monitoring Stack",
    description:
      "Prometheus scraping Node Exporter targets with Grafana dashboards for CPU, memory, disk, and network at a glance.",
    imageUrl: img("1551288049-bebda4e38f71"),
    tags: ["Prometheus", "Grafana", "Node Exporter", "Observability"],
    category: "monitoring",
    date: "2025-05-08",
    highlights: [
      "Dashboards versioned as JSON",
      "Alerts on saturation, not just thresholds",
      "Compose stack for one-command spin-up",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
