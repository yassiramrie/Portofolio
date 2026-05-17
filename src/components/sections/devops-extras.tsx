"use client";

import React, { useState, useEffect } from "react";
import { Server, Play, RotateCcw, ShieldAlert, Terminal } from "lucide-react";

export function DevOpsExtras() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [downServers, setDownServers] = useState<Set<number>>(new Set());

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("gameover");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Server rusak (down) secara acak
  useEffect(() => {
    if (gameState !== "playing") return;
    
    // Semakin tinggi skor, semakin cepat servernya mati (Tingkat kesulitan naik)
    const difficultySpeed = Math.max(400, 1000 - score * 20);
    
    const interval = setInterval(() => {
      setDownServers((prev) => {
        const newSet = new Set(prev);
        const randomServer = Math.floor(Math.random() * 9); // Ada 9 server (0-8)
        newSet.add(randomServer);
        return newSet;
      });
    }, difficultySpeed);

    return () => clearInterval(interval);
  }, [gameState, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setDownServers(new Set());
    setGameState("playing");
  };

  const fixServer = (index: number) => {
    if (gameState !== "playing") return;
    if (downServers.has(index)) {
      setScore((s) => s + 1);
      setDownServers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  return (
    <div className="relative z-10 w-full bg-background/80 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="mb-6 font-mono text-xl font-bold uppercase tracking-widest text-[#6BA37A]">
          Mini Game: DevOps On-Call
        </h2>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] p-6 shadow-2xl">
          {gameState === "idle" && (
            <div className="py-10">
              <ShieldAlert className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
              <h3 className="mb-2 text-2xl font-bold text-white">Servers are going down!</h3>
              <p className="mb-8 text-neutral-400">Kamu sedang piket. Klik server yang berwarna merah untuk me-restart-nya sebelum waktu habis.</p>
              <button onClick={startGame} className="inline-flex items-center gap-2 rounded-lg bg-[#4A7C59] px-6 py-3 font-mono font-bold text-white transition hover:bg-[#4A7C59]/80 cursor-pointer">
                <Play className="h-5 w-5" /> Start Shift
              </button>
            </div>
          )}

          {gameState === "playing" && (
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-lg font-bold">
                <div className="text-white">Fixed: <span className="text-[#6BA37A]">{score}</span></div>
                <div className={timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-white"}>
                  Time: {timeLeft}s
                </div>
              </div>
              <div className="mx-auto grid max-w-md grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => {
                  const isDown = downServers.has(i);
                  return (
                    <button key={i} onClick={() => fixServer(i)} className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border transition-all ${isDown ? "border-red-500/50 bg-red-500/20 hover:bg-red-500/30" : "border-white/5 bg-white/5 hover:bg-white/10"}`}>
                      <Server className={`h-10 w-10 ${isDown ? "text-red-500 animate-bounce" : "text-neutral-600"}`} />
                      <span className={`mt-2 font-mono text-xs font-bold ${isDown ? "text-red-400" : "text-neutral-600"}`}>{isDown ? "OFFLINE" : "OK"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {gameState === "gameover" && (
            <div className="py-10">
              <Terminal className="mx-auto mb-4 h-16 w-16 text-[#6BA37A]" />
              <h3 className="mb-2 text-2xl font-bold text-white">Shift Ended!</h3>
              <p className="mb-8 text-neutral-400">Kamu berhasil memperbaiki <span className="font-bold text-[#6BA37A] text-xl">{score}</span> server selama piket.</p>
              <button onClick={startGame} className="inline-flex items-center gap-2 rounded-lg bg-[#4A7C59] px-6 py-3 font-mono font-bold text-white transition hover:bg-[#4A7C59]/80 cursor-pointer">
                <RotateCcw className="h-5 w-5" /> Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}