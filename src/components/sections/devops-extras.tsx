"use client";

import React, { useState, useEffect } from "react";
import { Server, Activity, Database, Cloud, Zap, Globe, MousePointerClick } from "lucide-react";

const UPGRADES = [
  { id: "ec2", name: "t2.micro Instance", baseCost: 15, rps: 1, icon: Server },
  { id: "alb", name: "Load Balancer", baseCost: 100, rps: 5, icon: Activity },
  { id: "rds", name: "RDS Database", baseCost: 500, rps: 30, icon: Database },
  { id: "eks", name: "EKS Cluster", baseCost: 3000, rps: 150, icon: Cloud },
  { id: "lambda", name: "Serverless Farm", baseCost: 10000, rps: 600, icon: Zap },
  { id: "region", name: "AWS Region", baseCost: 50000, rps: 3000, icon: Globe },
];

export function DevOpsExtras() {
  const [requests, setRequests] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; val: number }[]>([]);

  const currentRps = UPGRADES.reduce((sum, upg) => sum + (counts[upg.id] || 0) * upg.rps, 0);
  // Daya klik bertambah sering berjalannya auto-RPS
  const clickPower = 1 + Math.floor(currentRps * 0.05);

  // Loop penambah RPS otomatis (berjalan 10x per detik agar angkanya mulus)
  useEffect(() => {
    if (currentRps === 0) return;
    const interval = setInterval(() => {
      setRequests((r) => r + currentRps / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [currentRps]);

  const handleManualClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRequests((r) => r + clickPower);

    // Animasi angka melayang saat di-klik
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newId = Date.now() + Math.random();

    setClickEffects((prev) => [...prev, { id: newId, x, y, val: clickPower }]);
    setTimeout(() => setClickEffects((prev) => prev.filter((c) => c.id !== newId)), 800);
  };

  // Harga menjadi semakin mahal seiring banyaknya infrastruktur yang dibeli
  const getCost = (baseCost: number, count: number) => Math.floor(baseCost * Math.pow(1.15, count));

  const buyUpgrade = (id: string, baseCost: number) => {
    const count = counts[id] || 0;
    const cost = getCost(baseCost, count);
    if (requests >= cost) {
      setRequests((r) => r - cost);
      setCounts((c) => ({ ...c, [id]: count + 1 }));
    }
  };

  return (
    <div className="relative z-10 w-full bg-background/80 py-12 backdrop-blur-sm">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.5); }
        }
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center mb-8">
          <h2 className="font-mono text-xl font-bold uppercase tracking-widest text-[#6BA37A]">
            Mini Game: Cloud Architecture Tycoon
          </h2>
          <p className="text-sm text-neutral-400 mt-2">Scale your infrastructure to handle massive traffic.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] p-6 shadow-2xl">
          {/* Area Kiri: The Clicker */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black/20 rounded-xl border border-white/5 relative overflow-hidden min-h-[300px]">
            <div className="text-center mb-10">
              <h3 className="text-5xl font-black text-white tracking-tight mb-2 tabular-nums">
                {Math.floor(requests).toLocaleString()}
              </h3>
              <p className="text-sm font-mono text-[#6BA37A] uppercase tracking-widest">
                Requests Served
              </p>
              <p className="text-xs text-neutral-500 mt-2 font-mono">
                {currentRps.toLocaleString()} RPS (Auto) • {clickPower.toLocaleString()} / click
              </p>
            </div>

            <button
              onClick={handleManualClick}
              className="relative group w-36 h-36 rounded-full bg-gradient-to-b from-[#4A7C59] to-[#2d4d36] flex items-center justify-center shadow-[0_0_50px_rgba(74,124,89,0.2)] transition-transform active:scale-95 cursor-pointer border-4 border-[#6BA37A]/30"
            >
              <MousePointerClick className="w-14 h-14 text-white/90 group-hover:scale-110 transition-transform" />
              {clickEffects.map((effect) => (
                <span
                  key={effect.id}
                  className="absolute text-[#a3f0b6] font-mono font-bold text-xl pointer-events-none animate-float-up"
                  style={{ left: effect.x - 15, top: effect.y - 20 }}
                >
                  +{effect.val}
                </span>
              ))}
            </button>
          </div>

          {/* Area Kanan: The Architecture Shop */}
          <div className="flex-[1.2] flex flex-col gap-3 max-h-[400px] overflow-y-auto p-2 no-scrollbar">
            {UPGRADES.map((upg) => {
              const count = counts[upg.id] || 0;
              const cost = getCost(upg.baseCost, count);
              const canAfford = requests >= cost;
              const Icon = upg.icon;

              return (
                <div key={upg.id} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-lg text-[#6BA37A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        {upg.name}
                        {count > 0 && <span className="text-[10px] bg-[#4A7C59] px-1.5 py-0.5 rounded-full text-white">{count}</span>}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">+{upg.rps.toLocaleString()} RPS</div>
                    </div>
                  </div>
                  <button
                    onClick={() => buyUpgrade(upg.id, upg.baseCost)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                      canAfford
                        ? "bg-[#4A7C59] text-white hover:bg-[#4A7C59]/80 cursor-pointer shadow-lg shadow-[#4A7C59]/20"
                        : "bg-white/5 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    Cost: {cost.toLocaleString()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}