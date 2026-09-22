import { Mail, MessageCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { SITE } from "@/lib/constants";

const channels = [
  { icon: Mail, label: "Email", href: `mailto:${SITE.email}`, value: SITE.email },
  { icon: Github, label: "GitHub", href: SITE.social.github, value: SITE.social.github },
  { icon: Linkedin, label: "LinkedIn", href: SITE.social.linkedin, value: SITE.social.linkedin },
  { icon: MessageCircle, label: "WhatsApp", href: SITE.social.whatsapp, value: SITE.social.whatsapp },
];

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
        Contact
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
        Let&apos;s talk cloud.
      </h1>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        Placeholder — a contact form arrives in Phase 8. In the meantime, these
        channels all work.
      </p>

      <ul className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
        {channels.map(({ icon: Icon, label, href, value }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 p-5 transition-colors hover:bg-white/5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
