import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, Mic, UserCheck, Sparkles, Play, Pause, RefreshCw, Download, 
  Volume2, VolumeX, Globe, Layers, MessageSquare, Sliders, Check, Copy, Wand2
} from 'lucide-react';
import { User, HeyGenAvatar, HeyGenProject } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeyGenAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

const AVATARS: HeyGenAvatar[] = [
  {
    id: 'avatar-sophia',
    name: 'Sophia Chen',
    role: 'Global Tech Executive',
    gender: 'female',
    style: 'Studio 4K',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'avatar-marcus',
    name: 'Marcus Vance',
    role: 'Senior Product Architect',
    gender: 'male',
    style: 'Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'avatar-elena',
    name: 'Elena Rostova',
    role: 'International News Anchor',
    gender: 'female',
    style: 'Newsroom',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'avatar-raj',
    name: 'Rajiv Sharma',
    role: 'FinTech Strategist',
    gender: 'male',
    style: 'Studio 4K',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }
];

const BACKDROPS = [
  { id: 'modern-office', label: 'Modern Tech Office', bg: 'from-slate-900 via-indigo-950 to-slate-900' },
  { id: 'clean-studio', label: 'Clean 4K Studio', bg: 'from-slate-950 via-slate-900 to-black' },
  { id: 'cyberpunk-lab', label: 'Cyberpunk Lab', bg: 'from-purple-950 via-slate-950 to-indigo-950' },
  { id: 'neon-gradient', label: 'Cosmic Gradient', bg: 'from-pink-950 via-purple-950 to-slate-950' },
  { id: 'green-screen', label: 'Chroma Green Screen', bg: 'from-emerald-600 to-green-700' }
];

const VOICE_PRESETS = [
  { id: 'en-US-Neural-1', name: 'Nova Natural (English US)', lang: 'English' },
  { id: 'en-GB-Neural-2', name: 'Arthur British (English UK)', lang: 'English' },
  { id: 'es-ES-Neural-1', name: 'Lucia Castilian (Spanish)', lang: 'Spanish' },
  { id: 'fr-FR-Neural-1', name: 'Antoine Studio (French)', lang: 'French' },
  { id: 'de-DE-Neural-1', name: 'Hanna Executive (German)', lang: 'German' },
  { id: 'hi-IN-Neural-1', name: 'Aarav Expressive (Hindi)', lang: 'Hindi' },
  { id: 'ja-JP-Neural-1', name: 'Sakura Anime Voice (Japanese)', lang: 'Japanese' }
];

