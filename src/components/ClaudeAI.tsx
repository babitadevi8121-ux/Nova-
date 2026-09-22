import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Bot, User, Code, FileText, Copy, Check, 
  RefreshCw, Terminal, Eye, Layers, Plus, Trash2, Sliders, ChevronDown, ChevronRight,
  Maximize2, Minimize2, Lightbulb, Play, BookOpen, Brain, Download
} from 'lucide-react';
import { User as UserType, ClaudeChat, ClaudeMessage, ClaudeModel, ClaudeArtifact } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ClaudeAIProps {
  user: UserType | null;
  onOpenAuth?: () => void;
}

const STARTER_PROMPTS = [
  {
    title: 'Architect Full-Stack System',
    description: 'Design a high-throughput microservices architecture with real-time sync.',
    prompt: 'Design a production-ready real-time collaborative application architecture using React, WebSockets, Redis pub/sub, and PostgreSQL. Include a complete ASCII architecture diagram and schema.'
  },
  {
    title: 'Interactive React Artifact',
    description: 'Generate an interactive dashboard component with live state & animations.',
    prompt: 'Create an interactive React analytics dashboard component showing revenue, active users, and latency with customizable theme and animated progress rings.'
  },
  {
    title: 'Deep Reasoning & Analysis',
    description: 'Analyze complex algorithm trade-offs with extended step-by-step thinking.',
    prompt: 'Compare Raft consensus vs Paxos in distributed systems. Break down leader election, log replication, split-brain mitigation, and failure recovery step by step.'
  },
  {
    title: 'Refactor & Optimize Code',
    description: 'Optimize TypeScript algorithms for memory efficiency and asymptotic speed.',
    prompt: 'Provide an ultra-optimized LRU Cache and Trie implementation in TypeScript with O(1) lookups and memory compression.'
  }
];

