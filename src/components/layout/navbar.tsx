"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getScrollTop = () =>
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      window.scrollY ||
      0;
    const onScroll = () => setScrolled(getScrollTop() > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] backdrop-blur-xl transition-colors duration-300",
        scrolled ? "bg-black/80" : "bg-black/60",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span
            className="h-[7px] w-[7px] rounded-full animate-pulse"
            style={{
              background: "#4A7C59",
              boxShadow:
                "0 0 10px rgba(74, 124, 89, 0.7), 0 0 18px rgba(74, 124, 89, 0.35)",
            }}
            aria-hidden
          />
          <span className="font-mono font-bold text-sm text-white">yassir.dev</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-xs px-3 py-1 rounded-md transition-all",
                  active
                    ? "bg-[#4A7C59]/10 text-white border border-[#4A7C59]/25"
                    : "text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Link
            href={CONTACT_LINK.href}
            className="border border-[#4A7C59]/40 text-[#6BA37A] hover:bg-[#4A7C59]/10 px-4 py-1.5 rounded-md font-mono text-xs uppercase tracking-widest transition-all"
          >
            {CONTACT_LINK.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/[0.06] bg-black/85 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3 sm:px-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-mono text-sm px-3 py-2 rounded-md transition-all",
                    active
                      ? "bg-[#4A7C59]/10 text-white border border-[#4A7C59]/25"
                      : "text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={CONTACT_LINK.href}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit border border-[#4A7C59]/40 text-[#6BA37A] hover:bg-[#4A7C59]/10 px-4 py-1.5 rounded-md font-mono text-xs uppercase tracking-widest transition-all"
            >
              {CONTACT_LINK.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
