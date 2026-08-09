"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Award, Globe, Users, ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";

export function OurStoryScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;

    const scrollLoop = () => {
      scrollPos += 0.4;
      if (el) {
        if (scrollPos >= el.scrollHeight - el.clientHeight) {
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
      {/* Mobile Top Bar */}
      <div className="pt-3 px-5 pb-1 flex justify-between items-center text-xs font-semibold text-white/90 shrink-0 bg-slate-950/90 z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[10px] font-mono">5G</span>
          <div className="w-4 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-px" />
          </div>
        </div>
      </div>

      {/* Header bar */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-md shrink-0 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black text-[10px]">
            A
          </div>
          <span className="text-xs font-bold tracking-tight">Aura Platform</span>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
          Our Story
        </span>
      </div>

      {/* Story Content Scrollable Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar space-y-4 p-3.5">
        {/* Story Hero Image Card */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
            alt="Team workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-[9px] font-bold border border-blue-400/30 backdrop-blur-sm">
              <Sparkles className="w-2.5 h-2.5" /> Founded 2024
            </div>
            <h3 className="text-sm font-extrabold tracking-tight text-white">
              Pioneering Autonomous Social Storytelling
            </h3>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white text-slate-950 rounded-2xl p-4 space-y-2 shadow-xl border border-white">
          <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            <Heart className="w-3 h-3 fill-blue-600" />
            <span>Our Mission</span>
          </div>
          <h4 className="text-xs font-extrabold tracking-tight text-slate-900">
            Empowering 100,000+ creators to publish viral content effortlessly.
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We started with a single conviction: social storytelling should be seamless, elegant, and deeply resonant.
          </p>
        </div>

        {/* Platform Milestones Statistics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-900/90 rounded-2xl p-3 border border-white/10 space-y-1">
            <div className="flex items-center gap-1 text-blue-400">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold text-white/60">Global Reach</span>
            </div>
            <div className="text-base font-extrabold text-white font-mono">140+</div>
            <span className="text-[9px] text-white/50 block">Countries Active</span>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-3 border border-white/10 space-y-1">
            <div className="flex items-center gap-1 text-indigo-400">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold text-white/60">Community</span>
            </div>
            <div className="text-base font-extrabold text-white font-mono">10M+</div>
            <span className="text-[9px] text-white/50 block">Posts Scheduled</span>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-white/10 space-y-3">
          <span className="text-xs font-bold tracking-tight text-white block">Milestone Timeline</span>
          
          <div className="space-y-3 pl-2 border-l border-white/10 relative">
            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute -left-[17px] top-1 ring-4 ring-slate-950" />
              <span className="text-[9px] font-mono text-blue-400 font-bold block">Q1 2024 • Inception</span>
              <p className="text-[11px] text-white/80 font-medium">Launched core auto-rendering storytelling engine.</p>
            </div>

            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 absolute -left-[17px] top-1 ring-4 ring-slate-950" />
              <span className="text-[9px] font-mono text-purple-400 font-bold block">Q4 2025 • AI Template Studio</span>
              <p className="text-[11px] text-white/80 font-medium">Introduced 1-click brand design synchronization.</p>
            </div>

            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 absolute -left-[17px] top-1 ring-4 ring-slate-950" />
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">2026 • Global Expansion</span>
              <p className="text-[11px] text-white/80 font-medium">Over 1 Billion social impressions delivered.</p>
            </div>
          </div>
        </div>

        {/* Learn More CTA Button Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3.5 text-center space-y-2 shadow-lg">
          <h4 className="text-xs font-bold text-white">Ready to Craft Your Story?</h4>
          <button className="w-full py-2 px-3 rounded-xl bg-white text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md hover:bg-slate-100 transition-colors">
            <span>Learn More About Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
