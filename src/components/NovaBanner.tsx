import React from 'react';
import { Sparkles, Crown, Zap, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface NovaBannerProps {
  onOpenPricing?: () => void;
  onOpenAuth?: () => void;
  variant?: 'topbar' | 'hero' | 'compact';
  className?: string;
}

export default function NovaBanner({
  onOpenPricing,
  onOpenAuth,
  variant = 'topbar',
  className = ''
}: NovaBannerProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-950/80 via-purple-950/70 to-slate-900 border border-indigo-500/30 text-xs shadow-md ${className}`}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3 h-3 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-100 tracking-tight">Nova.ai</span>
            <span className="text-[10px] font-mono text-indigo-400 font-semibold">by Shelby.ai</span>
          </div>
        </div>
        {onOpenPricing && (
          <button
            onClick={onOpenPricing}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Upgrade</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-500/20 text-white z-20 px-4 py-2 sm:py-2.5 transition-all ${className}`}>
      {/* Subtle Background Glow Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 relative z-10">
        {/* Brand & Badge Group */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200">
                Nova.ai
              </span>
              <span className="text-[11px] font-bold text-indigo-300 font-mono tracking-wide">
                by Shelby.ai
              </span>
            </div>
          </div>

          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-slate-600" />

          {/* Tagline / Highlights */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="w-3 h-3 text-emerald-400" />
              70+ Next-Gen AI Models
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-amber-300">
              <Crown className="w-3 h-3 text-amber-400" />
              Ultra High Intelligence
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Founder: Shivam Kumar</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-amber-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Explore Ultra Suite</span>
            </button>
          )}

          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1 rounded-lg bg-indigo-600/60 hover:bg-indigo-600 border border-indigo-400/30 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
