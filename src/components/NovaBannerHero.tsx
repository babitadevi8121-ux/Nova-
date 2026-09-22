import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Sparkles,
  Bot,
  Brain,
  Rocket,
  Zap,
  Lock,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Users,
  Star,
  MessageSquare,
  Code2,
  Image as ImageIcon,
  Video,
  Search,
  Check,
  Copy,
  GraduationCap,
  ExternalLink,
  Layers,
  Database,
  ArrowRight,
  Cloud,
  Palette
} from 'lucide-react';
import NovaCinematicHeroBanner from './NovaCinematicHeroBanner';

interface NovaBannerHeroProps {
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
  onSelectTab?: (tab: string) => void;
  className?: string;
}

export default function NovaBannerHero({
  onOpenAuth,
  onOpenPricing,
  onSelectTab,
  className = ''
}: NovaBannerHeroProps) {
  const [viewMode, setViewMode] = useState<'cinematic' | 'portal'>('cinematic');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    // Generate high resolution QR code with the student direct portal / app URL
    const appUrl = window.location.origin || 'https://nova-ai-3603.ai.studio';
    QRCode.toDataURL(
      `${appUrl}?promo=STUDENT2026&access=student`,
      {
        width: 320,
        margin: 2,
        color: {
          dark: '#050714',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, []);

  const handleCopyPassCode = () => {
    navigator.clipboard.writeText('STUDENT2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleStudentCardClick = () => {
    if (onOpenPricing) {
      onOpenPricing();
    }
  };

  if (viewMode === 'cinematic') {
    return (
      <div className="relative w-full">
        {/* Toggle mode pill */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-[#070D24]/90 border border-cyan-500/40 px-3 py-1 rounded-full text-[11px] font-mono shadow-lg">
          <span className="text-slate-400">VIEW:</span>
          <button
            onClick={() => setViewMode('cinematic')}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'cinematic' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            16:9 CINEMATIC HERO
          </button>
          <button
            onClick={() => setViewMode('portal')}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'portal' ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            STUDENT PORTAL
          </button>
        </div>

        <NovaCinematicHeroBanner
          onOpenAuth={onOpenAuth}
          onOpenPricing={onOpenPricing}
          onSelectTab={onSelectTab}
          className={className}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#030611] text-white font-sans select-none border-b border-indigo-900/30 ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 50% 20%, rgba(30, 27, 75, 0.5) 0%, rgba(3, 6, 17, 0.98) 75%),
          radial-gradient(circle at 65% 25%, rgba(6, 182, 212, 0.22) 0%, transparent 50%),
          radial-gradient(circle at 20% 15%, rgba(217, 70, 239, 0.18) 0%, transparent 45%)
        `
      }}
    >
      {/* Background Starfield & Subtle Circuit Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between relative z-10 space-y-6">
        
        {/* ===================== TOP BAR (PILLS) ===================== */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          
          {/* Left Pill: THE NEXT LEVEL OF AI IS HERE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070D24] border border-[#00FFFF]/40 text-white text-[11px] sm:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.25)]">
            <span className="text-cyan-400">✦</span>
            <span>THE NEXT LEVEL OF <strong className="text-cyan-400 font-black">AI</strong> IS HERE</span>
            <span className="text-cyan-400">✦</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cinematic')}
              className="px-3 py-1.5 rounded-full bg-[#070D24] border border-cyan-400/50 text-cyan-300 text-xs font-semibold hover:bg-cyan-950/60 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              ✦ SWITCH TO 16:9 CINEMATIC BANNER
            </button>

            {/* Right Pill: App URL */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070D24] border border-[#00FFFF]/40 text-xs shadow-[0_0_15px_rgba(0,255,255,0.25)]">
              <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                <span className="text-slate-300 font-semibold">App URL:</span>
                <span className="font-mono text-cyan-300 font-bold">nova-ai-3603.ai.studio</span>
              </div>
            </div>
          </div>
        </div>


        {/* ===================== HERO MAIN SECTION (2 COLS) ===================== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          
          {/* LEFT 8 COLS: Huge Logo, Headlines, 6 Badges, Action Buttons */}
          <div className="xl:col-span-8 flex flex-col space-y-5">
            
            {/* Top Brand Logo & Subhead */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                {/* 3D Glowing Prism 'N' Icon */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_18px_rgba(236,72,153,0.5)]">
                    <defs>
                      <linearGradient id="n-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F472B6" />
                        <stop offset="50%" stopColor="#C084FC" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                      <linearGradient id="n-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#818CF8" />
                      </linearGradient>
                      <linearGradient id="n-grad-diagonal" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <rect x="12" y="10" width="22" height="80" rx="11" fill="url(#n-grad-left)" />
                    <rect x="66" y="10" width="22" height="80" rx="11" fill="url(#n-grad-right)" />
                    <path
                      d="M24 16 L76 74 A 10 10 0 0 1 66 88 L 14 30 A 10 10 0 0 1 24 16 Z"
                      fill="url(#n-grad-diagonal)"
                      opacity="0.95"
                    />
                  </svg>
                  <div className="absolute -top-1 -right-1 text-cyan-300 animate-pulse">
                    <Sparkles className="w-6 h-6 fill-cyan-300 text-cyan-200" />
                  </div>
                </div>

                {/* Brand Titles */}
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-none">
                      Nova<span className="text-[#38BDF8]"> AI</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-base sm:text-xl font-bold font-display text-slate-300">by</span>
                    <span className="text-base sm:text-xl font-black font-display text-[#EC4899] tracking-wide">
                      Shelby.ai
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/80" />
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black font-mono tracking-widest text-slate-200 uppercase">
                  <span className="text-cyan-400">✦</span>
                  <span>UNIFY. INNOVATE. ELEVATE.</span>
                  <span className="text-cyan-400">✦</span>
                </div>
                <div className="h-[1px] flex-1 max-w-[200px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
              </div>
            </div>

            {/* Giant Headline & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                ONE PLATFORM.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400">
                  INFINITE POSSIBILITIES.
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed">
                AI Intelligence • Data Engineering • Database Architecture • Creative Studio
              </p>
            </div>

            {/* 6 Sleek Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              
              {/* Card 1: 1,970+ AI Systems */}
              <div 
                onClick={() => onSelectTab?.('ai-catalog')}
                className="p-3 rounded-2xl bg-[#0F0C28]/90 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-purple-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/60 flex items-center justify-center text-purple-300 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-black text-white block leading-none">1,970+</span>
                  <span className="text-[10px] font-bold text-purple-300 tracking-wider uppercase block leading-tight mt-0.5">AI SYSTEMS</span>
                </div>
              </div>

              {/* Card 2: 402+ Database Engines */}
              <div 
                onClick={() => onSelectTab?.('universal-db')}
                className="p-3 rounded-2xl bg-[#061D2B]/90 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-cyan-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-300 shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-black text-white block leading-none">402+</span>
                  <span className="text-[10px] font-bold text-cyan-300 tracking-wider uppercase block leading-tight mt-0.5">DB ENGINES</span>
                </div>
              </div>

              {/* Card 3: Multimodal AI */}
              <div 
                onClick={() => onSelectTab?.('chat')}
                className="p-3 rounded-2xl bg-[#091536]/90 border border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-blue-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/60 flex items-center justify-center text-blue-300 shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-white uppercase block leading-none">MULTIMODAL</span>
                  <span className="text-[10px] font-bold text-blue-300 tracking-wider uppercase block leading-tight mt-0.5">AI ENGINE</span>
                </div>
              </div>

              {/* Card 4: AI Schema Architect */}
              <div 
                onClick={() => onSelectTab?.('universal-db')}
                className="p-3 rounded-2xl bg-[#061F18]/90 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-emerald-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-white uppercase block leading-none">AI SCHEMA</span>
                  <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase block leading-tight mt-0.5">ARCHITECT</span>
                </div>
              </div>

              {/* Card 5: Cloud Data Intelligence */}
              <div 
                onClick={() => onSelectTab?.('universal-db')}
                className="p-3 rounded-2xl bg-[#200A18]/90 border border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-pink-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-950 border border-pink-500/60 flex items-center justify-center text-pink-300 shrink-0">
                  <Cloud className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-white uppercase block leading-none">CLOUD DATA</span>
                  <span className="text-[10px] font-bold text-pink-300 tracking-wider uppercase block leading-tight mt-0.5">INTELLIGENCE</span>
                </div>
              </div>

              {/* Card 6: Creative AI Studio */}
              <div 
                onClick={() => onSelectTab?.('image-generator')}
                className="p-3 rounded-2xl bg-[#231707]/90 border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center gap-2.5 cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-amber-300 shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-white uppercase block leading-none">CREATIVE</span>
                  <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block leading-tight mt-0.5">AI STUDIO</span>
                </div>
              </div>

            </div>

            {/* Section Divider: EXPLORE THE NOVA ULTRA SUITE */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-[1px] w-6 sm:w-12 bg-cyan-500/60" />
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black font-mono tracking-widest text-cyan-400 uppercase">
                <span>EXPLORE THE NOVA ULTRA SUITE</span>
                <span>✦</span>
              </div>
              <div className="h-[1px] flex-1 max-w-[240px] bg-gradient-to-r from-cyan-500/60 to-transparent" />
            </div>

            {/* 2 Wide Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              {/* Button 1: EXPLORE ULTRA SUITE */}
              <button
                onClick={onOpenPricing}
                className="p-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] border border-blue-400/40 text-left flex items-center gap-3.5 shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-900/60 border border-blue-300/40 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-black text-white tracking-wide block uppercase font-display">
                    EXPLORE ULTRA SUITE
                  </span>
                  <span className="text-xs text-blue-100/90 block font-medium">
                    Discover Next-Gen AI & DB Tools
                  </span>
                </div>
              </button>

              {/* Button 2: AUTHENTICATE / LOGIN */}
              <button
                onClick={onOpenAuth}
                className="p-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] border border-pink-400/40 text-left flex items-center gap-3.5 shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-900/60 border border-pink-300/40 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-black text-white tracking-wide block uppercase font-display">
                    AUTHENTICATE / LOGIN
                  </span>
                  <span className="text-xs text-purple-100/90 block font-medium">
                    Secure Access to Your Dashboard
                  </span>
                </div>
              </button>

            </div>

            {/* Launch God's Eye 3D View Banner Button */}
            <button
              onClick={() => onSelectTab?.('gods-eye')}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#083344] via-[#0e7490] to-[#1e1b4b] hover:from-[#0e7490] hover:to-[#083344] border border-cyan-400/50 text-left flex items-center justify-between shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] group mt-1"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: '14s' }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white tracking-wide block uppercase font-display">
                      LAUNCH GOD'S EYE 3D VIEW
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400 text-black font-black uppercase font-mono">
                      NEW 3D INTEL
                    </span>
                  </div>
                  <span className="text-xs text-cyan-200/90 block font-medium truncate">
                    Real-time 3D Globe · ADS-B Airspace · AIS Sea Beacons · USGS Earthquakes · Cockpit HUD
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
            </button>

          </div>


          {/* RIGHT 4 COLS: Holographic AI Center + Interactive STUDENT ACCESS QR Code Box */}
          <div className="xl:col-span-4 flex flex-col md:flex-row xl:flex-col gap-6 items-center justify-center">
            
            {/* Holographic AI Center */}
            <div className="relative w-full max-w-[340px] h-[220px] sm:h-[260px] flex items-center justify-center">
              
              <div className="absolute w-44 h-44 rounded-full border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.35)] animate-pulse" />
              <div className="absolute w-36 h-36 rounded-full border border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.3)]" />

              {/* Floating Tech Badges */}
              <div className="absolute -top-1 left-2 px-2.5 py-1.5 rounded-xl bg-[#091536]/90 border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)] flex flex-col items-center gap-0.5 z-20">
                <MessageSquare className="w-4 h-4 text-cyan-300" />
                <span className="text-[8px] font-black text-slate-200 uppercase tracking-wider">AI CHAT</span>
              </div>

              <div className="absolute top-16 left-0 px-2.5 py-1.5 rounded-xl bg-[#091536]/90 border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)] flex flex-col items-center gap-0.5 z-20">
                <Code2 className="w-4 h-4 text-blue-300" />
                <span className="text-[8px] font-black text-slate-200 uppercase tracking-wider">CODE ARCHITECT</span>
              </div>

              <div className="absolute bottom-1 left-4 px-2.5 py-1.5 rounded-xl bg-[#091536]/90 border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)] flex flex-col items-center gap-0.5 z-20">
                <ImageIcon className="w-4 h-4 text-cyan-300" />
                <span className="text-[8px] font-black text-slate-200 uppercase tracking-wider">IMAGE GEN</span>
              </div>

              <div className="absolute top-2 right-2 px-2.5 py-1.5 rounded-xl bg-[#091536]/90 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.3)] flex flex-col items-center gap-0.5 z-20">
                <Video className="w-4 h-4 text-purple-300" />
                <span className="text-[8px] font-black text-slate-200 uppercase tracking-wider">VIDEO STUDIO</span>
              </div>

              <div className="absolute bottom-2 right-2 px-2.5 py-1.5 rounded-xl bg-[#091536]/90 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.3)] flex flex-col items-center gap-0.5 z-20">
                <Database className="w-4 h-4 text-cyan-300" />
                <span className="text-[8px] font-black text-slate-200 uppercase tracking-wider">402 DBs</span>
              </div>

              {/* Cybernetic AI Cyborg Vector Avatar */}
              <div className="relative w-36 h-36 flex items-center justify-center z-10">
                <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]">
                  <defs>
                    <linearGradient id="cyborg-face-banner" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E0F2FE" />
                      <stop offset="0.3" stopColor="#38BDF8" />
                      <stop offset="0.7" stopColor="#6366F1" />
                      <stop offset="1" stopColor="#0B0F23" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M125 35C102 35 84 48 76 66C68 80 67 92 69 104C71 113 64 120 62 125C60 130 67 138 76 138C79 144 87 155 96 162C106 169 120 172 133 170C137 163 140 150 140 138C148 127 153 113 153 97C153 65 141 35 125 35Z"
                    fill="url(#cyborg-face-banner)"
                  />
                  <ellipse cx="88" cy="90" rx="5" ry="2.5" fill="#00FFFF" filter="drop-shadow(0 0 4px #00FFFF)" />
                  <path d="M80 88H98" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="120" cy="98" r="14" fill="#0A102A" stroke="#00FFFF" strokeWidth="2" filter="drop-shadow(0 0 6px #00FFFF)" />
                  <circle cx="120" cy="98" r="7" fill="#6366F1" stroke="#A855F7" strokeWidth="1.5" />
                  <circle cx="120" cy="98" r="2.5" fill="#FFFFFF" />
                  <path d="M120 112V145L132 155" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M110 105L98 122V140" stroke="#EC4899" strokeWidth="1.2" />
                  <path d="M130 88L145 74H155" stroke="#00FFFF" strokeWidth="1.2" />
                </svg>
              </div>
            </div>

            {/* STUDENT ACCESS Master QR Code Card */}
            <div
              onClick={handleStudentCardClick}
              className="w-full max-w-[320px] p-4 rounded-3xl bg-[#060D24]/95 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex flex-col items-center text-center space-y-3 cursor-pointer hover:border-cyan-300 transition-all group"
            >
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-cyan-300 leading-none">
                  STUDENT ACCESS
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-cyan-400 font-mono tracking-widest uppercase">
                  <span>✦</span>
                  <span>SCAN & ENTER</span>
                  <span>✦</span>
                </div>
              </div>

              <div className="relative p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Student Access QR Code"
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-40 h-40 bg-slate-900 rounded-lg flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-12 h-12" />
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F172A] to-[#1E293B] border-2 border-cyan-400 flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Pass Code Pill */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyPassCode();
                }}
                className="w-full py-2 px-3 rounded-2xl bg-[#0B1536] border border-cyan-400/80 hover:bg-[#0F1D4A] transition-colors flex flex-col items-center justify-center shadow-inner cursor-pointer"
                title="Click to copy Pass Code"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <span>PASS CODE:</span>
                  {copiedCode && (
                    <span className="text-emerald-400 flex items-center gap-0.5 text-[9px] font-black">
                      <Check className="w-3 h-3" /> COPIED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-lg sm:text-xl font-black font-mono tracking-widest text-cyan-300">
                    STUDENT2026
                  </span>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* ===================== FOUNDER BAR ===================== */}
        <div className="flex items-center justify-center pt-2">
          <div className="relative inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-gradient-to-r from-[#070D24] via-[#0B163B] to-[#070D24] border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <div className="flex items-center gap-2 font-display">
              <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">FOUNDER:</span>
              <span className="text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wider">SHIVAM KUMAR</span>
            </div>
            
            <div className="w-[1px] h-4 bg-cyan-500/40" />

            <div className="text-white text-base sm:text-lg italic tracking-wider select-none font-serif transform -rotate-2" style={{ fontFamily: 'cursive, serif' }}>
              Shivam Kumar
            </div>
          </div>
        </div>


        {/* ===================== BOTTOM ROW (TRUST ICONS & SLOGAN) ===================== */}
        <footer className="pt-3 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Secure</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Reliable</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>For Students, Creators & Innovators</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-pink-400" />
              <span>Built for the Future</span>
            </div>
          </div>

          <div className="text-center md:text-right flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <div className="flex items-center justify-center sm:justify-end gap-1 font-display">
              <span className="font-black text-pink-400 text-sm">Nova AI</span>
              <span className="text-xs font-bold text-slate-300">by</span>
              <span className="font-black text-cyan-300 text-sm">Shelby.ai</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              ONE PLATFORM. INFINITE POSSIBILITIES.
            </span>
          </div>

        </footer>

      </div>
    </div>
  );
}

