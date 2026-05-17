"use client";

import React, { useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { useCardContext } from "./card-context";

export function CardModal() {
  const { selectedProject, setSelectedProject } = useCardContext();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedProject) return null;

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (rect.width / 2 - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const handleClose = () => setSelectedProject(null);
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        transition: "all 0.3s ease",
      }}
      onClick={handleBackdropClick}
    >
      {/* Close button — inside on mobile, outside on sm+ */}
      <div className="relative w-full sm:max-w-lg">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 sm:-top-12 sm:right-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:text-[#6BA37A] hover:bg-white/20 transition-colors sm:bg-transparent sm:rounded-none"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>

        <div style={{ perspective: "1000px" }}>
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-t-2xl sm:rounded-2xl bg-[#111111] p-5 transition-all duration-500 ease-out max-h-[90svh] overflow-y-auto"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
              border: "1px solid rgba(74, 124, 89, 0.2)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* drag handle bar for mobile */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            <div
              className="relative w-full mb-4 rounded-xl overflow-hidden"
              style={{ aspectRatio: "16 / 9" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 h-full w-full object-cover"
                alt={selectedProject.title}
                src={selectedProject.imageUrl}
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6BA37A] font-semibold">
                {selectedProject.category}
              </span>
              <span className="text-white/30">·</span>
              <span className="text-xs text-white/50">
                {selectedProject.date}
              </span>
            </div>

            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-1.5 mb-5 text-sm text-white/75">
              {selectedProject.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-[#6BA37A] shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              {selectedProject.githubUrl ? (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              ) : null}
              <a
                href={`/projects/${selectedProject.slug}`}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#4A7C59] text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
                View details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
