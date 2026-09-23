import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Sparkles, Globe, Copy, Check, ExternalLink, Download, Code, ShieldCheck, 
  Cpu, Zap, Compass, Share2, Layers, Terminal, Smartphone, Monitor
} from 'lucide-react';
import { toast } from '../utils/toast';

interface HdVectorCardProps {
  appUrl?: string;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
  className?: string;
}

export default function HdVectorCard({
  appUrl = 'https://nova-ai-3603.ai.studio',
  onOpenAuth,
  onOpenPricing,
  className = ''
}: HdVectorCardProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [activeVectorTab, setActiveVectorTab] = useState<'card' | 'embed' | 'specs'>('card');

  useEffect(() => {
    QRCode.toDataURL(
      appUrl,
      {
        width: 480,
        margin: 2,
        color: {
          dark: '#060B1E',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeDataUrl(url);
        }
      }
    );
  }, [appUrl]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    toast.success(`App URL copied to clipboard: ${appUrl}`);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyEmbed = () => {
    const embedSnippet = `<iframe src="${appUrl}" width="100%" height="800px" frameborder="0" allow="microphone; camera; geolocation" style="border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,0.5);"></iframe>`;
    navigator.clipboard.writeText(embedSnippet);
    setCopiedEmbed(true);
    toast.success('Embed Code Copied! Paste the <iframe> tag into your website.');
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = 'nova-ai-vector-qr.png';
    a.click();
    toast.success('High-definition QR code saved.');
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060A1F] via-[#091130] to-[#040714] text-white shadow-2xl p-6 sm:p-8 ${className}`}>
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">OFFICIAL HD VECTOR PORTAL</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                LIVE PRODUCTION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Nova AI Platform Vector Card
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveVectorTab('card')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeVectorTab === 'card' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' 
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Vector Badge
          </button>
          <button
            onClick={() => setActiveVectorTab('embed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeVectorTab === 'embed' 
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40' 
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Embed HTML
          </button>
          <button
            onClick={() => setActiveVectorTab('specs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeVectorTab === 'specs' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40' 
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* Main Tab 1: HD Vector Card */}
      {activeVectorTab === 'card' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Card Presentation Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0A122E] border border-cyan-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  ✦ SHELBY.AI ENTERPRISE ECOSYSTEM
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  FOUNDED BY SHIVAM KUMAR
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Nova AI Intelligence Suite
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  God's Eye 3D View Geospatial Reconnaissance, 402 Global Database Engines, 1,970+ Master AI Tools, OSINT Security Suite, and Universal Cloud Architecture.
                </p>
              </div>

              {/* URL Display Pill */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-xl bg-slate-950/90 border border-cyan-500/40">
                <div className="flex items-center gap-2 px-3 py-1 flex-1 font-mono text-xs text-cyan-300 truncate">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate select-all">{appUrl}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyUrl}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold font-mono hover:bg-cyan-400 transition-all cursor-pointer shadow"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                  </button>
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold font-mono hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch</span>
                  </a>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Gemini 3.8 Flash</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SOC-2 Ready</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300 col-span-2 sm:col-span-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zero Latency</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code and Mobile Access Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#0A112C] to-[#050918] border border-cyan-500/30 text-center space-y-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-2xl border-4 border-cyan-400/50">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl} alt="Nova AI HD Vector QR" className="w-40 h-40 object-contain rounded-lg" />
              ) : (
                <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-500 text-xs font-mono">
                  Rendering QR...
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-cyan-300">Instant Mobile & Desktop Sync</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Scan with any smartphone camera to open directly in browser
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleDownloadQr}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-white transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save QR PNG</span>
              </button>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-white transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Embed Code */}
      {activeVectorTab === 'embed' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-slate-300">HTML IFrame Embed Snippet</span>
              </div>
              <button
                onClick={handleCopyEmbed}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all cursor-pointer"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied' : 'Copy Embed HTML'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto select-all">
{`<iframe
  src="${appUrl}"
  width="100%"
  height="850px"
  frameborder="0"
  allow="microphone; camera; geolocation; clipboard-write"
  style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(6, 182, 212, 0.3);"
></iframe>`}
            </pre>
          </div>
        </div>
      )}

      {/* Main Tab 3: Architecture Specs */}
      {activeVectorTab === 'specs' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold">FRONTEND LAYER</span>
            <p className="text-slate-300 text-[11px]">
              React 19 + TypeScript + Tailwind CSS with CesiumJS 3D Globe, Leaflet Geospatial Map, and Glassmorphic themes.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-indigo-400 font-bold">AI & NEURAL LOGIC</span>
            <p className="text-slate-300 text-[11px]">
              Google GenAI Gemini 3.8 Flash & Gemini 3.1 Pro Preview with server-side proxy routes and offline resilient fallbacks.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold">RECON & OSINT</span>
            <p className="text-slate-300 text-[11px]">
              Integrated Sherlock, SpiderFoot, Shodan, Maltego, Recon-ng, and Creepy intelligence frameworks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
