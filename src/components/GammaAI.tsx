import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Presentation, FileText, Globe, Palette, Check, ChevronLeft, ChevronRight, 
  Plus, Trash2, Play, Maximize2, Minimize2, Download, Edit3, Wand2, Layout, 
  Columns, List, BarChart3, RotateCw, Save, ArrowRight, Loader2, RefreshCw, X, MessageSquare, Share2, CornerDownRight
} from 'lucide-react';
import { User, GammaWorkspace, GammaCard, GammaTheme, GammaType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GammaAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

// Default workspace starters to keep workspace populated and high-fidelity
const STATIC_STARTERS: GammaWorkspace[] = [
  {
    id: 'starter-presentation',
    userId: 'demo-id',
    name: 'Sustainable Clean Energy Transition 2030',
    type: 'presentation',
    theme: 'ocean',
    outline: [
      'The Climate Imperative',
      'Solar & Wind Dominance',
      'Grid Storage Breakthroughs',
      'Socioeconomic Impact & Jobs',
      'Global Implementation Roadmap'
    ],
    cards: [
      {
        id: 'card-1',
        title: 'The Climate Imperative',
        icon: 'Flame',
        content: 'Our global economy requires a rapid, complete decarbonization by 2030 to prevent global heating beyond 1.5°C. Transitioning to renewable pathways is no longer optional.',
        bulletPoints: [
          'Current warming trajectories threaten critical biosphere tipping points.',
          'Decarbonizing industrial manufacturing and transport accounts for 65% of necessary cuts.',
          'Global fossil subsidies exceed $5 trillion annually; redirecting these is crucial.'
        ],
        stats: [
          { value: '1.5°C', label: 'Maximum Safe Warming Limit' },
          { value: '420ppm', label: 'Atmospheric CO2 Concentration' }
        ]
      },
      {
        id: 'card-2',
        title: 'Solar & Wind Dominance',
        icon: 'Sparkles',
        content: 'Photovoltaic and wind capture technologies have reached absolute cost-parity with traditional fossil fuels, leading a massive deployment wave worldwide.',
        bulletPoints: [
          'Levelized Cost of Electricity (LCOE) for utility solar fell 89% in the last decade.',
          'Offshore wind turbines now exceed 15MW capacities with up to 60% capacity factors.',
          'Bifacial solar configurations capture reflected albedo, maximizing ground-level yield.'
        ],
        columns: [
          { title: 'Solar Photovoltaics', content: 'Sub-penny per kWh generation in high-irradiation regions like Atacama & Sahara.' },
          { title: 'Deep Offshore Wind', content: 'Stated potentials in North Sea and East Asia to power entire industrial clusters.' }
        ]
      },
      {
        id: 'card-3',
        title: 'Grid Storage Breakthroughs',
        icon: 'BarChart3',
        content: 'With solar and wind electricity being highly intermittent, high-density utility battery packs and alternative long-duration grids are mandatory to balance output.',
        bulletPoints: [
          'Lithium Iron Phosphate (LFP) dominates short-duration grid firming due to safety & lifespan.',
          'Sodium-ion chemistries eliminate cobalt dependency, reducing supply-chain risk by 70%.',
          'Pumped hydro and compressed air systems provide thermal cycles spanning weeks.'
        ],
        stats: [
          { value: '4GWh', label: 'Largest Grid Battery Peak Capacity' },
          { value: '-90%', label: 'Sodium Battery Raw Mineral Cost' }
        ]
      },
      {
        id: 'card-4',
        title: 'Socioeconomic Impact & Jobs',
        icon: 'Globe',
        content: 'The transition is not just environmental; it is a historic engine of global job creation, workforce restructuring, and community-level economic renewal.',
        bulletPoints: [
          'Over 12 million clean energy jobs currently active, projected to exceed 38 million by 2030.',
          'Just transition frameworks guarantee retraining grants for fossil fuel workers.',
          'Decentralized community solar grids democratize energy access, lowering average household utility costs by 22%.'
        ]
      },
      {
        id: 'card-5',
        title: 'Global Implementation Roadmap',
        icon: 'Layout',
        content: 'Sustained decarbonization requires massive, coordinated capital deployments, international technology sharing, and absolute regulatory alignment across continents.',
        bulletPoints: [
          'Immediate tripling of global renewable investment to $4.5 trillion annually.',
          'Unified green hydrogen standards to enable carbon-free shipping corridors.',
          'Open-source grid balancing software modules shared globally with developing nations.'
        ],
        columns: [
          { title: 'Phase 1: Grid Decarbonization', content: 'Retire coal/gas, triple solar and wind, and establish base-level short duration storage.' },
          { title: 'Phase 2: Deep Electrification', content: 'Transition light transport to EVs, deploy heat pumps, and roll out heavy industrial hydrogen.' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function GammaAI({ user, onOpenAuth }: GammaAIProps) {
  // Persistence State
  const [workspaces, setWorkspaces] = useState<GammaWorkspace[]>(() => {
    const saved = localStorage.getItem('gamma_workspaces');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return STATIC_STARTERS;
      }
    }
    return STATIC_STARTERS;
  });

  // Current Active workspace, null means home list / generator onboarding screen
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);

  // Generator Onboarding inputs
  const [inputType, setInputType] = useState<GammaType>('presentation');
  const [inputTheme, setInputTheme] = useState<GammaTheme>('charcoal');
  const [prompt, setPrompt] = useState('');
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  // Step 1: Outline state
  const [generatedOutline, setGeneratedOutline] = useState<string[] | null>(null);
  const [outlineWorkspaceName, setOutlineWorkspaceName] = useState('');

  // Step 2: Content Viewing & Editing States
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [copilotCommand, setCopilotCommand] = useState('');
  const [isCopilotRefactoring, setIsCopilotRefactoring] = useState(false);

  // Slideshow presenter state
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Export State
  const [exportSuccess, setExportSuccess] = useState(false);

  // Toast / Error banner
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);

  // Save workspaces to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('gamma_workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPresenting) return;
      const workspace = workspaces.find(w => w.id === activeWorkspaceId);
      if (!workspace) return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        if (currentSlideIdx < workspace.cards.length - 1) {
          setCurrentSlideIdx(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlideIdx > 0) {
          setCurrentSlideIdx(prev => prev - 1);
        }
      } else if (e.key === 'Escape') {
        setIsPresenting(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresenting, currentSlideIdx, activeWorkspaceId, workspaces]);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || null;

  // Initialize selected card when active workspace shifts
  useEffect(() => {
    if (activeWorkspace && activeWorkspace.cards.length > 0) {
      setSelectedCardId(activeWorkspace.cards[0].id);
    } else {
      setSelectedCardId(null);
    }
  }, [activeWorkspaceId]);

  // Custom Prompt Presets
  const PROMPT_PRESETS = [
    { title: 'AI in Modern Healthcare', type: 'presentation' as GammaType, text: 'The transformation of medical diagnostics and patient treatment protocols using generative AI.' },
    { title: 'The Quantum Computing Era', type: 'webpage' as GammaType, text: 'A futuristic responsive landing page breaking down the core mechanics, qubits, and commercial applications of Quantum.' },
    { title: 'Space Colonization Manifesto', type: 'document' as GammaType, text: 'An academic proposal document highlighting the physics, challenges, and timeline of colonizing Mars.' },
    { title: 'Digital Nomadism Guide', type: 'presentation' as GammaType, text: 'A presentation highlighting top-tier cities, tax incentives, productivity stacks, and mental health for digital nomads.' }
  ];

  // Helper trigger message
  const triggerStatus = (text: string, type: 'error' | 'success' | 'info' = 'info') => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Step 1: Request Outline from AI
  const handleGenerateOutline = async () => {
    if (!prompt.trim()) {
      triggerStatus('Please provide a prompt or topic for generation.', 'error');
      return;
    }

    setIsGeneratingOutline(true);
    setStatusMessage({ type: 'info', text: 'Analyzing topic and generating strategic content outline...' });

    try {
      const res = await fetch('/api/gamma/outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-id'}`
        },
        body: JSON.stringify({
          topic: prompt,
          type: inputType,
          theme: inputTheme
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate outline.');
      }

      const data = await res.json();
      setGeneratedOutline(data.outline || []);
      setOutlineWorkspaceName(data.title || prompt);
      triggerStatus('Outline generated! Feel free to customize any points before final generation.', 'success');
    } catch (err: any) {
      triggerStatus(err.message || 'Error occurred while contacting Gemini API.', 'error');
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  // Step 2: Request Full Presentation/Webpage/Document contents based on Outline
  const handleGenerateContent = async () => {
    if (!generatedOutline || generatedOutline.length === 0) {
      triggerStatus('Outline cannot be empty.', 'error');
      return;
    }

    setIsGeneratingContent(true);
    setStatusMessage({ type: 'info', text: 'Fusing high-density content layouts, visual stats, and diagrams...' });

    try {
      const res = await fetch('/api/gamma/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-id'}`
        },
        body: JSON.stringify({
          title: outlineWorkspaceName,
          type: inputType,
          theme: inputTheme,
          outline: generatedOutline
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate final content.');
      }

      const data = await res.json();
      
      const newWorkspace: GammaWorkspace = {
        id: `workspace-${Math.random().toString(36).substring(7)}`,
        userId: user?.id || 'demo-id',
        name: outlineWorkspaceName,
        type: inputType,
        theme: inputTheme,
        outline: generatedOutline,
        cards: data.cards || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setWorkspaces(prev => [newWorkspace, ...prev]);
      setActiveWorkspaceId(newWorkspace.id);
      
      // Clear wizard state
      setGeneratedOutline(null);
      setPrompt('');
      triggerStatus('Congratulations! Your elegant workspace has been created.', 'success');
    } catch (err: any) {
      triggerStatus(err.message || 'Failed to generate content cards.', 'error');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // Edit individual outline point in wizard
  const handleEditOutlinePoint = (index: number, val: string) => {
    if (!generatedOutline) return;
    const copied = [...generatedOutline];
    copied[index] = val;
    setGeneratedOutline(copied);
  };

  // Add outline point in wizard
  const handleAddOutlinePoint = () => {
    if (!generatedOutline) return;
    setGeneratedOutline([...generatedOutline, 'New Section Section']);
  };

  // Remove outline point in wizard
  const handleRemoveOutlinePoint = (index: number) => {
    if (!generatedOutline) return;
    const copied = [...generatedOutline];
    copied.splice(index, 1);
    setGeneratedOutline(copied);
  };

  // Delete Workspace
  const handleDeleteWorkspace = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this creation?')) {
      setWorkspaces(prev => prev.filter(w => w.id !== id));
      if (activeWorkspaceId === id) {
        setActiveWorkspaceId(null);
      }
      triggerStatus('Creation deleted successfully.', 'info');
    }
  };

  // Card Interactive Content Updating (Directly in UI)
  const handleUpdateCardField = (cardId: string, field: keyof GammaCard, value: any) => {
    if (!activeWorkspace) return;
    
    const updatedCards = activeWorkspace.cards.map(card => {
      if (card.id === cardId) {
        return { ...card, [field]: value };
      }
      return card;
    });

    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return { ...w, cards: updatedCards, updatedAt: new Date().toISOString() };
      }
      return w;
    }));
  };

  // Change active workspace theme dynamically
  const handleChangeTheme = (theme: GammaTheme) => {
    if (!activeWorkspace) return;
    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return { ...w, theme, updatedAt: new Date().toISOString() };
      }
      return w;
    }));
    triggerStatus(`Theme updated to ${theme}!`, 'success');
  };

  // Trigger Gemini Copilot Refactor for a single card
  const handleCopilotRefactor = async () => {
    if (!activeWorkspace || !selectedCardId || !copilotCommand.trim()) {
      triggerStatus('Please select a slide and write a formatting command.', 'error');
      return;
    }

    const selectedCard = activeWorkspace.cards.find(c => c.id === selectedCardId);
    if (!selectedCard) return;

    setIsCopilotRefactoring(true);
    setStatusMessage({ type: 'info', text: 'Copilot is rewriting the card details...' });

    try {
      const res = await fetch('/api/gamma/refactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'demo-id'}`
        },
        body: JSON.stringify({
          workspaceType: activeWorkspace.type,
          theme: activeWorkspace.theme,
          card: selectedCard,
          instruction: copilotCommand
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to refactor card contents.');
      }

      const data = await res.json();
      
      const updatedCards = activeWorkspace.cards.map(card => {
        if (card.id === selectedCardId) {
          return {
            ...card,
            title: data.card.title || card.title,
            content: data.card.content || card.content,
            bulletPoints: data.card.bulletPoints || card.bulletPoints,
            stats: data.card.stats || card.stats,
            columns: data.card.columns || card.columns,
            icon: data.card.icon || card.icon
          };
        }
        return card;
      });

      setWorkspaces(prev => prev.map(w => {
        if (w.id === activeWorkspaceId) {
          return { ...w, cards: updatedCards, updatedAt: new Date().toISOString() };
        }
        return w;
      }));

      setCopilotCommand('');
      triggerStatus('Copilot completed refactoring! The card has been updated.', 'success');
    } catch (err: any) {
      triggerStatus(err.message || 'Error occurred during AI card refactoring.', 'error');
    } finally {
      setIsCopilotRefactoring(false);
    }
  };

  // Simulate PDF / Document Export
  const handleExportWorkspace = () => {
    if (!activeWorkspace) return;
    setExportSuccess(true);
    
    // Simulate generation file download
    const formatName = activeWorkspace.type === 'presentation' ? 'Slides.pdf' : activeWorkspace.type === 'document' ? 'Document.pdf' : 'Page.html';
    const cleanFileName = activeWorkspace.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + formatName;
    
    // Create text file attachment content
    const exportContent = `GAMMA EXPORT: ${activeWorkspace.name.toUpperCase()}\n` +
      `Type: ${activeWorkspace.type.toUpperCase()} | Theme: ${activeWorkspace.theme.toUpperCase()}\n` +
      `Exported on: ${new Date().toLocaleDateString()}\n\n` +
      `====================================================\n\n` +
      activeWorkspace.cards.map((c, i) => {
        let block = `[Section ${i + 1}] ${c.title}\n-------------------------\n${c.content}\n\n`;
        if (c.bulletPoints && c.bulletPoints.length > 0) {
          block += `Bullets:\n` + c.bulletPoints.map(b => ` • ${b}`).join('\n') + `\n\n`;
        }
        if (c.stats && c.stats.length > 0) {
          block += `Key Stats:\n` + c.stats.map(s => ` - ${s.label}: ${s.value}`).join('\n') + `\n\n`;
        }
        if (c.columns && c.columns.length > 0) {
          block += `Details Columns:\n` + c.columns.map(col => ` * ${col.title}: ${col.content}`).join('\n') + `\n\n`;
        }
        return block;
      }).join('====================================================\n\n');

    const element = document.createElement('a');
    const file = new Blob([exportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = cleanFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setExportSuccess(false);
    }, 4000);
  };

  // Helper dynamic classes based on Theme config
  const getThemeClasses = (theme: GammaTheme) => {
    switch (theme) {
      case 'charcoal':
        return {
          wrapper: 'bg-slate-900 text-slate-100 border-slate-800',
          card: 'bg-slate-950/70 backdrop-blur-md border border-slate-800 text-slate-100 shadow-xl',
          accent: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50',
          badge: 'bg-cyan-950 text-cyan-400 border border-cyan-800/30',
          heading: 'font-display font-semibold tracking-tight text-white',
          buttonPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10'
        };
      case 'elegance':
        return {
          wrapper: 'bg-stone-50 text-stone-800 border-stone-200',
          card: 'bg-white/80 backdrop-blur-md border border-stone-200 text-stone-800 shadow-lg',
          accent: 'text-amber-700 bg-amber-50 border-amber-200/50',
          badge: 'bg-amber-100 text-amber-800 border border-amber-200',
          heading: 'font-serif font-semibold tracking-tight text-stone-900',
          buttonPrimary: 'bg-amber-700 hover:bg-amber-800 text-white shadow-md'
        };
      case 'ocean':
        return {
          wrapper: 'bg-gradient-to-b from-sky-950 to-indigo-950 text-sky-100 border-sky-900/30',
          card: 'bg-sky-900/40 backdrop-blur-lg border border-sky-500/20 text-sky-100 shadow-xl shadow-sky-950/50',
          accent: 'text-teal-300 bg-teal-950/50 border-teal-800/50',
          badge: 'bg-teal-950 text-teal-300 border border-teal-800/30',
          heading: 'font-display font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-teal-200',
          buttonPrimary: 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20'
        };
      case 'emerald':
        return {
          wrapper: 'bg-emerald-950 text-emerald-100 border-emerald-900',
          card: 'bg-emerald-900/30 backdrop-blur-md border border-emerald-800/40 text-emerald-100 shadow-xl',
          accent: 'text-yellow-300 bg-yellow-950/40 border-yellow-800/50',
          badge: 'bg-yellow-950 text-yellow-300 border border-yellow-800/30',
          heading: 'font-display font-medium tracking-tight text-yellow-100',
          buttonPrimary: 'bg-yellow-500 hover:bg-yellow-400 text-emerald-950 shadow-md'
        };
      default:
        return {
          wrapper: 'bg-slate-900 text-slate-100 border-slate-850',
          card: 'bg-slate-950 border border-slate-800 text-slate-100 shadow-xl',
          accent: 'text-indigo-400 bg-indigo-950/40 border-indigo-850',
          badge: 'bg-indigo-950 text-indigo-400 border border-indigo-900',
          heading: 'font-sans font-semibold tracking-tight text-white',
          buttonPrimary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
        };
    }
  };

  const currentTheme = activeWorkspace ? getThemeClasses(activeWorkspace.theme) : getThemeClasses(inputTheme);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      
      {/* Top Banner / Toast alerts */}
      {statusMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-lg border text-sm max-w-md animate-bounce ${
          statusMessage.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
          statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
          'bg-indigo-500/10 border-indigo-500/20 text-indigo-500 dark:text-indigo-400'
        }`}>
          <div className="w-2 h-2 rounded-full bg-current animate-ping" />
          <p className="font-medium flex-1">{statusMessage.text}</p>
          <button onClick={() => setStatusMessage(null)} className="opacity-60 hover:opacity-100 text-xs font-bold font-mono">×</button>
        </div>
      )}

      {/* Primary Workspace View */}
      {activeWorkspace ? (
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Left Sidebar slide/section navigator */}
          <div className="w-full md:w-64 border-r border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/20 flex flex-col shrink-0 h-1/4 md:h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <button 
                  onClick={() => setActiveWorkspaceId(null)}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 shrink-0 text-slate-500 dark:text-slate-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-display font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                  {activeWorkspace.type}
                </h3>
              </div>
              <button
                onClick={handleExportWorkspace}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
              >
                <Download className="w-3 h-3" />
                Export
              </button>
            </div>

            {/* Sidebar Cards list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {activeWorkspace.cards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    selectedCardId === card.id
                      ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono opacity-50">#{idx + 1}</span>
                    <h4 className="font-semibold text-xs truncate flex-1">{card.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 truncate">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Theme Selector panel at bottom of left menu */}
            <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-100/80 dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" />
                  Active Theme
                </span>
                <span className="font-mono text-[10px] opacity-75 capitalize">{activeWorkspace.theme}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['charcoal', 'elegance', 'ocean', 'emerald'] as GammaTheme[]).map(thm => (
                  <button
                    key={thm}
                    onClick={() => handleChangeTheme(thm)}
                    className={`h-7 rounded-lg border flex items-center justify-center transition-all relative ${
                      activeWorkspace.theme === thm 
                        ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20' 
                        : 'border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                    } ${
                      thm === 'charcoal' ? 'bg-slate-950' :
                      thm === 'elegance' ? 'bg-amber-50' :
                      thm === 'ocean' ? 'bg-sky-950' : 'bg-emerald-950'
                    }`}
                    title={thm}
                  >
                    {activeWorkspace.theme === thm && (
                      <Check className={`w-3.5 h-3.5 ${thm === 'elegance' ? 'text-amber-800' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Main Preview & Slide Content Canvas */}
          <div className={`flex-1 flex flex-col h-3/4 md:h-full overflow-y-auto p-4 md:p-8 transition-colors duration-300 ${currentTheme.wrapper}`}>
            
            {/* Live Presentation Top bar / Nav controls */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-6 pb-4 border-b border-current/10 opacity-90">
              <div className="flex items-center gap-2 overflow-hidden">
                <h2 className="text-sm font-semibold truncate max-w-sm md:max-w-md">{activeWorkspace.name}</h2>
                <span className="text-[10px] font-mono capitalize border border-current/20 px-1.5 py-0.5 rounded">
                  {activeWorkspace.type}
                </span>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {activeWorkspace.type === 'presentation' && (
                  <button
                    onClick={() => {
                      setCurrentSlideIdx(activeWorkspace.cards.findIndex(c => c.id === selectedCardId) || 0);
                      setIsPresenting(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Present Mode
                  </button>
                )}
                <button
                  onClick={handleExportWorkspace}
                  className="px-3 py-1.5 border border-current/30 hover:bg-current/10 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Download Draft
                </button>
              </div>
            </div>

            {/* Layout Canvas: Responsive depending on Gamma Type */}
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center py-4">
              
              {activeWorkspace.type === 'presentation' ? (
                // ----------------------------------------------------
                // PRESENTATION CARDS VIEW (Full single active slide showcase)
                // ----------------------------------------------------
                <div className="space-y-6">
                  {(() => {
                    const activeCard = activeWorkspace.cards.find(c => c.id === selectedCardId);
                    if (!activeCard) return <p className="text-center opacity-60">No slide selected. Click one on the left menu.</p>;

                    return (
                      <div className={`p-8 md:p-12 rounded-3xl min-h-[380px] flex flex-col justify-between transition-all duration-300 ${currentTheme.card}`}>
                        <div>
                          {/* Slide Header details */}
                          <div className="flex items-center gap-3 mb-6">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${currentTheme.badge}`}>
                              {activeCard.icon || 'Sparkles'}
                            </span>
                            <span className="text-xs font-mono opacity-50">Slide Index</span>
                          </div>

                          {/* Editable Title */}
                          <input
                            type="text"
                            value={activeCard.title}
                            onChange={(e) => handleUpdateCardField(activeCard.id, 'title', e.target.value)}
                            className={`w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/40 rounded-lg py-1 text-2xl md:text-3xl font-display font-bold ${currentTheme.heading}`}
                          />

                          {/* Editable Main Prose block */}
                          <textarea
                            value={activeCard.content}
                            onChange={(e) => handleUpdateCardField(activeCard.id, 'content', e.target.value)}
                            rows={3}
                            className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/40 rounded-lg py-1 text-sm md:text-base opacity-90 leading-relaxed mt-4 resize-none"
                            placeholder="Write slide core narrative or paragraphs..."
                          />

                          {/* Visual Grid: Columns, stats or bullets */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            
                            {/* Bullets layout */}
                            {activeCard.bulletPoints && activeCard.bulletPoints.length > 0 && (
                              <div className="space-y-2.5">
                                <h5 className="text-xs font-semibold uppercase tracking-wider opacity-60">Key Details</h5>
                                <div className="space-y-2">
                                  {activeCard.bulletPoints.map((bp, bpIdx) => (
                                    <div key={bpIdx} className="flex gap-2.5 text-xs md:text-sm leading-relaxed items-start">
                                      <span className="text-indigo-500 font-bold mt-1 shrink-0">•</span>
                                      <input
                                        type="text"
                                        value={bp}
                                        onChange={(e) => {
                                          const bps = [...(activeCard.bulletPoints || [])];
                                          bps[bpIdx] = e.target.value;
                                          handleUpdateCardField(activeCard.id, 'bulletPoints', bps);
                                        }}
                                        className="w-full bg-transparent focus:outline-none focus:bg-current/5 rounded px-1"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Column metrics/Stats Layout */}
                            {activeCard.stats && activeCard.stats.length > 0 && (
                              <div className="grid grid-cols-2 gap-4">
                                {activeCard.stats.map((st, stIdx) => (
                                  <div key={stIdx} className={`p-4 rounded-2xl border ${currentTheme.accent} flex flex-col justify-between`}>
                                    <input
                                      type="text"
                                      value={st.value}
                                      onChange={(e) => {
                                        const sts = [...(activeCard.stats || [])];
                                        sts[stIdx] = { ...sts[stIdx], value: e.target.value };
                                        handleUpdateCardField(activeCard.id, 'stats', sts);
                                      }}
                                      className="text-2xl md:text-3xl font-display font-extrabold bg-transparent focus:outline-none w-full"
                                    />
                                    <input
                                      type="text"
                                      value={st.label}
                                      onChange={(e) => {
                                        const sts = [...(activeCard.stats || [])];
                                        sts[stIdx] = { ...sts[stIdx], label: e.target.value };
                                        handleUpdateCardField(activeCard.id, 'stats', sts);
                                      }}
                                      className="text-[10px] md:text-xs opacity-75 mt-1 bg-transparent focus:outline-none w-full"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parallel Layout Columns */}
                            {activeCard.columns && activeCard.columns.length > 0 && (
                              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2 border-t border-current/10 pt-6">
                                {activeCard.columns.map((col, colIdx) => (
                                  <div key={colIdx} className="space-y-1">
                                    <input
                                      type="text"
                                      value={col.title}
                                      onChange={(e) => {
                                        const cols = [...(activeCard.columns || [])];
                                        cols[colIdx] = { ...cols[colIdx], title: e.target.value };
                                        handleUpdateCardField(activeCard.id, 'columns', cols);
                                      }}
                                      className="text-xs md:text-sm font-semibold bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/40 rounded w-full"
                                    />
                                    <textarea
                                      value={col.content}
                                      onChange={(e) => {
                                        const cols = [...(activeCard.columns || [])];
                                        cols[colIdx] = { ...cols[colIdx], content: e.target.value };
                                        handleUpdateCardField(activeCard.id, 'columns', cols);
                                      }}
                                      rows={2}
                                      className="text-xs opacity-80 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/40 rounded w-full resize-none leading-relaxed"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Interactive edit indicator */}
                        <div className="mt-8 flex justify-between items-center opacity-60 text-xs font-mono">
                          <span>💡 Interactive Card: click any text to type/edit</span>
                          <span>Gamma slides engine v2.0</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : activeWorkspace.type === 'document' ? (
                // ----------------------------------------------------
                // DOCUMENT SCROLL VIEW (Unified continuous document page layout)
                // ----------------------------------------------------
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-4 pb-8 border-b border-current/10">
                    <h1 className={`text-3xl md:text-4xl font-display font-extrabold ${currentTheme.heading}`}>
                      {activeWorkspace.name}
                    </h1>
                    <p className="text-sm opacity-70 italic font-serif">
                      Academic briefing and analytical compilation document compiled with AI reasoning grounding.
                    </p>
                  </div>

                  <div className="space-y-10">
                    {activeWorkspace.cards.map((card, idx) => (
                      <div
                        key={card.id}
                        id={`sec-${card.id}`}
                        onClick={() => setSelectedCardId(card.id)}
                        className={`p-6 md:p-8 rounded-2xl border transition-all ${
                          selectedCardId === card.id 
                            ? 'ring-2 ring-indigo-500 bg-white/10' 
                            : 'bg-transparent border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${currentTheme.badge}`}>
                            0{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => handleUpdateCardField(card.id, 'title', e.target.value)}
                            className={`w-full bg-transparent focus:outline-none font-display font-bold text-xl md:text-2xl ${currentTheme.heading}`}
                          />
                        </div>

                        <textarea
                          value={card.content}
                          onChange={(e) => handleUpdateCardField(card.id, 'content', e.target.value)}
                          rows={3}
                          className="w-full bg-transparent focus:outline-none focus:bg-current/5 rounded-lg p-1 text-sm md:text-base leading-relaxed opacity-90 resize-none font-serif"
                        />

                        {/* Details grid for documents */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-current/10 pt-6">
                          {card.bulletPoints && card.bulletPoints.length > 0 && (
                            <div className="space-y-2">
                              {card.bulletPoints.map((bp, bpIdx) => (
                                <div key={bpIdx} className="flex gap-2 text-xs md:text-sm">
                                  <span className="text-indigo-500 font-bold">•</span>
                                  <input
                                    type="text"
                                    value={bp}
                                    onChange={(e) => {
                                      const bps = [...(card.bulletPoints || [])];
                                      bps[bpIdx] = e.target.value;
                                      handleUpdateCardField(card.id, 'bulletPoints', bps);
                                    }}
                                    className="w-full bg-transparent focus:outline-none focus:bg-current/5 rounded"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {card.stats && card.stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                              {card.stats.map((st, stIdx) => (
                                <div key={stIdx} className="flex flex-col">
                                  <input
                                    type="text"
                                    value={st.value}
                                    onChange={(e) => {
                                      const sts = [...(card.stats || [])];
                                      sts[stIdx] = { ...sts[stIdx], value: e.target.value };
                                      handleUpdateCardField(card.id, 'stats', sts);
                                    }}
                                    className="text-xl font-bold bg-transparent focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={st.label}
                                    onChange={(e) => {
                                      const sts = [...(card.stats || [])];
                                      sts[stIdx] = { ...sts[stIdx], label: e.target.value };
                                      handleUpdateCardField(card.id, 'stats', sts);
                                    }}
                                    className="text-[10px] opacity-75 bg-transparent focus:outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // ----------------------------------------------------
                // WEBPAGE GRID VIEW (Modern landing layout with bento designs)
                // ----------------------------------------------------
                <div className="space-y-16">
                  {/* Hero Landing Section */}
                  <div className="text-center py-16 space-y-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${currentTheme.badge}`}>
                      Beta Concept Landing Page
                    </span>
                    <h1 className={`text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl mx-auto leading-none ${currentTheme.heading}`}>
                      {activeWorkspace.name}
                    </h1>
                    <p className="text-base md:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">
                      Experience the next frontier. Generated with responsive bento-grids, premium visual sections, and custom typography nodes.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-95 ${currentTheme.buttonPrimary}`}>
                        Explore Showcase
                      </button>
                      <button className="px-5 py-2.5 rounded-xl border border-current/30 text-sm font-semibold hover:bg-current/10">
                        Read Whitepaper
                      </button>
                    </div>
                  </div>

                  {/* Bento grids features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeWorkspace.cards.map((card, idx) => (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer ${
                          idx === 1 ? 'md:col-span-2' : ''
                        } ${
                          selectedCardId === card.id ? 'ring-2 ring-indigo-500 bg-white/10' : 'bg-transparent border-current/10'
                        } ${currentTheme.card}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono opacity-50">Feature #0{idx + 1}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${currentTheme.badge}`}>{card.icon || 'Layout'}</span>
                        </div>
                        
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => handleUpdateCardField(card.id, 'title', e.target.value)}
                          className={`w-full bg-transparent focus:outline-none font-display font-bold text-lg md:text-xl mb-3 ${currentTheme.heading}`}
                        />

                        <textarea
                          value={card.content}
                          onChange={(e) => handleUpdateCardField(card.id, 'content', e.target.value)}
                          rows={2}
                          className="w-full bg-transparent focus:outline-none focus:bg-current/5 rounded text-xs opacity-90 leading-relaxed resize-none"
                        />

                        {card.stats && card.stats.length > 0 && (
                          <div className="flex gap-4 mt-4 pt-4 border-t border-current/10">
                            {card.stats.map((st, stIdx) => (
                              <div key={stIdx}>
                                <div className="text-lg font-extrabold">{st.value}</div>
                                <div className="text-[9px] opacity-75">{st.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Aesthetic final CTA */}
                  <div className="p-8 md:p-12 rounded-3xl border border-current/20 text-center space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-display font-bold ${currentTheme.heading}`}>Ready to take the leap?</h3>
                    <p className="text-xs md:text-sm opacity-80 max-w-md mx-auto">
                      Deploy this web page layout to any host or integrate directly with modern CMS platforms with single-click exporting.
                    </p>
                    <div className="pt-2">
                      <button className={`px-6 py-2.5 rounded-xl text-xs font-semibold ${currentTheme.buttonPrimary}`}>
                        Deploy to Vercel/Cloud Run
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right AI Copilot & Card Inspector Sidepanel */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950 flex flex-col shrink-0 overflow-y-auto p-4 space-y-6">
            
            {/* Inspector Header */}
            <div>
              <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                AI Formatting Copilot
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type instructions to rewrite, formatting details, or translate this specific card.
              </p>
            </div>

            {/* Selected Card Status */}
            {(() => {
              const selectedCard = activeWorkspace.cards.find(c => c.id === selectedCardId);
              if (!selectedCard) {
                return (
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center text-xs text-slate-500 bg-slate-100/30">
                    Please click or select a card on the left menu to focus formatting copilot.
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  {/* Info card display */}
                  <div className="p-3.5 rounded-xl border border-indigo-200/50 dark:border-indigo-900/40 bg-indigo-500/[0.04] text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-indigo-500" />
                      Active Target: "{selectedCard.title}"
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {selectedCard.content}
                    </p>
                  </div>

                  {/* AI Instruction command box */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Instruction to Gemini
                    </label>
                    <textarea
                      value={copilotCommand}
                      onChange={(e) => setCopilotCommand(e.target.value)}
                      placeholder="e.g. 'Add a 2-column comparison', 'Make it sound extremely visionary', 'Translate this block to French'"
                      rows={3}
                      className="w-full text-xs p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <button
                    onClick={handleCopilotRefactor}
                    disabled={isCopilotRefactoring || !copilotCommand.trim()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer disabled:opacity-50 transition-all active:scale-[0.98]"
                  >
                    {isCopilotRefactoring ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        AI Reconstructing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3.5 h-3.5" />
                        Refactor with Gemini
                      </>
                    )}
                  </button>

                  {/* Manual Formatting quick inject triggers */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Layout Injections
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const originalStats = selectedCard.stats || [];
                          const updated = originalStats.length > 0 ? [] : [
                            { value: '98%', label: 'Efficiency increase' },
                            { value: '3.4x', label: 'Speed growth factor' }
                          ];
                          handleUpdateCardField(selectedCard.id, 'stats', updated);
                        }}
                        className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-[10px] font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <BarChart3 className="w-3 h-3 text-emerald-500" />
                        {selectedCard.stats && selectedCard.stats.length > 0 ? 'Remove Stats' : 'Add Stat Nodes'}
                      </button>

                      <button
                        onClick={() => {
                          const originalCols = selectedCard.columns || [];
                          const updated = originalCols.length > 0 ? [] : [
                            { title: 'Core Benefit A', content: 'Describe first benefit segment in simple text here.' },
                            { title: 'Core Benefit B', content: 'Describe second benefit segment in simple text here.' }
                          ];
                          handleUpdateCardField(selectedCard.id, 'columns', updated);
                        }}
                        className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-[10px] font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <Columns className="w-3 h-3 text-indigo-500" />
                        {selectedCard.columns && selectedCard.columns.length > 0 ? 'Remove Columns' : 'Add 2 Columns'}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>

          {/* Fullscreen Interactive Presentation Slideshow overlay */}
          <AnimatePresence>
            {isPresenting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 select-none ${currentTheme.wrapper}`}
              >
                {/* Slideshow Top Controls */}
                <div className="flex items-center justify-between opacity-80 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wider">{activeWorkspace.name}</span>
                    <span>•</span>
                    <span>Live Presentation mode</span>
                  </div>
                  <button
                    onClick={() => setIsPresenting(false)}
                    className="p-2 rounded-lg bg-current/10 hover:bg-current/20 text-xs font-bold transition-all"
                  >
                    Close [ESC]
                  </button>
                </div>

                {/* Slides content body with animated entrance */}
                <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlideIdx}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`p-10 md:p-16 rounded-3xl min-h-[420px] flex flex-col justify-between shadow-2xl relative border border-current/10 ${currentTheme.card}`}
                    >
                      <div>
                        {/* Slide Category banner */}
                        <div className="flex items-center justify-between mb-8">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${currentTheme.badge}`}>
                            {activeWorkspace.cards[currentSlideIdx]?.icon || 'Presentation'}
                          </span>
                          <span className="text-xs font-mono opacity-50">Slide {currentSlideIdx + 1} of {activeWorkspace.cards.length}</span>
                        </div>

                        {/* Title */}
                        <h2 className={`text-3xl md:text-5xl font-display font-extrabold ${currentTheme.heading}`}>
                          {activeWorkspace.cards[currentSlideIdx]?.title}
                        </h2>

                        {/* Narrative Content */}
                        <p className="text-sm md:text-lg opacity-90 mt-6 leading-relaxed max-w-3xl">
                          {activeWorkspace.cards[currentSlideIdx]?.content}
                        </p>

                        {/* Grid indicators */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                          {activeWorkspace.cards[currentSlideIdx]?.bulletPoints && activeWorkspace.cards[currentSlideIdx].bulletPoints!.length > 0 && (
                            <div className="space-y-3">
                              {activeWorkspace.cards[currentSlideIdx].bulletPoints!.map((bp, bpIdx) => (
                                <div key={bpIdx} className="flex gap-3 text-sm leading-relaxed items-start">
                                  <span className="text-indigo-500 font-bold mt-1 shrink-0">•</span>
                                  <p className="opacity-90">{bp}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeWorkspace.cards[currentSlideIdx]?.stats && activeWorkspace.cards[currentSlideIdx].stats!.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                              {activeWorkspace.cards[currentSlideIdx].stats!.map((st, stIdx) => (
                                <div key={stIdx} className={`p-5 rounded-2xl border ${currentTheme.accent} flex flex-col justify-between`}>
                                  <span className="text-3xl md:text-4xl font-display font-black leading-none">{st.value}</span>
                                  <span className="text-[11px] md:text-xs opacity-75 mt-2 font-mono uppercase tracking-wider">{st.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeWorkspace.cards[currentSlideIdx]?.columns && activeWorkspace.cards[currentSlideIdx].columns!.length > 0 && (
                            <div className="grid grid-cols-2 gap-6 col-span-1 md:col-span-2 border-t border-current/10 pt-8 mt-4">
                              {activeWorkspace.cards[currentSlideIdx].columns!.map((col, colIdx) => (
                                <div key={colIdx} className="space-y-1.5">
                                  <h4 className="font-semibold text-sm">{col.title}</h4>
                                  <p className="text-xs opacity-80 leading-relaxed">{col.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Presentation bottom note */}
                      <div className="mt-8 pt-6 border-t border-current/5 flex items-center justify-between text-xs opacity-40 font-mono">
                        <span>Nova Slides Dynamic Canvas</span>
                        <span>Use Left / Right Arrows to navigate</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slideshow Bottom Navigation Bar */}
                <div className="flex items-center justify-between max-w-lg mx-auto w-full pt-4 opacity-90">
                  <button
                    onClick={() => {
                      if (currentSlideIdx > 0) setCurrentSlideIdx(prev => prev - 1);
                    }}
                    disabled={currentSlideIdx === 0}
                    className="p-3.5 rounded-full border border-current/30 hover:bg-current/10 disabled:opacity-30 cursor-pointer transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Indicator bubbles */}
                  <div className="flex items-center gap-2">
                    {activeWorkspace.cards.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentSlideIdx === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-current/30 hover:bg-current/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (currentSlideIdx < activeWorkspace.cards.length - 1) {
                        setCurrentSlideIdx(prev => prev + 1);
                      }
                    }}
                    disabled={currentSlideIdx === activeWorkspace.cards.length - 1}
                    className="p-3.5 rounded-full border border-current/30 hover:bg-current/10 disabled:opacity-30 cursor-pointer transition-all active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ) : (
        // ----------------------------------------------------
        // HOMEPAGE / GENERATOR ONBOARDING WIZARD VIEW
        // ----------------------------------------------------
        <div className="flex-1 overflow-y-auto px-4 py-8 md:p-12">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header Intro block */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-indigo-500/15 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                AI-Driven Interactive Media Suite
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Gamma.ai Generation Workspace
              </h1>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Generate visually spectacular presentations, beautiful scrolling documents, and responsive bento landing pages instantly from simple prompts. Customize outline first.
              </p>
            </div>

            {/* Generated Outline Editor view (Step 1.5) */}
            {generatedOutline ? (
              <div className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      Step 1: Review & Customize Outline
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Gemini has curated these sections. Rearrange, rename or add custom cards before card synthesis.
                    </p>
                  </div>
                  <button
                    onClick={() => setGeneratedOutline(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Workspace Name box */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Creation Title
                  </label>
                  <input
                    type="text"
                    value={outlineWorkspaceName}
                    onChange={(e) => setOutlineWorkspaceName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl bg-slate-100/50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                  />
                </div>

                {/* Editable Outlines items list */}
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {generatedOutline.map((point, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center">
                      <span className="text-xs font-mono font-bold text-slate-400 w-5 text-right">0{idx + 1}</span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleEditOutlinePoint(idx, e.target.value)}
                        className="flex-1 text-xs p-2.5 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleRemoveOutlinePoint(idx)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 shrink-0"
                        title="Remove Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Section button */}
                <button
                  onClick={handleAddOutlinePoint}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Section
                </button>

                {/* Final step buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
                  <button
                    onClick={handleGenerateContent}
                    disabled={isGeneratingContent || generatedOutline.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-md cursor-pointer disabled:opacity-50 active:scale-[0.98] transition-all"
                  >
                    {isGeneratingContent ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Synthesizing layouts & stats...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        Generate Final Media Workspace
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setGeneratedOutline(null)}
                    className="px-5 py-3 border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Step 1: Input Wizard
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Custom Creator Panel */}
                <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 shadow-xl space-y-6">
                  
                  {/* Select Format option */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      What are you creating today?
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { type: 'presentation' as GammaType, label: 'Presentation', sub: 'Slide deck', icon: Presentation },
                        { type: 'document' as GammaType, label: 'Document', sub: 'Briefing paper', icon: FileText },
                        { type: 'webpage' as GammaType, label: 'Webpage', sub: 'Bento landing', icon: Globe }
                      ].map(opt => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.type}
                            onClick={() => setInputType(opt.type)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all ${
                              inputType === opt.type
                                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/10'
                                : 'bg-slate-100/40 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <Icon className="w-5 h-5 text-indigo-500" />
                            <div>
                              <h4 className="font-bold text-xs">{opt.label}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">{opt.sub}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Topic Prompt */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Enter Topic or Prompt description
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. 'Startup pitch deck for an organic farm subscription box service with pricing tiers and growth stats...'"
                      rows={4}
                      className="w-full text-sm p-4 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  {/* Select Aesthetic Preset Theme */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Onboarding Preset Theme
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'charcoal' as GammaTheme, label: 'Charcoal', classes: 'bg-slate-950 border-slate-800 text-white' },
                        { id: 'elegance' as GammaTheme, label: 'Elegance', classes: 'bg-stone-100 border-stone-200 text-stone-800' },
                        { id: 'ocean' as GammaTheme, label: 'Ocean', classes: 'bg-sky-950 border-sky-800 text-sky-200' },
                        { id: 'emerald' as GammaTheme, label: 'Emerald', classes: 'bg-emerald-950 border-emerald-800 text-emerald-200' }
                      ].map(thm => (
                        <button
                          key={thm.id}
                          onClick={() => setInputTheme(thm.id)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                            inputTheme === thm.id
                              ? 'ring-2 ring-indigo-500 scale-[1.02]'
                              : 'opacity-70 hover:opacity-100'
                          } ${thm.classes}`}
                        >
                          {thm.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateOutline}
                    disabled={isGeneratingOutline || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/10 cursor-pointer disabled:opacity-50 transition-all active:scale-[0.98]"
                  >
                    {isGeneratingOutline ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Strategic Outline...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Outline with AI
                      </>
                    )}
                  </button>

                </div>

                {/* Ideas Prompt Suggestions & History Panel */}
                <div className="space-y-6">
                  
                  {/* Prompt Inspiration */}
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Inspiration Presets
                    </h4>
                    <div className="space-y-2.5">
                      {PROMPT_PRESETS.map((preset, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            setPrompt(preset.text);
                            setInputType(preset.type);
                          }}
                          className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-950 text-left border border-transparent hover:border-slate-200 dark:hover:border-white/5 cursor-pointer text-xs space-y-1"
                        >
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 justify-between">
                            <span>{preset.title}</span>
                            <span className="text-[9px] font-mono capitalize px-1 bg-indigo-500/10 text-indigo-500 border border-indigo-500/10 rounded">
                              {preset.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-500 truncate">{preset.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* My Gamma Creations list */}
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        My Creations ({workspaces.length})
                      </h4>
                      <span className="text-[10px] font-mono opacity-50">Local persistence</span>
                    </div>

                    {workspaces.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-500">
                        No creations generated yet. Enter a topic above to begin!
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {workspaces.map(ws => (
                          <div
                            key={ws.id}
                            onClick={() => setActiveWorkspaceId(ws.id)}
                            className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-100/20 dark:bg-slate-950/20 hover:bg-slate-100/60 dark:hover:bg-slate-950/60 flex items-center justify-between text-left cursor-pointer text-xs"
                          >
                            <div className="overflow-hidden pr-2 flex-1 space-y-0.5">
                              <h5 className="font-bold text-slate-800 dark:text-slate-200 truncate">{ws.name}</h5>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                <span className="capitalize">{ws.type}</span>
                                <span>•</span>
                                <span className="font-mono text-[9px]">Theme: {ws.theme}</span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteWorkspace(ws.id, e)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
