"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { StarfieldBackground } from "@/components/3d/starfield-background";

const StellarCardGallery = dynamic(
  () => import("@/components/3d/stellar-card-gallery"),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh" }}
    >
      <StarfieldBackground />
      <div className="absolute inset-0 translate-x-8 md:translate-x-24 pointer-events-none [&>*]:pointer-events-auto">
        <StellarCardGallery />
      </div>

      {/*
        Mobile  : full-width panel anchored to bottom (text sits over lower portion)
        md+     : left 42% panel with horizontal gradient
      */}
      <div
        className={[
          // shared
          "hero-overlay absolute z-10 flex flex-col justify-end pointer-events-none",
          // mobile
          "bottom-0 left-0 right-0 px-6 pb-12",
          // sm
          "sm:px-10 sm:pb-16",
          // md+ — become a left panel
          "md:inset-auto md:top-0 md:left-0 md:right-auto md:bottom-auto",
          "md:h-full md:w-[42%] md:px-14 md:pb-0 md:justify-center",
        ].join(" ")}
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#6BA37A] animate-pulse" />
          <span className="font-mono text-[#6BA37A] text-xs uppercase tracking-widest">
            available for work
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
          <span className="block">Cloud journeys,</span>
          <span className="block sm:inline"> written in</span>
          <span className="block text-[#6BA37A]">deployments.</span>
        </h1>

        <p className="mt-5 font-mono text-xs sm:text-sm text-neutral-500 leading-relaxed">
          AWS · Docker · Terraform · CI/CD · Monitoring
          <br />
          Career switch. Building in public.
        </p>

        <div
          className="grid grid-cols-2 sm:flex sm:flex-row gap-3 mt-7"
          style={{ pointerEvents: "auto" }}
        >
          <Link
            href="/projects"
            className="bg-[#4A7C59] text-white font-mono font-bold text-xs px-4 py-3 rounded-md uppercase tracking-wider hover:bg-[#4A7C59]/90 transition-colors text-center"
          >
            ↗ projects
          </Link>
          <Link
            href="/about"
            className="border border-white/15 text-neutral-400 font-mono text-xs px-4 py-3 rounded-md hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider text-center"
          >
            my story
          </Link>
        </div>

        {/* hint — hidden on mobile to save space, shown md+ */}
        <p className="hidden md:block absolute bottom-8 font-mono text-[10px] text-neutral-600 tracking-widest">
          drag · scroll · click to explore
        </p>
      </div>
    </section>
  );
}