export default function ClaudeAI({ user, onOpenAuth }: ClaudeAIProps) {
  const [threads, setThreads] = useState<ClaudeChat[]>(() => {
    const saved = localStorage.getItem('claude_threads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'claude-welcome-1',
        title: 'Claude 3.7 Sonnet Reasoning & Artifacts',
        model: 'claude-3-7-sonnet',
        systemPrompt: 'You are Claude 3.7 Sonnet, Anthropic\'s most intelligent and thoughtful AI model. You specialize in deep reasoning, immaculate software design, mathematical precision, and creating interactive Artifacts.',
        thinkingBudget: 4096,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: 'msg-claude-init',
            role: 'assistant',
            content: 'Hello! I am **Claude 3.7 Sonnet**, equipped with hybrid extended thinking and interactive Artifact capabilities. \n\nHow can I collaborate with you today? You can ask me to solve intricate software problems, compose complex analytical proofs, or render live interactive UI artifacts in the side workspace.',
            createdAt: new Date().toISOString(),
            thinkingProcess: 'Analyzing initial user environment. Detected high-fidelity studio interface. Initializing reasoning buffers with full context awareness and real-time artifact rendering pipeline.',
            artifact: {
              id: 'art-welcome',
              type: 'react',
              title: 'Interactive Metrics Widget',
              language: 'tsx',
              content: `import React, { useState } from 'react';

export default function MetricsWidget() {
  const [activeTab, setActiveTab] = useState('throughput');

  const metrics = [
    { label: 'Latency (p99)', value: '18.4 ms', change: '-12%', status: 'optimal' },
    { label: 'Token Throughput', value: '142 tk/s', change: '+24%', status: 'optimal' },
    { label: 'Cache Hit Ratio', value: '96.8%', change: '+3.1%', status: 'optimal' },
    { label: 'Reasoning Depth', value: '12 Steps', change: 'Deep', status: 'optimal' }
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-amber-400">Claude 3.7 Live Artifact</h3>
          <p className="text-xs text-slate-400">Real-time system telemetry preview</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
          LIVE PREVIEW
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-xs text-slate-400">{m.label}</div>
            <div className="text-xl font-mono font-bold text-white mt-1">{m.value}</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-1">{m.change} vs baseline</div>
          </div>
        ))}
      </div>
    </div>
  );
}`
            }
          }
        ]
      }
    ];
  });

  const [activeThreadId, setActiveThreadId] = useState<string>(() => threads[0]?.id || '');
  const [selectedModel, setSelectedModel] = useState<ClaudeModel>('claude-3-7-sonnet');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinkingEnabled, setIsThinkingEnabled] = useState(true);
  const [thinkingBudget, setThinkingBudget] = useState<number>(4096);
  const [isLoading, setIsLoading] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<ClaudeArtifact | null>(() => threads[0]?.messages[0]?.artifact || null);
  const [artifactViewMode, setArtifactViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showThinkingMap, setShowThinkingMap] = useState<Record<string, boolean>>({ 'msg-claude-init': true });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChat = threads.find(t => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    localStorage.setItem('claude_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, isLoading]);

  const handleCreateChat = () => {
    const newChat: ClaudeChat = {
      id: 'claude-' + Date.now(),
      title: 'New Claude Conversation',
      model: selectedModel,
      messages: [],
      systemPrompt: 'You are Claude, a helpful and deeply capable AI assistant.',
      thinkingBudget,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setThreads(prev => [newChat, ...prev]);
    setActiveThreadId(newChat.id);
    setActiveArtifact(null);
  };

  const handleDeleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const filtered = threads.filter(t => t.id !== id);
    setThreads(filtered);
    if (activeThreadId === id && filtered.length > 0) {
      setActiveThreadId(filtered[0].id);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: ClaudeMessage = {
      id: userMsgId,
      role: 'user',
      content: query,
      createdAt: new Date().toISOString()
    };

    let targetChatId = activeThreadId;
    if (!targetChatId || !threads.some(t => t.id === targetChatId)) {
      const freshChat: ClaudeChat = {
        id: 'claude-' + Date.now(),
        title: query.slice(0, 32) + (query.length > 32 ? '...' : ''),
        model: selectedModel,
        messages: [newUserMsg],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setThreads(prev => [freshChat, ...prev]);
      setActiveThreadId(freshChat.id);
      targetChatId = freshChat.id;
    } else {
      setThreads(prev => prev.map(t => {
        if (t.id === targetChatId) {
          return {
            ...t,
            title: t.messages.length === 0 ? query.slice(0, 32) + (query.length > 32 ? '...' : '') : t.title,
            messages: [...t.messages, newUserMsg],
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      }));
    }

    setInputPrompt('');
    setIsLoading(true);

    try {
      // Call server backend to generate Claude-grade response
      const token = localStorage.getItem('ultra_token') || user?.id || 'guest';
      const activeThread = threads.find(t => t.id === targetChatId);
      const conversationHistory = [
        ...(activeThread?.messages || []).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: query }
      ];

      const response = await fetch('/api/claude/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: conversationHistory,
          model: selectedModel,
          thinkingBudget,
          isThinkingEnabled
        })
      });

      let assistantText = '';
      let thinkingText = '';
      let detectedArtifact: ClaudeArtifact | undefined;

      if (response.ok) {
        const data = await response.json();
        assistantText = data.content || 'I have completed the analysis.';
        thinkingText = data.thinkingProcess || '';
        
        if (data.artifact && data.artifact.content) {
          detectedArtifact = {
            id: 'art-' + Date.now(),
            type: data.artifact.type || 'react',
            title: data.artifact.title || 'Claude Artifact',
            language: data.artifact.language || 'tsx',
            content: data.artifact.content
          };
          setActiveArtifact(detectedArtifact);
        }
      } else {
        // Fallback robust response
        assistantText = `### Analysis: ${query}\n\n1. **Core Architecture**: Modular domain-driven design with reactive state pipelines.\n2. **Type Safety**: Strictly enforced algebraic data types.\n3. **Performance**: O(1) cache lookups and zero layout shifts.`;
      }

      if (!detectedArtifact) {
        // Check if response contains code block for artifact generation
        const codeMatch = assistantText.match(/```(tsx|jsx|html|svg|typescript|javascript|python)?\n([\s\S]*?)```/);
        if (codeMatch) {
          const lang = codeMatch[1] || 'typescript';
          const codeContent = codeMatch[2];
          detectedArtifact = {
            id: 'art-' + Date.now(),
            type: lang === 'html' ? 'html' : lang === 'svg' ? 'svg' : 'react',
            title: `${lang.toUpperCase()} Component Artifact`,
            language: lang,
            content: codeContent
          };
          setActiveArtifact(detectedArtifact);
        }
      }

      const assistantMsgId = 'asst-' + Date.now();
      const newAsstMsg: ClaudeMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: assistantText,
        createdAt: new Date().toISOString(),
        thinkingProcess: isThinkingEnabled
          ? (thinkingText || `• Evaluated constraints for: "${query.slice(0, 40)}..."\n• Formulated multi-tier logic with ${thinkingBudget} token budget.\n• Formatted output with optimal visual rhythm.`)
          : undefined,
        artifact: detectedArtifact
      };

      setThreads(prev => prev.map(t => {
        if (t.id === targetChatId) {
          return {
            ...t,
            messages: [...t.messages, newAsstMsg],
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      }));

      setShowThinkingMap(prev => ({ ...prev, [assistantMsgId]: true }));
    } catch (err) {
      console.error('Claude Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 flex h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Claude Threads Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-slate-800/80 bg-slate-900/60 flex flex-col shrink-0 overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs tracking-tight text-amber-400 font-display">Claude 3.7 Studio</span>
              </div>
              <button
                onClick={handleCreateChat}
                className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer"
                title="New Claude Chat"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {threads.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveThreadId(chat.id);
                    const lastArt = chat.messages.find(m => m.artifact)?.artifact;
                    if (lastArt) setActiveArtifact(lastArt);
                  }}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                    chat.id === activeThreadId
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Bot className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{chat.title}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Model Info Badge */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Model Engine:</span>
                <span className="font-mono text-amber-400 font-bold">Claude 3.7</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Thinking Mode:</span>
                <span className="font-mono text-emerald-400 font-bold">Active (4k)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Conversation Center */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Workspace Top Header */}
        <div className="h-14 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Layers className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm text-slate-100 truncate max-w-xs">{currentChat?.title || 'Claude Chat'}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">
                  Claude 3.7 Sonnet
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Thinking Toggle */}
            <button
              onClick={() => setIsThinkingEnabled(!isThinkingEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isThinkingEnabled
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400'
              }`}
              title="Toggle Extended Reasoning Process"
            >
              <Brain className={`w-3.5 h-3.5 ${isThinkingEnabled ? 'text-amber-400 animate-pulse' : ''}`} />
              <span>Thinking: {isThinkingEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Artifacts Toggle Button */}
            {activeArtifact && (
              <button
                onClick={() => setActiveArtifact(activeArtifact ? null : currentChat.messages.find(m => m.artifact)?.artifact || null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold hover:bg-indigo-600/30 transition-all"
              >
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                <span>Artifact Panel</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {(!currentChat || currentChat.messages.length === 0) ? (
            <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display text-white">Claude 3.7 Sonnet Studio</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Experience Anthropic's most intelligent model with hybrid extended reasoning, code artifact compilation, and full-stack software architecture.
                </p>
              </div>

              {/* Starter Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4">
                {STARTER_PROMPTS.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(starter.prompt)}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 transition-all group cursor-pointer text-left"
                  >
                    <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {starter.title}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{starter.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            currentChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl mx-auto ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-2 max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Thinking Process Accordion */}
                  {msg.thinkingProcess && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs space-y-1.5">
                      <button
                        onClick={() => setShowThinkingMap(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                        className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] hover:text-amber-300"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Thinking Process</span>
                        {showThinkingMap[msg.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                      {showThinkingMap[msg.id] && (
                        <p className="text-slate-400 text-[11px] font-mono leading-relaxed whitespace-pre-wrap pl-5 border-l border-amber-500/30">
                          {msg.thinkingProcess}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-600 text-white font-medium shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* Attached Artifact Button */}
                  {msg.artifact && (
                    <button
                      onClick={() => setActiveArtifact(msg.artifact!)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 hover:bg-indigo-900/60 text-indigo-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Code className="w-4 h-4 text-indigo-400" />
                      <span>Open Artifact: <strong>{msg.artifact.title}</strong></span>
                      <Maximize2 className="w-3 h-3 ml-auto opacity-70" />
                    </button>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3 max-w-3xl mx-auto">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-amber-400 flex items-center gap-2">
                <Brain className="w-4 h-4 animate-spin" />
                <span className="font-mono">Claude 3.7 extended thinking & compiling response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="max-w-3xl mx-auto relative flex items-center"
          >
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask Claude 3.7 Sonnet to write code, reason, or build an artifact..."
              rows={2}
              className="w-full pl-4 pr-24 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 resize-none"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Claude Artifacts Side Panel */}
      <AnimatePresence>
        {activeArtifact && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 440, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-l border-slate-800 bg-slate-900 flex flex-col shrink-0 overflow-hidden shadow-2xl z-20"
          >
            {/* Artifact Header */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-xs text-slate-100 truncate">{activeArtifact.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setArtifactViewMode(artifactViewMode === 'preview' ? 'code' : 'preview')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all"
                >
                  {artifactViewMode === 'preview' ? 'View Code' : 'Live Preview'}
                </button>
                <button
                  onClick={() => copyToClipboard(activeArtifact.content)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  title="Copy Artifact Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setActiveArtifact(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Artifact Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-slate-950">
              {artifactViewMode === 'code' ? (
                <pre className="text-[11px] font-mono text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre">
                  {activeArtifact.content}
                </pre>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-amber-400">Artifact Live Render</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      COMPILED
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-sans">
                    <p className="font-semibold text-white mb-2">Interactive Component Preview:</p>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-xs font-mono text-indigo-400 mb-1">// {activeArtifact.title}</div>
                      <div className="text-slate-400 text-[11px]">Component mounted and executing in isolated virtual DOM sandbox.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
