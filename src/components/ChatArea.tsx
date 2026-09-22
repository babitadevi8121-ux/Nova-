import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Paperclip, Mic, Volume2, Copy, RefreshCw, Edit2, Share2, 
  Download, Sparkles, AlertCircle, FileText, Image, Trash2, Check, X, ArrowDown, ExternalLink, Play, Square,
  Search, ChevronUp, ChevronDown, Pause, Sliders, Youtube, Bookmark, CheckCircle, CreditCard, Settings, User as UserIcon,
  LogIn, LogOut, Crown, Film, Video, FolderArchive, FileCode
} from 'lucide-react';
import { Chat, Message, User, Attachment } from '../types';
import { generateChatPDF, downloadPdfDoc, saveItemToGallery } from '../utils/pdfGenerator';
import ScrollControls from './ScrollControls';
import ChatExportModal from './ChatExportModal';
import { toast } from '../utils/toast';

interface ChatAreaProps {
  user: User | null;
  chat: Chat | null;
  onSendMessage: (content: string, attachments: Attachment[], useRAG: boolean) => void;
  onRegenerateResponse: () => void;
  onEditMessage: (messageId: string, newContent: string) => void;
  isSending: boolean;
  selectedModel: string;
  onChangeModel: (model: string) => void;
  onOpenShareModal?: (chat: Chat) => void;
  onOpenPricing?: () => void;
  onOpenSettings?: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export default function ChatArea({
  user,
  chat,
  onSendMessage,
  onRegenerateResponse,
  onEditMessage,
  isSending,
  selectedModel,
  onChangeModel,
  onOpenShareModal,
  onOpenPricing,
  onOpenSettings,
  onOpenAuth,
  onLogout
}: ChatAreaProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportModalTab, setExportModalTab] = useState<'all' | 'pdf' | 'photos' | 'videos' | 'documents' | 'raw'>('all');
  const [shareToast, setShareToast] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const [useRAG, setUseRAG] = useState(false);

