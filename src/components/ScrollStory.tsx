"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Smartphone, ScreenState } from "./Smartphone";
import { HeroFeedScreen } from "./PhoneScreens/HeroFeedScreen";
import { TemplateGalleryScreen } from "./PhoneScreens/TemplateGalleryScreen";
import { OurStoryScreen } from "./PhoneScreens/OurStoryScreen";
import { ContactMobileScreen } from "./PhoneScreens/ContactMobileScreen";
import { AnimatedBackground } from "./AnimatedBackground";
import { Navbar } from "./Navbar";
import { Instagram, Youtube, Twitter, Linkedin, Facebook, ArrowRight, Play, Sparkles, CheckCircle2, Star, ShieldCheck, Zap, Layers, TrendingUp, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollStory() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  
  const [screenState, setScreenState] = useState<ScreenState>("hero");
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [activeServiceModal, setActiveServiceModal] = useState<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    stat: string;
    badge: string;
    highlights: string[];
    color: string;
    image: string;
  } | null>(null);
  const [activeFeatureModal, setActiveFeatureModal] = useState<"feed" | "templates" | "story" | "contact" | null>(null);

  const scrollToSection = (sectionIndex: number) => {
    if (typeof window === "undefined" || !triggerRef.current) return;
    const triggerEl = triggerRef.current;
    const totalHeight = window.innerHeight * 4.0;
    const progressMap = [0, 0.25, 0.50, 0.72, 0.95];
    const targetY = triggerEl.offsetTop + totalHeight * (progressMap[sectionIndex] || 0);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Reset scroll position to top on mount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let timeline: gsap.core.Timeline | null = null;

    // 2. Setup GSAP ScrollTrigger Master Timeline with dynamic aspect-ratio geometry calculation
    const initGSAP = () => {
      setWindowWidth(window.innerWidth);
      
      const triggerEl = triggerRef.current;
      const phoneEl = phoneWrapperRef.current;

      if (!triggerEl || !phoneEl) return;

      // Kill previous timeline/scrolltriggers before rebuilding layout
      if (timeline) {
        timeline.kill();
        timeline = null;
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());

      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      // ─────────────────────────────────────────────────────────────
      // PHONE PLACEMENT — bg-image geometry (works at any DPI/scale)
      //
      // bg-hero.png is 16:9. It's rendered with object-fit:cover.
      // The stone pedestal centre is at ~57% from the left of the source image.
      // We compute where that maps to in CSS-pixel space after cover-cropping,
      // then subtract half the viewport width to get the GSAP x offset
      // (GSAP positions the element relative to its own centred origin).
      //
      // This approach is scale-invariant: it works at 100%, 125%, 150% DPI
      // because the browser always reports CSS pixels consistently.
      // ─────────────────────────────────────────────────────────────

      const bgNativeAspect = 16 / 9;
      const screenAspect   = width / height;

      // Rendered bg dimensions after object-fit:cover
      const renderedBgW = screenAspect >= bgNativeAspect ? width  : height * bgNativeAspect;
      const renderedBgH = screenAspect >= bgNativeAspect ? width / bgNativeAspect : height;

      // The bg image is always centred, so its left edge is at:
      const bgOffsetX = (width  - renderedBgW) / 2;  // negative when wider than viewport
      const bgOffsetY = (height - renderedBgH) / 2;  // negative when taller than viewport

      // Pedestal centre: 65.5% from left, 58% from top of the *source* image
      // (measured on the actual bg-hero.png — phone sits between plant pot at 50% and glass tubes at 80%)
      const pedestalX = renderedBgW * 0.655 + bgOffsetX;  // CSS px from viewport left
      const pedestalY = renderedBgH * 0.58  + bgOffsetY;  // CSS px from viewport top

      // GSAP x/y are offsets from the *element's centred origin* inside the container
      // Container is full-viewport flex-center, so centre = (width/2, height/2)
      const heroXOffset = isMobile ? 0 : Math.round(pedestalX - width  / 2);
      const heroYOffset = isMobile ? Math.round(height * 0.12) : Math.round(pedestalY - height / 2);

      // Mobile phone scale increased to 0.90 for prominent, high-visibility mobile display
      const targetPhoneH = height * 0.48;
      const phoneNativeH = 844;
      const heroScale    = isMobile
        ? 0.90
        : Math.min(0.80, Math.max(0.46, targetPhoneH / phoneNativeH));

      // Section 3 (Templates): phone moves slightly further right
      const rightXOffset = isMobile ? 0 : Math.round(heroXOffset * 1.12);

      const showcaseYOffset = isMobile ? Math.round(height * 0.10) : Math.round(height * 0.14);
      const templateYOffset = isMobile ? Math.round(height * 0.12) : Math.round(height * 0.04);
      const storyYOffset    = isMobile ? Math.round(height * 0.12) : 0;

      const showcaseScale = isMobile ? 0.98 : Math.min(1.48, Math.max(0.95, height * 0.0014));
      const templateScale = isMobile ? 0.90 : Math.min(1.15, Math.max(0.80, height * 0.0011));
      const storyScale    = isMobile ? 0.90 : Math.min(1.25, Math.max(0.85, height * 0.0012));

      // Set explicit initial GSAP transform state for Hero section
      gsap.set(phoneEl, {
        x: heroXOffset,
        y: heroYOffset,
        scale: heroScale,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
      });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "+=400%",
          scrub: 0.8,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.18) {
              setScreenState("hero");
              setActiveSectionIndex(0);
            } else if (p >= 0.18 && p < 0.38) {
              setScreenState("showcase");
              setActiveSectionIndex(1);
            } else if (p >= 0.38 && p < 0.60) {
              setScreenState("templates");
              setActiveSectionIndex(2);
            } else if (p >= 0.60 && p < 0.80) {
              setScreenState("story");
              setActiveSectionIndex(3);
            } else {
              setScreenState("contact");
              setActiveSectionIndex(4);
            }
          },
        },
      });

      // SECTION 0 -> 1 (Services): ROTATE 90 DEG TO LANDSCAPE ON DESKTOP; STAY PORTRAIT ON MOBILE
      timeline.fromTo(
        phoneEl,
        {
          x: heroXOffset,
          y: heroYOffset,
          scale: heroScale,
          rotationY: 0,
          rotationX: 0,
          rotationZ: 0,
        },
        {
          x: 0,
          y: showcaseYOffset,
          scale: showcaseScale,
          rotationY: 0,
          rotationX: 0,
          rotationZ: isMobile ? 0 : 90, // Mobile stays portrait; desktop rotates landscape
          ease: "power2.inOut",
          duration: 1,
        }
      );

      // SECTION 1 -> 2 (Templates): ROTATE BACK TO PORTRAIT ON RIGHT
      timeline.to(phoneEl, {
        x: rightXOffset,
        y: templateYOffset,
        scale: templateScale,
        rotationY: isMobile ? 0 : -10,
        rotationX: 0,
        rotationZ: 0, // Rotate back to portrait
        ease: "power2.inOut",
        duration: 1,
      });

      // SECTION 2 -> 3 (Our Story): GLIDE TO LEFT SIDE
      timeline.to(phoneEl, {
        x: isMobile ? 0 : -rightXOffset,
        y: storyYOffset,
        scale: storyScale,
        rotationY: isMobile ? 0 : -12,
        rotationX: 0,
        rotationZ: 0,
        ease: "power2.inOut",
        duration: 1,
      });

      // SECTION 3 -> 4 (Contact Us): GLIDE TO RIGHT SIDE
      timeline.to(phoneEl, {
        x: rightXOffset,
        y: storyYOffset,
        scale: storyScale,
        rotationY: isMobile ? 0 : 10,
        rotationX: 0,
        rotationZ: 0,
        ease: "power2.inOut",
        duration: 1,
      });

      // Refresh ScrollTrigger layout calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    initGSAP();

    const handleResize = () => {
      initGSAP();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      if (timeline) timeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <>
      {/* Navbar with synced section active tab & smooth scrolling */}
      <Navbar activeSectionIndex={activeSectionIndex} onNavigate={scrollToSection} />

      {/* Animated Background reacts to active section (Hero image vs White screen) */}
      <AnimatedBackground activeSectionIndex={activeSectionIndex} />

      <div ref={triggerRef} className="relative w-full h-screen bg-transparent text-slate-950 overflow-hidden select-none">
      {/* Pinned Viewport Container */}
      <div className="relative w-full h-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-between">
        
        {/* ================= SECTION 1 COPY: HERO ================= */}
        <div
          id="hero"
          className={`absolute transition-all duration-700 ${
            isMobile
              ? "top-24 sm:top-28 inset-x-4 text-center mx-auto flex flex-col items-center max-w-sm space-y-3 sm:space-y-4"
              : "left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 2xl:left-16 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl text-left space-y-4 sm:space-y-6 lg:space-y-7"
          } ${
            activeSectionIndex === 0
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          {/* Dynamic Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-[1.05] text-slate-950 drop-shadow-xs">
            Social Marketing,{" "}
            <span className="relative inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reimagined.
              <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-full blur-xs" />
            </span>
          </h1>

          {/* Subtitle Copy */}
          <p className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-700 font-medium leading-relaxed max-w-xs sm:max-w-none">
            Transform static campaigns into an automated, interactive motion journey. Engineered for viral reach and maximum ROAS.
          </p>

          {/* Social Platforms Badge Row */}
          <div className={`flex items-center gap-2 sm:gap-3 pt-0.5 ${isMobile ? "justify-center" : "justify-start"}`}>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mr-1">
              Connect:
            </span>
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-rose-500/40 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-red-600/40 transition-all duration-300 group"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-white border border-slate-800 flex items-center justify-center shadow-md hover:scale-110 hover:shadow-slate-900/60 transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-blue-600/40 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-blue-700/40 transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform" />
              </a>
            </div>
          </div>

          {/* High Impact CTA Buttons */}
          <div className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-1 ${isMobile ? "justify-center" : "justify-start"}`}>
            <button className="relative overflow-hidden px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm lg:text-base font-extrabold transition-all shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:scale-[1.02] flex items-center gap-2 group cursor-pointer border-none">
              <span className="relative z-10">Get a Free Growth Consultation</span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            
            <button
              onClick={() => scrollToSection(1)}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/80 hover:bg-white text-slate-900 text-xs sm:text-sm lg:text-base font-bold transition-all border border-slate-300/90 backdrop-blur-md shadow-md flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Explore Our Services</span>
            </button>

            {isMobile && (
              <button
                onClick={() => setActiveFeatureModal("feed")}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm lg:text-base font-bold transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02] cursor-pointer border-none"
              >
                <Play className="w-4 h-4" />
                <span>See it in Action</span>
              </button>
            )}
          </div>


        </div>

        {/* ================= SECTION 2 COPY: SHOWCASE ================= */}
        <div
          id="showcase"
          className={`absolute transition-all duration-700 z-10 flex flex-col items-center ${
            isMobile
              ? "top-24 sm:top-28 inset-x-3 text-center mx-auto max-w-sm space-y-2"
              : "inset-x-4 sm:inset-x-6 top-14 sm:top-28 md:top-32 lg:top-32 text-center max-w-3xl lg:max-w-4xl mx-auto space-y-1.5 sm:space-y-3"
          } ${
            activeSectionIndex === 1
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 drop-shadow-xs text-center leading-tight">
            Our 7 Core Services.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-xs sm:max-w-lg mx-auto leading-relaxed text-center font-medium">
            Explore our full suite of high-converting social, search, creative, and digital growth solutions.
          </p>

          {/* Mobile Only: Service Showcase Grid (when 3D phone is hidden on mobile) */}
          <div className="md:hidden grid grid-cols-2 gap-2 pt-2 w-full max-w-sm px-1 text-left">
            {[
              {
                id: "smm",
                title: "Social Media",
                subtitle: "Viral Content & Community Scaling",
                description: "Scale your organic social presence with data-backed short-form Reels, TikToks, and high-converting community campaigns.",
                stat: "+340% Reach",
                badge: "Viral Growth",
                highlights: ["Viral Reel Production", "+340% Organic Impressions", "24/7 AI Community Moderation"],
                color: "border-blue-900/40 bg-slate-950 text-blue-400 hover:border-blue-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
              },
              {
                id: "seo",
                title: "SEO Ranking",
                subtitle: "Rank #1 on Google & AI Engines",
                description: "Dominate search results across Google and AI engines with technical schema optimization and keyword velocity.",
                stat: "#1 Google",
                badge: "AI Engines",
                highlights: ["#1 Organic Keyword Rankings", "AI Search Engine Optimization", "Technical Speed Audits"],
                color: "border-purple-900/40 bg-slate-950 text-purple-400 hover:border-purple-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
              },
              {
                id: "graphic",
                title: "3D Graphics",
                subtitle: "Modern Brand Identity & Visual Assets",
                description: "Craft breathtaking 3D visual assets, UI design systems, and viral social creative kits.",
                stat: "60 FPS Motion",
                badge: "Brand Kit",
                highlights: ["3D Motion & Visual Graphics", "Complete Brand Guidelines", "High-Converting Ad Creatives"],
                color: "border-pink-900/40 bg-slate-950 text-pink-400 hover:border-pink-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
              },
              {
                id: "webdev",
                title: "Web Dev",
                subtitle: "60 FPS Interactive Next.js Web Apps",
                description: "Build ultra-fast, scroll-animated landing pages and full-stack web applications engineered for 100/100 performance.",
                stat: "Next.js 15",
                badge: "Interactive",
                highlights: ["60 FPS GSAP Motion Engine", "Sub-second Page Load", "Conversion-Optimized Layouts"],
                color: "border-emerald-900/40 bg-slate-950 text-emerald-400 hover:border-emerald-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
              },
              {
                id: "copy",
                title: "Content Copy",
                subtitle: "High-ROAS Storytelling & Messaging",
                description: "Persuasive copywriting designed to capture immediate attention and convert cold traffic into high-value customers.",
                stat: "High ROAS",
                badge: "Storytelling",
                highlights: ["Scroll-Stopping Hook Headlines", "High-ROAS Ad Copy Testing", "Automated Conversion Funnels"],
                color: "border-amber-900/40 bg-slate-950 text-amber-400 hover:border-amber-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
              },
              {
                id: "photo",
                title: "Photo & Video",
                subtitle: "4K Studio Creative & Reel Shooting",
                description: "Cinema-grade 4K studio photography and high-energy video production tailored for Instagram Reels and Meta ad campaigns.",
                stat: "4K Studio",
                badge: "Reels & Ads",
                highlights: ["4K Cinema Studio Shoots", "Short-Form Reel Production", "Product Highlight Macro Reels"],
                color: "border-cyan-900/40 bg-slate-950 text-cyan-400 hover:border-cyan-700/60 hover:bg-slate-900",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
              },
            ].map((srv, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveServiceModal(srv)}
                className={`p-2 rounded-xl border ${srv.color} shadow-xs backdrop-blur-md cursor-pointer active:scale-95 hover:scale-[1.02] transition-all text-left group overflow-hidden`}
              >
                <div className="w-full h-14 rounded-md overflow-hidden bg-slate-900 mb-1.5 opacity-90 group-hover:opacity-100 transition-opacity border border-current/20">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-extrabold uppercase tracking-wider opacity-80">{srv.badge}</div>
                  <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs font-black leading-tight text-white mt-1">{srv.title}</div>
                <div className="text-[9px] sm:text-[10px] font-bold mt-1 text-slate-300 opacity-80">{srv.stat}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= SECTION 3 COPY: TEMPLATES ================= */}
        <div
          id="templates"
          className={`absolute transition-all duration-700 ${
            isMobile
              ? "top-24 sm:top-28 inset-x-4 text-center mx-auto flex flex-col items-center max-w-sm space-y-3"
              : "left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[560px] text-left space-y-3 sm:space-y-5"
          } ${
            activeSectionIndex === 2
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-purple-600/10 text-purple-700 border border-purple-500/30 text-[10px] sm:text-xs font-bold backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Template Library</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            AI-Powered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Design Studio.
            </span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-xs sm:max-w-none">
            Access 500+ battle-tested social templates engineered for maximum engagement across Reels, Carousels, and Stories.
          </p>

          <ul className={`space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm md:text-base text-slate-800 font-semibold ${isMobile ? "inline-block text-left" : "text-left"}`}>
            <li className="flex items-center gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-700 flex items-center justify-center text-[9px] sm:text-xs font-bold shrink-0">✓</div>
              <span>Instant auto-formatting for video ratios</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-700 flex items-center justify-center text-[9px] sm:text-xs font-bold shrink-0">✓</div>
              <span>One-click brand kit synchronization</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-700 flex items-center justify-center text-[9px] sm:text-xs font-bold shrink-0">✓</div>
              <span>Automated caption generation</span>
            </li>
          </ul>

          <div className="pt-0.5 sm:pt-1">
            <button
              onClick={() => isMobile ? setActiveFeatureModal("templates") : scrollToSection(2)}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm lg:text-base font-extrabold shadow-xl shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer border-none"
            >
              <span>{isMobile ? "View Template Gallery" : "Explore All Templates"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= SECTION 4 COPY: OUR STORY ================= */}
        <div
          id="story"
          className={`absolute transition-all duration-700 ${
            isMobile
              ? "top-24 sm:top-28 inset-x-4 text-center mx-auto flex flex-col items-center max-w-sm space-y-3"
              : "right-6 sm:right-10 md:right-16 lg:right-28 xl:right-36 2xl:right-48 text-left space-y-3 sm:space-y-5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[520px]"
          } ${
            activeSectionIndex === 3
              ? "opacity-100 translate-x-0 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-x-12 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-emerald-600/10 text-emerald-700 border border-emerald-500/30 text-[10px] sm:text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Journey</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
            Our Story.
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-xs sm:max-w-none">
            Built for creators who refuse to compromise on visual excellence. Experience the internal story page live on the smartphone.
          </p>

          <div className="pt-0.5 sm:pt-1">
            <button
              onClick={() => isMobile ? setActiveFeatureModal("story") : scrollToSection(3)}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm lg:text-base font-extrabold flex items-center gap-2 shadow-xl shadow-slate-950/20 hover:scale-[1.02] cursor-pointer transition-all border-none"
            >
              <span>Read Full Manifesto</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* ================= SECTION 5 COPY: CONTACT ================= */}
        <div
          id="contact"
          className={`absolute transition-all duration-700 ${
            isMobile
              ? "top-24 sm:top-28 inset-x-4 text-center mx-auto flex flex-col items-center max-w-sm space-y-3"
              : "left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[520px] text-left space-y-3 sm:space-y-5"
          } ${
            activeSectionIndex === 4
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-blue-600/10 text-blue-700 border border-blue-500/30 text-[10px] sm:text-xs font-bold backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            Let's Build <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Something Great.
            </span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-xs sm:max-w-none">
            Ready to transform your brand growth? Connect with our team of strategists, engineers, and creatives today.
          </p>

          <div className="pt-0.5 sm:pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={() => isMobile ? setActiveFeatureModal("contact") : scrollToSection(4)}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm lg:text-base font-extrabold flex items-center gap-2 shadow-xl shadow-slate-950/20 hover:scale-[1.02] cursor-pointer transition-all border-none"
            >
              <span>Contact Growth Team</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* ================= CENTER STAGE SINGLE SMARTPHONE (EXPLICIT GSAP TRANSFORM FOR BI-DIRECTIONAL SCRUB) ================= */}
        <div className="hidden md:flex w-full h-full items-center justify-center relative pointer-events-none">
          <div
            ref={phoneWrapperRef}
            className="perspective-1000 gpu-accelerated pointer-events-auto"
          >
            <Smartphone screenState={screenState} />
          </div>
        </div>

      </div>

      {/* Dynamic Scroll Progress Indicator Bar */}
      <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-md border border-slate-300/80 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl shadow-slate-900/5 text-[10px] sm:text-xs font-semibold text-slate-700 transition-all duration-500">
        {[
          { label: "1. Hero", index: 0 },
          { label: "2. Services", index: 1 },
          { label: "3. Templates", index: 2 },
          { label: "4. Our Story", index: 3 },
          { label: "5. Contact", index: 4 },
        ].map((sec) => (
          <div key={sec.index} className="flex items-center gap-1.5 sm:gap-2">
            <span
              onClick={() => scrollToSection(sec.index)}
              className={cn(
                "transition-colors cursor-pointer select-none",
                activeSectionIndex === sec.index
                  ? "text-slate-950 font-black"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {sec.label}
            </span>
            {sec.index < 4 && <span className="text-slate-300">•</span>}
          </div>
        ))}
      </div>

      {/* Interactive Mobile Service Details Pop-Up Modal */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 text-left flex flex-col animate-in zoom-in-95 duration-300">
            {/* Cover Image */}
            <div className="w-full h-40 relative shrink-0 bg-slate-900">
              <img src={activeServiceModal.image} alt={activeServiceModal.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {/* Close Button overlayed */}
              <button
                onClick={() => setActiveServiceModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:bg-black/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-50 ring-1 ring-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 bg-white relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 -mt-9 relative z-10 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeServiceModal.badge}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-black text-slate-950 leading-tight">
                  {activeServiceModal.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {activeServiceModal.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {activeServiceModal.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Key Features & Metrics:
                </div>
                <ul className="space-y-1.5 text-xs font-semibold text-slate-800">
                  {activeServiceModal.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveServiceModal(null);
                    scrollToSection(4);
                  }}
                  className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg cursor-pointer border-none"
                >
                  <span>Get Started with {activeServiceModal.title}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Mobile Feature Details Pop-Up Modal */}
      {activeFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-sm h-[80vh] bg-slate-950 rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden border border-slate-800/80 ring-4 ring-slate-900/50 flex flex-col animate-in zoom-in-95 duration-300">
            {/* Close Button overlayed */}
            <button
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:bg-black/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-50 ring-1 ring-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Screen Content */}
            <div className="w-full h-full relative overflow-hidden rounded-[32px] sm:rounded-[36px]">
              {activeFeatureModal === "feed" && <HeroFeedScreen />}
              {activeFeatureModal === "templates" && <TemplateGalleryScreen />}
              {activeFeatureModal === "story" && <OurStoryScreen />}
              {activeFeatureModal === "contact" && <ContactMobileScreen />}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
