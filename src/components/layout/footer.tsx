import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin, Whatsapp } from "@/components/ui/brand-icons";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Built in public.
        </p>
        <div className="flex items-center gap-1">
          <Link
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href={SITE.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Whatsapp className="h-4 w-4" />
          </Link>
          <Link
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
