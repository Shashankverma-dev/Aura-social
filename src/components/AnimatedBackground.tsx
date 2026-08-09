"use client";

import React from "react";

interface AnimatedBackgroundProps {
  activeSectionIndex?: number;
}

export function AnimatedBackground({ activeSectionIndex = 0 }: AnimatedBackgroundProps) {
  return (
    <>
      {/* Permanent Solid Pure White Base Layer for non-hero sections */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10" />

      {/* Hero Section Background Image Artwork (ONLY visible on Section 0 / Hero) */}
      <div
        className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none transition-opacity duration-700 ${
          activeSectionIndex === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <img
          src="/bg-hero.png"
          alt="Hero Marble Background Graphic"
          className="w-full h-full object-cover object-center"
        />

        {/* Soft Vignette Overlay for Hero */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.25) 100%)",
          }}
        />
      </div>

      {/* Subtle Soft Pastel Ambient Glows for White Background Sections */}
      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          activeSectionIndex === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-100/60 rounded-full blur-[140px]" />
      </div>

      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          activeSectionIndex === 2 ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/3 left-1/4 w-[650px] h-[500px] bg-purple-100/60 rounded-full blur-[140px]" />
      </div>

      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          activeSectionIndex === 3 ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/3 left-1/3 w-[650px] h-[500px] bg-emerald-100/60 rounded-full blur-[140px]" />
      </div>

      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          activeSectionIndex === 4 ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/3 right-1/4 w-[650px] h-[500px] bg-indigo-100/60 rounded-full blur-[140px]" />
      </div>
    </>
  );
}

