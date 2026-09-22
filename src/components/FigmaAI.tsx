import React, { useState } from 'react';
import { 
  Layers, Layout, Smartphone, Tablet, Monitor, Copy, Check, Download, 
  Sparkles, Code, Palette, Type, Eye, Plus, RefreshCw, PenTool, Component, Move
} from 'lucide-react';
import { User, FigmaProject, FigmaComponent } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FigmaAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

const DEFAULT_PROJECT: FigmaProject = {
  id: 'figma-starter-1',
  name: 'FinTech Modern Banking App',
  platform: 'mobile',
  colorPalette: {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#ec4899',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc'
  },
  typography: {
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter'
  },
  createdAt: new Date().toISOString(),
  components: [
    {
      id: 'comp-1',
      name: 'Credit Card Glassmorphism',
      category: 'Card',
      jsxCode: `<div className="w-80 h-48 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/20">
  <div className="flex justify-between items-center">
    <span className="font-mono text-sm tracking-widest uppercase">Platinum Vault</span>
    <span className="font-black text-lg italic">VISA</span>
  </div>
  <div className="space-y-1">
    <div className="font-mono text-xl tracking-wider">4532 •••• •••• 8829</div>
    <div className="flex justify-between text-xs opacity-80 pt-2 font-mono">
      <span>ALEXANDER SHELBY</span>
      <span>EXP 08/29</span>
    </div>
  </div>
</div>`
    },
    {
      id: 'comp-2',
      name: 'Quick Action Navigation Dock',
      category: 'Navbar',
      jsxCode: `<div className="flex items-center justify-around px-6 py-3.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl max-w-sm mx-auto text-slate-400">
  <button className="text-indigo-400 font-bold flex flex-col items-center text-[10px]">
    <span>⚡</span>
    <span>Pay</span>
  </button>
  <button className="hover:text-white flex flex-col items-center text-[10px]">
    <span>📊</span>
    <span>Invest</span>
  </button>
  <button className="hover:text-white flex flex-col items-center text-[10px]">
    <span>💳</span>
    <span>Cards</span>
  </button>
  <button className="hover:text-white flex flex-col items-center text-[10px]">
    <span>⚙️</span>
    <span>Profile</span>
  </button>
</div>`
    },
    {
      id: 'comp-3',
      name: 'Transaction Metric Block',
      category: 'Stats',
      jsxCode: `<div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-3">
  <div className="flex items-center justify-between text-xs text-slate-400">
    <span>Total Portfolio Balance</span>
    <span className="text-emerald-400 font-bold font-mono">+14.2%</span>
  </div>
  <div className="text-2xl font-black font-display text-white">$148,920.50</div>
  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 w-3/4 rounded-full" />
  </div>
</div>`
    }
  ]
};

