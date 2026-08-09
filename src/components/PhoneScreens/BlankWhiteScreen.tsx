"use client";

import React from "react";

export function BlankWhiteScreen() {
  return (
    <div className="w-full h-full bg-white relative flex items-center justify-center overflow-hidden">
      {/* Pure blank white screen as mandated for Section 2 */}
      <div className="absolute top-4 left-8 right-8 flex justify-between items-center text-[11px] text-slate-300 font-sans opacity-40 select-none">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono">5G</span>
          <div className="w-4 h-2.5 rounded-sm border border-slate-300 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-300 rounded-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
