"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Sparkles, Layers, ShieldCheck, LogIn, ArrowRight, X, Check, Mail, Lock, LogOut, Menu,
  ChevronDown, Share2, Search, Palette, Code, FileText, Camera, Megaphone
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
}

export interface GlassmorphismNavBarProps {
  items?: NavItem[];
  className?: string;
  activeSectionIndex?: number;
  onNavigate?: (index: number) => void;
}

export const SERVICES_ITEMS = [
  { title: "Social Media Marketing", icon: Share2, desc: "Viral campaigns & audience growth" },
  { title: "SEO", icon: Search, desc: "Rank #1 on Google & AI engines" },
  { title: "Graphic Designing", icon: Palette, desc: "Brand identity & visual creative" },
  { title: "Web Development", icon: Code, desc: "60 FPS interactive web apps" },
  { title: "Content Writing", icon: FileText, desc: "High-converting storytelling & copy" },
  { title: "Commercial Photography & Videography", icon: Camera, desc: "4K studio production & Reels" },
  { title: "Online Advertising", icon: Megaphone, desc: "Max ROAS Meta & Google ads" },
];

export function GlassmorphismNavBar({
  items = [
    { name: "Overview", url: "#hero", icon: Home },
    { name: "Services", url: "#showcase", icon: Sparkles },
    { name: "Templates", url: "#templates", icon: Layers },
    { name: "Our Story", url: "#story", icon: ShieldCheck },
    { name: "Contact", url: "#contact", icon: Mail },
  ],
  className,
  activeSectionIndex,
  onNavigate,
}: GlassmorphismNavBarProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const currentActiveIndex = activeSectionIndex !== undefined ? activeSectionIndex : internalActiveIndex;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setInternalActiveIndex(index);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(index);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsAuthOpen(false);
      const fakeUser = {
        name: email ? email.split("@")[0] : "Alex Rivers",
        email: email || "alex.rivers@aurapro.io",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
      setUser(fakeUser);
      triggerToast(`Welcome back, ${fakeUser.name}!`);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserDropdown(false);
    triggerToast("Logged out successfully.");
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-950/90 text-white px-5 py-2.5 rounded-full shadow-2xl border border-slate-700/80 backdrop-blur-xl text-xs sm:text-sm font-bold flex items-center gap-2 pointer-events-none"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glassmorphism Navbar Container */}
      <header
        className={cn(
          "fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300",
          className
        )}
      >
        <div
          className="flex items-center justify-between py-2 px-4 sm:px-7 rounded-full border transition-all duration-300 h-14 sm:h-16 relative overflow-visible bg-white/80 border-slate-300/80 text-slate-950 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.04)]"
          style={{
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {/* Brand Logo & Title */}
          <button
            onClick={(e) => handleNavClick(e, 0)}
            className="flex items-center gap-2.5 group cursor-pointer border-none bg-transparent shrink-0"
          >
            <img
              src="/logo.png"
              alt="Aura Logo"
              className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-black text-sm sm:text-base tracking-tight text-slate-950 group-hover:text-blue-700 transition-colors hidden sm:inline-block">
              Aura <span className="text-blue-600">Social</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 sm:gap-9 relative overflow-visible">
            {items.map((item, idx) => {
              const isActive = currentActiveIndex === idx;
              const isServices = item.name === "Services";

              if (isServices) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={(e) => {
                        handleNavClick(e, idx);
                        setServicesDropdownOpen(!servicesDropdownOpen);
                      }}
                      className={cn(
                        "relative cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-200 border-none bg-transparent select-none py-1 flex items-center gap-1 group",
                        isActive ? "text-slate-950 font-black" : "text-slate-600 hover:text-slate-950"
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300 text-slate-500 group-hover:text-slate-950 relative z-10",
                          servicesDropdownOpen && "rotate-180 text-blue-600"
                        )}
                      />

                      {isActive && (
                        <motion.div
                          layoutId="tabBottomHandle"
                          className="absolute -bottom-3.5 left-0 right-0 h-1.5 bg-slate-950 rounded-full shadow-[0_0_10px_rgba(15,23,42,0.4)] z-30"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                    </button>

                    {/* Services Dropdown Menu */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-76 sm:w-80 bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
                        >
                          <div className="space-y-0.5">
                            {SERVICES_ITEMS.map((service) => {
                              const Icon = service.icon;
                              return (
                                <button
                                  key={service.title}
                                  onClick={(e) => {
                                    handleNavClick(e, idx);
                                    setServicesDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-all flex items-center gap-3 group cursor-pointer border-none bg-transparent"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate leading-tight">
                                      {service.title}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-normal truncate mt-0.5">
                                      {service.desc}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, idx)}
                  className={cn(
                    "relative cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-200 border-none bg-transparent select-none py-1",
                    isActive ? "text-slate-950 font-black" : "text-slate-600 hover:text-slate-950"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId="tabBottomHandle"
                      className="absolute -bottom-3.5 left-0 right-0 h-1.5 bg-slate-950 rounded-full shadow-[0_0_10px_rgba(15,23,42,0.4)] z-30"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1 sm:px-3 sm:py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold cursor-pointer hover:bg-slate-200 transition-all"
                >
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-2 ring-blue-500/50" />
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-1 text-left px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-slate-100 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode("signin");
                    setIsAuthOpen(true);
                  }}
                  className="hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-full hover:bg-slate-900/5 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="relative overflow-hidden px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-slate-950/20 transition-all duration-300 hover:scale-[1.03] flex items-center gap-1.5 cursor-pointer border-none"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="md:hidden mt-2 rounded-3xl bg-white/95 border border-slate-200 text-slate-950 backdrop-blur-2xl p-4 shadow-2xl flex flex-col gap-2 z-50"
            >
              {items.map((item, idx) => {
                const Icon = item.icon;
                const isActive = currentActiveIndex === idx;
                const isServices = item.name === "Services";

                if (isServices) {
                  return (
                    <div key={item.name} className="w-full space-y-1">
                      <button
                        onClick={(e) => {
                          handleNavClick(e, idx);
                          setMobileServicesOpen(!mobileServicesOpen);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border-none",
                          isActive
                            ? "bg-blue-600/20 text-blue-600 border border-blue-500/30"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-blue-500" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-3 pr-2 py-1 space-y-1 bg-slate-50/80 rounded-2xl border border-slate-100/80">
                          {SERVICES_ITEMS.map((service) => {
                            const SIcon = service.icon;
                            return (
                              <button
                                key={service.title}
                                onClick={(e) => {
                                  handleNavClick(e, idx);
                                  setMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-white flex items-center gap-2.5 transition-all border-none bg-transparent"
                              >
                                <SIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span className="truncate">{service.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, idx)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer border-none",
                      isActive
                        ? "bg-blue-600/20 text-blue-600 border border-blue-500/30"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    )}
                  >
                    <Icon className="w-4 h-4 text-blue-500" />
                    <span>{item.name}</span>
                  </button>
                );
              })}

              {!user && (
                <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthMode("signin");
                      setIsAuthOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-2xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthMode("signup");
                      setIsAuthOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-2xl bg-slate-950 text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login & Sign Up Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Brand Logo & Header */}
              <div className="text-center space-y-2 mb-6">
                <img src="/logo.png" alt="Aura Logo" className="h-10 w-auto mx-auto object-contain" />
                <h3 className="text-2xl font-black tracking-tight text-white">
                  {authMode === "signin" ? "Welcome Back" : "Create your account"}
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  {authMode === "signin"
                    ? "Enter your credentials to access your Aura workspace"
                    : "Start building high-converting scroll campaigns today"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-slate-900/80 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-slate-900/80 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{authMode === "signin" ? "Sign In to Dashboard" : "Create Account"}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Switcher */}
              <div className="mt-6 text-center text-xs text-slate-400 font-medium">
                {authMode === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setAuthMode("signup")}
                      className="text-blue-400 font-bold hover:underline cursor-pointer border-none bg-transparent"
                    >
                      Sign Up Free
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setAuthMode("signin")}
                      className="text-blue-400 font-bold hover:underline cursor-pointer border-none bg-transparent"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