  // Web Speech API - Speech Synthesis states
  const [webSpeechMsgId, setWebSpeechMsgId] = useState<string | null>(null);
  const [webSpeechState, setWebSpeechState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechVoice, setSpeechVoice] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showVoiceSettingsId, setShowVoiceSettingsId] = useState<string | null>(null);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
        // Default to a premium English voice or first available
        const defaultVoice = available.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) || 
                             available.find(v => v.lang.startsWith('en')) || 
                             available[0];
        if (defaultVoice) {
          setSpeechVoice(defaultVoice.name);
        }
      };
      
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Stop synthesis when transitioning chats
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [chat?.id]);

  const handleWebSpeechPlay = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.warning('Your browser does not support Speech Synthesis.');
      return;
    }

    // Toggle play/pause if this message is already active
    if (webSpeechMsgId === msgId) {
      if (webSpeechState === 'speaking') {
        window.speechSynthesis.pause();
        setWebSpeechState('paused');
      } else if (webSpeechState === 'paused') {
        window.speechSynthesis.resume();
        setWebSpeechState('speaking');
      }
      return;
    }

    // Stop current playbacks
    window.speechSynthesis.cancel();

    // Clean markdown text for clean speech narration
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '[code block omitted]') // Skip code blocks
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Read link title only
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Strip asterisks
      .replace(/`([^`]+)`/g, '$1') // Strip inline ticks
      .replace(/[*#_\-`]/g, ''); // General cleanup

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Apply selected voice
    if (speechVoice) {
      const selectedVoice = voices.find(v => v.name === speechVoice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.rate = speechRate;

    utterance.onstart = () => {
      setWebSpeechMsgId(msgId);
      setWebSpeechState('speaking');
    };

    utterance.onend = () => {
      setWebSpeechMsgId(null);
      setWebSpeechState('idle');
    };

    utterance.onerror = (e: SpeechSynthesisErrorEvent | Event) => {
      // Ignore normal cancel/interrupted events
      if ((e as SpeechSynthesisErrorEvent).error && (e as SpeechSynthesisErrorEvent).error !== 'canceled' && (e as SpeechSynthesisErrorEvent).error !== 'interrupted') {
        console.warn('Speech synthesis utterance non-fatal issue:', (e as SpeechSynthesisErrorEvent).error || e);
      }
      setWebSpeechMsgId(null);
      setWebSpeechState('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleWebSpeechStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setWebSpeechMsgId(null);
    setWebSpeechState('idle');
  };

  // Escapes RegExp special characters to prevent search errors
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const matchingMessages = chat?.messages.filter(msg => 
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const matchCount = searchQuery.trim() ? matchingMessages.length : 0;

  // Toggle search bar on Ctrl+F / Cmd+F
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Smooth scroll to the specified message card with a glowing active flash effect
  const scrollToMessage = (msgId: string) => {
    const el = document.getElementById(`msg-container-${msgId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('bg-indigo-500/10', 'dark:bg-indigo-500/10', 'ring-2', 'ring-indigo-500/40', 'scale-[1.01]', 'border-indigo-400');
      setTimeout(() => {
        el.classList.remove('bg-indigo-500/10', 'dark:bg-indigo-500/10', 'ring-2', 'ring-indigo-500/40', 'scale-[1.01]', 'border-indigo-400');
      }, 2000);
    }
  };

  // Auto-scroll to first match when query typed
  useEffect(() => {
    if (searchQuery.trim() && matchingMessages.length > 0) {
      setActiveSearchIndex(0);
      const timer = setTimeout(() => {
        scrollToMessage(matchingMessages[0].id);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const handleNextMatch = () => {
    if (matchingMessages.length === 0) return;
    const nextIdx = (activeSearchIndex + 1) % matchingMessages.length;
    setActiveSearchIndex(nextIdx);
    scrollToMessage(matchingMessages[nextIdx].id);
  };

  const handlePrevMatch = () => {
    if (matchingMessages.length === 0) return;
    const prevIdx = (activeSearchIndex - 1 + matchingMessages.length) % matchingMessages.length;
    setActiveSearchIndex(prevIdx);
    scrollToMessage(matchingMessages[prevIdx].id);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, isSending]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;
    if (isSending) return;

    onSendMessage(input, attachments, useRAG);
    setInput('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Drag and Drop File Attachments
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
      const isDocx = file.name.endsWith('.docx') || file.type.includes('word') || file.type.includes('officedocument');

      if (isImage || isPdf || isDocx) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          setAttachments(prev => [
            ...prev,
            {
              name: file.name,
              type: isImage ? file.type : (isPdf ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
              size: (file.size / 1024).toFixed(1) + ' KB',
              content: reader.result as string
            }
          ]);
        };
      } else {
        // Text / regular documents
        reader.readAsText(file);
        reader.onload = () => {
          setAttachments(prev => [
            ...prev,
            {
              name: file.name,
              type: file.type || 'text/plain',
              size: (file.size / 1024).toFixed(1) + ' KB',
              content: reader.result as string
            }
          ]);
        };
      }
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Speech Recognition (Voice Input)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.warning('Your browser does not support Web Speech API. Please try Chrome or Safari.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Copy helper
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text to Speech
  const toggleSpeech = async (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setSpeakingMsgId(null);
      return;
    }

    try {
      setSpeakingMsgId(msgId);
      
      const response = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      if (!response.ok || !data.audio) {
        throw new Error(data.error || 'TTS error');
      }

      // Play returned audio base64
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioUrl = `data:audio/mp3;base64,${data.audio}`;
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();

      audioRef.current.onended = () => {
        setSpeakingMsgId(null);
      };
    } catch (err) {
      // Fallback to browser standard speech synthesis if server-side TTS fails
      console.warn('Server TTS failed, falling back to synthesis:', err);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text.substring(0, 300)); // limit fallback length
        utterance.onend = () => setSpeakingMsgId(null);
        utterance.onerror = () => setSpeakingMsgId(null);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingMsgId(null);
      }
    }
  };

  const handleEditSave = (msgId: string) => {
    if (editText.trim()) {
      onEditMessage(msgId, editText.trim());
    }
    setEditingMsgId(null);
  };

  // Custom high-fidelity markdown renderer
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    // Split text by code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const lines = part.split('\n');
        const firstLine = lines[0].replace('```', '').trim();
        const language = firstLine || 'code';
        const code = lines.slice(1, -1).join('\n');
        const codeBlockId = `code-${index}`;

        return (
          <div key={index} className="my-4 rounded-xl overflow-hidden border border-slate-200/50 dark:border-white/5 bg-slate-950 text-slate-100 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/5 text-xs font-mono text-slate-400">
              <span className="uppercase font-bold text-indigo-400">{language}</span>
              <button
                onClick={() => handleCopy(codeBlockId, code)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                {copiedId === codeBlockId ? (
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

      // Inline formatting (bold, links, code, lists)
      let formattedText = part;

      // Escape HTML entities to prevent rendering arbitrary elements
      formattedText = formattedText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Highlight matching search query
      if (searchQuery.trim()) {
        const escapedQuery = escapeRegExp(searchQuery);
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        formattedText = formattedText.replace(regex, '<mark class="bg-amber-300/80 dark:bg-amber-400/30 text-slate-900 dark:text-amber-100 px-0.5 rounded-md font-semibold font-sans ring-1 ring-amber-400/20">$1</mark>');
      }

      // Format markdown links `[Text](URL)`
      formattedText = formattedText.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline inline-flex items-center gap-0.5">$1 <svg class="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>'
      );

      // Format bold text `**bold**`
      formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

      // Format inline code `` `code` ``
      formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">$1</code>');

      // Format paragraph bullet lists
      formattedText = formattedText.split('\n').map(line => {
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          return `<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">${line.trim().substring(2)}</li>`;
        }
        return line;
      }).join('\n');

      return (
        <span 
          key={index} 
          className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 block"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  // Export Chats Handlers
  const exportChat = (format: 'txt' | 'json' | 'pdf') => {
    if (!chat) return;

    if (format === 'pdf') {
      const doc = generateChatPDF(chat, user);
      downloadPdfDoc(doc, `${chat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-transcript.pdf`);
      setShowExportMenu(false);
      return;
    }

    let textContent = '';
    if (format === 'txt') {
      textContent = `CONVERSATION: ${chat.title}\nCREATED: ${chat.createdAt}\n\n`;
      chat.messages.forEach(msg => {
        textContent += `[${msg.role.toUpperCase()}] (${msg.createdAt})\n${msg.content}\n\n`;
      });
    } else {
      textContent = JSON.stringify(chat, null, 2);
    }

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${chat.title.toLowerCase().replace(/\s+/g, '-')}.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const handleSaveChatToGallery = () => {
    if (!chat) return;
    saveItemToGallery({
      id: `chat-${chat.id}`,
      userId: user?.id || 'guest',
      title: `Transcript: ${chat.title}`,
      type: 'chat_pdf',
      createdAt: new Date().toISOString(),
      fileSize: `${(chat.messages.length * 1.8 + 12).toFixed(1)} KB`,
      metadata: {
        description: `Exported conversation with ${chat.messages.length} messages using ${chat.model || 'Gemini 3.5'}.`,
        author: user?.name || 'User'
      }
    });
    setShareToast(true);
    setShowExportMenu(false);
    setTimeout(() => setShareToast(false), 2500);
  };

  const triggerShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  // Helper to directly download a single attachment
  const handleDownloadSingleAttachment = (file: Attachment) => {
    if (!file.content) {
      toast.warning('File content is not available for direct download.');
      return;
    }
    if (file.content.startsWith('data:') || file.content.startsWith('http') || file.content.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = file.content;
      a.download = file.name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([file.content], { type: file.type || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Calculate total media items in this conversation
  const totalMediaCount = chat?.messages.reduce((total, msg) => {
    const attCount = msg.attachments?.length || 0;
    const imgCount = msg.imageUrls?.length || 0;
    return total + attCount + imgCount;
  }, 0) || 0;

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 h-full bg-slate-50/50 dark:bg-slate-900/10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/15 mb-6">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold font-display tracking-tight text-slate-800 dark:text-slate-100 mb-1">
          Nova.ai <span className="text-indigo-600 dark:text-indigo-400 font-mono text-lg font-bold">by Shelby.ai</span>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-6">
          Start a new dynamic thread, ask complex engineering queries, compose images, or upload documents to query deep data context.
        </p>
      </div>
    );
  }

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex-1 flex flex-col h-full bg-slate-50/20 dark:bg-slate-950/20 relative"
    >
      {/* Drag and Drop Blur Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-500/10 backdrop-blur-md border-2 border-dashed border-indigo-500 rounded-2xl m-4 flex flex-col items-center justify-center gap-3 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Paperclip className="w-8 h-8 animate-bounce" />
          </div>
          <p className="font-bold text-slate-850 dark:text-slate-100">Drop files to attach to conversation</p>
          <p className="text-xs text-slate-500">Supports PDF, DOCX, Images, and Text files</p>
        </div>
      )}

      {/* Chat Workspace Header */}
      <div className="px-6 py-4 border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between glass z-10">
        <div>
          <h2 className="font-bold text-sm font-display truncate max-w-xs sm:max-w-md">{chat.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-slate-400 uppercase">Operational Node</span>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Model Selector */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => onChangeModel(e.target.value)}
              className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="chatgpt-6-astra">✨ ChatGPT-6 Astra (Omnimodal Quantum Reasoning)</option>
              <option value="gemini-3.8-flash">💡 Gemini 3.8 Flash (Fast & Responsive)</option>
              <option value="gemini-3.1-pro-preview">🧠 Gemini 3.1 Pro (Complex Reasoning)</option>
              <option value="claude-3-7-sonnet">🎭 Claude 3.7 Sonnet (Hybrid Thinking)</option>
              <option value="claude-3-5-sonnet">⚡ Claude 3.5 Sonnet (Coding & Artifacts)</option>
              <option value="grok-ai">🤖 Grok AI (Witty & Sarcastic Mode)</option>
              <option value="gork-ai">🤖 Gork AI (Chaos & Rebellious Mode)</option>
            </select>
          </div>

          {/* Share */}
          <button
            onClick={() => {
              if (onOpenShareModal && chat) {
                onOpenShareModal(chat);
              } else {
                triggerShare();
              }
            }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
            title="Share conversation link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* YouTube Video Explainer */}
          <button
            onClick={() => {
              if (onOpenShareModal && chat) {
                onOpenShareModal(chat);
              } else {
                toast.info("Watch YouTube short video explainer in the Share modal or open share link.");
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold transition-colors cursor-pointer"
            title="Watch YouTube Short Video Guide"
          >
            <Youtube className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">Video Explainer</span>
          </button>

          {/* Pricing & Upgrade Membership Button */}
          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shadow-sm shadow-amber-500/20 cursor-pointer"
              title="Upgrade Membership & Plans"
            >
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">Upgrade</span>
            </button>
          )}

          {/* Settings & Profile Button (Upper Right Navigation) */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/50 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Settings & Profile"
            >
              <Settings className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden md:inline">Settings</span>
            </button>
          )}

          {/* Sign In / Login OR Logout Button */}
          {!user ? (
            onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 cursor-pointer"
                title="Sign In or Log In"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Login</span>
              </button>
            )
          ) : (
            onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-all cursor-pointer"
                title="Log Out of your account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )
          )}

          {/* Prominent Export Button */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold transition-all shadow-sm cursor-pointer hover:shadow-md"
              title="Export Chat Transcript, Photos, Videos, PDFs, and Files"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
              {totalMediaCount > 0 && (
                <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-indigo-600 text-white font-mono font-bold">
                  {totalMediaCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-1.5 rounded-r-lg -ml-1 border-l border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 transition-colors"
              title="Quick Export Options"
            >
              <ChevronDown className="w-3 h-3" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl glass border border-slate-200 dark:border-slate-800 p-1.5 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setExportModalTab('all');
                    setShowExportMenu(false);
                    setShowExportModal(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span>Export All Media & Files...</span>
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => {
                    setExportModalTab('photos');
                    setShowExportMenu(false);
                    setShowExportModal(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <Image className="w-3.5 h-3.5 text-amber-500" />
                  <span>Export Photos & Images</span>
                </button>
                <button
                  onClick={() => {
                    setExportModalTab('videos');
                    setShowExportMenu(false);
                    setShowExportModal(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-rose-500" />
                  <span>Export Videos</span>
                </button>
                <button
                  onClick={() => {
                    setExportModalTab('documents');
                    setShowExportMenu(false);
                    setShowExportModal(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  <span>Export Documents & PDFs</span>
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => exportChat('pdf')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Download Full Chat as PDF</span>
                </button>
                <button
                  onClick={handleSaveChatToGallery}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save PDF to Gallery</span>
                </button>
                <button
                  onClick={() => exportChat('txt')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export as Plain Text</span>
                </button>
                <button
                  onClick={() => exportChat('json')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Export as JSON</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="absolute top-18 right-6 bg-emerald-500 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          📋 Link copied to your clipboard!
        </div>
      )}

      {/* Message List */}
      <div ref={messageListRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative">
        <ScrollControls containerRef={messageListRef} />
        {chat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 max-w-lg mx-auto py-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg mb-4">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold mb-2 border border-indigo-500/20 font-mono">
              <span>Shelby.ai</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span>Founder: Shivam Kumar</span>
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1">Begin Your Conversation</h3>
            <p className="text-xs text-center leading-relaxed">
              Ask questions, translate speech, upload raw source files, or try writing complex logic code to witness Nova's premium capabilities.
            </p>
          </div>
        ) : (
          chat.messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isEditing = editingMsgId === msg.id;
            const messageKey = msg.id && msg.id !== 'undefined' ? msg.id : `msg-fallback-${index}-${msg.role}`;

            return (
              <div
                key={messageKey}
                id={`msg-container-${msg.id}`}
                className={`flex gap-4 p-2.5 rounded-2xl border border-transparent transition-all duration-500 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Message Box */}
                <div className={`max-w-2xl flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Attachments panel */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {msg.attachments.map((file, idx) => {
                        const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name);
                        const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(file.name);
                        const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);

                        return (
                          <div 
                            key={idx} 
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300/40 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-300 font-mono shadow-xs group"
                          >
                            {isImg ? (
                              <Image className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            ) : isVid ? (
                              <Video className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                            ) : isPdf ? (
                              <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <span className="truncate max-w-[140px] sm:max-w-xs">{file.name}</span>
                            <span className="text-[9px] text-slate-400">({file.size})</span>
                            {file.content && (
                              <button
                                onClick={() => handleDownloadSingleAttachment(file)}
                                className="p-0.5 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer ml-0.5"
                                title={`Export / Download ${file.name}`}
                              >
                                <Download className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Container */}
                  <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                      : 'glass border border-slate-200/50 dark:border-white/5 rounded-tl-none text-slate-800 dark:text-slate-100'
                  }`}>
                    {isEditing ? (
                      <div className="w-full space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-transparent border-0 focus:outline-none text-slate-800 dark:text-slate-100 resize-none text-sm"
                          rows={3}
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setEditingMsgId(null)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditSave(msg.id)}
                            className="p-1 rounded hover:bg-indigo-500 bg-indigo-600 text-white"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      renderMarkdown(msg.content)
                    )}
                  </div>

                  {/* Grounding web search metadata links */}
                  {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase self-center mr-1">Sources:</span>
                      {msg.groundingUrls.map((urlObj, idx) => (
                        <a
                          key={idx}
                          href={urlObj.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/20 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-100 dark:border-indigo-900/30 hover:underline"
                        >
                          {urlObj.title}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Grounding Vector Database Academic Citations */}
                  {msg.ragCitations && msg.ragCitations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase self-center mr-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Grounded References:
                      </span>
                      {msg.ragCitations.map((cit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 shadow-sm"
                          title={`Semantic Similarity Match: ${(cit.score * 100).toFixed(2)}%`}
                        >
                          <span className="font-mono text-[9px] opacity-70">[{cit.category}]</span>
                          <span>{cit.title}</span>
                          <span className="font-mono text-[8px] bg-emerald-500/20 px-1 py-0.2 rounded text-emerald-700 dark:text-emerald-300">
                            {Math.round(cit.score * 100)}% Match
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Bubble Actions */}
                  <div className={`flex flex-wrap items-center gap-2 mt-2 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {/* Listen Button utilizing Web Speech API */}
                    {!isUser && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleWebSpeechPlay(msg.id, msg.content)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                            webSpeechMsgId === msg.id && webSpeechState === 'speaking'
                              ? 'bg-indigo-600 text-white hover:bg-indigo-500 animate-pulse font-bold'
                              : webSpeechMsgId === msg.id && webSpeechState === 'paused'
                              ? 'bg-amber-500 text-white hover:bg-amber-400 font-bold'
                              : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                          }`}
                          title={
                            webSpeechMsgId === msg.id
                              ? webSpeechState === 'speaking'
                                ? 'Pause narration'
                                : 'Resume narration'
                              : 'Listen to this message using Web Speech API'
                          }
                        >
                          {webSpeechMsgId === msg.id && webSpeechState === 'speaking' ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause</span>
                            </>
                          ) : webSpeechMsgId === msg.id && webSpeechState === 'paused' ? (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>

                        {/* Stop Button (only when active) */}
                        {webSpeechMsgId === msg.id && (
                          <button
                            onClick={handleWebSpeechStop}
                            className="p-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
                            title="Stop speech"
                          >
                            <Square className="w-3.5 h-3.5 fill-current" />
                          </button>
                        )}

                        {/* Voice Customizer Toggle Button */}
                        {voices.length > 0 && (
                          <div className="relative">
                            <button
                              onClick={() => setShowVoiceSettingsId(showVoiceSettingsId === msg.id ? null : msg.id)}
                              className={`p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all ${
                                showVoiceSettingsId === msg.id ? 'text-indigo-500 bg-indigo-500/10' : ''
                              }`}
                              title="Voice Settings"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                            </button>

                            {/* Voice Settings Dropdown */}
                            {showVoiceSettingsId === msg.id && (
                              <div className="absolute left-0 mt-1.5 w-60 rounded-xl glass border border-slate-200 dark:border-slate-800 p-3 shadow-xl z-50 text-slate-800 dark:text-slate-100 space-y-2.5 animate-in fade-in duration-150">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200/50 dark:border-white/5 pb-1">
                                  <span>Speech Settings</span>
                                  <button onClick={() => setShowVoiceSettingsId(null)} className="text-slate-400 hover:text-white">×</button>
                                </div>
                                
                                {/* Voice Selector */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400">Select Voice</label>
                                  <select
                                    value={speechVoice}
                                    onChange={(e) => setSpeechVoice(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-1 text-[10px] focus:outline-none text-slate-800 dark:text-slate-200"
                                  >
                                    {voices.map((v, idx) => (
                                      <option key={`${v.name}-${v.lang}-${idx}`} value={v.name}>
                                        {v.name} ({v.lang})
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Speed / Rate slider */}
                                <div className="space-y-1">
                                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                    <span>Rate (Speed)</span>
                                    <span>{speechRate}x</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={speechRate}
                                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                    className="w-full accent-indigo-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Animated waveform visualizer when active */}
                        {webSpeechMsgId === msg.id && webSpeechState === 'speaking' && (
                          <div className="flex items-center gap-0.5 h-3.5 px-1.5">
                            <span className="w-0.5 bg-indigo-500 h-2 animate-[pulse_0.4s_infinite_alternate]" />
                            <span className="w-0.5 bg-indigo-500 h-3.5 animate-[pulse_0.6s_infinite_alternate_0.15s]" />
                            <span className="w-0.5 bg-indigo-500 h-1 animate-[pulse_0.5s_infinite_alternate_0.3s]" />
                            <span className="w-0.5 bg-indigo-500 h-2.5 animate-[pulse_0.7s_infinite_alternate_0.2s]" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Compact actions container for Copy/Edit */}
                    <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/40 dark:border-white/5 rounded-full px-2 py-0.5 text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        title="Copy content"
                      >
                        {copiedId === msg.id ? (
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 px-0.5">
                            <Check className="w-3 h-3 animate-bounce" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isUser && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMsgId(msg.id);
                            setEditText(msg.content);
                          }}
                          className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                          title="Edit input"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shadow-sm flex-shrink-0 font-bold text-xs uppercase text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/55">
                    {user ? user.name.substring(0, 2) : 'U'}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Streaming Animation Card */}
        {isSending && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="max-w-2xl">
              <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-900/50 border border-slate-200/30 dark:border-white/5 rounded-tl-none">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Action Panel */}
      <div className="p-4 border-t border-slate-200/60 dark:border-white/5 glass z-10">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto space-y-3">
          {/* Real-time Message Search Bar */}
          {showSearch && (
            <div className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-950 border border-indigo-500/30 dark:border-indigo-500/20 rounded-2xl shadow-xl shadow-indigo-600/5 dark:shadow-black/40 animate-in slide-in-from-bottom-3 duration-200">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Search className="w-4 h-4 text-indigo-500 flex-shrink-0 animate-pulse" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find text inside this chat conversation (press Esc to clear)..."
                  className="w-full bg-transparent border-none outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowSearch(false);
                      setSearchQuery('');
                    }
                  }}
                />
              </div>
              
              {searchQuery.trim() && (
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/30">
                    {matchCount > 0 ? `${activeSearchIndex + 1} of ${matchCount} matches` : 'no matches'}
                  </span>
                  <div className="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2">
                    <button
                      type="button"
                      onClick={handlePrevMatch}
                      disabled={matchCount === 0}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 cursor-pointer transition-colors"
                      title="Previous match"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMatch}
                      disabled={matchCount === 0}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 cursor-pointer transition-colors"
                      title="Next match"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Close finder"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* File Tray Previews */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-white/5">
              {attachments.map((file, idx) => (
                <div key={idx} className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs pr-8 group">
                  {file.type.startsWith('image/') ? (
                    <img src={file.content} className="w-6 h-6 object-cover rounded" alt="upload-preview" />
                  ) : (
                    <FileText className="w-4 h-4 text-purple-400" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold truncate max-w-xs">{file.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{file.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(idx)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Chat Input bar */}
          <div className="relative flex items-end gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
            {/* Attachments Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              title="Upload PDF, TXT, images"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              multiple
              accept=".pdf,.docx,.txt,.json,.csv,.png,.jpg,.jpeg,.gif"
            />

            {/* Input Box */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Nova anything (e.g. 'Search for latest space discoveries', write code, summarize)..."
              rows={1}
              className="flex-1 max-h-48 py-1.5 bg-transparent border-none outline-none focus:outline-none resize-none text-sm text-slate-800 dark:text-slate-100"
              style={{ minHeight: '36px' }}
            />

            {/* Mic Toggle Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
              title="Voice typing dictation"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* In-Chat message search toggle button */}
            <button
              type="button"
              onClick={() => {
                setShowSearch(!showSearch);
                if (showSearch) setSearchQuery('');
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                showSearch 
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold ring-1 ring-indigo-500/20' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
              title="Search and find text in conversation messages (Ctrl+F)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending || (!input.trim() && attachments.length === 0)}
              className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Shortcuts info & RAG Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1.5">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setUseRAG(!useRAG)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${
                  useRAG
                    ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-700'
                }`}
                title="When enabled, queries the high-density scientific/academic vector database using RAG to ground responses."
              >
                <span className={`w-2 h-2 rounded-full ${useRAG ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                Query Universal Database
              </button>

              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Markdown and grounding fully supported.
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">
              Press Enter to send, Shift+Enter for new line
            </span>
          </div>
        </form>
      </div>

      {/* Full-featured Chat & Media Export Modal */}
      {showExportModal && (
        <ChatExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          chat={chat}
          user={user}
          onSaveToGallery={handleSaveChatToGallery}
          initialTab={exportModalTab}
        />
      )}
    </div>
  );
}
