import React, { useState } from 'react';
import { Sparkles, Video, Clapperboard, Play, Pause, Download, RefreshCw, Wand2, Sliders, Film, Camera } from 'lucide-react';
import { User } from '../types';
import ScrollControls from './ScrollControls';

interface RunwayGen3Props {
  user: User | null;
  onOpenAuth: () => void;
}

export default function RunwayGen3({ user, onOpenAuth }: RunwayGen3Props) {
  const [prompt, setPrompt] = useState('FPV drone cinematic shot through neon futuristic skyscraper canyon at dusk with lens flare and rain.');
  const [motionSpeed, setMotionSpeed] = useState(6);
  const [cameraMovement, setCameraMovement] = useState('Pan Right & Zoom In');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-at-night-41584-large.mp4');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      <ScrollControls />
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
            <Clapperboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-base text-white">Runway Gen-3 Alpha</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 font-mono">
                Ultra Cinematic 4K
              </span>
            </div>
            <p className="text-xs text-slate-400">Next-generation text-to-video with camera motion brush & multi-motion control</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xl">
            Motion Brush: Enabled (v3.2)
          </span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Video Parameters */}
        <div className="lg:col-span-4 border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-emerald-400" />
                Video Motion Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                placeholder="Describe scene action, camera dynamics, lighting, and pacing..."
              />
            </div>

            {/* Motion Settings */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Motion Dynamics Speed</span>
                <span className="font-mono text-emerald-400">{motionSpeed} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={motionSpeed}
                onChange={(e) => setMotionSpeed(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Camera Director Path</label>
                <select
                  value={cameraMovement}
                  onChange={(e) => setCameraMovement(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 outline-none"
                >
                  <option value="Pan Right & Zoom In">Pan Right & Slow Zoom In</option>
                  <option value="Orbit 360 Drone">Orbit 360° Drone Shot</option>
                  <option value="Vertical Crane Rise">Vertical Crane Rise (Pedestal Up)</option>
                  <option value="FPV Dynamic Dive">FPV Dynamic Dive & Roll</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-400 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" /> High-Temporal Coherence
              </div>
              <p className="text-[11px] leading-relaxed">
                Gen-3 simulates realistic fluid mechanics, human expressions, physics momentum, and consistent structural geometry.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isGenerating ? 'Rendering Gen-3 Frames...' : 'Generate 4K Cinema Video'}</span>
          </button>
        </div>

        {/* Right Video Player */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-center items-center bg-slate-950 overflow-hidden">
          <div className="w-full max-w-2xl rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative group">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-80 object-cover"
            />
            <div className="p-4 bg-slate-900/90 backdrop-blur-md flex items-center justify-between border-t border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-200 truncate max-w-md">{prompt}</p>
                <p className="text-[10px] font-mono text-emerald-400 mt-0.5">Runtime: 10s • 4K UHD 60fps • Runway Gen-3 Alpha</p>
              </div>
              <a
                href={videoUrl}
                download="runway-gen3.mp4"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" /> Download MP4
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
