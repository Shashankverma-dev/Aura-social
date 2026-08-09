"use client";

import React from "react";
import { GlassmorphismNavBar } from "./ui/glassmorphism-navigation";
import { Home, Sparkles, Layers, ShieldCheck, Mail } from "lucide-react";

interface NavbarProps {
  activeSectionIndex?: number;
  onNavigate?: (index: number) => void;
}

export function Navbar({ activeSectionIndex = 0, onNavigate }: NavbarProps) {
  const navItems = [
    { name: "Overview", url: "#hero", icon: Home },
    { name: "Services", url: "#showcase", icon: Sparkles },
    { name: "Templates", url: "#templates", icon: Layers },
    { name: "Our Story", url: "#story", icon: ShieldCheck },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return (
    <GlassmorphismNavBar
      items={navItems}
      activeSectionIndex={activeSectionIndex}
      onNavigate={onNavigate}
    />
  );
}
