"use client";

import React, { useEffect, useRef } from "react";
import { 
  Heart, MessageCircle, Send, Bookmark, Music, Sparkles, TrendingUp, CheckCircle2, 
  MoreHorizontal, Home, Search, PlusSquare, Film, Bell
} from "lucide-react";

export function HeroFeedScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;

    const scrollLoop = () => {
      scrollPos += 0.5; // Smooth, relaxed continuous feed scroll
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
    <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col overflow-hidden select-none font-sans relative">
      {/* ─── Top iOS Status Bar (Flanking Dynamic Island) ─── */}
      <div className="pt-2.5 px-6 pb-1 flex justify-between items-center text-[10px] text-slate-800 font-bold shrink-0 bg-white/95 backdrop-blur-md z-30 border-b border-slate-100/80">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-[9px] font-mono tracking-tighter text-slate-600">5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-800 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* ─── Aura Feed Header with Official Logo ─── */}
      <div className="px-4 py-2 flex items-center justify-between bg-white shrink-0 border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-20">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Aura Logo"
            className="h-6 w-auto object-contain drop-shadow-xs"
          />
          <span className="font-black text-sm tracking-tight text-slate-950">
            Aura <span className="text-blue-600 font-extrabold">Feed</span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-600 border border-blue-200/60 ml-0.5">
            IN
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <button className="p-1 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer relative">
            <Heart className="w-4 h-4" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-1 ring-white" />
          </button>
          <button className="p-1 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer relative">
            <Send className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 px-1 py-0.2 bg-blue-600 text-white text-[7px] font-extrabold rounded-full">
              4
            </span>
          </button>
        </div>
      </div>

      {/* ─── Story Highlights Tray (Indian Creators with Real Portraits) ─── */}
      <div className="flex gap-3 px-3.5 py-2.5 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar shrink-0">
        {[
          {
            name: "Your Story",
            img: "/creators/rohan.jpg",
            isSelf: true,
          },
          {
            name: "priya.d",
            fullName: "Priya Sharma",
            img: "/creators/priya.jpg",
            active: true,
          },
          {
            name: "aarav.m",
            fullName: "Aarav Mehta",
            img: "/creators/aarav.jpg",
            active: true,
          },
          {
            name: "ananya.s",
            fullName: "Ananya Sen",
            img: "/creators/ananya.jpg",
            active: true,
          },
          {
            name: "kabir.v",
            fullName: "Kabir Verma",
            img: "/creators/kabir.jpg",
            active: false,
          },
        ].map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
            <div className="relative">
              <div
                className={`p-[1.5px] rounded-full ${
                  story.isSelf
                    ? "bg-slate-200"
                    : story.active
                    ? "bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 shadow-xs"
                    : "bg-slate-200"
                }`}
              >
                <img
                  src={story.img}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              </div>
              {story.isSelf && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[9px] font-black border border-white">
                  +
                </div>
              )}
            </div>
            <span className="text-[9px] font-bold text-slate-700 max-w-[52px] truncate text-center">
              {story.name}
            </span>
          </div>
        ))}
      </div>

      {/* ─── Main Feed Stream (Indian Editorial & D2C Content) ─── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-3.5 p-2.5 pb-16">
        {[1, 2].map((group) => (
          <React.Fragment key={group}>
            {/* ─── POST CARD 1: Indian Contemporary Silk & Couture Lookbook ─── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              {/* Creator Profile Header */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src="/creators/priya.jpg"
                      alt="Priya Sharma"
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-slate-900">priya.designs</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium">Bandra West, Mumbai • Royal Festive Edition</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-bold">
                    Follow
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Media Image / Generated Indian Couture Photography */}
              <div className="relative aspect-[3/3.9] bg-slate-100 overflow-hidden">
                <img
                  src="/creators/lookbook.jpg"
                  alt="Contemporary Indian Silk & Heritage Couture"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Clean Floating Heritage Badge */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-slate-900 font-bold border border-slate-200/60 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Diwali Heritage '26
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold truncate">
                    <Music className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">AP Dhillon — Excuses (Acoustic Mix)</span>
                  </div>
                  <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-white/20 rounded">
                    Reel
                  </span>
                </div>
              </div>

              {/* Post Interaction Bar */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-slate-800">
                  <div className="flex items-center gap-3.5">
                    <button className="flex items-center gap-1 text-rose-500 border-none bg-transparent cursor-pointer">
                      <Heart className="w-4.5 h-4.5 fill-rose-500" />
                      <span className="text-xs font-bold">48.2k</span>
                    </button>
                    <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 border-none bg-transparent cursor-pointer">
                      <MessageCircle className="w-4.5 h-4.5" />
                      <span className="text-xs font-bold">614</span>
                    </button>
                    <button className="text-slate-600 hover:text-slate-900 border-none bg-transparent cursor-pointer">
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </div>
                  <button className="text-slate-500 hover:text-slate-900 border-none bg-transparent cursor-pointer">
                    <Bookmark className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Caption in Authentic Indian Creator Tone */}
                <div className="space-y-1">
                  <p className="text-[11px] text-slate-700 leading-snug">
                    <span className="font-extrabold text-slate-900 mr-1.5">priya.designs</span>
                    Handwoven Banarasi silk weaves meet modern minimal silhouettes. Handcrafted by master weavers in Varanasi and styled in Mumbai. Grateful for this community! ✨🪷 #MadeInIndia #HeritageCraft
                  </p>
                  
                  {/* Comments Preview */}
                  <p className="text-[10px] text-slate-600 pt-0.5">
                    <span className="font-bold text-slate-800 mr-1">aarav.m</span>
                    The natural drape and golden hour lighting in frame 2 is extraordinary 🙌
                  </p>

                  <div className="text-[9px] font-medium text-slate-500 pt-0.5 uppercase tracking-wider">
                    18 minutes ago • Mumbai Studio
                  </div>
                </div>
              </div>
            </div>

            {/* ─── POST CARD 2: Indian D2C Brand Growth Milestone (Bengaluru) ─── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-3 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-none">Aura India Growth Hub</h4>
                    <p className="text-[9px] text-slate-600 font-medium">Indiranagar, Bengaluru</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> +48.2%
                </span>
              </div>

              {/* Metric Card Details with Indian Context */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-semibold text-[11px]">Festive Organic Impressions</span>
                  <span className="font-extrabold text-slate-900 text-xs">1.42 Crore views</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full w-[88%] rounded-full" />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-600 font-medium pt-0.5">
                  <span>Mumbai • Delhi • Bengaluru • Jaipur</span>
                  <span className="font-bold text-emerald-600">3.8x Avg ROAS</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-600 italic leading-tight">
                "Over 1,20,000 genuine consumer conversations driven across Instagram Reels this festive season with zero synthetic bot traffic."
              </p>
            </div>

            {/* ─── POST CARD 3: Heritage Architecture & Studio Lookbook (Jaipur) ─── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/creators/kabir.jpg"
                    alt="Kabir Verma"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-slate-900">kabir.v</span>
                      <span className="text-[9px] text-amber-700 bg-amber-50 px-1 py-0.2 rounded font-bold">Architect</span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium">Civil Lines, Jaipur • Design Studio</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>

              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80"
                  alt="Jaipur Heritage Courtyard"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between text-slate-800">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500" />
                    <MessageCircle className="w-4.5 h-4.5" />
                    <Send className="w-4.5 h-4.5" />
                  </div>
                  <Bookmark className="w-4.5 h-4.5 text-slate-500" />
                </div>
                <div className="text-[11px] font-bold text-slate-900">22,410 likes</div>
                <p className="text-[10px] text-slate-700 leading-snug">
                  <span className="font-extrabold text-slate-900 mr-1">kabir.v</span>
                  Courtyard arches, pink sandstone, and afternoon masala chai. Designing modern sanctuaries deeply rooted in Indian craft heritage. ☕🏛️
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ─── Bottom iOS Navigation Bar + Home Indicator ─── */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center">
        <div className="w-full h-11 flex items-center justify-around px-4">
          <button className="p-1.5 text-slate-950 border-none bg-transparent cursor-pointer flex flex-col items-center">
            <Home className="w-5 h-5 stroke-[2.5]" />
            <span className="w-1 h-1 bg-slate-950 rounded-full mt-0.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-900 border-none bg-transparent cursor-pointer transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-slate-900 border-none bg-transparent cursor-pointer">
            <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform">
              <PlusSquare className="w-4 h-4 text-white" />
            </div>
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-900 border-none bg-transparent cursor-pointer transition-colors">
            <Film className="w-5 h-5" />
          </button>
          <button className="p-1 border-none bg-transparent cursor-pointer">
            <img
              src="/creators/rohan.jpg"
              alt="Profile"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-300"
            />
          </button>
        </div>
        {/* iOS Home Indicator Pill */}
        <div className="w-24 h-1 bg-slate-900/30 rounded-full mb-1.5" />
      </div>
    </div>
  );
}
