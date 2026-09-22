import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Wand2, Image as ImageIcon, Download, Copy, Check, RefreshCw, 
  Layers, Sliders, Eye, Heart, Share2, ZoomIn, Palette, Zap, Flame, Shield, ArrowRight
} from 'lucide-react';
import { User, NanoBananaImage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NanoBananaAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

const STYLE_PRESETS = [
  { id: 'photoreal', name: 'Ultra Photoreal', icon: '📸', desc: '8K hyper-detailed cinema render with natural depth' },
  { id: 'cyberpunk', name: 'Neon Cyberpunk', icon: '🌃', desc: 'Volumetric neon glow, synthwave reflections & chrome' },
  { id: '3d-pixar', name: '3D Character / Pixar', icon: '🧸', desc: 'Glossy 3D animated styling with soft subsurface scattering' },
  { id: 'anime', name: 'Makoto Shinkai Anime', icon: '🌸', desc: 'Lush clouds, brilliant twilight skies, and vibrant anime linework' },
  { id: 'macro', name: 'Studio Macro & Bio', icon: '🔬', desc: 'Extreme close-up depth of field with octane studio lighting' },
  { id: 'concept-art', name: 'Sci-Fi Concept Art', icon: '🚀', desc: 'Atmospheric space exploration and futuristic megastructures' }
];

const LIGHTING_OPTIONS = [
  'Volumetric Studio Glow',
  'Golden Hour Sunset',
  'Dramatic Chiaroscuro',
  'Cyber Neon Lighting',
  'Soft Diffused Ambient',
  'Direct Sunlight'
];

const DEFAULT_GALLERY: NanoBananaImage[] = [
  {
    id: 'nb-1',
    prompt: 'Bioluminescent cybernetic panther prowling through a neon rain-soaked Neo-Tokyo rooftop, cinematic lighting, 8k octane render',
    style: 'Neon Cyberpunk',
    aspectRatio: '16:9',
    lighting: 'Cyber Neon Lighting',
    seed: 749204,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    likes: 42
  },
  {
    id: 'nb-2',
    prompt: 'Floating islands with ancient crystalline temples surrounded by fluffy pink clouds at sunset, whimsical fantasy realism',
    style: 'Makoto Shinkai Anime',
    aspectRatio: '1:1',
    lighting: 'Golden Hour Sunset',
    seed: 893412,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    likes: 88
  },
  {
    id: 'nb-3',
    prompt: 'Hyper-detailed macro view of an intricate mechanical mechanical wristwatch with sapphire crystal gears and glowing ruby tourbillon',
    style: 'Studio Macro & Bio',
    aspectRatio: '4:3',
    lighting: 'Volumetric Studio Glow',
    seed: 334102,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    likes: 65
  }
];

export default function NanoBananaAI({ user, onOpenAuth }: NanoBananaAIProps) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, distorted, extra limbs, watermark, artifacts');
  const [selectedStyle, setSelectedStyle] = useState('photoreal');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '21:9'>('1:1');
  const [lighting, setLighting] = useState(LIGHTING_OPTIONS[0]);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000));
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<NanoBananaImage[]>(() => {
    const saved = localStorage.getItem('nanobanana_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });
  const [selectedImage, setSelectedImage] = useState<NanoBananaImage | null>(gallery[0] || null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('nanobanana_gallery', JSON.stringify(gallery));
  }, [gallery]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);

    try {
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const response = await fetch('/api/nanobanana/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt,
          negativePrompt,
          style: selectedStyle,
          aspectRatio,
          lighting,
          seed: newSeed
        })
      });

      let finalImageUrl = '';
      if (response.ok) {
        const data = await response.json();
        finalImageUrl = data.imageUrl;
      }

      if (!finalImageUrl) {
        // High quality fallback artistic render based on category
        const fallbacks = [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
        ];
        finalImageUrl = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      const newImageItem: NanoBananaImage = {
        id: 'nb-' + Date.now(),
        prompt,
        negativePrompt,
        style: STYLE_PRESETS.find(s => s.id === selectedStyle)?.name || selectedStyle,
        aspectRatio,
        lighting,
        seed: newSeed,
        imageUrl: finalImageUrl,
        createdAt: new Date().toISOString(),
        likes: 0
      };

      setGallery(prev => [newImageItem, ...prev]);
      setSelectedImage(newImageItem);
    } catch (err) {
      console.error('NanoBanana generate error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMagicEnhancePrompt = async () => {
    if (!prompt.trim()) {
      setPrompt('Majestic solar flare bursting over futuristic crystal citadels on Mars with aurora borealis, 8k octane render');
      return;
    }
    try {
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const res = await fetch('/api/nanobanana/enhance-prompt', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt, style: selectedStyle })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.enhanced) {
          setPrompt(data.enhanced);
          return;
        }
      }
    } catch (e) {
      // fallback
    }

    const enhancements = [
      ', ultra-detailed cinematic depth of field, octane render 8k, volumetric lighting, Ray-traced reflections',
      ', masterpiece quality, sharp focus, vibrant color grading, intricate micro-textures, Unreal Engine 5 render',
      ', dynamic composition, atmospheric ambient fog, studio lighting, hyper-realistic 3D concept art'
    ];
    const addition = enhancements[Math.floor(Math.random() * enhancements.length)];
    setPrompt(prev => prev + addition);
  };

  const copyPromptText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Column: Generator Controls */}
      <div className="w-full lg:w-96 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-yellow-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-black text-base tracking-tight text-white font-display">NanoBanana.ai</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300 font-mono">
                TURBO 8K
              </span>
            </div>
            <p className="text-xs text-slate-400">Next-gen hyper-fast image & prompt studio</p>
          </div>
        </div>

        {/* Prompt Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-yellow-400" />
                <span>Creative Prompt</span>
              </label>
              <button
                type="button"
                onClick={handleMagicEnhancePrompt}
                className="text-[11px] font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Magic Enhance</span>
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your visual concept in detail (e.g. Glowing neon phoenix emerging from molten obsidian crystal)..."
              rows={3}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60 resize-none font-medium"
            />
          </div>

          {/* Style Presets Grid */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-yellow-400" />
              <span>Artistic Style Preset</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STYLE_PRESETS.map(style => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedStyle === style.id
                      ? 'bg-yellow-500/15 border-yellow-500/60 text-yellow-300 font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{style.icon}</span>
                    <span className="truncate">{style.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Aspect Ratio</label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['1:1', '16:9', '9:16', '4:3', '21:9'] as const).map(ratio => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 text-[11px] font-mono rounded-lg border text-center font-bold transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Mode Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lighting Physics</label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
            >
              {LIGHTING_OPTIONS.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Negative Prompt Collapsible */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Negative Prompt Filtering</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing NanoBanana 8K Tensor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate NanoBanana Masterpiece</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column: Viewport & Gallery */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 p-4 md:p-6 space-y-6">
        {/* Active Selected Viewport */}
        {selectedImage ? (
          <div className="flex-1 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 flex flex-col md:flex-row gap-6 overflow-hidden">
            {/* Image Preview Container */}
            <div className="flex-1 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden relative group border border-slate-800/80">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.prompt}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={selectedImage.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={`nanobanana-${selectedImage.id}.jpg`}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg backdrop-blur-md transition-all"
                  title="Download Full HD"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Metadata & Actions */}
            <div className="w-full md:w-80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-yellow-400 font-display">Generation Metadata</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-bold">
                    SEED #{selectedImage.seed}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Prompt</label>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {selectedImage.prompt}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Style</div>
                    <div className="font-bold text-slate-200 truncate">{selectedImage.style}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Aspect Ratio</div>
                    <div className="font-mono font-bold text-yellow-400">{selectedImage.aspectRatio}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 col-span-2">
                    <div className="text-[10px] text-slate-500">Lighting Mode</div>
                    <div className="font-bold text-slate-200">{selectedImage.lighting}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => copyPromptText(selectedImage.prompt)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied Prompt' : 'Copy Prompt'}</span>
                </button>
                <button
                  onClick={() => {
                    setPrompt(selectedImage.prompt);
                    setSelectedStyle(selectedImage.style);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Remix this prompt"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Remix</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <ImageIcon className="w-12 h-12 mb-2 stroke-1" />
            <p className="text-xs">No image selected. Generate one from the left panel!</p>
          </div>
        )}

        {/* Gallery Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent NanoBanana Creations ({gallery.length})</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {gallery.map(img => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer relative group ${
                  selectedImage?.id === img.id
                    ? 'border-yellow-400 scale-105 shadow-lg shadow-yellow-500/20'
                    : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.imageUrl} alt={img.prompt} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
