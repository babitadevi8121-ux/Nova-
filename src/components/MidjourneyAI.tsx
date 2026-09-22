import React, { useState } from 'react';
import { Sparkles, Wand2, Image as ImageIcon, Download, Copy, Check, Sliders, RefreshCw, ZoomIn, Layers, Grid } from 'lucide-react';
import { User } from '../types';
import ScrollControls from './ScrollControls';

interface MidjourneyAIProps {
  user: User | null;
  onOpenAuth: () => void;
}

export default function MidjourneyAI({ user, onOpenAuth }: MidjourneyAIProps) {
  const [prompt, setPrompt] = useState('Cyberpunk neon Tokyo street, hyper-realistic 8k octane render, cinematic lighting --v 6.1 --ar 16:9 --stylize 750');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [stylize, setStylize] = useState(750);
  const [version, setVersion] = useState('v6.1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mockGenerations = [
    {
      id: 'mj-1',
      prompt: 'Cyberpunk neon Tokyo street, rain puddles reflecting holographic signs, hyper-detailed 8k',
      url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=80',
      ar: '16:9',
      version: 'v6.1'
    },
    {
      id: 'mj-2',
      prompt: 'Ancient futuristic floating botanical sanctuary with bioluminescent waterfalls',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      ar: '1:1',
      version: 'v6.1'
    },
    {
      id: 'mj-3',
      prompt: 'Minimalist luxury architecture villa in Iceland with aurora borealis reflections',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      ar: '16:9',
      version: 'v6.0'
    },
    {
      id: 'mj-4',
      prompt: 'Surreal cosmic astronaut reaching towards vibrant nebula star clusters',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      ar: '1:1',
      version: 'v6.1'
    }
  ];

  const [gallery, setGallery] = useState(mockGenerations);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newImg = {
        id: `mj-${Date.now()}`,
        prompt: prompt,
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        ar: aspectRatio,
        version: version
      };
      setGallery([newImg, ...gallery]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      <ScrollControls />
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-base text-white">Midjourney v6.1 Pro</h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 font-mono">
                Ultra Photorealism
              </span>
            </div>
            <p className="text-xs text-slate-400">High-fidelity generative art, Octane 3D, and cinematic realism</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-xl">
            GPU Mode: Relaxed / Fast Turbo
          </span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Controls */}
        <div className="lg:col-span-4 border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                /imagine Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none font-mono"
                placeholder="Describe prompt with parameters like --v 6.1, --ar 16:9..."
              />
            </div>

            {/* Parameters */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Aspect Ratio (--ar)</span>
                <div className="flex gap-1">
                  {['1:1', '16:9', '9:16', '21:9'].map(ar => (
                    <button
                      key={ar}
                      onClick={() => setAspectRatio(ar)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        aspectRatio === ar ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Stylize Intensity (--s)</span>
                  <span className="font-mono text-cyan-400">{stylize}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={stylize}
                  onChange={(e) => setStylize(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Engine Version</span>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg text-xs px-2 py-1 text-slate-200 outline-none"
                >
                  <option value="v6.1">v6.1 (Latest Photorealism)</option>
                  <option value="v6.0">v6.0 (Raw Aesthetics)</option>
                  <option value="Niji 6">Niji 6 (Anime / Manga)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? 'Rendering 4-Grid Diffusion...' : '/imagine Generate Midjourney'}</span>
          </button>
        </div>

        {/* Right Output Gallery */}
        <div className="lg:col-span-8 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl"
              >
                <img
                  src={item.url}
                  alt={item.prompt}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-slate-900/90 backdrop-blur-md">
                  <p className="text-xs text-slate-300 font-medium line-clamp-2">{item.prompt}</p>
                  <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400">AR: {item.ar}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-400">{item.version}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-300 hover:text-white flex items-center gap-1 font-bold"
                    >
                      <Download className="w-3 h-3" /> Upscale 4K
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
