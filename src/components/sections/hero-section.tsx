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
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <StarfieldBackground />
      <StellarCardGallery />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "42%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 56px",
          zIndex: 10,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, rgba(8,8,8,0.85) 60%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#6BA37A] animate-pulse" />
          <span className="font-mono text-[#6BA37A] text-xs uppercase tracking-widest">
            available for work
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
          <span className="block">Cloud journeys, written in</span>
          <span className="block text-[#6BA37A]">deployments.</span>
        </h1>

        <p className="mt-6 font-mono text-sm text-neutral-500 leading-relaxed">
          AWS · Docker · Terraform · CI/CD · Monitoring
          <br />
          Career switch. Building in public.
        </p>

        <div className="flex flex-row gap-3 mt-8" style={{ pointerEvents: "auto" }}>
          <Link
            href="/projects"
            className="bg-[#4A7C59] text-white font-mono font-bold text-xs px-5 py-2.5 rounded-md uppercase tracking-wider hover:bg-[#4A7C59]/90 transition-colors"
          >
            ↗ view projects
          </Link>
          <Link
            href="/about"
            className="border border-white/15 text-neutral-400 font-mono text-xs px-5 py-2.5 rounded-md hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider"
          >
            read the story
          </Link>
        </div>

        <p className="absolute bottom-8 left-[56px] font-mono text-[10px] text-neutral-600 tracking-widest">
          drag · scroll · click to explore
        </p>
      </div>
    </section>
  );
}
