import React from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollStory } from "@/components/ScrollStory";
import { ProcessCurveSection } from "@/components/ProcessCurveSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-transparent text-slate-950 font-sans selection:bg-blue-600 selection:text-white"
      style={{ position: "relative", zIndex: 1 }}
    >
      <Navbar />
      <ScrollStory />
      <ProcessCurveSection />
      <Footer />
    </main>
  );
}
