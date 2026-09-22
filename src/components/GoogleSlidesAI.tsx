import React, { useState } from 'react';
import { 
  Presentation, Layout, Sparkles, Wand2, Download, Copy, Check, 
  ExternalLink, FileText, Share2, Plus, Trash2, Eye, RefreshCw, Palette
} from 'lucide-react';
import { User } from '../types';
import ScrollControls from './ScrollControls';
import { toast } from '../utils/toast';

interface GoogleSlidesAIProps {
  user: User | null;
  onOpenAuth: () => void;
}

export default function GoogleSlidesAI({ user, onOpenAuth }: GoogleSlidesAIProps) {
  const [topic, setTopic] = useState('Quarterly AI Venture Investment & Market Growth 2026');
  const [slideCount, setSlideCount] = useState(5);
  const [themeColor, setThemeColor] = useState('indigo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const [slides, setSlides] = useState([
    {
      title: 'Quarterly AI Venture Growth',
      subtitle: 'Global Innovation & Capital Allocation 2026',
      bulletPoints: [
        'Venture funding for generative infrastructure up 142% YoY',
        'Enterprise deployment expanded across Fortune 500 by 88%',
        'Emergence of sovereign computing hubs and localized model clusters'
      ],
      tag: 'Executive Overview',
      bgGradient: 'from-indigo-900 to-slate-900'
    },
    {
      title: 'Key Market Catalysts & Drivers',
      subtitle: 'Technological leap in agentic execution',
      bulletPoints: [
        'Antigravity multi-agent systems automating 70% of dev workflows',
        'Sub-10ms edge inference models running on consumer devices',
        'Breakthroughs in multi-modal video and photorealistic rendering'
      ],
      tag: 'Market Drivers',
      bgGradient: 'from-purple-900 to-slate-900'
    },
    {
      title: 'Revenue & Adoption Matrix',
      subtitle: 'Monetization trajectories and user retention',
      bulletPoints: [
        'Average SaaS ARR expansion multiple increased from 1.8x to 3.2x',
        'Customer acquisition costs dropped by 45% via automated funnels',
        'Developer retention rates top 94% on generative workspaces'
      ],
      tag: 'Financial Metrics',
      bgGradient: 'from-cyan-900 to-slate-900'
    },
    {
      title: 'Strategic Priorities for H2 2026',
      subtitle: 'Scale, Security, and Decentralized Networks',
      bulletPoints: [
        'Expand zero-knowledge cryptographic safeguards for LLM telemetry',
        'Deploy universal vector databases across hybrid cloud nodes',
        'Integrate real-time speech and video avatar streaming pipelines'
      ],
      tag: 'Strategic Roadmap',
      bgGradient: 'from-emerald-900 to-slate-900'
    }
  ]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      <ScrollControls />
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-base text-white">Google Slides AI Studio</h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 font-mono">
                Presentation Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400">Autonomous slide deck creation, formatting, and executive visual export</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success('Slide Deck exported to Google Slides format (.pptx / Google Cloud Drive)')}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export to Google Slides
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Topic & Outline */}
        <div className="lg:col-span-4 border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                Slide Deck Topic / Outline
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-sans"
                placeholder="Enter presentation subject, key objectives, or outline notes..."
              />
            </div>

            {/* Slide Navigation Thumbnails */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400">Slide Sequence ({slides.length} slides)</span>
              <div className="space-y-2">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      activeSlideIdx === idx
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate font-semibold">{idx + 1}. {s.title}</span>
                    <span className="text-[10px] font-mono opacity-60">{s.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Presentation className="w-4 h-4" />}
            <span>{isGenerating ? 'Structuring Slides...' : 'Regenerate Complete Deck'}</span>
          </button>
        </div>

        {/* Right Side: Active Slide Canvas */}
        <div className="lg:col-span-8 p-8 flex flex-col justify-center items-center bg-slate-950 overflow-hidden">
          <div className={`w-full max-w-2xl aspect-[16/9] rounded-3xl p-8 bg-gradient-to-br ${slides[activeSlideIdx].bgGradient} border border-white/10 shadow-2xl flex flex-col justify-between relative`}>
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold font-mono border border-white/10">
                {slides[activeSlideIdx].tag}
              </span>
              <h2 className="text-2xl font-black text-white mt-4 font-display leading-tight">
                {slides[activeSlideIdx].title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                {slides[activeSlideIdx].subtitle}
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
              {slides[activeSlideIdx].bulletPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-2 border-t border-white/10">
              <span>Nova AI Presentation Engine</span>
              <span>Slide {activeSlideIdx + 1} of {slides.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