export default function FigmaAI({ user, onOpenAuth }: FigmaAIProps) {
  const [project, setProject] = useState<FigmaProject>(DEFAULT_PROJECT);
  const [activePlatform, setActivePlatform] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [activeTab, setActiveTab] = useState<'canvas' | 'tokens' | 'code'>('canvas');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleGenerateDesign = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    try {
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const response = await fetch('/api/figma/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt,
          platform: activePlatform,
          category: 'Component'
        })
      });

      let compName = prompt.slice(0, 24) + ' Module';
      let compCategory: FigmaComponent['category'] = 'Card';
      let compJsx = `<div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 text-white shadow-2xl space-y-4">
  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
    AI Generated Component
  </div>
  <h3 className="text-xl font-bold font-display">${prompt}</h3>
  <p className="text-xs text-slate-400 leading-relaxed">
    Precision auto-layout component generated dynamically with design token variables.
  </p>
  <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-xs font-bold text-white shadow-lg">
    Action CTA Button
  </button>
</div>`;

      if (response.ok) {
        const data = await response.json();
        if (data.name) compName = data.name;
        if (data.category && ['Navbar', 'Hero', 'Card', 'Form', 'Button', 'Footer', 'Modal', 'Stats'].includes(data.category)) {
          compCategory = data.category as FigmaComponent['category'];
        }
        if (data.jsxCode) compJsx = data.jsxCode;
        if (data.designTokens) {
          setProject(prev => ({
            ...prev,
            colorPalette: {
              ...prev.colorPalette,
              ...data.designTokens
            }
          }));
        }
      }

      const newComponent: FigmaComponent = {
        id: 'comp-' + Date.now(),
        name: compName,
        category: compCategory,
        jsxCode: compJsx
      };

      setProject(prev => ({
        ...prev,
        components: [newComponent, ...prev.components]
      }));
      setPrompt('');
    } catch (err) {
      console.error('Figma generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyJSX = () => {
    const fullCode = project.components.map(c => `// ${c.name}\n${c.jsxCode}`).join('\n\n');
    navigator.clipboard.writeText(fullCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Column: Figma Design Controller */}
      <div className="w-full lg:w-96 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-black text-base tracking-tight text-white font-display">Figma.ai</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 font-mono">
                STUDIO v3
              </span>
            </div>
            <p className="text-xs text-slate-400">UI/UX prototype & design system generator</p>
          </div>
        </div>

        {/* AI Prompt Generator */}
        <form onSubmit={handleGenerateDesign} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Generate UI Component</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe UI layout (e.g. Modern crypto exchange trade widget with candlestick chart and buy/sell tabs)..."
              rows={3}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 resize-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Designing Vector Artboards...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Figma Component</span>
              </>
            )}
          </button>
        </form>

        {/* Design System Tokens */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Design Token Palettes</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(project.colorPalette).map(([key, val]) => (
              <div key={key} className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="w-full h-5 rounded-lg border border-white/10" style={{ backgroundColor: val }} />
                <div className="text-[10px] text-slate-400 capitalize truncate">{key}</div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Layer Tree */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artboard Layers ({project.components.length})</span>
          <div className="space-y-1.5">
            {project.components.map(comp => (
              <div key={comp.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Component className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate text-slate-200 font-medium">{comp.name}</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                  {comp.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Figma Interactive Artboard Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 p-4 md:p-6 space-y-4">
        {/* Canvas Toolbar Header */}
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between backdrop-blur-md">
          {/* Platform Device Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePlatform('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone 16</span>
            </button>
            <button
              onClick={() => setActivePlatform('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'tablet' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>iPad Air</span>
            </button>
            <button
              onClick={() => setActivePlatform('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>MacBook 16"</span>
            </button>
          </div>

          {/* View Tab Switcher & Code Export */}
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('canvas')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'canvas' ? 'bg-slate-800 text-purple-400' : 'text-slate-400'
                }`}
              >
                Canvas
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'code' ? 'bg-slate-800 text-purple-400' : 'text-slate-400'
                }`}
              >
                JSX Code
              </button>
            </div>

            <button
              onClick={copyJSX}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Export Code'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Canvas Viewport */}
        <div className="flex-1 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 flex items-center justify-center overflow-auto relative">
          {/* Infinite Canvas Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

          {activeTab === 'canvas' ? (
            <div
              className={`rounded-3xl border-4 border-slate-800 bg-slate-950 p-6 shadow-2xl transition-all duration-300 space-y-6 relative ${
                activePlatform === 'mobile'
                  ? 'w-88 min-h-[580px]'
                  : activePlatform === 'tablet'
                  ? 'w-[520px] min-h-[540px]'
                  : 'w-[780px] min-h-[500px]'
              }`}
            >
              {/* Artboard Device Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">{project.name}</span>
                <span className="text-[10px] font-mono text-purple-400">100% Scale</span>
              </div>

              {/* Rendered Live Components Stack */}
              <div className="space-y-5">
                {project.components.map(comp => (
                  <div key={comp.id} className="relative group">
                    <div className="absolute -top-3 left-2 px-2 py-0.5 rounded bg-purple-600 text-[9px] font-mono font-bold text-white uppercase shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {comp.name}
                    </div>
                    {/* Simulated live visual component */}
                    {comp.category === 'Card' ? (
                      <div className="w-full h-44 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-5 text-white shadow-2xl flex flex-col justify-between border border-white/20">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs tracking-widest uppercase">Platinum Vault</span>
                          <span className="font-black text-base italic">VISA</span>
                        </div>
                        <div className="space-y-1">
                          <div className="font-mono text-lg tracking-wider">4532 •••• •••• 8829</div>
                          <div className="flex justify-between text-[11px] opacity-80 pt-1 font-mono">
                            <span>ALEXANDER SHELBY</span>
                            <span>EXP 08/29</span>
                          </div>
                        </div>
                      </div>
                    ) : comp.category === 'Navbar' ? (
                      <div className="flex items-center justify-around px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl text-slate-400">
                        <button className="text-purple-400 font-bold flex flex-col items-center text-[10px]">
                          <span>⚡</span>
                          <span>Pay</span>
                        </button>
                        <button className="hover:text-white flex flex-col items-center text-[10px]">
                          <span>📊</span>
                          <span>Invest</span>
                        </button>
                        <button className="hover:text-white flex flex-col items-center text-[10px]">
                          <span>💳</span>
                          <span>Cards</span>
                        </button>
                        <button className="hover:text-white flex flex-col items-center text-[10px]">
                          <span>⚙️</span>
                          <span>Profile</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Total Portfolio</span>
                          <span className="text-emerald-400 font-bold font-mono">+14.2%</span>
                        </div>
                        <div className="text-xl font-black text-white">$148,920.50</div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-auto">
              <pre className="text-xs font-mono text-purple-300 leading-relaxed whitespace-pre">
                {project.components.map(c => `// ${c.name}\n${c.jsxCode}`).join('\n\n')}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
