"use client";

import React, { useState } from "react";
import { Search, Sparkles, Filter, Grid, Download, Star, Layers, PlayCircle, Eye } from "lucide-react";

const TEMPLATES = [
  {
    id: 1,
    title: "Minimal Studio Launch",
    category: "Reels",
    tag: "Trending",
    downloads: "14.2k",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    title: "Typography Carousel",
    category: "Carousels",
    tag: "Popular",
    downloads: "28.5k",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Luxury Brand Story",
    category: "Stories",
    tag: "Pro",
    downloads: "9.8k",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: 4,
    title: "SaaS Product Reel",
    category: "Reels",
    tag: "AI Powered",
    downloads: "32.1k",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Minimalist Grid Post",
    category: "Instagram Posts",
    tag: "Essential",
    downloads: "18.4k",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80",
    color: "from-cyan-500 to-blue-500",
  },
];

export function TemplateGalleryScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category.includes(activeTab));

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col overflow-hidden select-none font-sans">
      {/* Top Mobile Status Header */}
      <div className="pt-3 px-5 pb-1 flex justify-between items-center text-xs font-semibold text-white/90 shrink-0 bg-slate-950">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[10px] font-mono">5G</span>
          <div className="w-4 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-px" />
          </div>
        </div>
      </div>

      {/* Screen Title & Search */}
      <div className="px-4 py-2 border-b border-white/10 space-y-2 bg-slate-900/60 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold tracking-tight">Template Studio</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            500+ Assets
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
          <input
            type="text"
            readOnly
            value="Search Reels, Stories & Posts..."
            className="w-full bg-slate-950 text-white/60 text-[11px] pl-8 pr-3 py-1.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {["All", "Reels", "Carousels", "Stories", "Posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Scroll Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all"
          >
            {/* Card Image Banner */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                {item.tag}
              </div>

              {item.category === "Reels" && (
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <PlayCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Card Details */}
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-white/50 mt-0.5">
                  <span>{item.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-0.5 text-amber-400 font-semibold">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    {item.rating}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="px-2.5 py-1 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm shadow-blue-600/30">
                  <Download className="w-3 h-3" />
                  Use
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
