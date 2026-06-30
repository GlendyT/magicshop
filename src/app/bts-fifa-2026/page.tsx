"use client";

import React, { Suspense } from "react"; // importamos useCallback para el team stats
import { Trophy } from "lucide-react";
import { Match } from "./types";
import BTSFifa2026Content from "./components/bts-fifa-2026content";

export interface BracketMatchProps {
  allMatches: Match[];
}



export default function BTSFifa2026() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 p-4 lg:p-8 bg-[url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center relative font-sans">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 tracking-tight">
                  BTS x FIFA 2026
                </h1>
                <p className="text-neutral-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  The Ultimate Streaming Playoffs
                </p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button className="px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all text-neutral-400">
                  Join Team
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all text-neutral-400">
                  Playoffs Bracket
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all text-neutral-400">
                  Teams Stats
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          </div>
        </div>
      }
    >
      <BTSFifa2026Content />
    </Suspense>
  );
}
