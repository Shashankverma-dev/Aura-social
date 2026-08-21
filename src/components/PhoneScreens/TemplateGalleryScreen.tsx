"use client";

import React, { useState } from "react";
import { 
  Search, Sparkles, Filter, Grid, Download, Star, Layers, PlayCircle, Eye, 
  Bookmark, ArrowUpRight, Check, SlidersHorizontal
} from "lucide-react";

const TEMPLATES = [
  {
    id: 1,
    title: "Marigold & Gold Festive Edit",
    creator: "Atelier Mumbai",
    category: "Reels & Shorts",
    format: "9:16 Reel",
    tag: "Festive Pick",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    downloads: "48.2k",
    rating: "5.0",
    image: "/templates/festive.jpg",
    description: "Royal Indian couture & wedding lookbook motion kit with gold typography.",
  },
  {
    id: 2,
    title: "Radiante Botanical Wellness",
    creator: "Studio Bangalore",
    category: "Carousels",
    format: "4:5 Carousel",
    tag: "D2C Favorite",
    tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    downloads: "34.6k",
    rating: "4.9",
    image: "/templates/d2c.jpg",
    description: "Multi-slide storytelling format for natural skincare & lifestyle brands.",
  },
  {
    id: 3,
    title: "Editorial Serifs & Quotes",
    creator: "Solstice Studio",
    category: "Posts",
    format: "1:1 Square",
    tag: "Staff Curated",
    tagColor: "bg-stone-100 text-stone-800 border-stone-200",
    downloads: "28.5k",
    rating: "5.0",
    image: "/templates/typography.jpg",
    description: "Refined linen paper texture cards designed for thought leadership.",
  },
  {
    id: 4,
    title: "Heritage Courtyards Lookbook",
    creator: "Jaipur Design Lab",
    category: "Lookbooks",
    format: "Editorial PDF",
    tag: "Architecture",
    tagColor: "bg-rose-50 text-rose-800 border-rose-200",
    downloads: "19.8k",
    rating: "4.9",
    image: "/templates/architecture.jpg",
    description: "Minimalist Indian architectural portfolio and spatial narrative layout.",
  },
];

export function TemplateGalleryScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [savedIds, setSavedIds] = useState<number[]>([1]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = activeTab === "All" 
    ? TEMPLATES 
    : TEMPLATES.filter((t) => t.category.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.toLowerCase().includes(t.category.toLowerCase()));

  return (
    <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col overflow-hidden select-none font-sans relative">
      {/* ─── Top iOS Status Bar (Concentric clearance) ─── */}
      <div className="pt-2.5 px-6 pb-1 flex justify-between items-center text-[10px] text-slate-800 font-bold shrink-0 bg-white/95 backdrop-blur-md z-30 border-b border-slate-100/80">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-[9px] font-mono tracking-tighter text-slate-600">5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-800 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* ─── Screen Header & Search Bar ─── */}
      <div className="px-4 py-2.5 border-b border-slate-100 space-y-2 bg-white shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Aura Logo" className="h-6 w-auto object-contain drop-shadow-xs" />
            <div>
              <h3 className="text-xs font-black text-slate-950 tracking-tight leading-none flex items-center gap-1">
                <span>Template Studio</span>
              </h3>
              <p className="text-[9px] text-slate-500 font-medium">Curated Human Design Kits</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            500+ Assets
          </span>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              readOnly
              value="Search Festive Reels, D2C Carousels..."
              className="w-full bg-slate-50 text-slate-800 text-[10px] font-medium pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
            />
          </div>
          <button className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {["All", "Reels", "Carousels", "Posts", "Lookbooks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === tab
                  ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Gallery Scroll Stream ─── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 no-scrollbar pb-10">
        {filtered.map((item) => {
          const isSaved = savedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:border-blue-400 hover:shadow-md transition-all duration-300"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-xs backdrop-blur-md ${item.tagColor}`}>
                    <Sparkles className="w-2.5 h-2.5 inline-block mr-1" />
                    {item.tag}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/70 text-white text-[8px] font-mono font-bold backdrop-blur-md">
                    {item.format}
                  </span>
                </div>

                {/* Bookmark Button Top Right */}
                <button
                  onClick={() => toggleSave(item.id)}
                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border ${
                    isSaved 
                      ? "bg-rose-500 text-white border-rose-500 shadow-sm" 
                      : "bg-white/80 text-slate-700 hover:bg-white border-white/60"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
                </button>

                {/* Author attribution floating badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[9px] font-semibold">
                  <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                    By {item.creator}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-extrabold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-white/70 font-normal">({item.downloads})</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Details & Action */}
              <div className="p-3 space-y-2">
                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-600 font-medium leading-snug mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Action CTA Row */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Free with Aura Pro</span>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-[10px] font-black flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer border-none">
                    <span>Use Template</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Bottom iOS Home Indicator Pill ─── */}
      <div className="w-full py-1 bg-white/95 backdrop-blur-md flex justify-center border-t border-slate-100 z-30">
        <div className="w-24 h-1 bg-slate-900/30 rounded-full" />
      </div>
    </div>
  );
}
