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
    title: "Editorial Typography",
    category: "Carousels",
    tag: "Staff Pick",
    downloads: "28.5k",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Luxury Brand Lookbook",
    category: "Stories",
    tag: "Editorial",
    downloads: "9.8k",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: 4,
    title: "Nordic Ceramic Feature",
    category: "Reels",
    tag: "Organic",
    downloads: "32.1k",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Warm Minimalist Grid",
    category: "Posts",
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
    <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col overflow-hidden select-none font-sans">
      {/* Top Mobile Status Header */}
      <div className="pt-3 px-5 pb-1 flex justify-between items-center text-[10px] text-slate-700 font-bold shrink-0 bg-white/95 backdrop-blur-md border-b border-slate-100/80">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-[9px] font-mono tracking-tighter text-slate-600">5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-800 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* Screen Title & Search Bar */}
      <div className="px-4 py-2.5 border-b border-slate-100 space-y-2 bg-white shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Aura Logo" className="h-5 w-auto object-contain" />
            <div>
              <h3 className="text-xs font-black text-slate-900 tracking-tight leading-none">Template Studio</h3>
              <p className="text-[9px] text-slate-500 font-medium">Curated Editorial Layouts</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            500+ Kits
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            readOnly
            value="Search Reels, Stories & Posts..."
            className="w-full bg-slate-50 text-slate-800 text-[10px] font-medium pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {["All", "Reels", "Carousels", "Stories", "Posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
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

      {/* Gallery Scroll Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:border-blue-400 transition-all"
          >
            {/* Card Image Banner */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-bold text-slate-800 border border-slate-200/80 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                {item.tag}
              </div>

              {item.category === "Reels" && (
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-md">
                  <PlayCircle className="w-4 h-4 text-slate-900" />
                </div>
              )}
            </div>

            {/* Card Details */}
            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span>{item.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </div>
                  <span>•</span>
                  <span>{item.downloads} used</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs border-none cursor-pointer">
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
