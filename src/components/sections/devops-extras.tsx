"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export function DevOpsExtras() {
  const [text, setText] = useState("");
  const fullText = "whoami\n> Cloud & DevOps Enthusiast\n\ndocker run --rm skills\n> Loading skills... AWS, Docker, CI/CD, Next.js... [OK]";

  // Animasi ngetik terminal
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const techStack = ["AWS", "Docker", "GitHub Actions", "Linux", "TypeScript", "Terraform", "Next.js", "Prometheus", "Grafana", "Nginx"];

  return (
    <div className="relative z-10 w-full bg-background/80 py-12 backdrop-blur-sm">
      {/* Infinite Marquee Section */}
      <div className="flex w-full overflow-hidden border-y border-white/5 bg-black/20 py-4">
        <div className="flex animate-[slide_30s_linear_infinite] whitespace-nowrap">
          {/* Render 3 kali agar loop-nya menyatu tanpa putus */}
          {[...techStack, ...techStack, ...techStack].map((tech, idx) => (
            <span key={idx} className="mx-8 font-mono text-sm font-semibold text-white/40 transition-colors hover:text-[#6BA37A]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Terminal Interaktif Section */}
      <div className="mx-auto mt-12 max-w-3xl px-5">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 flex items-center gap-2 font-mono text-xs text-white/50">
              <Terminal className="h-3 w-3" /> ubuntu@ec2-portfolio:~
            </span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed text-green-400 sm:text-base">
            <pre className="whitespace-pre-wrap">
              <span className="text-blue-400">ubuntu@ec2</span>:<span className="text-white">~</span>$ {text}
              <span className="animate-pulse">_</span>
            </pre>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </div>
  );
}