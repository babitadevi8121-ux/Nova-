import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Sparkles, Globe, Compass, BookOpen, Film, MessageSquare, ArrowRight, 
  Layers, CheckCircle2, ListFilter, Plus, Trash2, History, RefreshCw, AlertCircle, 
  Share2, ChevronRight, CornerDownRight, ExternalLink, HelpCircle
} from 'lucide-react';
import { User, PerplexityThread, PerplexityQuery, PerplexitySource, PerplexityFocusMode } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PerplexityAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

const DEFAULT_THREAD_STARTERS = [
  { question: 'What is the current status of room-temperature superconductor replication?', focusMode: 'academic' as PerplexityFocusMode, proMode: true },
  { question: 'Summarize the primary tech stacks behind SpaceX Mars missions.', focusMode: 'all' as PerplexityFocusMode, proMode: true },
  { question: 'Write a typescript function to implement a Red-Black tree deletion.', focusMode: 'writing' as PerplexityFocusMode, proMode: false },
  { question: 'What are the main arguments in Reddit discussions regarding AI art copyright?', focusMode: 'reddit' as PerplexityFocusMode, proMode: true },
];

export default function PerplexityAI({ user, onOpenAuth }: PerplexityAIProps) {
  // Persistence State
  const [threads, setThreads] = useState<PerplexityThread[]>(() => {
    const saved = localStorage.getItem('perplexity_threads');
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

  // Focus and Pro Switch
  const [focusMode, setFocusMode] = useState<PerplexityFocusMode>('all');
  const [proMode, setProMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Loading & Error States
  const [isSearching, setIsSearching] = useState(false);
  const [activeSearchStepIdx, setActiveSearchStepIdx] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Active Tooltip for hover source
  const [hoveredSourceId, setHoveredSourceId] = useState<string | null>(null);
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | null>(null);

  // Thread Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('perplexity_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [threads, isSearching, activeThreadId]);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  // Custom simple markdown and citation parser
  const renderFormattedAnswer = (text: string, sources: PerplexitySource[]) => {
    if (!text) return null;

    // Split paragraphs
    const paragraphs = text.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      // Check for headings
      if (para.startsWith('### ')) {
        return <h4 key={pIdx} className="text-base font-bold text-slate-900 dark:text-white mt-5 mb-2 font-display">{para.replace('### ', '')}</h4>;
      }
      if (para.startsWith('## ')) {
        return <h3 key={pIdx} className="text-lg font-extrabold text-slate-900 dark:text-white mt-6 mb-3 font-display border-b border-slate-200/50 dark:border-white/10 pb-1">{para.replace('## ', '')}</h3>;
      }
      if (para.startsWith('# ')) {
        return <h2 key={pIdx} className="text-xl font-black text-slate-900 dark:text-white mt-8 mb-4 font-display">{para.replace('# ', '')}</h2>;
      }

      // Check for lists
      if (para.startsWith('- ') || para.startsWith('* ') || para.match(/^\d+\.\s/)) {
        const lines = para.split('\n');
        return (
          <ul key={pIdx} className="list-disc pl-5 my-2.5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^-\s|^\*\s|^\d+\.\s/, '');
              return <li key={lIdx}>{parseCitations(cleanLine, sources)}</li>;
            })}
          </ul>
        );
      }

      // Check for code block
      if (para.startsWith('```')) {
        const codeLines = para.split('\n');
        const codeContent = codeLines.slice(1, codeLines.length - 1).join('\n');
        return (
          <pre key={pIdx} className="bg-slate-100 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-white/5 font-mono text-xs overflow-x-auto my-3 text-emerald-600 dark:text-emerald-400">
            <code>{codeContent}</code>
          </pre>
        );
      }

      // Standard paragraph
      return (
        <p key={pIdx} className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3.5">
          {parseCitations(para, sources)}
        </p>
      );
    });
  };

  // Helper to search and replace [1], [2] with beautifully styled highlights
  const parseCitations = (text: string, sources: PerplexitySource[]) => {
    // Regex matching [1], [2], [1][2], etc.
    const citationRegex = /\[(\d+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      // Add plain text before match
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      const sourceId = match[1];
      const source = sources.find(s => s.id === sourceId);

      parts.push(
        <button
          key={matchIndex}
          onClick={() => {
            setHighlightedSourceId(sourceId);
            setTimeout(() => {
              setHighlightedSourceId(null);
            }, 3000);
          }}
          onMouseEnter={() => setHoveredSourceId(sourceId)}
          onMouseLeave={() => setHoveredSourceId(null)}
          className="mx-0.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-extrabold rounded-full bg-teal-500/10 hover:bg-teal-500 text-teal-600 dark:text-teal-400 hover:text-white border border-teal-500/20 transition-all font-mono align-super cursor-pointer"
          title={source ? source.title : `Source #${sourceId}`}
        >
          {sourceId}
        </button>
      );

      lastIndex = citationRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Highlight bold markers **bold**
    return parts.map((part, pIdx) => {
      if (typeof part === 'string') {
        // Simple bold formatting replacement
        const boldRegex = /\*\*(.*?)\*\*/g;
        const subParts = [];
        let subLastIndex = 0;
        let subMatch;

        while ((subMatch = boldRegex.exec(part)) !== null) {
          if (subMatch.index > subLastIndex) {
            subParts.push(part.substring(subLastIndex, subMatch.index));
          }
          subParts.push(<strong key={subMatch.index} className="font-semibold text-slate-900 dark:text-white">{subMatch[1]}</strong>);
          subLastIndex = boldRegex.lastIndex;
        }

        if (subLastIndex < part.length) {
          subParts.push(part.substring(subLastIndex));
        }

        return <React.Fragment key={pIdx}>{subParts}</React.Fragment>;
      }
      return part;
    });
  };

  // Perform search
  const handlePerformSearch = async (queryToRun: string) => {
    if (!queryToRun.trim()) return;

    setIsSearching(true);
    setErrorText(null);
    setActiveSearchStepIdx(0);

    // Prepare steps
    const initialSteps = proMode 
      ? [
          { title: 'Deconstructing intent and context analysis', status: 'processing' as const },
          { title: 'Routing queries to search indexes', status: 'pending' as const },
          { title: 'Comparing alternative consensus documents', status: 'pending' as const },
          { title: 'Synthesizing ultimate response stream', status: 'pending' as const }
        ]
      : [
          { title: 'Initiating fast index search lookup', status: 'processing' as const },
          { title: 'Parsing top authority domains', status: 'pending' as const },
          { title: 'Generating concise markdown response', status: 'pending' as const }
        ];

    // Create placeholder query item
    const placeholderQuery: PerplexityQuery = {
      id: `query-temp-${Date.now()}`,
      question: queryToRun,
      focusMode: focusMode,
      proMode: proMode,
      searchSteps: initialSteps,
      sources: [],
      answer: '',
      relatedQuestions: [],
      createdAt: new Date().toISOString()
    };

    let targetThreadId = activeThreadId;

    if (!targetThreadId) {
      // Create a brand new thread
      const newThread: PerplexityThread = {
        id: `thread-${Math.random().toString(36).substring(7)}`,
        userId: user?.id || 'demo-id',
        title: queryToRun.length > 50 ? queryToRun.substring(0, 50) + '...' : queryToRun,
        createdAt: new Date().toISOString(),
        queries: [placeholderQuery]
      };
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      targetThreadId = newThread.id;
    } else {
      // Append query to existing active thread
      setThreads(prev => prev.map(t => {
        if (t.id === targetThreadId) {
          return {
            ...t,
            queries: [...t.queries, placeholderQuery]
          };
        }
        return t;
      }));
    }

    setSearchQuery('');

    // Simulate animated loading steps
    const stepInterval = setInterval(() => {
      setActiveSearchStepIdx(prev => {
        if (prev < initialSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 1200);

    try {
      const res = await fetch('/api/perplexity/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-id'}`
        },
        body: JSON.stringify({
          question: queryToRun,
          focusMode: focusMode,
          proMode: proMode
        })
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Research lookup failed.');
      }

      const data = await res.json();

      setThreads(prev => prev.map(t => {
        if (t.id === targetThreadId) {
          // Update the specific placeholder query
          const updatedQueries = t.queries.map(q => {
            if (q.id === placeholderQuery.id) {
              return {
                ...q,
                searchSteps: q.searchSteps.map(step => ({ ...step, status: 'completed' as const })),
                sources: data.sources || [],
                answer: data.answer || 'Search lookup response generated successfully.',
                relatedQuestions: data.relatedQuestions || []
              };
            }
            return q;
          });
          return {
            ...t,
            queries: updatedQueries
          };
        }
        return t;
      }));

    } catch (err: any) {
      clearInterval(stepInterval);
      setErrorText(err.message || 'Connection lost to the search clusters.');
      
      // Update thread with failed status
      setThreads(prev => prev.map(t => {
        if (t.id === targetThreadId) {
          return {
            ...t,
            queries: t.queries.map(q => {
              if (q.id === placeholderQuery.id) {
                return {
                  ...q,
                  answer: `⚠️ Search Error: ${err.message || 'Clusters did not return. Check internet.'}`,
                  searchSteps: q.searchSteps.map(step => ({ ...step, status: 'failed' as const }))
                };
              }
              return q;
            })
          };
        }
        return t;
      }));
    } finally {
      setIsSearching(false);
    }
  };

  // Delete Thread
  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this search thread?')) {
      setThreads(prev => prev.filter(t => t.id !== id));
      if (activeThreadId === id) {
        setActiveThreadId(null);
      }
    }
  };

  // List of Focus Modes with icons and titles
  const FOCUS_OPTIONS = [
    { mode: 'all' as PerplexityFocusMode, label: 'All', icon: Globe, desc: 'Entire web consensus search' },
    { mode: 'academic' as PerplexityFocusMode, label: 'Academic', icon: BookOpen, desc: 'Published papers & ArXiv' },
    { mode: 'writing' as PerplexityFocusMode, label: 'Writing', icon: Sparkles, desc: 'Pure generation, no search' },
    { mode: 'youtube' as PerplexityFocusMode, label: 'YouTube', icon: Film, desc: 'Find & parse video links' },
    { mode: 'reddit' as PerplexityFocusMode, label: 'Reddit', icon: MessageSquare, desc: 'Community discussions' },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      
      {/* Threads Left Sidebar */}
      <div className="w-full md:w-64 border-r border-slate-200 dark:border-white/5 bg-slate-100/30 dark:bg-slate-900/25 flex flex-col shrink-0 h-1/4 md:h-full overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <h3 className="font-display font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            Search Threads
          </h3>
          <button
            onClick={() => {
              setActiveThreadId(null);
              setSearchQuery('');
            }}
            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 cursor-pointer transition-all active:scale-95"
            title="Start New Thread"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Threads list */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
          {threads.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-[11px] text-slate-400 dark:text-slate-500">No search threads yet. Ignite your first discovery below!</p>
            </div>
          ) : (
            threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-2.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                  activeThreadId === thread.id
                    ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-500/20'
                    : 'hover:bg-slate-200/50 dark:hover:bg-slate-900/50 text-slate-700 dark:text-slate-400 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <Search className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  <span className="text-xs truncate">{thread.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteThread(thread.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-500/20 text-red-500 transition-opacity"
                  title="Delete Thread"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Quick helper info */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/30 text-[10px] text-slate-400 dark:text-slate-500 space-y-1">
          <p className="font-semibold flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <HelpCircle className="w-3 h-3" />
            Grounding Engine v1.8
          </p>
          <p>Real-time internet citations fused via Gemini semantic indexes.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-3/4 md:h-full overflow-hidden bg-white dark:bg-slate-950 relative">
        
        {/* Active Thread view */}
        {activeThread ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Thread Header details */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10">
              <div className="flex items-center gap-2 overflow-hidden">
                <Search className="w-4 h-4 text-slate-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-sm md:max-w-xl">
                  {activeThread.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveThreadId(null);
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline"
              >
                + New Thread
              </button>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
              {activeThread.queries.map((q, qIdx) => (
                <div key={q.id} className="space-y-6 max-w-4xl mx-auto border-b border-slate-100 dark:border-white/5 pb-8 last:border-0">
                  
                  {/* User Question */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700 dark:text-slate-300">
                      Q
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mt-0.5">
                      {q.question}
                    </h3>
                  </div>

                  {/* Grounding steps & Sources section */}
                  {q.answer === '' && isSearching ? (
                    // LOADING PLACEHOLDER
                    <div className="space-y-4 pl-9">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-4 h-4 text-teal-500 animate-spin" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                          {q.searchSteps[activeSearchStepIdx]?.title || 'Searching web index...'}
                        </span>
                      </div>
                      
                      {/* Animating checklist */}
                      <div className="space-y-1.5 text-xs text-slate-400 pl-7">
                        {q.searchSteps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              sIdx < activeSearchStepIdx ? 'bg-emerald-500' :
                              sIdx === activeSearchStepIdx ? 'bg-teal-500 animate-pulse' :
                              'bg-slate-300 dark:bg-slate-800'
                            }`} />
                            <span className={sIdx === activeSearchStepIdx ? 'text-slate-600 dark:text-slate-300' : ''}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // GROUNDED REVERBERATION RESULTS
                    <div className="pl-9 space-y-6">
                      
                      {/* Search steps completed toggle */}
                      {q.searchSteps.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs border border-emerald-500/10 bg-emerald-500/5 px-3 py-1.5 rounded-xl max-w-max">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Grounded
                          </span>
                          <span className="opacity-50 text-slate-400">|</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            Processed {q.sources.length} core knowledge nodes
                          </span>
                        </div>
                      )}

                      {/* Web sources card deck */}
                      {q.sources.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-teal-500" />
                            Sources Used
                          </h4>
                          <div className="flex flex-wrap gap-2.5">
                            {q.sources.map((source) => (
                              <a
                                key={source.id}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                onMouseEnter={() => setHoveredSourceId(source.id)}
                                onMouseLeave={() => setHoveredSourceId(null)}
                                className={`px-3 py-2 rounded-xl border text-left flex flex-col justify-between max-w-[200px] shrink-0 transition-all ${
                                  highlightedSourceId === source.id
                                    ? 'bg-teal-500/20 border-teal-500 ring-2 ring-teal-500/20 shadow-lg scale-105'
                                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-900'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="w-4 h-4 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[9px] font-bold text-teal-600 font-mono shrink-0">
                                    {source.id}
                                  </span>
                                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 font-mono truncate uppercase tracking-wider">
                                    {source.domain}
                                  </span>
                                </div>
                                <h5 className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate w-full">
                                  {source.title}
                                </h5>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grounded Source Snippet Hover Tooltip */}
                      <AnimatePresence>
                        {hoveredSourceId && (() => {
                          const src = q.sources.find(s => s.id === hoveredSourceId);
                          if (!src || !src.snippet) return null;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="p-3 rounded-xl border border-teal-500/20 bg-teal-50/90 dark:bg-teal-950/40 backdrop-blur-md text-xs leading-relaxed text-teal-800 dark:text-teal-300 max-w-xl"
                            >
                              <strong className="block font-semibold mb-1">Snippet from #{src.id} ({src.title}):</strong>
                              "{src.snippet}"
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>

                      {/* Grounded Synthesized Response */}
                      <div className="prose prose-slate dark:prose-invert max-w-none mt-4">
                        {renderFormattedAnswer(q.answer, q.sources)}
                      </div>

                      {/* Related Follow-Up Questions list */}
                      {q.relatedQuestions.length > 0 && !isSearching && (
                        <div className="space-y-2 border-t border-slate-100 dark:border-white/5 pt-6">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <CornerDownRight className="w-3.5 h-3.5 text-indigo-500" />
                            Related research paths
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.relatedQuestions.map((relQ, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => handlePerformSearch(relQ)}
                                className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/5 hover:border-indigo-500/40 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 text-left text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center justify-between group transition-all"
                              >
                                <span className="truncate flex-1 pr-2">{relQ}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Sticky prompt input at bottom */}
            <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformSearch(searchQuery);
                }}
                className="max-w-4xl mx-auto flex gap-3 relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask follow-up query to dive deeper..."
                  disabled={isSearching}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-2 p-2 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-lg transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          // ----------------------------------------------------
          // ONBOARDING DISCOVERY LANDING VIEW
          // ----------------------------------------------------
          <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-4 py-12 md:py-24">
            
            <div className="max-w-2xl w-full text-center space-y-8">
              
              {/* Premium Title */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold tracking-wider font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Internet Grounded search
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  Where knowledge begins
                </h1>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Ask any technical, academic, or computational question and discover sources instantly.
                </p>
              </div>

              {/* Main Search Input Container card */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 md:p-6 rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-2xl backdrop-blur-md space-y-4 text-left">
                
                {/* Search text box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePerformSearch(searchQuery);
                  }}
                  className="flex gap-2 relative"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask anything... (e.g. 'How does Gato model integrate multi-modal states?')"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-semibold rounded-2xl text-sm flex items-center gap-1 transition-all"
                  >
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Focus Options Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Focus Mode</span>
                  <div className="flex flex-wrap gap-1.5">
                    {FOCUS_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.mode}
                          onClick={() => setFocusMode(opt.mode)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                            focusMode === opt.mode
                              ? 'bg-teal-600/15 border-teal-500/40 text-teal-600 dark:text-teal-400'
                              : 'bg-white dark:bg-slate-950 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-slate-600 dark:text-slate-400'
                          }`}
                          title={opt.desc}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pro Mode toggle */}
                <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                      <Layers className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Pro Search</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Includes multi-step planning, sources parsing & deep consensus answers</span>
                    </div>
                  </div>
                  
                  {/* Premium Switch */}
                  <button
                    onClick={() => setProMode(!proMode)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      proMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      proMode ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>

              {/* Discovery Prompt Starters */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5" />
                  Curated discovery paths
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  {DEFAULT_THREAD_STARTERS.map((starter, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setFocusMode(starter.focusMode);
                        setProMode(starter.proMode);
                        handlePerformSearch(starter.question);
                      }}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/40 dark:bg-slate-900/20 hover:border-teal-500/40 hover:bg-teal-50/10 dark:hover:bg-teal-950/10 transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group cursor-pointer"
                    >
                      <span className="truncate pr-4">{starter.question}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-teal-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
