import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Sparkles, Send, Bot, User, Code, FileText, Image as ImageIcon, 
  BookOpen, Edit3, Trash2, Plus, CornerDownRight, Layers, Eye, Code2, Copy, 
  Check, Mic, MicOff, Volume2, X, ChevronDown, ChevronUp, Maximize2, Minimize2,
  Smartphone, Monitor, Play, RefreshCw, PenTool, HelpCircle, Terminal, HelpCircle as HelpIcon
} from 'lucide-react';
import { User as UserType, OpenAIChat, OpenAIMessage, OpenAIModel, CustomGPT } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface OpenAIProps {
  user: UserType | null;
  onOpenAuth?: () => void;
}

const CUSTOM_GPTS: CustomGPT[] = [
  {
    id: 'astra',
    name: 'ChatGPT 6 Astra',
    description: 'Frontier omnimodal reasoning, continuous agentic reasoning & quantum synthesis.',
    icon: 'Sparkles',
    greeting: 'Welcome to ChatGPT 6 Astra. Omnimodal frontier reasoning and autonomous execution are active. How can I assist you?',
    systemPrompt: 'You are ChatGPT-6 Astra, OpenAI\'s premier next-generation flagship AI architecture featuring deep omnimodal reasoning, continuous chain of thought, ultra-dense coding precision, and autonomous execution capabilities.'
  },
  {
    id: 'general',
    name: 'ChatGPT 4o',
    description: 'Our most versatile and intelligent model for everyday tasks.',
    icon: 'Bot',
    greeting: 'How can I help you realize your vision today?',
    systemPrompt: 'You are ChatGPT, a general-purpose helpful AI assistant.'
  },
  {
    id: 'dalle',
    name: 'DALL·E Image Maker',
    description: 'Transform your concepts into high-fidelity mockups & graphics.',
    icon: 'ImageIcon',
    greeting: 'Describe the masterpiece you want to design. I will generate detailed layout prompts & SVGs!',
    systemPrompt: 'You are DALL-E, a creative graphic and visual assistant.'
  },
  {
    id: 'coder',
    name: 'Code Copilot',
    description: 'Write, debug, and optimize full-stack components side-by-side.',
    icon: 'Code',
    greeting: 'Paste your code or describe a feature. I will structure it inside the Canvas!',
    systemPrompt: 'You are Code Copilot, a senior software architect.'
  },
  {
    id: 'writer',
    name: 'Creative Writer',
    description: 'Polish articles, blogs, copy, and scripts with premium editing.',
    icon: 'PenTool',
    greeting: 'What are we drafting today? I can write prose, documentation, or marketing copy.',
    systemPrompt: 'You are Creative Writer, an expert editor and novelist.'
  }
];

