"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16 sm:py-20 text-slate-600 relative z-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-400/10 via-purple-400/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16 relative z-10">
        {/* Top Call to Action Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-slate-700 transition-all">
          {/* Accent Top Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

          <div className="space-y-2.5 text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Ready to elevate your social media presence?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Join thousands of forward-thinking brands storytelling with precision, speed, and elegance.
            </p>
          </div>
          <button className="px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-[1.03] transition-all z-10 shrink-0 cursor-pointer border-none">
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm pt-2">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Aura Logo" className="h-8 sm:h-9 w-auto object-contain" />
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-950">
                Aura <span className="text-blue-600">Social</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-xs leading-relaxed font-medium">
              The premier scroll-driven social marketing platform. Engineered for maximum ROAS and 60 FPS visual storytelling.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-slate-950 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#hero" className="hover:text-slate-950 transition-colors">Overview</a></li>
              <li><a href="#showcase" className="hover:text-slate-950 transition-colors">Services</a></li>
              <li><a href="#templates" className="hover:text-slate-950 transition-colors">Templates</a></li>
              <li><a href="#story" className="hover:text-slate-950 transition-colors">Our Story</a></li>
              <li><a href="#contact" className="hover:text-slate-950 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-slate-950 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-950 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Brand Kit</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-slate-950 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-950 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© 2026 Aura Social Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Designed for peak performance & 60 FPS scroll storytelling.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

