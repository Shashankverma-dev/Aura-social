"use client";

import React, { useState } from "react";
import { 
  Share2, Search, Palette, Code, FileText, Camera, Megaphone, ArrowRight, ArrowLeft, Sparkles, TrendingUp, CheckCircle2
} from "lucide-react";

const SERVICES_MOBILE = [
  {
    id: "smm",
    title: "Social Media",
    stat: "+340% Reach",
    icon: Share2,
    badge: "Viral Growth",
    bgColor: "bg-blue-50 text-blue-600 border-blue-200/80",
    activeBg: "bg-blue-600",
  },
  {
    id: "seo",
    title: "SEO Ranking",
    stat: "#1 Google",
    icon: Search,
    badge: "AI Engines",
    bgColor: "bg-purple-50 text-purple-600 border-purple-200/80",
    activeBg: "bg-purple-600",
  },
  {
    id: "graphic",
    title: "Graphic Design",
    stat: "3D Motion",
    icon: Palette,
    badge: "Brand Kit",
    bgColor: "bg-pink-50 text-pink-600 border-pink-200/80",
    activeBg: "bg-pink-600",
  },
  {
    id: "webdev",
    title: "Web Development",
    stat: "60 FPS UX",
    icon: Code,
    badge: "Interactive",
    bgColor: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    activeBg: "bg-emerald-600",
  },
  {
    id: "copy",
    title: "Content & Copy",
    stat: "High ROAS",
    icon: FileText,
    badge: "Storytelling",
    bgColor: "bg-amber-50 text-amber-600 border-amber-200/80",
    activeBg: "bg-amber-600",
  },
  {
    id: "photo",
    title: "Photo & Video",
    stat: "4K Studio",
    icon: Camera,
    badge: "Reels & Ads",
    bgColor: "bg-cyan-50 text-cyan-600 border-cyan-200/80",
    activeBg: "bg-cyan-600",
  },
  {
    id: "ads",
    title: "Online Ads",
    stat: "4.2x ROAS",
    icon: Megaphone,
    badge: "Meta & Google",
    bgColor: "bg-rose-50 text-rose-600 border-rose-200/80",
    activeBg: "bg-rose-600",
  },
];

const SERVICE_DETAILS: Record<string, {
  fullTitle: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageSrc?: string;
  accentGradient: string;
  statBadge: string;
}> = {
  smm: {
    fullTitle: "Social Media Growth",
    subtitle: "Viral Content & Community Scaling",
    description: "Scale your organic social presence with data-backed short-form Reels, TikToks, and high-converting community campaigns.",
    highlights: ["Viral Reel Production", "+340% Organic Impressions", "24/7 AI Community Moderation"],
    imageSrc: "/trans-service-social.png",
    accentGradient: "from-blue-600 to-indigo-600",
    statBadge: "+340% Reach",
  },
  seo: {
    fullTitle: "SEO & Search Dominance",
    subtitle: "Rank #1 on Google & AI Engines",
    description: "Dominate search results across Google and AI search engines with technical schema optimization and keyword velocity.",
    highlights: ["#1 Organic Keyword Rankings", "AI Search Engine Optimization", "Technical Speed & Schema Audits"],
    imageSrc: "/trans-service-seo.png",
    accentGradient: "from-purple-600 to-indigo-600",
    statBadge: "#1 Google Rank",
  },
  graphic: {
    fullTitle: "Graphic & 3D Brand Design",
    subtitle: "Modern Brand Identity & Visual Assets",
    description: "Craft breathtaking 3D visual assets, UI design systems, and viral social creative kits.",
    highlights: ["3D Motion & Visual Graphics", "Complete Brand Guidelines & Kits", "High-Converting Ad Creatives"],
    accentGradient: "from-pink-600 to-rose-600",
    statBadge: "3D Motion",
  },
  webdev: {
    fullTitle: "Web Development",
    subtitle: "60 FPS Interactive Next.js Web Apps",
    description: "Build ultra-fast, scroll-animated landing pages and full-stack web applications engineered for 100/100 Lighthouse performance.",
    highlights: ["60 FPS GSAP Motion Engine", "Sub-second Page Load Velocity", "Conversion-Optimized Layouts"],
    imageSrc: "/trans-service-webdev.png",
    accentGradient: "from-emerald-600 to-teal-600",
    statBadge: "60 FPS UX",
  },
  copy: {
    fullTitle: "Content & Copywriting",
    subtitle: "High-ROAS Storytelling & Messaging",
    description: "Persuasive copywriting designed to capture immediate attention and convert cold traffic into high-value customers.",
    highlights: ["Scroll-Stopping Hook Headlines", "High-ROAS Ad Copy Testing", "Automated Conversion Funnels"],
    accentGradient: "from-amber-600 to-orange-600",
    statBadge: "High ROAS Copy",
  },
  photo: {
    fullTitle: "Photo & Video Production",
    subtitle: "4K Studio Creative & Reel Shooting",
    description: "Cinema-grade 4K studio photography and high-energy video production tailored for Instagram Reels and Meta ad campaigns.",
    highlights: ["4K Cinema Studio Shoots", "Short-Form Reel Production", "Product Highlight Macro Reels"],
    accentGradient: "from-cyan-600 to-blue-600",
    statBadge: "4K Studio",
  },
  ads: {
    fullTitle: "Online Advertising",
    subtitle: "Meta, Google & TikTok Paid Scaling",
    description: "Maximize ROAS with hyper-targeted paid advertising campaigns powered by real-time AI attribution and automated creative testing.",
    highlights: ["4.2x Average Client ROAS", "Automated A/B Ad Creative Testing", "Custom Retargeting Funnels"],
    accentGradient: "from-rose-600 to-red-600",
    statBadge: "4.2x ROAS",
  },
  all: {
    fullTitle: "Complete 360° Growth Suite",
    subtitle: "All 7 Services Fully Integrated",
    description: "Unlock our entire full-stack marketing, design, SEO, and advertising suite for end-to-end digital dominance.",
    highlights: ["Dedicated Growth Team Lead", "All 7 Marketing Engines Active", "Custom Weekly Performance Reports"],
    accentGradient: "from-blue-600 via-purple-600 to-rose-600",
    statBadge: "All 7 Included",
  },
};

