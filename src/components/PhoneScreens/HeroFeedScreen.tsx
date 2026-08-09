"use client";

import React, { useEffect, useRef } from "react";
import { Heart, MessageCircle, Send, Bookmark, Music, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

export function HeroFeedScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;

    const scrollLoop = () => {
      scrollPos += 0.6; // smooth continuous upward feed scroll
      if (el) {
        if (scrollPos >= el.scrollHeight / 2) {
          scrollPos = 0;
        }
        el.scrollTop = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col overflow-hidden select-none font-sans relative">
      {/* Mobile Top Status Bar */}
      <div className="pt-3 px-5 pb-2 flex justify-between items-center text-xs font-semibold text-white/90 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[10px] font-mono">5G</span>
          <div className="w-4 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-px" />
          </div>
        </div>
      </div>

      {/* Stories Bar */}
      <div className="flex gap-3 px-3 py-2.5 border-b border-white/5 overflow-x-auto no-scrollbar shrink-0 bg-slate-900/50">
        {[
          { name: "You", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", active: true },
          { name: "Growth", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", active: true },
          { name: "Reels", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", active: false },
          { name: "Trends", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", active: false },
        ].map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 shrink-0">
            <div className={`p-[2px] rounded-full ${story.active ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "bg-white/20"}`}>
              <img src={story.img} alt={story.name} className="w-10 h-10 rounded-full object-cover border border-black" />
            </div>
            <span className="text-[10px] text-white/70">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Feed Stream (Duplicated content for infinite scroll illusion) */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-4 p-3">
        {[1, 2].map((group) => (
          <React.Fragment key={group}>
            {/* Post Card 1: Reel / Video Preview */}
            <div className="bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Creator"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/50"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">alexa_studio</span>
                      <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                    </div>
                    <span className="text-[10px] text-white/50">Sponsored • Auto-optimized</span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-medium border border-blue-500/30 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> +410% ROAS
                </div>
              </div>

              {/* Media Thumbnail */}
              <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Realtime Engagement Overlay Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Campaign • 1.4k engagements/min
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white/90 drop-shadow">Luxury Minimal Editorial Campaign</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                      <Music className="w-3 h-3 text-indigo-400 animate-spin" />
                      <span>Original Audio — High Viral Potential</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <MessageCircle className="w-5 h-5 hover:text-white transition-colors" />
                    <Send className="w-5 h-5 hover:text-white transition-colors" />
                  </div>
                  <Bookmark className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-xs font-bold text-white/90">28,492 likes</div>
                <p className="text-[11px] text-white/70 line-clamp-2">
                  <span className="font-semibold text-white mr-1">alexa_studio</span>
                  Unlocking 10x social reach with automated AI workflow triggers. Pure aesthetic precision. ✨ #SaaS #CreatorEconomy
                </p>
              </div>
            </div>

            {/* Post Card 2: Carousel Analytics */}
            <div className="bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    AS
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Aura Studio AI</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Performance Metric</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40">2h ago</span>
              </div>
              <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Weekly Impressions</span>
                  <span className="font-mono text-emerald-400 font-bold">+184.2%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full w-[78%]" />
                </div>
                <div className="flex justify-between text-[10px] text-white/50 pt-1 font-mono">
                  <span>Target: 250k</span>
                  <span className="text-white font-bold">Actual: 492k</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
