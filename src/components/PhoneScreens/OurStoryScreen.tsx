"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Award, Globe, Users, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export function OurStoryScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;

    const scrollLoop = () => {
      scrollPos += 0.35;
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
    <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col overflow-hidden select-none font-sans relative">
      {/* Mobile Top Bar */}
      <div className="pt-3 px-5 pb-1 flex justify-between items-center text-[10px] text-slate-700 font-bold shrink-0 bg-white/95 backdrop-blur-md z-20 border-b border-slate-100/80">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-[9px] font-mono tracking-tighter text-slate-600">5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-800 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* Header bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Aura Logo" className="h-5 w-auto object-contain" />
          <div>
            <h3 className="text-xs font-black text-slate-900 tracking-tight leading-none">Aura Story</h3>
            <p className="text-[9px] text-slate-500 font-medium">Manifesto & Journey</p>
          </div>
        </div>
        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Est. 2024
        </span>
      </div>

      {/* Story Content Scrollable Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar space-y-3.5 p-3.5">
        {/* Story Hero Image Card */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
            alt="Team workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-slate-900 text-[9px] font-extrabold backdrop-blur-sm shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Human Storytelling First
            </div>
            <h3 className="text-xs font-black tracking-tight text-white leading-tight">
              Pioneering Thoughtful Digital Brand Storytelling
            </h3>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="bg-white rounded-2xl p-3.5 space-y-1.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-rose-600 text-[10px] font-extrabold uppercase tracking-wider">
            <Heart className="w-3 h-3 fill-rose-600" />
            <span>Our Purpose</span>
          </div>
          <h4 className="text-xs font-black tracking-tight text-slate-900 leading-snug">
            Empowering 100,000+ modern brands to communicate authentically.
          </h4>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
            We started with a single conviction: social storytelling should be effortless, elegant, and deeply resonant with real human beings.
          </p>
        </div>

        {/* Platform Milestones Statistics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 space-y-1 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-1 text-blue-600">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold text-slate-600">Global Reach</span>
            </div>
            <div className="text-base font-black text-slate-900 font-mono">140+</div>
            <span className="text-[9px] text-slate-500 block font-medium">Countries Reached</span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 space-y-1 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-1 text-emerald-600">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold text-slate-600">Community</span>
            </div>
            <div className="text-base font-black text-slate-900 font-mono">10M+</div>
            <span className="text-[9px] text-slate-500 block font-medium">Engagements</span>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 space-y-2.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
          <span className="text-xs font-black tracking-tight text-slate-900 block">Milestone Timeline</span>
          
          <div className="space-y-2.5 pl-2 border-l border-slate-200 relative">
            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-slate-900 absolute -left-[17px] top-1 ring-4 ring-white" />
              <span className="text-[9px] font-mono text-slate-900 font-extrabold block">2024 • Foundation</span>
              <p className="text-[10px] text-slate-600 font-medium">Built high-fidelity motion storytelling engine.</p>
            </div>

            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 absolute -left-[17px] top-1 ring-4 ring-white" />
              <span className="text-[9px] font-mono text-blue-600 font-extrabold block">2025 • Editorial Studio</span>
              <p className="text-[10px] text-slate-600 font-medium">Introduced 500+ curated creator design kits.</p>
            </div>

            <div className="relative pl-3">
              <div className="w-2 h-2 rounded-full bg-emerald-600 absolute -left-[17px] top-1 ring-4 ring-white" />
              <span className="text-[9px] font-mono text-emerald-600 font-extrabold block">2026 • Global Impact</span>
              <p className="text-[10px] text-slate-600 font-medium">Delivered over 1 Billion authentic brand impressions.</p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-slate-950 rounded-2xl p-3.5 text-center space-y-2 text-white shadow-md">
          <h4 className="text-xs font-extrabold text-white">Craft Your Story With Us</h4>
          <button className="w-full py-2 px-3 rounded-xl bg-white text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-100 transition-colors border-none cursor-pointer">
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
