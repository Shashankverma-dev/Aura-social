"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles, MessageSquare } from "lucide-react";

export function ContactMobileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("$10k-$25k");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900 relative flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Mobile Status Bar */}
      <div className="pt-3 px-5 flex justify-between items-center text-[10px] text-slate-500 font-bold shrink-0 z-10">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono tracking-tighter">5G</span>
          <div className="w-4 h-2 rounded-xs border border-slate-400 flex items-center justify-end p-[1px]">
            <div className="w-full h-full bg-slate-700 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <div className="px-4 pt-1.5 pb-2 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Aura Logo" className="h-5 w-auto object-contain" />
          <div>
            <h3 className="text-xs font-black text-slate-900 tracking-tight leading-none">
              Get In <span className="text-blue-600">Touch</span>
            </h3>
            <p className="text-[9px] text-slate-400 font-medium">Aura Growth Strategists</p>
          </div>
        </div>

        <div className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[9px] font-extrabold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
        {submitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl animate-in zoom-in-95 duration-300 my-auto">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Message Received!</h4>
            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
              Our lead growth team is reviewing your details. We'll reply to <span className="font-bold text-blue-600">{email || "your email"}</span> within 15 minutes.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Contact Chips */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-slate-400 font-semibold uppercase">Email Us</p>
                  <p className="text-[9px] font-extrabold text-slate-900 truncate">hello@aurapro.io</p>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-slate-400 font-semibold uppercase">Call Direct</p>
                  <p className="text-[9px] font-extrabold text-slate-900 truncate">+1 (800) 555-AURA</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-2 pt-1">
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-700">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivers"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-[10px] font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-700">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-[10px] font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-700">Project Budget</label>
                <div className="grid grid-cols-3 gap-1">
                  {["$5k-$10k", "$10k-$25k", "$25k+"].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-1 text-[9px] font-extrabold rounded-md border transition-all cursor-pointer ${
                        budget === b
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-700">Project Goals</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your brand goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-[10px] font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-black flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer border-none"
              >
                <span>Send Inquiry</span>
                <Send className="w-3 h-3 text-blue-400" />
              </button>
            </form>
          </>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="p-2 px-3 border-t border-slate-100 bg-slate-50/80 shrink-0 flex items-center justify-between text-[9px] text-slate-500 font-semibold">
        <div className="flex items-center gap-1 text-slate-600 font-bold">
          <Clock className="w-2.5 h-2.5 text-blue-600" />
          <span>Avg response: &lt;15 mins</span>
        </div>
        <span className="text-slate-400 font-mono">San Francisco & NY</span>
      </div>
    </div>
  );
}
