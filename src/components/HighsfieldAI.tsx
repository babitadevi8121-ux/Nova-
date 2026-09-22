import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, Video, Play, Pause, RefreshCw, Download, Sparkles, Sliders, 
  Layers, Volume2, VolumeX, FastForward, RotateCcw, Share2, Copy, Check, Eye
} from 'lucide-react';
import { User, HighsfieldVideo } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HighsfieldAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

const CAMERA_MOTIONS = [
  { id: 'Pan Left', label: 'Pan Left ←', desc: 'Smooth horizontal glide to the left' },
  { id: 'Pan Right', label: 'Pan Right →', desc: 'Smooth horizontal glide to the right' },
  { id: 'Tilt Up', label: 'Tilt Up ↑', desc: 'Vertical upward cinematic reveal' },
  { id: 'Tilt Down', label: 'Tilt Down ↓', desc: 'Vertical downward ground perspective' },
  { id: 'Zoom In', label: 'Zoom In ⊕', desc: 'Dramatic push-in towards subject' },
  { id: 'Zoom Out', label: 'Zoom Out ⊖', desc: 'Expansive wide-angle pull-back' },
  { id: 'Orbital Orbit', label: 'Orbital 360° 🔄', desc: 'Continuous 360-degree subject revolution' },
  { id: 'Tracking FPV', label: 'FPV Drone 🛸', desc: 'High-speed dynamic first-person tracking' }
];

const STYLE_PRESETS = [
  'Photorealistic Cinema 35mm',
  'Cyberpunk Neo-Noir',
  'Anime Studio Ghibli',
  'Unreal Engine 5 Hyper-Action',
  'Vintage 16mm Retro Film',
  'Nature Documentary 4K'
];

const DEFAULT_VIDEOS: HighsfieldVideo[] = [
  {
    id: 'hf-1',
    prompt: 'Hyper-realistic drone shot soaring through mist-covered neon skyscrapers of Neo-Tokyo at midnight with flying cyber vehicles and rain reflections',
    cameraMotion: 'Tracking FPV',
    fps: 60,
    duration: 10,
    resolution: '4K',
    motionIntensity: 8,
    style: 'Cyberpunk Neo-Noir',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    seed: 582910
  },
  {
    id: 'hf-2',
    prompt: 'Majestic humpback whale breaching out of glowing bioluminescent azure waves under starry aurora borealis skies',
    cameraMotion: 'Orbital Orbit',
    fps: 30,
    duration: 5,
    resolution: '1080p',
    motionIntensity: 6,
    style: 'Photorealistic Cinema 35mm',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    seed: 948211
  }
];

