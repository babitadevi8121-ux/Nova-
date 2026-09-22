import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Sparkles, Send, Bot, User, Trash2, Plus, 
  Check, Copy, RefreshCw, ChevronDown, ChevronUp, Cpu, 
  Flame, Radio, TrendingUp, Info, HelpCircle, Eye, EyeOff,
  CornerDownRight, Globe, MessageSquare, AlertCircle
} from 'lucide-react';
import { User as UserType, GrokChat, GrokMessage, GrokModel } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GrokAIProps {
  user: UserType | null;
  onOpenAuth?: () => void;
}

const DEFAULT_TRENDING_TOPICS = [
  { hashtag: '#AGI2026', volume: '142k posts', prompt: 'Summarize the latest leaks regarding full neural model coherence of next-gen AGI.' },
  { hashtag: '#SarcasmEngine', volume: '88k posts', prompt: 'Roast standard corporate buzzwords and explain why meetings could have been emails.' },
  { hashtag: '#RustvsCpp', volume: '112k posts', prompt: 'Create a witty, highly technical comparison between Rust memory safety and C++ manual pointers.' },
  { hashtag: '#RoomTempSuperconductors', volume: '95k posts', prompt: 'What is the absolute unfiltered truth about the recent LK-99 replica telemetry?' },
  { hashtag: '#MarsLanderTelemetry', volume: '64k posts', prompt: 'Synthesize SpaceX Starship flight test 5 propellant transfer logs in dry humor.' }
];

const FUN_STARTERS = [
  'Roast the Python global interpreter lock (GIL) in a highly sarcastic tone.',
  'Analyze the hype around metaverse vs spatial computing with zero corporate filter.',
  'Explain quantum superposition like I am a developer who only writes jQuery.',
  'Write a TypeScript API rate limiter but add overly dramatic inline warnings.'
];