/* ─────────────────────────────────────────────────────────────
   PORTRAIT GRID VIEW — used on mobile (normal phone, portrait)
───────────────────────────────────────────────────────────── */
function PortraitServicesView() {
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const activeDetail = selectedDetailId ? SERVICE_DETAILS[selectedDetailId] : null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900 flex flex-col overflow-hidden select-none font-sans">
      {/* Status Bar */}
      <div className="pt-3 px-5 flex justify-between items-center text-[10px] text-slate-500 font-bold shrink-0">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono">5G</span>
          <div className="w-4 h-2 rounded-xs border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-700 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="px-4 pt-1 pb-2 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white/90">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow">A</div>
          <div>
            <h3 className="text-[11px] font-black text-slate-900 leading-none">Aura Services</h3>
            <p className="text-[9px] text-slate-400 font-medium">Tap any service to explore</p>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-extrabold text-emerald-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />7 Services
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-2.5 no-scrollbar">
        {activeDetail ? (
          /* DETAIL VIEW */
          <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-200 space-y-2">
            {/* Back */}
            <button
              onClick={() => setSelectedDetailId(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-extrabold border border-slate-300/80 cursor-pointer self-start"
            >
              <ArrowLeft className="w-3 h-3 text-slate-600" /> All Services
            </button>

            {/* Title */}
            <div>
              <h3 className={`text-sm font-black bg-gradient-to-r ${activeDetail.accentGradient} bg-clip-text text-transparent leading-tight`}>
                {activeDetail.fullTitle}
              </h3>
              <p className="text-[9px] font-bold text-slate-500 mt-0.5">{activeDetail.subtitle}</p>
            </div>

            {/* Image (if available) */}
            {activeDetail.imageSrc && (
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center h-24">
                <img src={activeDetail.imageSrc} alt={activeDetail.fullTitle} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            )}

            {/* Description */}
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">{activeDetail.description}</p>

            {/* Highlights */}
            <div className="space-y-1">
              {activeDetail.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setSelectedDetailId(null)}
              className={`mt-auto px-4 py-1.5 rounded-xl bg-gradient-to-r ${activeDetail.accentGradient} text-white text-[10px] font-black flex items-center gap-1.5 shadow-md cursor-pointer border-none`}
            >
              Launch Campaign <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          /* 7-CARD PORTRAIT GRID — 2 columns for maximum visibility & large readable cards */
          <div className="grid grid-cols-2 gap-2.5 h-full content-between">
            {SERVICES_MOBILE.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedDetailId(s.id)}
                  className="p-2.5 rounded-xl border border-slate-200/80 bg-white/95 shadow-xs hover:border-blue-400 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${s.bgColor} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100/80 truncate">
                      {s.stat}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-semibold truncate mt-0.5">
                      {s.badge}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* CTA slot */}
            <div
              onClick={() => setSelectedDetailId("all")}
              className="p-2.5 rounded-xl border border-dashed border-blue-300 bg-blue-50/60 hover:bg-blue-600 hover:text-white transition-all flex flex-col items-center justify-center text-center cursor-pointer group gap-1 shadow-xs hover:scale-[1.02]"
            >
              <TrendingUp className="w-4.5 h-4.5 text-blue-600 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black text-slate-900 group-hover:text-white">Get All 7</span>
              <span className="text-[8px] font-bold text-blue-600 group-hover:text-blue-100">1-Click Setup</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LANDSCAPE COUNTER-ROTATION VIEW — used on desktop (phone rotated 90°)
───────────────────────────────────────────────────────────── */
function LandscapeServicesView() {
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const activeDetail = selectedDetailId ? SERVICE_DETAILS[selectedDetailId] : null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[50%] -rotate-90 origin-center bg-gradient-to-br from-slate-50 via-white to-blue-50/40 text-slate-900 flex flex-col justify-between p-3.5 sm:p-5 font-sans">
        {activeDetail ? (
          <div className="w-full h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 shrink-0">
              <button
                onClick={() => setSelectedDetailId(null)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-extrabold transition-all cursor-pointer border border-slate-300/80"
              >
                <ArrowLeft className="w-3 h-3 text-slate-600" /><span>All Services</span>
              </button>
              <div className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] font-extrabold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /><span>{activeDetail.statBadge}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 my-auto items-center py-1">
              <div className="col-span-3 space-y-1.5">
                <div>
                  <h3 className={`text-sm sm:text-base font-black bg-gradient-to-r ${activeDetail.accentGradient} bg-clip-text text-transparent leading-tight`}>{activeDetail.fullTitle}</h3>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-600 mt-0.5">{activeDetail.subtitle}</p>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-600 leading-relaxed font-medium line-clamp-2">{activeDetail.description}</p>
                <div className="space-y-0.5 pt-0.5">
                  {activeDetail.highlights.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-bold text-slate-800">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" /><span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedDetailId(null)} className={`mt-1.5 px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r ${activeDetail.accentGradient} text-white text-[9px] sm:text-[10px] font-black flex items-center gap-1.5 shadow-md hover:opacity-95 transition-all cursor-pointer border-none`}>
                  <span>Launch Campaign</span><ArrowRight className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="col-span-2 flex flex-col items-center justify-center relative">
                {activeDetail.imageSrc ? (
                  <div className="relative w-full h-24 sm:h-28 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl" />
                    <img src={activeDetail.imageSrc} alt={activeDetail.fullTitle} className="w-full h-full object-contain relative z-10 filter drop-shadow-md" />
                  </div>
                ) : (
                  <div className="w-full p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex flex-col items-center justify-center text-center space-y-1">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">✦</div>
                    <p className="text-[9px] font-extrabold text-slate-900">100% Growth Engine</p>
                    <span className="text-[8px] font-semibold text-blue-600">Guaranteed Results</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-blue-500/20">A</div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
                    <span>Aura Services</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold">7 Core High-Growth Marketing Engines (Click to View)</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2.5 my-auto py-2">
              {SERVICES_MOBILE.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id} onClick={() => setSelectedDetailId(service.id)} className="p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between bg-white/90 border-slate-200/80 shadow-2xs hover:bg-white hover:border-blue-400 hover:shadow-md hover:scale-[1.03] group">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 border ${service.bgColor}`}><Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                      <span className="text-[8px] sm:text-[9px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100/60 truncate">{service.stat}</span>
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{service.title}</h4>
                      <p className="text-[8px] sm:text-[9px] text-slate-500 font-medium truncate mt-0.5">{service.badge}</p>
                    </div>
                  </div>
                );
              })}
              <div onClick={() => setSelectedDetailId("all")} className="p-2.5 sm:p-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-600 hover:text-white transition-all flex flex-col items-center justify-center text-center cursor-pointer group shadow-2xs hover:scale-[1.03]">
                <TrendingUp className="w-4 h-4 text-blue-600 group-hover:text-white mb-0.5 transition-colors" />
                <span className="text-[9px] font-extrabold text-slate-900 group-hover:text-white">Get All 7</span>
                <span className="text-[8px] text-blue-600 group-hover:text-blue-100 font-semibold">1-Click Setup</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT — renders portrait on mobile, landscape on desktop
───────────────────────────────────────────────────────────── */
export function ServicesShowcaseScreen() {
  // We detect the rendering context via window width inside this component
  // isMobile = true when inner window width < 768px
  const [isMobileView, setIsMobileView] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileView ? <PortraitServicesView /> : <LandscapeServicesView />;
}
