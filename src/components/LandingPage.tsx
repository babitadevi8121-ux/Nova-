import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Image, Volume2, ShieldCheck, Cpu, ArrowRight, Zap, Play } from 'lucide-react';
import NovaBannerHero from './NovaBannerHero';

interface LandingPageProps {
  onOpenAuth: () => void;
  onOpenPricing: () => void;
}

export default function LandingPage({ onOpenAuth, onOpenPricing }: LandingPageProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#070913] text-slate-100 font-sans">
      
      {/* Exact Pixel-Perfect Master Banner Hero */}
      <NovaBannerHero
        onOpenAuth={onOpenAuth}
        onOpenPricing={onOpenPricing}
      />

      {/* Bento Grid Features Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full space-y-12 bg-gradient-to-b from-[#070913] via-slate-950 to-[#0A0E24]">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">Built For High-Speed Innovation</h2>
          <p className="text-xs text-slate-400">Unlocking elite tools designed to boost developer, student, and creator workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '70+ Multi-Model Ecosystem',
              desc: 'Toggle dynamically across Gemini 3.5 Flash, Gemini 3.1 Pro, DeepSeek, Claude, and Llama architectures.',
              icon: MessageSquare,
              color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
            },
            {
              title: 'Digital Studio & Canvas',
              desc: 'Compose stunning vector illustrations and images directly using custom ratios and dimensions.',
              icon: Image,
              color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
            },
            {
              title: 'Text-To-Speech Synthesizer',
              desc: 'Listen to beautifully modulated voice narrations generated from responses, powered by Google TTS.',
              icon: Volume2,
              color: 'text-pink-400 bg-pink-500/10 border-pink-500/30'
            },
            {
              title: 'Contextual File & Code Analyzer',
              desc: 'Attach PDF documents, CSV lists, code snippets, or images directly to prompt for immediate summarization.',
              icon: Cpu,
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
            },
            {
              title: 'Google Grounded Search & Maps',
              desc: 'Activate live Google Search capabilities to find real-time answers with verified URL citations.',
              icon: Sparkles,
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            },
            {
              title: '100% Free Student Passes',
              desc: 'Students, educators, and scholars enjoy permanent, unlimited lifetime access with zero barriers.',
              icon: ShieldCheck,
              color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
            }
          ].map((feat, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all space-y-4 group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feat.color}`}>
                <feat.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm font-display text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full pt-4">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-2xl border border-indigo-500/30 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />
          
          <div className="relative space-y-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase tracking-wider">
              Get Started Instantly
            </span>
            <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight leading-tight">
              Ready to Upgrade Your Potential?
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Join Nova AI today for free. Experience fluid intelligence, robust code generation, and fast digital painting outputs.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
              >
                Create Account Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenPricing}
                className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Explore Memberships
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500 space-y-2 mt-auto">
        <p className="font-medium text-slate-400">
          © 2026 <span className="font-bold text-indigo-400">Shelby.ai</span>. All rights reserved. • Founded by <span className="font-semibold text-slate-200">Shivam Kumar</span>
        </p>
        <p className="text-[10px] text-slate-600 font-mono">Nova AI • Super AI Suite powered by Shelby.ai</p>
      </footer>

    </div>
  );
}
