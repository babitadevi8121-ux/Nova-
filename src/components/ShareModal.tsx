import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, Share2, Copy, Check, Globe, Lock, ExternalLink, Twitter, Mail, 
  MessageSquare, Sparkles, Eye, AlertCircle, ShieldCheck, Download,
  Play, Youtube, Film, ChevronDown, ChevronUp, QrCode
} from 'lucide-react';
import { Chat, SharedChat, User } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: Chat | null;
  token: string | null;
  user: User | null;
  onShareUpdated?: (updatedChat: Chat) => void;
}

// Helper to sanitize & construct YouTube embed URLs
function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0';
  try {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/watch')) {
      const params = new URLSearchParams(url.split('?')[1] || '');
      videoId = params.get('v') || '';
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }
  } catch (e) {
    // Fallback
  }
  return 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0';
}

export default function ShareModal({
  isOpen,
  onClose,
  chat,
  token,
  user,
  onShareUpdated
}: ShareModalProps) {
  const [loading, setLoading] = useState(false);
  const [sharedData, setSharedData] = useState<SharedChat | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // YouTube Video Explainer state
  const [showVideoExplainer, setShowVideoExplainer] = useState(true);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [isUpdatingVideo, setIsUpdatingVideo] = useState(false);

  // QR Code state
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const shareUrl = sharedData ? `${window.location.origin}/?share=${sharedData.shareId}` : '';

  // Generate QR Code when share URL changes
  useEffect(() => {
    if (shareUrl) {
      QRCode.toDataURL(shareUrl, {
        width: 320,
        margin: 2,
        color: { dark: '#4f46e5', light: '#ffffff' }
      }).then(setQrDataUrl).catch(console.error);
    } else {
      setQrDataUrl('');
    }
  }, [shareUrl]);

  // Generate or fetch share data when modal opens
  useEffect(() => {
    if (isOpen && chat && token) {
      handleCreateShare();
    } else {
      setSharedData(null);
      setError(null);
      setCopied(false);
    }
  }, [isOpen, chat?.id]);

  if (!isOpen || !chat) return null;

  const handleCreateShare = async (overrideVideoUrl?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/chats/${chat.id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          youtubeVideoUrl: overrideVideoUrl || customYoutubeUrl || chat.youtubeVideoUrl || 'https://www.youtube.com/watch?v=5qap5aO4i9A'
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate share link.');
      }

      const data: SharedChat = await response.json();
      setSharedData(data);
      if (data.youtubeVideoUrl) {
        setCustomYoutubeUrl(data.youtubeVideoUrl);
      }
      if (onShareUpdated) {
        onShareUpdated({ ...chat, isShared: true, shareId: data.shareId, sharedAt: data.sharedAt, youtubeVideoUrl: data.youtubeVideoUrl });
      }
    } catch (err: any) {
      setError(err.message || 'Error generating share link');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeShare = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/chats/${chat.id}/share`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSharedData(null);
        if (onShareUpdated) {
          onShareUpdated({ ...chat, isShared: false, shareId: undefined, sharedAt: undefined });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out this conversation "${chat.title}" generated on Nova AI: ${shareUrl}`);
    window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Shared Conversation: ${chat.title}`);
    const body = encodeURIComponent(`Hi,\n\nI wanted to share this conversation with you:\n\n${chat.title}\n${shareUrl}\n\nGenerated with Nova AI.`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const embedUrl = getYouTubeEmbedUrl(sharedData?.youtubeVideoUrl || customYoutubeUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Share Conversation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate a public, read-only link to share this chat.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Conversation Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                {chat.model}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
              {chat.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic">
              "{chat.messages[0]?.content || 'Empty conversation...'}"
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Sparkles className="w-6 h-6 animate-spin text-indigo-500" />
              <p className="text-xs">Generating secure share link...</p>
            </div>
          ) : sharedData ? (
            <div className="space-y-5">
              {/* Active Badge */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Public read-only link is active</span>
                </div>
                {sharedData.viewsCount !== undefined && (
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {sharedData.viewsCount} views
                  </span>
                )}
              </div>

              {/* Share URL Input & Copy Button */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Shareable Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* YouTube Video Explainer Section */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 dark:bg-red-950/20 p-4 space-y-3">
                <div 
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setShowVideoExplainer(!showVideoExplainer)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        YouTube Short Video Explainer
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-mono">Video Guide</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Watch or attach a YouTube video explaining this shared chat
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showVideoExplainer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {showVideoExplainer && (
                  <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                    {/* Responsive YouTube Embed Player */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-md">
                      <iframe
                        src={embedUrl}
                        title="YouTube Short Video Explainer"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    {/* Custom YouTube URL Attach Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        Attach Custom YouTube Explainer Video (Optional)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={customYoutubeUrl}
                          onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-mono"
                        />
                        <button
                          onClick={() => handleCreateShare(customYoutubeUrl)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg shadow transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          <span>Save Video</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Social & QR Actions */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Share & QR Code
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleTwitterShare}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Twitter className="w-3.5 h-3.5 text-sky-500" />
                    <span>Post on X</span>
                  </button>
                  <button
                    onClick={handleEmailShare}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-purple-500" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={() => setShowQrCode(!showQrCode)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                      showQrCode
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Expandable Share Link QR Code */}
              {showQrCode && qrDataUrl && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-indigo-500/20 flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-200">
                  <div className="p-2 bg-white rounded-xl shadow-md border">
                    <img src={qrDataUrl} alt="Share QR Code" className="w-40 h-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={qrDataUrl}
                      download={`share_qr_${chat.id}.png`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download QR PNG</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Info Note */}
              <div className="text-[11px] text-slate-400 leading-relaxed flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  Anyone with this link can view this snapshot of the conversation and watch the attached YouTube video explainer.
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Make this conversation public to share insights, code solutions, or AI outputs with your colleagues and friends.
              </p>
              <button
                onClick={() => handleCreateShare()}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer"
              >
                Create Shareable Link
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          {sharedData ? (
            <button
              onClick={handleRevokeShare}
              className="text-rose-500 hover:text-rose-600 font-semibold cursor-pointer hover:underline"
            >
              Stop Sharing
            </button>
          ) : (
            <span className="text-slate-400">Not shared</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