export default function HighsfieldAI({ user, onOpenAuth }: HighsfieldAIProps) {
  const [prompt, setPrompt] = useState('');
  const [cameraMotion, setCameraMotion] = useState<HighsfieldVideo['cameraMotion']>('Tracking FPV');
  const [fps, setFps] = useState<24 | 30 | 60>(60);
  const [duration, setDuration] = useState<5 | 10 | 15>(10);
  const [resolution, setResolution] = useState<'720p' | '1080p' | '4K'>('4K');
  const [motionIntensity, setMotionIntensity] = useState<number>(7);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [videos, setVideos] = useState<HighsfieldVideo[]>(() => {
    const saved = localStorage.getItem('highsfield_videos');
    return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
  });

  const [activeVideo, setActiveVideo] = useState<HighsfieldVideo>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    localStorage.setItem('highsfield_videos', JSON.stringify(videos));
  }, [videos]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationProgress(10);

    const interval = setInterval(() => {
      setGenerationProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 15;
      });
    }, 400);

    try {
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const response = await fetch('/api/highsfield/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt,
          cameraMotion,
          fps,
          duration,
          resolution,
          motionIntensity,
          style: selectedStyle
        })
      });

      clearInterval(interval);
      setGenerationProgress(100);

      let videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      let thumbUrl = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop';
      let seedVal = Math.floor(Math.random() * 1000000);

      if (response.ok) {
        const data = await response.json();
        if (data.videoUrl) videoUrl = data.videoUrl;
        if (data.thumbnailUrl) thumbUrl = data.thumbnailUrl;
        if (data.seed) seedVal = data.seed;
      }

      const newVideo: HighsfieldVideo = {
        id: 'hf-' + Date.now(),
        prompt,
        cameraMotion,
        fps,
        duration,
        resolution,
        motionIntensity,
        style: selectedStyle,
        videoUrl,
        thumbnailUrl: thumbUrl,
        createdAt: new Date().toISOString(),
        seed: seedVal
      };

      setVideos(prev => [newVideo, ...prev]);
      setActiveVideo(newVideo);
      setIsPlaying(true);
    } catch (err) {
      console.error('Highsfield video generate error:', err);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Column: Video Controls */}
      <div className="w-full lg:w-96 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-black text-base tracking-tight text-white font-display">Highsfield.ai</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 font-mono">
                MOTION 4K
              </span>
            </div>
            <p className="text-xs text-slate-400">Cinematic AI video & camera motion generator</p>
          </div>
        </div>

        {/* Video Prompt Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Video Scene Prompt</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the motion scene (e.g. Cinematic drone tracking shot through glowing crystal canyons at dusk)..."
              rows={3}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 resize-none font-medium"
            />
          </div>

          {/* Camera Motion Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Director Camera Motion</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CAMERA_MOTIONS.map(motion => (
                <button
                  key={motion.id}
                  type="button"
                  onClick={() => setCameraMotion(motion.id as any)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    cameraMotion === motion.id
                      ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-bold truncate">{motion.label}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{motion.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Preset Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Cinematic Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              {STYLE_PRESETS.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Video Parameters (FPS, Duration, Resolution) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">FPS</label>
              <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {([24, 30, 60] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFps(f)}
                    className={`flex-1 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                      fps === f ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Length</label>
              <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {([5, 10, 15] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                      duration === d ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Quality</label>
              <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {(['1080p', '4K'] as const).map(res => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResolution(res)}
                    className={`flex-1 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                      resolution === res ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Motion Intensity Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Motion Dynamics</span>
              <span className="text-cyan-400 font-mono">{motionIntensity}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={motionIntensity}
              onChange={(e) => setMotionIntensity(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Rendering Highsfield 4K Motion ({generationProgress}%)...</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>Render Highsfield Cinema Video</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column: Player & Reel Feed */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 p-4 md:p-6 space-y-6">
        {/* Main Player Canvas */}
        {activeVideo && (
          <div className="flex-1 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Video Screen Container */}
            <div className="flex-1 rounded-xl bg-black relative overflow-hidden flex items-center justify-center border border-slate-800/80">
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                loop
                muted={isMuted}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                  }
                }}
                className="max-h-full max-w-full object-contain rounded-lg"
              />

              {/* Floating Overlay Info */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-cyan-300 font-bold">{activeVideo.cameraMotion}</span>
                <span className="text-slate-400">|</span>
                <span className="font-mono text-slate-300 font-bold">{activeVideo.resolution} • {activeVideo.fps}fps</span>
              </div>

              {/* Play Overlay Button */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="text-xs font-mono text-slate-400">
                    {currentTime.toFixed(1)}s / {activeVideo.duration}s
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeVideo.videoUrl}
                    download={`highsfield-${activeVideo.id}.mp4`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MP4</span>
                  </a>
                </div>
              </div>

              {/* Prompt Info */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Scene Description</div>
                <p className="text-slate-200 leading-relaxed">{activeVideo.prompt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Reel Strip */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highsfield Video Reels ({videos.length})</span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {videos.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVideo(v);
                  setIsPlaying(false);
                }}
                className={`w-36 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer relative group ${
                  activeVideo?.id === v.id
                    ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
                    : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={v.thumbnailUrl} alt={v.prompt} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white opacity-80 group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-cyan-300 font-bold">
                  {v.resolution}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
