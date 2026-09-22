import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Share2, Copy, Check, Lock, ArrowRight, Download, Volume2, 
  Pause, Play, ExternalLink, Image, FileText, Globe, UserCheck, LogIn, ChevronLeft, Eye,
  Youtube, Film, ChevronDown, ChevronUp
} from 'lucide-react';
import { SharedChat, User } from '../types';
import { toast } from '../utils/toast';

interface SharedChatViewProps {
  shareId: string;
  user: User | null;
  token: string | null;
  onOpenAuth: () => void;
  onStartNewChat: () => void;
  onImportSuccess?: (chatId: string) => void;
}

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

export default function SharedChatView({
  shareId,
  user,
  token,
  onOpenAuth,
  onStartNewChat,
  onImportSuccess
}: SharedChatViewProps) {
  const [sharedChat, setSharedChat] = useState<SharedChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);

  // YouTube video toggle
  const [showVideoExplainer, setShowVideoExplainer] = useState(true);

  // Speech synthesis
  const [speechMsgId, setSpeechMsgId] = useState<string | null>(null);

  useEffect(() => {
    fetchSharedChat();
  }, [shareId]);

  const fetchSharedChat = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/public/shares/${shareId}`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'This shared conversation could not be found or has been disabled.');
      }
      const data: SharedChat = await response.json();
      setSharedChat(data);
    } catch (err: any) {
      setError(err.message || 'Error loading shared conversation');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleImport = async () => {
    if (!user || !token) {
      onOpenAuth();
      return;
    }

    setImporting(true);
    try {
      const response = await fetch(`/api/public/shares/${shareId}/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to import chat.');
      }

      const newChat = await response.json();
      setImportDone(true);
      if (onImportSuccess) {
        setTimeout(() => {
          onImportSuccess(newChat.id);
        }, 800);
      }
    } catch (err: any) {
      toast.error(err.message || 'Error importing conversation');
    } finally {
      setImporting(false);
    }
  };

  const handleSpeechPlay = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speechMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeechMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/```[\s\S]*?```/g, '').replace(/[*#_\-`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 500));
    utterance.onend = () => setSpeechMsgId(null);
    utterance.onerror = () => setSpeechMsgId(null);
    setSpeechMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Custom markdown renderer
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.split('\n');
        const language = lines[0].replace('```', '').trim() || 'code';
        const code = lines.slice(1, -1).join('\n');
        const codeBlockId = `code-${index}`;

        return (
          <div key={index} className="my-4 rounded-xl overflow-hidden border border-slate-200/50 dark:border-white/5 bg-slate-950 text-slate-100 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/5 text-xs font-mono text-slate-400">
              <span className="uppercase font-bold text-indigo-400">{language}</span>
              <button
                onClick={() => handleCopyText(codeBlockId, code)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCodeId === codeBlockId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      let formattedText = part
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 font-mono text-xs text-indigo-500">$1</code>');

      return (
        <span 
          key={index} 
          className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 block"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-6 animate-pulse">
          <Sparkles className="w-8 h-8 text-white animate-spin" />
        </div>
        <h2 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">
          Loading Shared Conversation...
        </h2>
        <p className="text-xs text-slate-500">Retrieving secure read-only thread from Nova network</p>
      </div>
    );
  }

  if (error || !sharedChat) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">
          Conversation Unavailable
        </h2>
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {error || 'This shared link may have been disabled by the author or does not exist.'}
        </p>
        <button
          onClick={onStartNewChat}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Go to Nova AI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      
      {/* Read-Only Top Navigation Bar */}
      <header className="sticky top-0 z-30 px-6 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onStartNewChat}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Go to App"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-display">Nova AI</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Shared Link
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Shared by <span className="text-slate-700 dark:text-slate-300 font-semibold">{sharedChat.authorName}</span> • {new Date(sharedChat.sharedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleImport}
            disabled={importing || importDone}
            className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {importDone ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Imported to My Chats!</span>
              </>
            ) : importing ? (
              <span>Importing...</span>
            ) : user ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Import to My Chats</span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign in to Clone</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Conversation Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        
        {/* Title Header Card */}
        <div className="p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3 bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold uppercase">
              {sharedChat.model}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>{sharedChat.messages.length} messages</span>
              {sharedChat.viewsCount !== undefined && (
                <span className="flex items-center gap-1 text-indigo-500">
                  <Eye className="w-3.5 h-3.5" /> {sharedChat.viewsCount} views
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-slate-100">
            {sharedChat.title}
          </h1>
        </div>

        {/* YouTube Short Video Explainer Card */}
        <div className="rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/5 via-slate-900/50 to-purple-500/5 dark:bg-slate-900/80 p-5 shadow-xl space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setShowVideoExplainer(!showVideoExplainer)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  YouTube Video Explainer
                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-mono font-bold">
                    Watch Short
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Watch a quick 1-minute video explaining this conversation and Nova AI capabilities
                </p>
              </div>
            </div>

            <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1">
              <span>{showVideoExplainer ? 'Hide' : 'Watch Video'}</span>
              {showVideoExplainer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showVideoExplainer && (
            <div className="space-y-2 pt-2 animate-in fade-in duration-300">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-black shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(sharedChat.youtubeVideoUrl)}
                  title="YouTube Short Video Explainer"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                <span className="flex items-center gap-1 text-red-500 font-semibold">
                  <Youtube className="w-3.5 h-3.5" /> Official Nova AI YouTube Explainer
                </span>
                <a
                  href={sharedChat.youtubeVideoUrl || 'https://www.youtube.com/watch?v=5qap5aO4i9A'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 underline flex items-center gap-1"
                >
                  Open in YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Message Thread */}
        <div className="space-y-6">
          {sharedChat.messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id || index}
                className={`flex gap-4 p-3 rounded-2xl ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-2xl flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {msg.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-900/60 text-xs font-mono">
                          {file.type.startsWith('image/') ? <Image className="w-3.5 h-3.5 text-indigo-400" /> : <FileText className="w-3.5 h-3.5 text-purple-400" />}
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-5 py-3.5 text-sm shadow-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                      : 'glass border border-slate-200/80 dark:border-white/5 rounded-tl-none text-slate-800 dark:text-slate-100'
                  }`}>
                    {renderMarkdown(msg.content)}
                  </div>

                  {/* Actions */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleSpeechPlay(msg.id, msg.content)}
                        className="px-2.5 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{speechMsgId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="px-2.5 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCodeId === msg.id ? (
                          <span className="text-emerald-500 font-bold">Copied</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-indigo-200 dark:border-indigo-900">
                    {sharedChat.authorName.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </main>

      {/* Read-Only Bottom Banner Notice */}
      <footer className="sticky bottom-0 z-30 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850">
          <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <Lock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>This is a read-only view of a shared conversation.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleImport}
              className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{user ? 'Import to My Account' : 'Sign in to Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={onStartNewChat}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Start New Chat
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