export default function HeyGenAI({ user, onOpenAuth }: HeyGenAIProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<HeyGenAvatar>(AVATARS[0]);
  const [selectedVoice, setSelectedVoice] = useState(VOICE_PRESETS[0].id);
  const [selectedBackdrop, setSelectedBackdrop] = useState(BACKDROPS[0].id);
  const [scriptText, setScriptText] = useState(
    'Welcome to Nova AI. Today we are exploring next-generation neural avatar generation, real-time voice cloning, and multilingual broadcast synthesis. Let us begin.'
  );
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioWave, setAudioWave] = useState<number[]>(Array(12).fill(10));

  useEffect(() => {
    let interval: any;
    if (isSpeaking) {
      interval = setInterval(() => {
        setAudioWave(Array(12).fill(0).map(() => Math.floor(Math.random() * 40) + 8));
      }, 100);
    } else {
      setAudioWave(Array(12).fill(8));
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  const handleSynthesize = () => {
    if (!scriptText.trim()) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4000);
    }
  };

  const handleStopSynthesis = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleGenerateVideo = async () => {
    if (!scriptText.trim() || isRendering) return;

    setIsRendering(true);
    setRenderProgress(15);

    const interval = setInterval(() => {
      setRenderProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 18;
      });
    }, 400);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      clearInterval(interval);
      setRenderProgress(100);
    } finally {
      setIsRendering(false);
      setRenderProgress(0);
      handleSynthesize();
    }
  };

  const handleAIEnhanceScript = async () => {
    try {
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const response = await fetch('/api/heygen/generate-script', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topic: scriptText || 'Next generation AI video synthesis and global creative studios',
          avatarName: selectedAvatar.name,
          avatarRole: selectedAvatar.role,
          tone: 'Inspirational & Professional',
          language: VOICE_PRESETS.find(v => v.id === selectedVoice)?.lang || 'English'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.script) {
          setScriptText(data.script);
          return;
        }
      }
    } catch (e) {
      // fallback
    }

    setScriptText(
      'Hello visionaries! Welcome to Shelby AI and Nova Cloud Studio. Today, we are transforming global media production with hyper-realistic avatars, instant voice synthesis, and multi-track automated video workflows. Power up your creativity!'
    );
  };

  const currentBackdrop = BACKDROPS.find(b => b.id === selectedBackdrop) || BACKDROPS[0];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Column: Avatar & Studio Configurator */}
      <div className="w-full lg:w-96 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-purple-600/20">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-black text-base tracking-tight text-white font-display">HeyGen.ai</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 font-mono">
                AVATAR 4K
              </span>
            </div>
            <p className="text-xs text-slate-400">AI video avatar & multilingual voice cloning</p>
          </div>
        </div>

        {/* Script Editor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
              <span>Teleprompter Script</span>
            </label>
            <button
              type="button"
              onClick={handleAIEnhanceScript}
              className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Wand2 className="w-3 h-3" />
              <span>AI Script</span>
            </button>
          </div>
          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            placeholder="Type or paste the speech transcript for your photorealistic avatar..."
            rows={4}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/60 resize-none font-medium leading-relaxed"
          />
        </div>

        {/* Avatar Cast Selection Grid */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>Select AI Presenter Cast</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AVATARS.map(avatar => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                  selectedAvatar.id === avatar.id
                    ? 'bg-rose-500/15 border-rose-500/60 text-rose-300 font-bold shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <img
                  src={avatar.avatarUrl}
                  alt={avatar.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div className="truncate">
                  <div className="truncate text-slate-200 font-bold">{avatar.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{avatar.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Cloning Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-rose-400" />
            <span>Neural Voice & Accent</span>
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            {VOICE_PRESETS.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        {/* Backdrop Environment Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>Virtual Studio Environment</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {BACKDROPS.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBackdrop(b.id)}
                className={`p-2 rounded-lg border text-left text-xs font-semibold truncate transition-all cursor-pointer ${
                  selectedBackdrop === b.id
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Button */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleGenerateVideo}
            disabled={!scriptText.trim() || isRendering}
            className="w-full py-3 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-black rounded-xl text-xs transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            {isRendering ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing HeyGen Video ({renderProgress}%)...</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>Generate HeyGen Talking Avatar Video</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Virtual Studio Canvas & Playback */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 p-4 md:p-6 space-y-6">
        {/* Main Stage */}
        <div className="flex-1 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* Avatar Stage Backdrop */}
          <div className={`flex-1 rounded-2xl bg-gradient-to-tr ${currentBackdrop.bg} relative overflow-hidden flex flex-col items-center justify-center border border-white/10 shadow-inner`}>
            {/* Live Talking Avatar Figure */}
            <div className="relative flex flex-col items-center justify-center">
              <div className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 shadow-2xl transition-all duration-300 ${
                isSpeaking ? 'border-rose-400 scale-105 shadow-rose-500/30' : 'border-white/20'
              }`}>
                <img
                  src={selectedAvatar.avatarUrl}
                  alt={selectedAvatar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Real-time Audio Waveform Simulator */}
              <div className="flex items-center gap-1 mt-4 h-10 px-4 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-lg">
                <Volume2 className="w-3.5 h-3.5 text-rose-400 mr-1" />
                {audioWave.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-rose-500 to-indigo-400 rounded-full transition-all duration-100"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Captions Overlay */}
            <div className="absolute bottom-4 left-6 right-6 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-center">
              <p className="text-xs sm:text-sm font-medium text-slate-100 leading-snug">
                "{scriptText}"
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isSpeaking ? (
                <button
                  onClick={handleStopSynthesis}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Avatar</span>
                </button>
              ) : (
                <button
                  onClick={handleSynthesize}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-rose-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Preview Avatar Speech</span>
                </button>
              )}
              <span className="text-xs text-slate-400 font-mono">
                {selectedAvatar.name} • {selectedAvatar.style}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={selectedAvatar.previewVideoUrl}
                download="heygen-avatar-clip.mp4"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export 4K MP4</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
