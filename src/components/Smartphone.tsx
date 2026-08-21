"use client";

import React from "react";
import { HeroFeedScreen } from "./PhoneScreens/HeroFeedScreen";
import { ServicesShowcaseScreen } from "./PhoneScreens/ServicesShowcaseScreen";
import { TemplateGalleryScreen } from "./PhoneScreens/TemplateGalleryScreen";
import { OurStoryScreen } from "./PhoneScreens/OurStoryScreen";
import { ContactMobileScreen } from "./PhoneScreens/ContactMobileScreen";

export type ScreenState = "hero" | "showcase" | "templates" | "story" | "contact";

interface SmartphoneProps {
  screenState: ScreenState;
}

export function Smartphone({ screenState }: SmartphoneProps) {
  return (
    <div className="relative w-[305px] h-[610px] sm:w-[315px] sm:h-[630px] md:w-[325px] md:h-[650px] gpu-accelerated select-none transition-all duration-500">
      {/* Outer Metallic Titanium Bezel Chassis (Concentric 50px radius) */}
      <div className="absolute inset-0 rounded-[50px] bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400 p-[2.5px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] ring-1 ring-slate-400/50">
        
        {/* Inner Ultra-Slim Uniform Bezel (Concentric 47.5px radius, 3.5px padding) */}
        <div className="w-full h-full rounded-[47.5px] bg-slate-950 p-[3.5px] sm:p-[4px] relative overflow-hidden border border-slate-900">
          
          {/* Side Buttons Visual Realism */}
          {/* Volume Buttons Left */}
          <div className="absolute -left-[5px] top-24 sm:top-28 w-[3px] h-8 sm:h-10 rounded-l-md bg-slate-400 shadow-sm" />
          <div className="absolute -left-[5px] top-36 sm:top-42 w-[3px] h-8 sm:h-10 rounded-l-md bg-slate-400 shadow-sm" />
          {/* Power Button Right */}
          <div className="absolute -right-[5px] top-28 sm:top-32 w-[3px] h-12 sm:h-14 rounded-r-md bg-slate-400 shadow-sm" />

          {/* Screen Container (Concentric 44px radius, perfectly flush with bezel corners) */}
          <div className="w-full h-full rounded-[44px] bg-white overflow-hidden relative shadow-inner">
            
            {/* Dynamic Island / Notch Pill */}
            <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-22 sm:w-24 h-4.5 sm:h-5 rounded-full bg-black z-40 border border-white/15 flex items-center justify-between px-2 shadow-md">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-900 ring-1 ring-white/15 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/70" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
            </div>

            {/* Screen Content Layers with Smooth Crossfade */}
            <div className="w-full h-full relative overflow-hidden rounded-[44px]">
              {/* Hero Feed */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  screenState === "hero" ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <HeroFeedScreen />
              </div>

              {/* Services Showcase Screen (Section 2 - Services) */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  screenState === "showcase" ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <ServicesShowcaseScreen />
              </div>

              {/* Template Gallery */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  screenState === "templates" ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <TemplateGalleryScreen />
              </div>

              {/* Our Story Screen */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  screenState === "story" ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <OurStoryScreen />
              </div>

              {/* Contact Screen */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  screenState === "contact" ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <ContactMobileScreen />
              </div>
            </div>

            {/* Hardware Glass Reflection Overlay */}
            <div className="absolute inset-0 phone-glare pointer-events-none z-30 opacity-50 rounded-[44px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
