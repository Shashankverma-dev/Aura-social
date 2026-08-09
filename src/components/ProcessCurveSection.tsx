"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  id: string;
  badge: string;
  stepLabel: string;
  title: string;
  description: string;
  pathAt: number; // 0 to 1 along path
  side: "above" | "below";
  nodeCx: number;
  nodeCy: number;
  cardX: number;
  cardY: number;
}

const STEPS: StepItem[] = [
  {
    id: "step-1",
    badge: "01",
    stepLabel: "Step 01",
    title: "Research",
    description: "Deep dive into audience behavior & competitor analytics",
    pathAt: 0.05,
    side: "below",
    nodeCx: 87,
    nodeCy: 149,
    cardX: 140,
    cardY: 195,
  },
  {
    id: "step-2",
    badge: "02",
    stepLabel: "Step 02",
    title: "Analysis",
    description: "Extract data-driven insights & conversion opportunities",
    pathAt: 0.25,
    side: "above",
    nodeCx: 284,
    nodeCy: 87,
    cardX: 284,
    cardY: -20,
  },
  {
    id: "step-3",
    badge: "03",
    stepLabel: "Step 03",
    title: "Strategy",
    description: "Architect high-ROAS viral motion campaigns",
    pathAt: 0.48,
    side: "below",
    nodeCx: 503,
    nodeCy: 200,
    cardX: 503,
    cardY: 250,
  },
  {
    id: "step-4",
    badge: "04",
    stepLabel: "Step 04",
    title: "Planning",
    description: "Map 60 FPS interactive scroll & video workflows",
    pathAt: 0.73,
    side: "above",
    nodeCx: 774,
    nodeCy: 250,
    cardX: 740,
    cardY: 120,
  },
  {
    id: "step-5",
    badge: "05",
    stepLabel: "Step 05",
    title: "Execution",
    description: "Launch & scale with automated real-time optimization",
    pathAt: 0.94,
    side: "below",
    nodeCx: 1078,
    nodeCy: 90,
    cardX: 1010,
    cardY: 140,
  },
];

export function ProcessCurveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const manRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [manPos, setManPos] = useState<{ x: number; y: number; facingRight: boolean }>({
    x: 40,
    y: 190,
    facingRight: true,
  });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const pathEl = pathRef.current;
    const progressPathEl = progressPathRef.current;

    if (!sectionEl || !pathEl || !progressPathEl) return;

    // SVG path total length calculation
    const totalLength = pathEl.getTotalLength();

    // Initial progress line setup
    progressPathEl.style.strokeDasharray = `${totalLength}`;
    progressPathEl.style.strokeDashoffset = `${totalLength}`;

    // Set initial position
    const startPoint = pathEl.getPointAtLength(0.02 * totalLength);
    setManPos({ x: startPoint.x, y: startPoint.y, facingRight: true });

    let lastX = startPoint.x;

    const trigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1

        // 1. Calculate stroke dashoffset for red glowing line
        const currentLength = p * totalLength;
        progressPathEl.style.strokeDashoffset = `${totalLength - currentLength}`;

        // 2. Get coordinates along path for character position
        const point = pathEl.getPointAtLength(Math.min(currentLength, totalLength - 1));
        const facingRight = point.x >= lastX;
        lastX = point.x;

        setManPos({
          x: point.x,
          y: point.y,
          facingRight,
        });

        // 3. Calculate active step index (0 to 4)
        if (p < 0.15) setActiveStep(0);
        else if (p >= 0.15 && p < 0.38) setActiveStep(1);
        else if (p >= 0.38 && p < 0.60) setActiveStep(2);
        else if (p >= 0.60 && p < 0.85) setActiveStep(3);
        else setActiveStep(4);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white text-slate-950 py-16 sm:py-24 px-4 sm:px-6 md:px-8 overflow-hidden select-none flex flex-col justify-center items-center"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-3 mb-10 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#e60023] text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#e60023]" />
          <span>How We Work</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          What do we do to Become <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e60023] to-[#b3001b] bg-clip-text text-transparent">
            Best Digital Marketing Agency?
          </span>
        </h2>

        <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          Our proven 5-step interactive process engineers high-converting social campaigns with mathematical precision.
        </p>
      </div>

      {/* Main Process Curve Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1140px] mx-auto aspect-[1200/480] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center z-10"
      >
        {/* SVG Curved Path Overlay */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 1200 360"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="processClassicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#e60023" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0.5" />
            </linearGradient>
            <filter id="processPathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint Background Path Shadow */}
          <path
            className="stroke-red-200/50"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            d="M40 190 C180 52 320 54 470 176 C620 296 760 298 910 168 C1010 78 1100 72 1160 118"
          />

          {/* Main Dashed Path */}
          <path
            ref={pathRef}
            className="stroke-[#e60023]/40"
            strokeWidth="3"
            strokeDasharray="8 8"
            fill="none"
            d="M40 190 C180 52 320 54 470 176 C620 296 760 298 910 168 C1010 78 1100 72 1160 118"
          />

          {/* Glowing Animated Progress Path */}
          <path
            ref={progressPathRef}
            stroke="url(#processClassicGradient)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            filter="url(#processPathGlow)"
            d="M40 190 C180 52 320 54 470 176 C620 296 760 298 910 168 C1010 78 1100 72 1160 118"
          />

          {/* Path Node Circles */}
          <g className="process-path-nodes">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <g key={step.id}>
                  <circle
                    cx={step.nodeCx}
                    cy={step.nodeCy}
                    r={isActive ? "10" : "7"}
                    fill={isActive ? "#e60023" : "#ffffff"}
                    stroke="#e60023"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      cx={step.nodeCx}
                      cy={step.nodeCy}
                      r="16"
                      fill="none"
                      stroke="#e60023"
                      strokeWidth="1.5"
                      className="animate-ping opacity-40"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* 3D Character (Man With Phone) Following Path */}
        <div
          ref={manRef}
          className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${(manPos.x / 1200) * 100}%`,
            top: `${(manPos.y / 360) * 100}%`,
            transform: `translate(-50%, -82%) scaleX(${manPos.facingRight ? 1 : -1})`,
          }}
        >
          {/* Shadow underneath man */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 rounded-full blur-xs pointer-events-none" />
          
          <img
            src="/man-with-phone-transparent.png"
            alt="Man walking with smartphone"
            className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 object-contain filter drop-shadow-md"
          />
        </div>

        {/* 5 Step Cards Positioned Along the Curve */}
        {STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          const leftPct = (step.cardX / 1200) * 100;
          const topPct = (step.cardY / 360) * 100;

          return (
            <div
              key={step.id}
              className={`absolute z-20 transition-all duration-500 transform -translate-x-1/2 ${
                isActive ? "scale-105 z-30" : "scale-95 opacity-80"
              }`}
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
              }}
            >
              {/* Connector Stem Line */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-0.5 transition-colors duration-300 ${
                  step.side === "below" ? "-top-6 h-6" : "-bottom-6 h-6"
                } ${isActive ? "bg-[#e60023]" : "bg-red-200/80"}`}
              />

              {/* Card Container */}
              <div
                className={`w-32 xs:w-40 sm:w-52 md:w-56 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 border transition-all duration-300 ${
                  isActive
                    ? "border-[#e60023] shadow-[0_12px_30px_rgba(230,0,35,0.2)] bg-white ring-2 ring-red-500/20"
                    : "border-slate-200/90 shadow-md hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black transition-colors ${
                      isActive ? "bg-[#e60023] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {step.badge}
                  </span>
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#e60023]">
                    {step.stepLabel}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight">
                  {step.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-600 font-normal leading-relaxed mt-1 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
