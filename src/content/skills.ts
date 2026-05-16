import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Archive,
  BarChart3,
  Cloud,
  Container,
  Database,
  Eye,
  FileCog,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  LineChart,
  MapPin,
  Network,
  PlayCircle,
  Server,
  Wrench,
  Zap,
} from "lucide-react";

export type Proficiency = "exploring" | "comfortable" | "shipping";

export interface Skill {
  name: string;
  icon: LucideIcon;
  proficiency: Proficiency;
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  intro: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cloud",
    title: "Cloud · AWS",
    intro:
      "What I've actually configured in the console and CLI — not just read about.",
    skills: [
      { name: "EC2", icon: Server, proficiency: "shipping" },
      { name: "VPC", icon: Network, proficiency: "shipping" },
      { name: "S3", icon: Archive, proficiency: "shipping" },
      { name: "RDS", icon: Database, proficiency: "comfortable" },
      { name: "Lambda", icon: Zap, proficiency: "comfortable" },
      { name: "CloudFront", icon: Globe, proficiency: "comfortable" },
      { name: "Route 53", icon: MapPin, proficiency: "comfortable" },
      { name: "IAM", icon: KeyRound, proficiency: "shipping" },
    ],
  },
  {
    id: "containers",
    title: "Containers",
    intro: "Reproducible local + prod parity. Compose stacks for everything.",
    skills: [
      { name: "Docker", icon: Container, proficiency: "shipping" },
      { name: "Compose", icon: Layers, proficiency: "shipping" },
      { name: "ECR", icon: Archive, proficiency: "comfortable" },
    ],
  },
  {
    id: "ci-cd",
    title: "CI / CD",
    intro: "One commit away from production.",
    skills: [
      { name: "GitHub Actions", icon: PlayCircle, proficiency: "shipping" },
      { name: "Git workflows", icon: GitBranch, proficiency: "shipping" },
    ],
  },
  {
    id: "monitoring",
    title: "Observability",
    intro: "Machines should explain themselves.",
    skills: [
      { name: "Prometheus", icon: Activity, proficiency: "comfortable" },
      { name: "Grafana", icon: LineChart, proficiency: "comfortable" },
      { name: "Node Exporter", icon: BarChart3, proficiency: "comfortable" },
      { name: "CloudWatch", icon: Eye, proficiency: "comfortable" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    intro: "Manual first to learn the shape, then automated.",
    skills: [
      { name: "Terraform", icon: Wrench, proficiency: "exploring" },
      { name: "CloudFormation", icon: FileCog, proficiency: "exploring" },
    ],
  },
  {
    id: "platform",
    title: "Platform fundamentals",
    intro: "The substrate everything else sits on.",
    skills: [
      { name: "Linux / shell", icon: Server, proficiency: "shipping" },
      { name: "Networking", icon: Network, proficiency: "comfortable" },
      { name: "Cloud security basics", icon: KeyRound, proficiency: "comfortable" },
      { name: "Cost awareness", icon: Cloud, proficiency: "comfortable" },
    ],
  },
];

export const PROFICIENCY_LABEL: Record<Proficiency, string> = {
  exploring: "exploring",
  comfortable: "comfortable",
  shipping: "shipping",
};

export const PROFICIENCY_LEVEL: Record<Proficiency, number> = {
  exploring: 1,
  comfortable: 2,
  shipping: 3,
};
