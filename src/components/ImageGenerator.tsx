import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Download, Copy, Share2, Grid, Ratio, Eye, Sliders, AlertCircle, RefreshCw, Check, FileText, Bookmark, CheckCircle
} from 'lucide-react';
import { User } from '../types';
import { generateImageArtPDF, downloadPdfDoc, saveItemToGallery } from '../utils/pdfGenerator';

interface ImageGeneratorProps {
  user: User | null;
}

export default function ImageGenerator({ user }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('1K');
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<Array<{ prompt: string; url: string; date: string }>>([
    {
      prompt: "A gorgeous retro-futuristic laboratory at twilight, filled with glowing holographic displays, chemical flasks, complex circuit panels, styled with warm synthwave colors.",
      url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600",
      date: "Jul 12, 2026"
    },
    {
      prompt: "Brutalist glass cabin built on top of a misty Scandinavian fjord under neon aurora borealis.",
      url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600",
      date: "Jul 11, 2026"
    }
  ]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (!user) {
      setError('Please log in to generate custom images.');
      return;
    }

    setGenerating(true);
    setError('');
    setGeneratedUrl(null);

    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({ prompt, aspectRatio, quality })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedUrl(data.imageUrl);
      
      // Add to local generator history
      setHistory(prev => [
        {
          prompt,
          url: data.imageUrl,
          date: 'Just Now'
        },
        ...prev
      ]);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setGenerating(false);
    }
  };

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.substring(0, 15).replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded PNG Image');
  };

  const downloadImagePDF = async (url: string, text: string) => {
    showToast('Generating Art Sheet PDF...');
    const doc = await generateImageArtPDF(text, url, { aspectRatio, quality });
    downloadPdfDoc(doc, `${text.substring(0, 20).replace(/[^a-z0-9]/gi, '-')}-ArtSheet.pdf`);
    showToast('Downloaded Art Sheet PDF!');
  };

  const saveImageToGallery = (url: string, text: string) => {
    saveItemToGallery({
      id: `art-${Date.now()}`,
      userId: user?.id || 'guest',
      title: `Artwork: ${text.substring(0, 30)}...`,
      type: 'image',
      createdAt: new Date().toISOString(),
      thumbnailUrl: url,
      dataUrl: url,
      fileSize: '1.4 MB',
      metadata: {
        prompt: text,
        description: `Generated via Imagen 3 HD Engine (${aspectRatio}, ${quality}).`,
        author: user?.name || 'Artist'
      }
    });
    showToast('Saved Art & PDF to Gallery!');
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-slate-800 dark:text-slate-100 bg-slate-50/10 dark:bg-slate-950/10">
      
      {/* Control Sidebar Panel */}
      <div className="w-full md:w-80 border-r border-slate-200/60 dark:border-white/5 p-6 flex flex-col overflow-y-auto glass-sidebar shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="font-display font-bold text-base">Image Studio</h2>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-6">
          {/* Prompt input */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wide text-slate-400 uppercase">Artistic Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to generate in detail (e.g. 'A digital painting of a cosmic wolf howling at a glowing planetary system')..."
              rows={4}
              required
              className="w-full p-3.5 text-sm bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Configuration Sliders/Selectors */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-1 text-xs font-bold tracking-wide text-slate-400 uppercase">
              <Sliders className="w-3.5 h-3.5" />
              <span>Configurations</span>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['1:1', '16:9', '9:16', '3:4', '4:3'].map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      aspectRatio === ratio
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'border-slate-200/60 hover:bg-slate-200/50 dark:border-white/5 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality resolution */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Image Quality / Size</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Standard (512px)', value: '512px' },
                  { label: 'HD Detail (1K)', value: '1K' },
                  { label: 'High Quality (2K)', value: '2K' },
                  { label: 'Ultra Quality (4K)', value: '4K' }
                ].map((item) => {
                  const isPremium = item.value === '2K' || item.value === '4K';
                  const isPro = user?.subscriptionTier !== 'Free';
                  const disabled = isPremium && !isPro;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => setQuality(item.value)}
                      className={`py-2 px-1 text-[10px] font-bold rounded-lg border flex flex-col items-center justify-center transition-all ${
                        quality === item.value
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'border-slate-200/60 hover:bg-slate-200/50 dark:border-white/5 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                      } ${disabled ? 'opacity-35 cursor-not-allowed' : ''}`}
                    >
                      <span>{item.label}</span>
                      {isPremium && (
                        <span className="text-[7px] bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1 rounded mt-0.5 uppercase">PRO</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex gap-2 p-3 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Trigger Button */}
          <button
            type="submit"
            disabled={generating || !prompt.trim()}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Composing Art...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Generate Image</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Output Display Area */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8 space-y-8">
        
        {/* Main generation pane */}
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative shadow-inner">
                  <Sparkles className="w-7 h-7 text-indigo-500 animate-spin" />
                  <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-2xl animate-spin" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-display">Crafting Your Visual Artwork</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                    Nova is aligning complex neural parameters to paint your custom description using Gemini 3.1 high-fidelity image layers.
                  </p>
                </div>
              </motion.div>
            ) : generatedUrl ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden glass border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="relative aspect-square md:aspect-[4/3] bg-slate-900 flex items-center justify-center overflow-hidden group">
                  <img src={generatedUrl} className="max-h-full max-w-full object-contain" alt="generated-art" />
                  
                  {/* Floating Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
                    <p className="text-xs font-semibold truncate pr-6 max-w-xs">{prompt}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadImage(generatedUrl, prompt)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
                        title="Download to system"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-900/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Prompt</span>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">{prompt}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => saveImageToGallery(generatedUrl, prompt)}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        title="Save to Gallery"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        Save to Gallery
                      </button>

                      <button
                        onClick={() => downloadImagePDF(generatedUrl, prompt)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        title="Download PDF Art Sheet"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        PDF Sheet
                      </button>

                      <button
                        onClick={() => downloadImage(generatedUrl, prompt)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        title="Download PNG"
                      >
                        <Download className="w-3.5 h-3.5" />
                        PNG
                      </button>

                      <button
                        onClick={() => handleCopyPrompt(prompt)}
                        className="p-1.5 border border-slate-200 hover:bg-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                        title="Copy Prompt"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center bg-white/10 dark:bg-slate-900/10"
              >
                <Grid className="w-12 h-12 stroke-[1.5] text-slate-300 dark:text-slate-700 animate-pulse mb-3" />
                <h3 className="font-bold text-sm text-slate-600 dark:text-slate-400">Image Canvas Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Configure aspect ratios, input detailed custom descriptions on the sidebar, and witness immediate visual creations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Studio Generation History Grid */}
        <div className="max-w-3xl mx-auto w-full pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-slate-400" />
            <h3 className="font-bold text-sm font-display tracking-tight text-slate-500">Your Generative History</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {history.map((item, idx) => (
              <div 
                key={idx}
                className="group rounded-xl overflow-hidden glass border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                  <img src={item.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="history-thumbnail" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      onClick={() => setGeneratedUrl(item.url)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                      title="View Image"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => saveImageToGallery(item.url, item.prompt)}
                      className="p-1.5 rounded-lg bg-purple-500/80 hover:bg-purple-600 text-white backdrop-blur-md transition-colors"
                      title="Save to Gallery"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => downloadImagePDF(item.url, item.prompt)}
                      className="p-1.5 rounded-lg bg-indigo-500/80 hover:bg-indigo-600 text-white backdrop-blur-md transition-colors"
                      title="Download PDF Art Sheet"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => downloadImage(item.url, item.prompt)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                      title="Download PNG Image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <p className="text-[11px] font-semibold text-slate-500 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.prompt}
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-70 bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