export default function OpenAI({ user, onOpenAuth }: OpenAIProps) {
  // Persistence State
  const [threads, setThreads] = useState<OpenAIChat[]>(() => {
    const saved = localStorage.getItem('openai_threads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<OpenAIModel>('chatgpt-6-astra');
  const [selectedGptId, setSelectedGptId] = useState<string>('astra');
  const [promptInput, setPromptInput] = useState('');
  
  // Canvas Side Panel State
  const [canvasContent, setCanvasContent] = useState<string | null>(null);
  const [canvasLanguage, setCanvasLanguage] = useState<string>('typescript');
  const [canvasTitle, setCanvasTitle] = useState<string>('untitled-script.ts');
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [canvasTab, setCanvasTab] = useState<'code' | 'preview'>('code');

  // Interactive Voice Mode State
  const [voiceModeActive, setVoiceModeActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'connecting' | 'listening' | 'speaking' | 'muted'>('connecting');
  const [voiceSubtitle, setVoiceSubtitle] = useState('');
  const [voiceWaveform, setVoiceWaveform] = useState<number[]>(Array(15).fill(10));

  // Loading, Copy & Scroll States
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCanvas, setCopiedCanvas] = useState(false);
  const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('openai_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [threads, isLoading]);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  // Voice mode audio wave animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (voiceModeActive) {
      interval = setInterval(() => {
        setVoiceWaveform(prev => prev.map(() => Math.floor(Math.random() * 60) + 10));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [voiceModeActive]);

  // Launch Advanced Voice Simulation
  const handleStartVoice = () => {
    setVoiceModeActive(true);
    setVoiceStatus('connecting');
    setVoiceSubtitle('Connecting to OpenAI Ultra-low latency voice cluster...');
    
    setTimeout(() => {
      setVoiceStatus('listening');
      setVoiceSubtitle('Listening... Talk to ChatGPT');
    }, 2000);
  };

  const handleVoiceSpeakDemo = () => {
    setVoiceStatus('speaking');
    setVoiceSubtitle('ChatGPT: "I am ready to help you coordinate. I can design apps, draft copy, or help you debug your typescript server. What should we tackle?"');
    setTimeout(() => {
      setVoiceStatus('listening');
      setVoiceSubtitle('Listening... Say something');
    }, 6000);
  };

  const handleSendMessage = async (customQuery?: string) => {
    const query = customQuery || promptInput;
    if (!query.trim()) return;

    setIsLoading(true);
    setPromptInput('');

    const activeGpt = CUSTOM_GPTS.find(g => g.id === selectedGptId);

    // 1. Create message item
    const userMessage: OpenAIMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: query,
      createdAt: new Date().toISOString()
    };

    let currentThreadId = activeThreadId;
    let updatedHistory: OpenAIMessage[] = [];

    if (!currentThreadId) {
      // First turn: create new thread
      const newThreadId = `thread-openai-${Math.random().toString(36).substring(7)}`;
      const newThread: OpenAIChat = {
        id: newThreadId,
        userId: user?.id || 'demo-id',
        title: query.substring(0, 32) + (query.length > 32 ? '...' : ''),
        model: selectedModel,
        selectedGptId: selectedGptId,
        messages: [userMessage],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThreadId);
      currentThreadId = newThreadId;
      updatedHistory = [userMessage];
    } else {
      // Append to active thread
      setThreads(prev => prev.map(t => {
        if (t.id === currentThreadId) {
          updatedHistory = [...t.messages, userMessage];
          return {
            ...t,
            messages: updatedHistory,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      }));
    }

    try {
      // Call backend api
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-id'}`
        },
        body: JSON.stringify({
          messages: updatedHistory,
          model: selectedModel,
          selectedGptId: selectedGptId !== 'general' ? selectedGptId : undefined
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI dispatch failed. Please confirm model parameters.');
      }

      const data = await response.json();

      const assistantMessage: OpenAIMessage = {
        id: `msg-gpt-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I completed your requested layout synthesis.',
        createdAt: new Date().toISOString(),
        thoughtProcess: data.thoughtProcess || undefined,
        canvasCode: data.canvasCode || undefined,
        canvasLanguage: data.canvasLanguage || undefined
      };

      // Update thread with response
      setThreads(prev => prev.map(t => {
        if (t.id === currentThreadId) {
          return {
            ...t,
            title: data.title ? data.title : t.title,
            messages: [...t.messages, assistantMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      }));

      // If Canvas returned, open side panel!
      if (data.canvasCode) {
        setCanvasContent(data.canvasCode);
        setCanvasLanguage(data.canvasLanguage || 'typescript');
        setCanvasTitle(`canvas-${selectedGptId}-${Date.now().toString().substring(8)}.${data.canvasLanguage === 'typescript' ? 'tsx' : 'md'}`);
        setCanvasOpen(true);
      }

    } catch (err: any) {
      const errorMessage: OpenAIMessage = {
        id: `msg-gpt-err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Failed to connect with ChatGPT clusters: ${err.message || 'Server timeout. Check network configuration.'}`,
        createdAt: new Date().toISOString()
      };
      setThreads(prev => prev.map(t => {
        if (t.id === currentThreadId) {
          return {
            ...t,
            messages: [...t.messages, errorMessage]
          };
        }
        return t;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCanvas = () => {
    if (!canvasContent) return;
    navigator.clipboard.writeText(canvasContent);
    setCopiedCanvas(true);
    setTimeout(() => setCopiedCanvas(false), 2000);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedId(id);
    setTimeout(() => setIsCopiedId(null), 2000);
  };

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to discard this ChatGPT history?')) {
      setThreads(prev => prev.filter(t => t.id !== id));
      if (activeThreadId === id) {
        setActiveThreadId(null);
        setCanvasOpen(false);
      }
    }
  };

  // Curated prompts based on Custom GPT selected
  const getGptStarters = () => {
    switch (selectedGptId) {
      case 'astra':
        return [
          'Deploy an autonomous multi-agent pipeline orchestrating real-time edge processing.',
          'Formulate deep omnimodal reasoning across complex mathematical algorithms & quantum theory.',
          'Generate a production-grade distributed consensus state machine with Canvas code.'
        ];
      case 'dalle':
        return [
          'Design an elegant, dark SaaS landing page layout for an autonomous agent dashboard.',
          'Generate a premium vector logo SVG with emerald and gold gradients.',
        ];
      case 'coder':
        return [
          'Write a production-ready Express middleware with JWT verification & rate-limiting.',
          'Build a custom React hook to sync complex state with IndexedDB.',
        ];
      case 'writer':
        return [
          'Draft a high-converting landing page headline & copy for a high-performance database.',
          'Compose a beautiful, informative introduction explaining quantum computing entanglement.',
        ];
      default:
        return [
          'Analyze the trade-offs of deploying serverless edge functions vs cold containers.',
          'Write a comprehensive overview of how OpenAI Canvas enhances developer workflows.',
        ];
    }
  };

  // Helper to format/color canvas preview code or markdown
  const renderCanvasPreview = () => {
    if (!canvasContent) return null;

    if (canvasLanguage === 'markdown' || canvasTab === 'preview') {
      // Render clean markdown visual cards
      const paras = canvasContent.split('\n\n');
      return (
        <div className="p-6 space-y-4 max-w-2xl mx-auto text-slate-800 dark:text-slate-200">
          {paras.map((p, i) => {
            if (p.startsWith('# ')) return <h1 key={i} className="text-3xl font-black font-display tracking-tight border-b pb-2">{p.replace('# ', '')}</h1>;
            if (p.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold font-display tracking-tight mt-6">{p.replace('## ', '')}</h2>;
            if (p.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold font-display mt-4">{p.replace('### ', '')}</h3>;
            if (p.startsWith('- ')) {
              return (
                <ul key={i} className="list-disc pl-5 space-y-1 my-2">
                  {p.split('\n').map((li, j) => <li key={j}>{li.replace('- ', '')}</li>)}
                </ul>
              );
            }
            return <p key={i} className="leading-relaxed text-sm md:text-base">{p}</p>;
          })}
        </div>
      );
    }

    // Code rendering with simulated highlight tags
    const lines = canvasContent.split('\n');
    return (
      <div className="font-mono text-xs p-4 overflow-x-auto space-y-1 bg-slate-900 text-slate-300 h-full">
        {lines.map((line, idx) => {
          // Add basic dynamic colors for typescript keywords
          let highlighted = line;
          const keywords = ['const', 'import', 'export', 'function', 'return', 'let', 'type', 'interface', 'from', 'await', 'async'];
          keywords.forEach(kw => {
            const reg = new RegExp(`\\b${kw}\\b`, 'g');
            highlighted = highlighted.replace(reg, `<span class="text-pink-400 font-semibold">${kw}</span>`);
          });
          // strings
          highlighted = highlighted.replace(/(['"`])(.*?)\1/g, '<span class="text-emerald-400">$&</span>');
          // comments
          if (highlighted.trim().startsWith('//')) {
            highlighted = `<span class="text-slate-500 italic">${highlighted}</span>`;
          }

          return (
            <div key={idx} className="flex hover:bg-slate-800/50 py-0.5 px-1 rounded">
              <span className="w-8 shrink-0 text-slate-600 text-right pr-3 select-none font-sans text-[10px]">{idx + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
            </div>
          );
        })}
      </div>
    );
  };

  const activeGpt = CUSTOM_GPTS.find(g => g.id === selectedGptId) || CUSTOM_GPTS[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-slate-900 text-white overflow-hidden font-sans">
      
      {/* 1. Left Control Panel Sidebar */}
      <div className="w-full md:w-64 border-r border-white/5 bg-slate-950 flex flex-col shrink-0 h-1/4 md:h-full overflow-hidden">
        
        {/* Model Switcher & New thread */}
        <div className="p-4 border-b border-white/5 space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              OpenAI Engine
            </h3>
            <button
              onClick={() => {
                setActiveThreadId(null);
                setCanvasOpen(false);
                setCanvasContent(null);
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-indigo-400 cursor-pointer transition-all"
              title="New chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Premium Model pills */}
          <div className="space-y-1.5">
            {/* Flagship ChatGPT 6 Astra Highlight Button */}
            <button
              onClick={() => setSelectedModel('chatgpt-6-astra')}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                selectedModel === 'chatgpt-6-astra'
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-violet-500/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-300 animate-pulse" />
                <span>ChatGPT 6 Astra</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                Flagship
              </span>
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              {(['gpt-4o', 'o1-pro', 'o3-mini', 'gpt-4-turbo'] as OpenAIModel[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    selectedModel === m
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom GPT selector list */}
        <div className="p-3 border-b border-white/5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block px-1">Custom GPTs</span>
          <div className="space-y-1">
            {CUSTOM_GPTS.map((g) => {
              const isActive = selectedGptId === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGptId(g.id);
                    setActiveThreadId(null); // start fresh
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-medium border border-white/10'
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isActive ? 'bg-indigo-600/20 text-indigo-400' : 'bg-white/5'
                  }`}>
                    {g.icon === 'Sparkles' && <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />}
                    {g.icon === 'Bot' && <Bot className="w-4 h-4" />}
                    {g.icon === 'ImageIcon' && <ImageIcon className="w-4 h-4" />}
                    {g.icon === 'Code' && <Code className="w-4 h-4" />}
                    {g.icon === 'PenTool' && <PenTool className="w-4 h-4" />}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold block truncate">{g.name}</span>
                    <span className="text-[9px] text-slate-500 block truncate">{g.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* History of Saved OpenAI Threads */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block px-1 mb-1">Recent Chats</span>
          {threads.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-[10px] text-slate-500">Your conversation threads will persist securely here.</p>
            </div>
          ) : (
            threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => {
                  setActiveThreadId(thread.id);
                  // Load canvas if thread had code in last message
                  const lastAssistantMsg = [...thread.messages].reverse().find(m => m.role === 'assistant' && m.canvasCode);
                  if (lastAssistantMsg && lastAssistantMsg.canvasCode) {
                    setCanvasContent(lastAssistantMsg.canvasCode);
                    setCanvasLanguage(lastAssistantMsg.canvasLanguage || 'typescript');
                    setCanvasOpen(true);
                  } else {
                    setCanvasOpen(false);
                  }
                }}
                className={`p-2 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                  activeThreadId === thread.id
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-medium'
                    : 'hover:bg-white/5 text-slate-400 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  <span className="text-xs truncate">{thread.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteThread(thread.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-opacity"
                  title="Discard Chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Advanced Voice activation entry */}
        <div className="p-3 border-t border-white/5 bg-slate-950 shrink-0">
          <button
            onClick={handleStartVoice}
            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 transition-all active:scale-95 cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 animate-pulse" />
            Advanced Voice Mode
          </button>
        </div>

      </div>

      {/* 2. Main Workspace (Side-by-Side Split if Canvas open) */}
      <div className="flex-1 flex h-3/4 md:h-full overflow-hidden bg-slate-900 relative">
        
        {/* Left Side: Conversation Chat pane */}
        <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${
          canvasOpen ? 'md:max-w-[50%]' : 'w-full'
        }`}>
          
          {/* Thread header info */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{activeGpt.name}</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-400">{selectedModel}</span>
            </div>
            
            {canvasContent && (
              <button
                onClick={() => setCanvasOpen(!canvasOpen)}
                className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                {canvasOpen ? 'Hide Side Canvas' : 'Show Side Canvas'}
              </button>
            )}
          </div>

          {/* Message log */}
          {activeThread ? (
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {activeThread.messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    
                    {/* Bot avatar */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 text-white">
                        GPT
                      </div>
                    )}

                    {/* Chat bubble body */}
                    <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                      isUser
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'bg-white/5 border border-white/5 text-slate-200'
                    }`}>
                      
                      {/* COLLAPSIBLE REASONING BLOCK */}
                      {msg.thoughtProcess && (
                        <div className="border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                          <button
                            onClick={() => setExpandedThoughtId(expandedThoughtId === msg.id ? null : msg.id)}
                            className="w-full px-3 py-2 text-[11px] font-bold text-indigo-400 hover:bg-white/5 flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5" />
                              Thought process (Reasoned for 8 seconds)
                            </span>
                            {expandedThoughtId === msg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          
                          <AnimatePresence>
                            {expandedThoughtId === msg.id && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-white/5"
                              >
                                <p className="p-3 font-mono text-[10px] text-slate-400 leading-relaxed whitespace-pre-wrap">
                                  {msg.thoughtProcess}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Primary Text Content */}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap select-text">
                        {msg.content}
                      </p>

                      {/* If message had a canvas object */}
                      {msg.canvasCode && (
                        <div className="mt-3 p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-indigo-400" />
                            <div>
                              <span className="text-xs font-bold text-white block">Interactive Canvas Generated</span>
                              <span className="text-[10px] text-slate-400 block">{msg.canvasLanguage || 'Source code'} updated</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setCanvasContent(msg.canvasCode || null);
                              setCanvasLanguage(msg.canvasLanguage || 'typescript');
                              setCanvasOpen(true);
                            }}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                          >
                            Launch Side Editor
                          </button>
                        </div>
                      )}

                      {/* Footer actions */}
                      <div className="flex items-center gap-2 justify-end text-[10px] text-slate-500 mt-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="hover:text-slate-300 p-1 rounded hover:bg-white/5 flex items-center gap-1 cursor-pointer"
                        >
                          {isCopiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {isCopiedId === msg.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>

                    </div>

                    {/* User avatar */}
                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-900/40 flex items-center justify-center font-bold text-xs shrink-0 text-indigo-400 border border-indigo-500/20">
                        U
                      </div>
                    )}

                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                    ...
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl max-w-[80%] space-y-2">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                      ChatGPT is coordinating layout and canvas states...
                    </span>
                    <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full animate-progress" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            // LANDING ONBOARDING PAGE FOR CHATGPT
            <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-6 py-12">
              <div className="max-w-xl text-center space-y-8">
                
                {/* Brand Logo & Intro */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold tracking-wider font-mono uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ultra-Intelligence Workspace
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-display">
                    ChatGPT Canvas
                  </h1>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">
                    Configure code, stories, and images on a side-by-side interactive editor.
                  </p>
                </div>

                {/* Starters list based on GPT selected */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center justify-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-indigo-400" />
                    Coordinate with {activeGpt.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {getGptStarters().map((startText, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(startText)}
                        className="p-3.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-indigo-500/40 text-left text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-4">{startText}</span>
                        <CornerDownRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Chat input box */}
          <div className="p-4 border-t border-white/5 bg-slate-950 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="max-w-4xl mx-auto flex gap-3 relative"
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={`Message ${activeGpt.name}...`}
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/10 bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !promptInput.trim()}
                className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-slate-600 text-white rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Interactive Side Canvas (Side-by-side) */}
        <AnimatePresence>
          {canvasOpen && canvasContent && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '50%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden md:flex flex-col h-full border-l border-white/10 bg-slate-950"
            >
              {/* Canvas header */}
              <div className="px-4 py-3 border-b border-white/5 bg-slate-900 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white truncate">{canvasTitle}</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-mono">
                    {canvasLanguage}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Tab switches */}
                  <div className="flex items-center bg-white/5 rounded-lg p-0.5 shrink-0">
                    <button
                      onClick={() => setCanvasTab('code')}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        canvasTab === 'code' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Code
                    </button>
                    <button
                      onClick={() => setCanvasTab('preview')}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        canvasTab === 'preview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={handleCopyCanvas}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedCanvas ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setCanvasOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                    title="Minimize Canvas"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Canvas Content Panel */}
              <div className="flex-1 overflow-y-auto bg-slate-950/40">
                {renderCanvasPreview()}
              </div>

              {/* Canvas footer controls */}
              <div className="p-3 border-t border-white/5 bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
                <span>Collaborating in real-time</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Canvas v1.0
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 3. Advanced Voice Mode Modal / Simulation */}
      <AnimatePresence>
        {voiceModeActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col justify-between p-8"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Advanced Voice Mode (Simulated)
                </span>
              </div>
              <button
                onClick={() => setVoiceModeActive(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pulsing Visual Waveform in Center */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
              <div className="relative">
                <div className="absolute -inset-12 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Visual Circle Waveform */}
                <div className="w-48 h-48 rounded-full border border-white/10 bg-gradient-to-tr from-indigo-900/50 via-slate-950 to-emerald-950/40 flex items-center justify-center relative overflow-hidden">
                  <div className="flex items-end gap-1.5">
                    {voiceWaveform.map((height, wIdx) => (
                      <motion.div
                        key={wIdx}
                        animate={{ height: height }}
                        className={`w-1.5 rounded-full ${
                          voiceStatus === 'speaking' ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' :
                          voiceStatus === 'listening' ? 'bg-gradient-to-t from-indigo-500 to-indigo-400' :
                          'bg-slate-600'
                        }`}
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status details & live subtitles */}
              <div className="max-w-xl text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  {voiceStatus === 'connecting' && 'Connecting...'}
                  {voiceStatus === 'listening' && 'Listening'}
                  {voiceStatus === 'speaking' && 'Speaking (ChatGPT)'}
                  {voiceStatus === 'muted' && 'Muted'}
                </span>
                
                <p className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed min-h-[60px]">
                  {voiceSubtitle}
                </p>
              </div>
            </div>

            {/* Bottom voice control bar */}
            <div className="flex flex-col items-center gap-6">
              
              {voiceStatus === 'listening' && (
                <button
                  onClick={handleVoiceSpeakDemo}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-white/5 active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  Trigger Sample ChatGPT Response
                </button>
              )}

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (voiceStatus === 'muted') {
                      setVoiceStatus('listening');
                      setVoiceSubtitle('Listening... Say something');
                    } else {
                      setVoiceStatus('muted');
                      setVoiceSubtitle('Voice mode paused.');
                    }
                  }}
                  className={`p-4 rounded-full border transition-all cursor-pointer ${
                    voiceStatus === 'muted'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title={voiceStatus === 'muted' ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {voiceStatus === 'muted' ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <button
                  onClick={() => setVoiceModeActive(false)}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm rounded-full tracking-wider uppercase shadow-lg shadow-red-600/20 cursor-pointer"
                >
                  End Voice Session
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