export default function GrokAI({ user, onOpenAuth }: GrokAIProps) {
  // Persistence State
  const [threads, setThreads] = useState<GrokChat[]>(() => {
    const saved = localStorage.getItem('grok_threads');
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
  const [selectedModel, setSelectedModel] = useState<GrokModel>('Grok-3');
  const [funMode, setFunMode] = useState<boolean>(true);
  const [promptInput, setPromptInput] = useState('');
  
  // Loading & Interactive States
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);
  const [showXFeedPanel, setShowXFeedPanel] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('grok_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [threads, isLoading]);

  // Loading status text simulation for Grok
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % 4);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  const handleSendMessage = async (customQuery?: string) => {
    const query = customQuery || promptInput;
    if (!query.trim()) return;

    setIsLoading(true);
    setLoadingStep(0);
    setPromptInput('');

    // Create user message
    const userMessage: GrokMessage = {
      id: `grok-msg-user-${Date.now()}`,
      role: 'user',
      content: query,
      createdAt: new Date().toISOString()
    };

    let currentThreadId = activeThreadId;
    let updatedHistory: GrokMessage[] = [];

    // If no active thread, start a new one
    if (!currentThreadId) {
      const newThreadId = `thread-grok-${Math.random().toString(36).substring(7)}`;
      const newThread: GrokChat = {
        id: newThreadId,
        userId: user?.id || 'demo-user',
        title: query.substring(0, 30) + (query.length > 30 ? '...' : ''),
        model: selectedModel,
        funMode: funMode,
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
          const hist = [...t.messages, userMessage];
          updatedHistory = hist;
          return {
            ...t,
            messages: hist,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      }));
    }

    try {
      const response = await fetch('/api/grok/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-user'}`
        },
        body: JSON.stringify({
          messages: updatedHistory,
          model: selectedModel,
          funMode: funMode
        })
      });

      if (!response.ok) {
        throw new Error('Grok telemetry feed offline. Confirm model parameters.');
      }

      const data = await response.json();

      const assistantMessage: GrokMessage = {
        id: `grok-msg-gpt-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I processed your query with absolute maximum intellectual snark.',
        createdAt: new Date().toISOString(),
        thoughtProcess: data.thoughtProcess || undefined,
        simulatedXStreamLogs: data.simulatedXStreamLogs || undefined
      };

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

    } catch (err: any) {
      const errorMessage: GrokMessage = {
        id: `grok-msg-err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ [TELEMETRY_FAILURE] Grok was unable to establish connection to xAI neural arrays: ${err.message || 'Check connection logs.'}`,
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

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedId(id);
    setTimeout(() => setIsCopiedId(null), 2000);
  };

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Permanently wipe this Grok log from telemetry cache?')) {
      setThreads(prev => prev.filter(t => t.id !== id));
      if (activeThreadId === id) {
        setActiveThreadId(null);
      }
    }
  };

  // Simulated status text mapping
  const getGrokLoadingText = () => {
    const steps = [
      'Establishing quantum tunnel to xAI neural clusters...',
      'Synthesizing real-time X social posts and code commits...',
      'Bypassing standard PR guardrails and sifting telemetry...',
      'Injecting premium unfiltered Grok sarcasm engines...'
    ];
    return steps[loadingStep];
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-slate-950 text-white overflow-hidden font-sans select-none">
      
      {/* 1. Left Controls and Thread Sidebar */}
      <div className="w-full md:w-64 border-r border-emerald-500/10 bg-slate-950 flex flex-col shrink-0 h-1/4 md:h-full overflow-hidden">
        
        {/* Grok telemetry brand panel */}
        <div className="p-4 border-b border-emerald-500/10 space-y-4 bg-black shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin-slow text-emerald-400" />
              Grok.ai Telemetry
            </h3>
            <button
              onClick={() => {
                setActiveThreadId(null);
              }}
              className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 cursor-pointer transition-all active:scale-95"
              title="Reset session"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Model toggle pills */}
          <div className="grid grid-cols-2 gap-1.5">
            {(['Grok-2', 'Grok-3', 'Grok-3-DeepSearch', 'Grok-3-Fun'] as GrokModel[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedModel(m);
                  if (m === 'Grok-3-Fun') {
                    setFunMode(true);
                  }
                }}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                  selectedModel === m
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Sarcasm toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-1.5">
              <Flame className={`w-4 h-4 transition-transform ${funMode ? 'text-orange-500 animate-bounce' : 'text-slate-500'}`} />
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-wider block">Fun Mode</span>
                <span className="text-[8px] text-slate-500 block">Unfiltered Sarcasm</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFunMode(!funMode)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${funMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-200 ${funMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Saved Logs Section */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 block px-1">Active Channels</span>
          {threads.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-[9px] text-slate-500 font-mono leading-relaxed">No custom neural nodes connected. Telemetry is standard.</p>
            </div>
          ) : (
            threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-2.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all border ${
                  activeThreadId === thread.id
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold'
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60 text-emerald-500" />
                  <span className="text-xs truncate font-mono">{thread.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteThread(thread.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-opacity"
                  title="Wipe channel data"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Live X Telemetry switch */}
        <div className="p-3 border-t border-emerald-500/10 bg-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400">Live X Feed Overlay</span>
          </div>
          <button
            onClick={() => setShowXFeedPanel(!showXFeedPanel)}
            className={`p-1 rounded border transition-all cursor-pointer ${
              showXFeedPanel ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-slate-800 text-slate-500'
            }`}
          >
            {showXFeedPanel ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* 2. Main Terminal Panel / Conversation workspace */}
      <div className="flex-1 flex h-3/4 md:h-full overflow-hidden bg-slate-950 relative">
        
        {/* Chat log center */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Status bar */}
          <div className="px-6 py-3 border-b border-emerald-500/10 flex items-center justify-between bg-black shrink-0">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black text-emerald-300 font-mono tracking-widest uppercase">
                {activeThread ? 'CHANNEL_ESTABLISHED' : 'CHANNEL_IDLE'}
              </span>
              <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-mono">
                {selectedModel}
              </span>
              {funMode && (
                <span className="text-[9px] bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 rounded text-orange-400 font-mono animate-pulse">
                  🌶️ FUN_ACTIVE
                </span>
              )}
            </div>
          </div>

          {/* Dialog Log */}
          {activeThread ? (
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-950">
              {activeThread.messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    
                    {/* Bot icon */}
                    {!isUser && (
                      <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        G
                      </div>
                    )}

                    {/* Chat Bubble card */}
                    <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                      isUser
                        ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-100 font-mono text-sm'
                        : 'bg-black/40 border border-slate-900 text-slate-200'
                    }`}>
                      
                      {/* COLLAPSIBLE TELEMETRY REASONING */}
                      {msg.thoughtProcess && (
                        <div className="border border-emerald-500/20 rounded-xl bg-black/60 overflow-hidden shadow-lg">
                          <button
                            onClick={() => setExpandedThoughtId(expandedThoughtId === msg.id ? null : msg.id)}
                            className="w-full px-3 py-2 text-[10px] font-bold font-mono text-emerald-400 hover:bg-emerald-500/5 flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
                              DEEP_SEARCH_COGNITIVE_ARRAY (Reasoned logs)
                            </span>
                            {expandedThoughtId === msg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          
                          <AnimatePresence>
                            {expandedThoughtId === msg.id && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-emerald-500/10"
                              >
                                <p className="p-3 font-mono text-[9px] text-slate-400 leading-relaxed whitespace-pre-wrap bg-slate-950">
                                  {msg.thoughtProcess}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Content block */}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap select-text font-sans">
                        {msg.content}
                      </p>

                      {/* Render simulated X stream citations if they exist */}
                      {msg.simulatedXStreamLogs && msg.simulatedXStreamLogs.length > 0 && (
                        <div className="pt-3 border-t border-slate-900 space-y-2">
                          <span className="text-[10px] font-black font-mono text-emerald-500/80 block">Simulated real-time social telemetry:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.simulatedXStreamLogs.map((log, lIdx) => (
                              <div key={lIdx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                                <div className="flex items-center justify-between text-[9px] font-mono">
                                  <span className="text-emerald-400 font-bold">{log.handle}</span>
                                  <span className="text-slate-500">{log.timestamp}</span>
                                </div>
                                <p className="text-[10.5px] text-slate-300 italic font-sans leading-normal">
                                  "{log.text}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Copy actions */}
                      <div className="flex items-center justify-end text-[10px] text-slate-500 mt-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="hover:text-slate-300 p-1 rounded hover:bg-white/5 flex items-center gap-1 cursor-pointer font-mono"
                        >
                          {isCopiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {isCopiedId === msg.id ? 'Copied' : 'Copy log'}
                        </button>
                      </div>

                    </div>

                    {/* User avatar icon */}
                    {isUser && (
                      <div className="w-8 h-8 rounded-lg bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-emerald-400">
                        U
                      </div>
                    )}

                  </div>
                );
              })}
              
              {/* Telemetry Scanning Loading view */}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-emerald-400 animate-pulse">
                    ...
                  </div>
                  <div className="bg-black/30 border border-slate-900 p-4 rounded-2xl max-w-[80%] space-y-2.5 shadow-lg">
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                      {getGrokLoadingText()}
                    </span>
                    <div className="h-1 w-44 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full animate-progress" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            // CYBERNETIC UNFILTERED LANDING PAGE
            <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-6 py-12 bg-slate-950">
              <div className="max-w-xl text-center space-y-8">
                
                {/* Visual Header */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 rounded-full text-[10px] font-black tracking-widest font-mono uppercase animate-pulse">
                    <Radio className="w-3.5 h-3.5" />
                    SYSTEM_ACTIVE: GROK_INTELLIGENCE_ROUTING
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white font-display uppercase">
                    Grok<span className="text-emerald-400">.ai</span>
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400 max-w-sm mx-auto font-mono">
                    Witty, sarcastic, and razor-sharp. Explore technical concepts with maximum truth and zero corporate filler.
                  </p>
                </div>

                {/* Starters list */}
                <div className="space-y-3 text-left">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 flex items-center gap-1.5 font-mono">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Wreak havoc / Roast starters
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {FUN_STARTERS.map((text, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(text)}
                        className="p-3 rounded-xl border border-slate-900 bg-slate-900/40 hover:bg-emerald-950/20 hover:border-emerald-500/30 text-left text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer font-mono"
                      >
                        <span className="truncate pr-4">{text}</span>
                        <CornerDownRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-emerald-400 shrink-0 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Cyber input block */}
          <div className="p-4 border-t border-emerald-500/10 bg-black shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="max-w-4xl mx-auto flex gap-3 relative"
            >
              <div className="absolute left-3.5 top-3.5 text-emerald-400 select-none font-mono text-sm">{'>'}</div>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={`Ask Grok (or Gork) anything unfiltered...`}
                disabled={isLoading}
                className="w-full pl-8 pr-12 py-3 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-slate-600"
              />
              <button
                type="submit"
                disabled={isLoading || !promptInput.trim()}
                className="absolute right-2 top-2 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* 3. Simulated X Stream Trending section on Right (Slide-out/collapsible) */}
        <AnimatePresence>
          {showXFeedPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:flex flex-col h-full border-l border-emerald-500/10 bg-black shrink-0 overflow-hidden"
            >
              {/* Panel Header */}
              <div className="p-4 border-b border-emerald-500/10 flex items-center justify-between shrink-0 bg-slate-950">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-black font-mono tracking-wider text-white">X STREAM TRENDS</span>
                </div>
              </div>

              {/* Scrolling trend logs */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-850 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>REAL-TIME GRAPH CORPUS</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Trends are updated with current technical stream telemetry. Click a trending topic to ingest and dialog.
                  </p>
                </div>

                <div className="space-y-2">
                  {DEFAULT_TRENDING_TOPICS.map((topic, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => handleSendMessage(topic.prompt)}
                      className="w-full p-2.5 rounded-xl border border-slate-900 bg-slate-900/20 hover:bg-emerald-950/10 hover:border-emerald-500/20 text-left transition-all group flex flex-col gap-1 cursor-pointer"
                    >
                      <span className="text-xs font-bold text-emerald-400 group-hover:underline block truncate font-mono">
                        {topic.hashtag}
                      </span>
                      <span className="text-[9px] text-slate-500 block">
                        {topic.volume}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-emerald-500/10 text-center bg-slate-950 shrink-0">
                <span className="text-[9px] font-mono text-emerald-500/50">SIGNAL INTEGRITY: 99.8%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
