import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Plus, Trash2, Edit3, User, Sparkles, Check, LogOut, 
  Settings, ShieldAlert, Bell, Sun, Moon, Search, Compass, ChevronRight, LayoutDashboard, CreditCard, X,
  BookOpen, Headphones, Code, Presentation, Globe, Bot, Monitor, Flame, Share2, Smartphone, Database, FolderOpen, FileText, Key, QrCode, LogIn, Crown,
  Brain, Wand2, Film, PenTool, Video, ChevronUp, ChevronDown, Lock, ArrowUp, ArrowDown, Zap, Layers, Sparkle,
  Heart, Image, Clapperboard, Palette, Radio, FileSpreadsheet, Eye, Scissors,
  GraduationCap, Calculator, Cpu, ShieldCheck, CheckCircle, Terminal, Rocket, FileCode, Mic, Volume2, Music, Workflow, ArrowRight,
  SlidersHorizontal, Activity
} from 'lucide-react';
import { Chat, User as UserType, SystemNotification, isUltraHighPremium, getTrialInfo, isStudentUser } from '../types';
import { toast } from '../utils/toast';

interface SidebarProps {
  user: UserType | null;
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
  onRenameChat: (chatId: string, title: string) => void;
  onDeleteChat: (chatId: string) => void;
  onOpenShareModal?: (chat: Chat) => void;
  onOpenSettings: () => void;
  onOpenPricing: (tab?: 'plans' | 'checkout' | 'account', tier?: 'Pro' | 'Premium' | 'Ultra Premium') => void;
  onOpenAdmin: () => void;
  onOpenSpecialAdmin?: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  themeMode: 'light' | 'dark' | 'auto';
  onSetActiveTab: (tab: string) => void;
  activeTab: string;
}

export default function Sidebar({
  user,
  chats,
  activeChatId,
  onSelectChat,
  onCreateChat,
  onRenameChat,
  onDeleteChat,
  onOpenShareModal,
  onOpenSettings,
  onOpenPricing,
  onOpenAdmin,
  onOpenSpecialAdmin,
  onLogout,
  onOpenAuth,
  isDarkMode,
  onToggleTheme,
  themeMode,
  onSetActiveTab,
  activeTab
}: SidebarProps) {
  const [search, setSearch] = useState('');
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  
  // Navigation scroll state & progress
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [navSectionFilter, setNavSectionFilter] = useState<'all' | 'ultra' | 'chats'>('all');

  const isUltraUser = isUltraHighPremium(user);

  // Fetch Notifications
  useEffect(() => {
    if (user) {
      fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      })
        .then(res => res.json())
        .then((data: SystemNotification[]) => {
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.isRead).length);
        })
        .catch(() => {});
    }
  }, [user]);

  const markNotifRead = async () => {
    if (!user) return;
    try {
      await fetch('/api/notifications/read', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (e) {}
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartRename = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveRename = (chatId: string) => {
    if (editTitle.trim()) {
      onRenameChat(chatId, editTitle.trim());
    }
    setEditingChatId(null);
  };

  // Scroll listener for progress & indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress((scrollTop / maxScroll) * 100);
      setCanScrollUp(scrollTop > 20);
      setCanScrollDown(scrollTop < maxScroll - 20);
    } else {
      setScrollProgress(0);
      setCanScrollUp(false);
      setCanScrollDown(false);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -260, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 260, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Ultra High Premium Suite Tool Items
  const ultraAiTools = [
    {
      id: 'claude',
      title: 'Claude 3.7 Sonnet',
      desc: 'Extended Thinking & Live Artifacts',
      icon: <Brain className="w-4 h-4 text-amber-500" />,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
      activeClass: 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-400 dark:border-amber-700/60 shadow-sm'
    },
    {
      id: 'nanobanana',
      title: 'NanoBanana.ai',
      desc: 'Hyper-Fast Video & Photo Gen',
      icon: <Wand2 className="w-4 h-4 text-yellow-500" />,
      badgeColor: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-300 border-yellow-500/30',
      activeClass: 'bg-yellow-500/15 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-300 border-yellow-400 dark:border-yellow-700/60 shadow-sm'
    },
    {
      id: 'highsfield',
      title: 'Highsfield Cinema',
      desc: 'Generative Cinematic Video AI',
      icon: <Film className="w-4 h-4 text-cyan-500" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'figma',
      title: 'Figma.ai Canvas',
      desc: 'Vector UI/UX Component Generator',
      icon: <PenTool className="w-4 h-4 text-purple-500" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'heygen',
      title: 'HeyGen.ai Avatars',
      desc: 'Multilingual Voice & Video Studio',
      icon: <Video className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'cursor',
      title: 'Cursor.ai IDE',
      desc: 'Full-Stack Autonomous Code Studio',
      icon: <Code className="w-4 h-4 text-indigo-500" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'notebooklm',
      title: 'NotebookLM.ai',
      desc: 'Audio Deep-Dive & PDF Synthesizer',
      icon: <Headphones className="w-4 h-4 text-violet-500" />,
      badgeColor: 'bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/30',
      activeClass: 'bg-violet-500/15 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border-violet-400 dark:border-violet-700/60 shadow-sm'
    },
    {
      id: 'gamma',
      title: 'Gamma.ai Engine',
      desc: 'Interactive Slide Decks & Docs',
      icon: <Presentation className="w-4 h-4 text-pink-500" />,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
      activeClass: 'bg-pink-500/15 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-400 dark:border-pink-700/60 shadow-sm'
    },
    {
      id: 'perplexity',
      title: 'Perplexity Search',
      desc: 'Real-Time Web Intelligence & Citations',
      icon: <Globe className="w-4 h-4 text-teal-500" />,
      badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
      activeClass: 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-400 dark:border-teal-700/60 shadow-sm'
    },
    {
      id: 'openai',
      title: 'ChatGPT 6 Astra & OpenAI',
      desc: 'Frontier Astra Omnimodal & GPT-4o',
      icon: <Bot className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'grok',
      title: 'Grok 3 Realtime',
      desc: 'Live Telemetry & Raw Computing Power',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'lovable',
      title: 'Lovable.ai Studio',
      desc: 'Autonomous Web App Builder',
      icon: <Heart className="w-4 h-4 text-pink-500" />,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
      activeClass: 'bg-pink-500/15 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-400 dark:border-pink-700/60 shadow-sm'
    },
    {
      id: 'midjourney',
      title: 'Midjourney v6.1',
      desc: 'Photorealistic Generative Art',
      icon: <Sparkle className="w-4 h-4 text-cyan-500" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'runway',
      title: 'Runway Gen-3',
      desc: '4K Cinematic Video AI & Camera Paths',
      icon: <Clapperboard className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'google_slides',
      title: 'Google Slides AI',
      desc: 'Slide Deck & Pitch Presentation Copilot',
      icon: <Presentation className="w-4 h-4 text-amber-500" />,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
      activeClass: 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-400 dark:border-amber-700/60 shadow-sm'
    },
    {
      id: 'khanmigo',
      title: 'Khanmigo AI',
      desc: 'Socratic Education & Math Copilot',
      icon: <GraduationCap className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'quizlet',
      title: 'Quizlet AI Q-Chat',
      desc: 'Adaptive Flashcards & Active Recall',
      icon: <BookOpen className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'photomath',
      title: 'Photomath AI',
      desc: 'OCR Math Steps & Graph Projection',
      icon: <Calculator className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'wolfram_alpha',
      title: 'Wolfram|Alpha Pro',
      desc: 'Computational Symbolic Knowledge Engine',
      icon: <Cpu className="w-4 h-4 text-amber-500" />,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
      activeClass: 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-400 dark:border-amber-700/60 shadow-sm'
    },
    {
      id: 'google_scholar',
      title: 'Google Scholar Copilot',
      desc: '200M+ Academic Papers & Citations',
      icon: <Search className="w-4 h-4 text-sky-500" />,
      badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
      activeClass: 'bg-sky-500/15 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-400 dark:border-sky-700/60 shadow-sm'
    },
    {
      id: 'elicit',
      title: 'Elicit AI Research',
      desc: 'Systematic Literature Review Matrix',
      icon: <FileText className="w-4 h-4 text-purple-500" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'consensus',
      title: 'Consensus.app',
      desc: 'Scientific Consensus Percentage Meter',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'semantic_scholar',
      title: 'Semantic Scholar AI',
      desc: 'Semantic Citation Graphs & TLDRs',
      icon: <Layers className="w-4 h-4 text-teal-500" />,
      badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
      activeClass: 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-400 dark:border-teal-700/60 shadow-sm'
    },
    {
      id: 'scite',
      title: 'Scite.ai Citations',
      desc: 'Supporting vs Contrasting Citation Context',
      icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'connected_papers',
      title: 'Connected Papers',
      desc: 'Visual 2D Topological Research Graph',
      icon: <Globe className="w-4 h-4 text-pink-500" />,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
      activeClass: 'bg-pink-500/15 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-400 dark:border-pink-700/60 shadow-sm'
    },
    {
      id: 'github_copilot',
      title: 'GitHub Copilot',
      desc: 'Multi-File Autocomplete & Unit Tests',
      icon: <Code className="w-4 h-4 text-indigo-500" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'claude_code',
      title: 'Claude Code CLI',
      desc: 'Autonomous Terminal Coding Agent',
      icon: <Terminal className="w-4 h-4 text-amber-500" />,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
      activeClass: 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-400 dark:border-amber-700/60 shadow-sm'
    },
    {
      id: 'replit_agent',
      title: 'Replit Agent',
      desc: 'Prompt to Live Full-Stack Cloud App',
      icon: <Rocket className="w-4 h-4 text-red-500" />,
      badgeColor: 'bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/30',
      activeClass: 'bg-red-500/15 dark:bg-red-950/40 text-red-600 dark:text-red-300 border-red-400 dark:border-red-700/60 shadow-sm'
    },
    {
      id: 'windsurf',
      title: 'Windsurf AI (Cascade)',
      desc: 'Deep Codebase Indexing & Cascade Flow',
      icon: <Zap className="w-4 h-4 text-cyan-500" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'continue_dev',
      title: 'Continue.dev IDE',
      desc: 'Open-Source Local Ollama & VS Code Copilot',
      icon: <FileCode className="w-4 h-4 text-indigo-400" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'tabnine',
      title: 'Tabnine Enterprise',
      desc: 'Air-Gapped Private Code Assistant',
      icon: <ShieldAlert className="w-4 h-4 text-purple-400" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'aider',
      title: 'Aider AI Pair',
      desc: 'Terminal Git Pair Programmer',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'hugging_face',
      title: 'Hugging Face Hub',
      desc: '1M+ Open-Source Models & GPU Spaces',
      icon: <Bot className="w-4 h-4 text-yellow-500" />,
      badgeColor: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-300 border-yellow-500/30',
      activeClass: 'bg-yellow-500/15 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-300 border-yellow-400 dark:border-yellow-700/60 shadow-sm'
    },
    {
      id: 'google_colab',
      title: 'Google Colab Pro',
      desc: 'Interactive Python Jupyter Notebooks & GPUs',
      icon: <Cpu className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'bolt_new',
      title: 'Bolt.new Autonomous',
      desc: 'In-Browser WebContainers Full-Stack Apps',
      icon: <Zap className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'softr',
      title: 'Softr.io Web Portal',
      desc: 'Airtable & Sheets to Client Portals',
      icon: <LayoutDashboard className="w-4 h-4 text-pink-500" />,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
      activeClass: 'bg-pink-500/15 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-400 dark:border-pink-700/60 shadow-sm'
    },
    {
      id: 'bubble',
      title: 'Bubble.io AI',
      desc: 'Visual Relational Database & Workflows',
      icon: <Database className="w-4 h-4 text-indigo-500" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'glide',
      title: 'Glide Apps AI',
      desc: 'Spreadsheet to Mobile PWA with Barcode OCR',
      icon: <Smartphone className="w-4 h-4 text-cyan-500" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'base44',
      title: 'Base44 Builder',
      desc: 'Autonomous Full-Stack Software Synthesizer',
      icon: <Layers className="w-4 h-4 text-purple-500" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'vercel_v0',
      title: 'v0 by Vercel',
      desc: 'Generative UI with shadcn/ui & Tailwind',
      icon: <Code className="w-4 h-4 text-slate-300" />,
      badgeColor: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
      activeClass: 'bg-slate-500/15 dark:bg-slate-900/40 text-white border-slate-400 shadow-sm'
    },
    {
      id: 'adobe_firefly',
      title: 'Adobe Firefly 3',
      desc: 'Commercial-Safe Generative Fill & Vector SVG',
      icon: <Palette className="w-4 h-4 text-red-500" />,
      badgeColor: 'bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/30',
      activeClass: 'bg-red-500/15 dark:bg-red-950/40 text-red-600 dark:text-red-300 border-red-400 dark:border-red-700/60 shadow-sm'
    },
    {
      id: 'ideogram',
      title: 'Ideogram v2.0',
      desc: 'Flawless Typography & Graphic Posters',
      icon: <Sparkles className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'leonardo_ai',
      title: 'Leonardo AI Phoenix',
      desc: 'Game Assets & Production Transparent PNGs',
      icon: <Palette className="w-4 h-4 text-purple-500" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'canva_magic',
      title: 'Canva Magic Studio',
      desc: 'Magic Resize, Eraser & Social Media Kit',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'krea_ai',
      title: 'Krea.ai Realtime Canvas',
      desc: 'Real-Time Latent Brush Painting & 4K',
      icon: <Wand2 className="w-4 h-4 text-teal-400" />,
      badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
      activeClass: 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-400 dark:border-teal-700/60 shadow-sm'
    },
    {
      id: 'freepik_ai',
      title: 'Freepik Mystic AI',
      desc: 'Stock Vectors & Photorealistic Mockups',
      icon: <Image className="w-4 h-4 text-blue-400" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'synthesia',
      title: 'Synthesia Video Studio',
      desc: '140+ Presenter Avatars in 130+ Languages',
      icon: <Video className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'pika',
      title: 'Pika 2.0 Pikaffects',
      desc: 'Surreal Physics Video & Audio SFX',
      icon: <Video className="w-4 h-4 text-violet-500" />,
      badgeColor: 'bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/30',
      activeClass: 'bg-violet-500/15 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border-violet-400 dark:border-violet-700/60 shadow-sm'
    },
    {
      id: 'kling_ai',
      title: 'Kling AI 1.5 HD',
      desc: 'High-Motion Physical Simulation Video',
      icon: <Film className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'google_flow',
      title: 'Google Veo / Flow AI',
      desc: 'DeepMind 1080p Foundation Video Model',
      icon: <Video className="w-4 h-4 text-amber-500" />,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
      activeClass: 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-400 dark:border-amber-700/60 shadow-sm'
    },
    {
      id: 'luma_ai',
      title: 'Luma Dream Machine',
      desc: 'Interactive 3D Gaussian Splats & Video',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'invideo_ai',
      title: 'InVideo AI 2.0',
      desc: 'Script-to-Video with Voiceover & Media',
      icon: <Clapperboard className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'descript',
      title: 'Descript AI Editor',
      desc: 'Text-Based Video Editor & 1-Click Filler Removal',
      icon: <Mic className="w-4 h-4 text-teal-400" />,
      badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
      activeClass: 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-400 dark:border-teal-700/60 shadow-sm'
    },
    {
      id: 'opus_clip',
      title: 'OpusClip 3.0',
      desc: 'Long Video into Viral Shorts with Virality Score',
      icon: <Scissors className="w-4 h-4 text-pink-500" />,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
      activeClass: 'bg-pink-500/15 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-400 dark:border-pink-700/60 shadow-sm'
    },
    {
      id: 'premiere_pro',
      title: 'Adobe Premiere Pro',
      desc: 'Multi-Track Timeline, Lumetri Color & AI Captions',
      icon: <Film className="w-4 h-4 text-indigo-400" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'davinci_resolve',
      title: 'DaVinci Resolve Studio',
      desc: 'Hollywood Color Wheels, Fairlight Audio & Fusion Nodes',
      icon: <SlidersHorizontal className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'capcut',
      title: 'CapCut Pro Editor',
      desc: 'Viral Auto-Captions, Speed Ramping & 9:16 Shorts',
      icon: <Scissors className="w-4 h-4 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'notion_ai',
      title: 'Notion AI Q&A',
      desc: 'Connected Workspace Knowledge Base',
      icon: <BookOpen className="w-4 h-4 text-slate-300" />,
      badgeColor: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
      activeClass: 'bg-slate-500/15 dark:bg-slate-900/40 text-white border-slate-400 shadow-sm'
    },
    {
      id: 'otter_ai',
      title: 'Otter.ai Meetings',
      desc: 'Live Meeting Recording & Slack Action Summaries',
      icon: <Headphones className="w-4 h-4 text-sky-400" />,
      badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
      activeClass: 'bg-sky-500/15 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-400 dark:border-sky-700/60 shadow-sm'
    },
    {
      id: 'powerpoint_ai',
      title: 'PowerPoint Copilot',
      desc: 'Word Docs to Corporate Master Slide Decks',
      icon: <Presentation className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'beautiful_ai',
      title: 'Beautiful.ai Slides',
      desc: 'Design-Rule Adaptive Pitch Decks',
      icon: <Presentation className="w-4 h-4 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      activeClass: 'bg-cyan-500/15 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-400 dark:border-cyan-700/60 shadow-sm'
    },
    {
      id: 'prezi_ai',
      title: 'Prezi AI Presenter',
      desc: 'Non-Linear 3D Zooming Spatial Presentations',
      icon: <Globe className="w-4 h-4 text-indigo-400" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'grammarly',
      title: 'Grammarly Pro AI',
      desc: 'Executive Tone Rewrite & Clarity Score',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'quillbot',
      title: 'QuillBot AI',
      desc: '7-Mode Paraphraser & Freeze Words',
      icon: <FileText className="w-4 h-4 text-green-400" />,
      badgeColor: 'bg-green-500/15 text-green-600 dark:text-green-300 border-green-500/30',
      activeClass: 'bg-green-500/15 dark:bg-green-950/40 text-green-600 dark:text-green-300 border-green-400 dark:border-green-700/60 shadow-sm'
    },
    {
      id: 'wordtune',
      title: 'Wordtune Spices',
      desc: 'Contextual Rewriter & Statistical Spices',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'elevenlabs',
      title: 'ElevenLabs Voice v3',
      desc: 'Lossless 48kHz Voice Cloning & Dubbing',
      icon: <Volume2 className="w-4 h-4 text-indigo-400" />,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
      activeClass: 'bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700/60 shadow-sm'
    },
    {
      id: 'suno_ai',
      title: 'Suno AI v4',
      desc: 'Broadcast-Ready Full Songs & Vocals',
      icon: <Music className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'udio_ai',
      title: 'Udio AI 1.5 Pro',
      desc: 'Pro Harmonics & Stem Separation',
      icon: <Music className="w-4 h-4 text-violet-400" />,
      badgeColor: 'bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/30',
      activeClass: 'bg-violet-500/15 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border-violet-400 dark:border-violet-700/60 shadow-sm'
    },
    {
      id: 'zapier_central',
      title: 'Zapier Central AI',
      desc: '6,000+ App Autonomous Multi-Step Zaps',
      icon: <Workflow className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'make_com',
      title: 'Make.com AI',
      desc: 'Visual Multi-Branch Workflow Scenarios',
      icon: <Workflow className="w-4 h-4 text-purple-500" />,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
      activeClass: 'bg-purple-500/15 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 shadow-sm'
    },
    {
      id: 'n8n_ai',
      title: 'n8n AI Agents',
      desc: 'Self-Hosted Fair-Code LangChain Workflows',
      icon: <Workflow className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'reccloud',
      title: 'RecCloud Audio & Subs',
      desc: 'Speech-to-Text & Diarization AI',
      icon: <Radio className="w-4 h-4 text-blue-500" />,
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      activeClass: 'bg-blue-500/15 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-400 dark:border-blue-700/60 shadow-sm'
    },
    {
      id: 'ms_designer',
      title: 'Microsoft Designer',
      desc: 'Brand Kits & Social Post Creator',
      icon: <Palette className="w-4 h-4 text-sky-500" />,
      badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
      activeClass: 'bg-sky-500/15 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-400 dark:border-sky-700/60 shadow-sm'
    },
    {
      id: 'virality_ai',
      title: 'ViralityAI Engine',
      desc: 'Viral Shorts & Hook Predictor',
      icon: <Zap className="w-4 h-4 text-rose-500" />,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
      activeClass: 'bg-rose-500/15 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-400 dark:border-rose-700/60 shadow-sm'
    },
    {
      id: 'bardeen',
      title: 'Bardeen Automation',
      desc: 'Browser Workflow & CRM Scraping',
      icon: <Layers className="w-4 h-4 text-orange-500" />,
      badgeColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
      activeClass: 'bg-orange-500/15 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-400 dark:border-orange-700/60 shadow-sm'
    },
    {
      id: 'laxis',
      title: 'Laxis AI Assistant',
      desc: 'Autonomous Meeting Intelligence',
      icon: <FileSpreadsheet className="w-4 h-4 text-teal-500" />,
      badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
      activeClass: 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-400 dark:border-teal-700/60 shadow-sm'
    },
    {
      id: 'photopea',
      title: 'Photopea AI Studio',
      desc: 'Cloud PSD & Vector Inpainting',
      icon: <Scissors className="w-4 h-4 text-emerald-500" />,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      activeClass: 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700/60 shadow-sm'
    },
    {
      id: 'tenweb',
      title: '10Web AI WordPress',
      desc: 'Instant 90+ PageSpeed WP Builder',
      icon: <Globe className="w-4 h-4 text-violet-500" />,
      badgeColor: 'bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/30',
      activeClass: 'bg-violet-500/15 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border-violet-400 dark:border-violet-700/60 shadow-sm'
    },
    {
      id: 'icons8',
      title: 'Icons8 Pichon AI',
      desc: '3D Illustrations & Vector Assets',
      icon: <Eye className="w-4 h-4 text-yellow-500" />,
      badgeColor: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-300 border-yellow-500/30',
      activeClass: 'bg-yellow-500/15 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-300 border-yellow-400 dark:border-yellow-700/60 shadow-sm'
    },
    {
      id: 'universal_db',
      title: 'Universal Database ♾️',
      desc: '402 Global Engines & Firestore Cluster',
      icon: <Database className="w-4 h-4 text-amber-500 animate-pulse" />,
      badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40',
      activeClass: 'bg-amber-500/20 dark:bg-amber-950/50 text-amber-500 dark:text-amber-300 border-amber-400 dark:border-amber-600 shadow-sm'
    }
  ];

  return (
    <div id="sidebar" className="flex flex-col h-full w-full glass-sidebar text-slate-800 dark:text-slate-100 border-r border-slate-200/80 dark:border-white/5 shadow-md select-none relative">
      
      {/* Brand Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-200/60 dark:border-white/5 shrink-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        <div 
          onClick={() => onSetActiveTab('chat')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-white dark:via-purple-200 dark:to-indigo-300 leading-none">
                Nova AI
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-black tracking-wider uppercase font-mono">
                ULTRA
              </span>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide font-mono mt-0.5">
              by Shelby.ai
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Upgrade Membership Button */}
          <button
            onClick={() => onOpenPricing('plans')}
            className="p-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 text-amber-600 dark:text-amber-400 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            title="Upgrade Membership & Ultra High Plans"
          >
            <Crown className="w-4 h-4 text-amber-500" />
          </button>

          {/* Sign In / Login OR Logout Button */}
          {!user ? (
            <button
              onClick={onOpenAuth}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1 text-xs font-bold shadow-sm shadow-indigo-600/20 cursor-pointer active:scale-95"
              title="Sign In / Login"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={onLogout}
              className="p-2 rounded-xl hover:bg-rose-500/15 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center justify-center cursor-pointer"
              title="Logout from account"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          {/* Notification Indicator */}
          {user && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  if (!showNotifMenu) markNotifRead();
                }}
                className="p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass shadow-2xl p-4 border border-white/20 dark:border-white/10 z-50 text-slate-800 dark:text-slate-100 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h3 className="font-bold text-sm font-display flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-indigo-500" />
                      Notifications
                    </h3>
                    <button onClick={() => setShowNotifMenu(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No notifications yet</p>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notif, idx) => (
                        <div key={notif.id && notif.id !== 'undefined' ? notif.id : `notif-fallback-${idx}`} className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 text-xs border border-slate-200/50 dark:border-white/5">
                          <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            {notif.type === 'success' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                            {notif.type === 'info' && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                            {notif.title}
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] leading-relaxed">{notif.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors text-slate-500 dark:text-slate-400 flex items-center justify-center cursor-pointer"
            title={`Theme: ${themeMode === 'auto' ? 'System Auto' : themeMode === 'dark' ? 'Dark Cosmic' : 'Solar Light'} (Click to cycle)`}
          >
            {themeMode === 'dark' && <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
            {themeMode === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {themeMode === 'auto' && <Monitor className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
          </button>

          {/* Upper Right Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-500 dark:text-slate-400 flex items-center justify-center cursor-pointer"
            title="Settings & Profile"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Quick Scroll Control Bar (Scroll Up / Scroll Down & Section Jumps) */}
      <div className="px-3 py-2 bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2 shrink-0 text-xs">
        <div className="flex items-center gap-1 min-w-0">
          <button
            onClick={() => onSetActiveTab('super-ai-catalog')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'super-ai-catalog'
                ? 'bg-amber-500 text-white border-amber-400 shadow-xs'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
            title="Open 1,970+ Master AI Systems Directory"
          >
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>1.9K AI</span>
          </button>
          <button
            onClick={() => onSetActiveTab('ai-health')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'ai-health'
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            }`}
            title="Open Real-time AI Health Dashboard"
          >
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Health</span>
          </button>
          <button
            onClick={() => onSetActiveTab('gods-eye')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'gods-eye' || activeTab === 'gods-eye-view'
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-xs'
                : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-300 border-cyan-500/30'
            }`}
            title="Open God's Eye 3D View — Geospatial Intelligence & Spy Satellite Console"
          >
            <Globe className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>God's Eye 3D</span>
          </button>
          <button
            onClick={() => scrollToSection('section-primary-tools')}
            className="px-2 py-1 rounded-lg bg-white/70 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/5 transition-all flex items-center gap-1 cursor-pointer"
            title="Jump to Creative Tools"
          >
            <Compass className="w-3 h-3 text-indigo-500" />
            <span>Tools</span>
          </button>
          <button
            onClick={() => scrollToSection('section-ultra-ai')}
            className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all flex items-center gap-1 cursor-pointer"
            title="Jump to Ultra High AI Suite"
          >
            <Crown className="w-3 h-3 text-amber-500" />
            <span>Ultra AI</span>
          </button>
          <button
            onClick={() => scrollToSection('section-chats-history')}
            className="px-2 py-1 rounded-lg bg-white/70 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/5 transition-all flex items-center gap-1 cursor-pointer"
            title="Jump to Chat Conversations"
          >
            <MessageSquare className="w-3 h-3 text-purple-500" />
            <span>Chats</span>
          </button>
        </div>

        {/* Middle Right: Scroll Progress Bar Indicator + Scroll Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Middle-Right Progress Bar */}
          <div 
            className="flex items-center gap-1.5 bg-white/70 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-200/70 dark:border-white/10 shadow-xs"
            title={`Navigation scroll position: ${Math.round(scrollProgress)}%`}
          >
            <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              {Math.round(scrollProgress)}%
            </span>
            <div className="w-10 sm:w-14 h-1.5 bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Scroll Up and Down Buttons */}
          <div className="flex items-center gap-1 bg-white/60 dark:bg-slate-800/60 p-0.5 rounded-lg border border-slate-200/80 dark:border-white/5">
            <button
              onClick={scrollUp}
              className="p-1 rounded hover:bg-indigo-500 hover:text-white text-slate-600 dark:text-slate-300 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              title="Scroll Menu Up"
              aria-label="Scroll menu up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-700" />
            <button
              onClick={scrollDown}
              className="p-1 rounded hover:bg-indigo-500 hover:text-white text-slate-600 dark:text-slate-300 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              title="Scroll Menu Down"
              aria-label="Scroll menu down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Expanded Scrollable Navigation Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        {/* New Chat Primary Action Button (Expanded Area) */}
        {user ? (
          <div className="space-y-2">
            <button
              onClick={() => {
                onCreateChat();
                onSetActiveTab('chat');
              }}
              className="w-full min-h-[48px] flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98] cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="leading-tight text-sm font-bold">New Conversation</span>
                  <span className="text-[10px] text-white/80 font-normal">Start clean AI thread</span>
                </div>
              </span>
              <kbd className="hidden sm:inline-flex items-center h-5 select-none rounded bg-white/20 px-2 font-mono text-[10px] font-bold text-white/90">
                ⌘N
              </kbd>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full min-h-[48px] py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 text-sm transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Unlock Nova Suite</span>
          </button>
        )}

        {/* SECTION 1: Core Creative & Media Studio (Expanded 2-column & full-width buttons) */}
        <div id="section-primary-tools" className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between px-1 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              Creative Studio
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              Core
            </span>
          </div>

          {/* 451 Master AI Systems Directory Banner */}
          <button
            onClick={() => onSetActiveTab('super-ai-catalog')}
            className={`w-full mb-2 p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'super-ai-catalog'
                ? 'bg-gradient-to-r from-amber-950/90 via-purple-950/80 to-indigo-900 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                : 'bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900/60 hover:from-amber-950/60 hover:to-slate-900/80 border-amber-500/30 text-slate-200'
            }`}
            title="Browse All 1,970+ AI Models & Software Platforms"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 animate-pulse text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black tracking-tight text-white">Super AI Directory</p>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 font-mono">1,970+ APPS</span>
                </div>
                <p className="text-[10px] text-amber-300/80 truncate">Search, test & compare 1,970+ tools</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
          </button>

          {/* God's Eye 3D View Primary Access Card */}
          <button
            onClick={() => onSetActiveTab('gods-eye')}
            className={`w-full mb-2 p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'gods-eye' || activeTab === 'gods-eye-view'
                ? 'bg-gradient-to-r from-cyan-950/90 via-slate-900 to-indigo-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/60 hover:from-cyan-950/60 hover:to-slate-900/80 border-cyan-500/30 text-slate-200'
            }`}
            title="God's Eye 3D View - Real-time Geospatial Intelligence & Spy Satellites"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black tracking-tight text-white">God's Eye 3D View</p>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 font-mono">SPY SAT 3D</span>
                </div>
                <p className="text-[10px] text-cyan-300/80 truncate">Live Flights · Ships · USGS · Cockpit HUD</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          </button>

          {/* Nova Banner Hero Quick Access Banner */}
          <button
            onClick={() => onSetActiveTab('banner')}
            className={`w-full mb-2 p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'banner'
                ? 'bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 hover:from-indigo-950/60 hover:to-slate-900/80 border-indigo-500/30 text-slate-200'
            }`}
            title="Nova.ai Banner - View Full High-Tech Hero Canvas"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black tracking-tight text-white">Nova.ai Banner</p>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 font-mono">16:9</span>
                </div>
                <p className="text-[10px] text-indigo-300 truncate">One Platform. Infinite Possibilities.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* AI Image Studio */}
            <button
              onClick={() => onSetActiveTab('image-generator')}
              className={`min-h-[50px] p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'image-generator'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
              }`}
              title="AI Image Studio - Generate high-resolution visuals"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">Image Studio</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Create & Edit</p>
              </div>
            </button>

            {/* QR Studio */}
            <button
              onClick={() => onSetActiveTab('qr-generator')}
              className={`min-h-[50px] p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'qr-generator'
                  ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-600 dark:text-pink-300 shadow-sm'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
              }`}
              title="QR Studio - Custom Vector QR generator"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 dark:bg-pink-900/40 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4 text-pink-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">QR Studio</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Smart QR Code</p>
              </div>
            </button>

            {/* Visual Gallery */}
            <button
              onClick={() => onSetActiveTab('gallery')}
              className={`min-h-[50px] p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-300 shadow-sm'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
              }`}
              title="Gallery - Saved PDFs and image assets"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                <FolderOpen className="w-4 h-4 text-purple-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">Gallery</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">PDF & Assets</p>
              </div>
            </button>

            {/* Universal Library */}
            <button
              onClick={() => onSetActiveTab('library')}
              className={`min-h-[50px] p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
              }`}
              title="Universal Library - Curated books and reading data"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">Library</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Curated Books</p>
              </div>
            </button>
          </div>
        </div>

        {/* SECTION 2: Ultra High Premium AI Suite (Expanded Button Area & Exclusive Gating) */}
        <div id="section-ultra-ai" className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Ultra High AI Suite
              </span>
            </div>
            {isUltraUser ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono font-bold flex items-center gap-1">
                <Check className="w-2.5 h-2.5" /> UNLOCKED
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-mono font-bold flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> ULTRA ONLY
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            {ultraAiTools.map((tool) => {
              const isActive = activeTab === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => onSetActiveTab(tool.id)}
                  className={`w-full min-h-[48px] p-2.5 sm:p-3 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                    isActive
                      ? tool.activeClass
                      : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
                  }`}
                  title={`${tool.title} - ${tool.desc} (Ultra High Premium Exclusive)`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          {tool.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tier Access Badge */}
                  <div className="shrink-0 flex items-center gap-1">
                    {isUltraUser ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-400/40 font-mono font-bold">
                        ULTRA
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 font-mono font-bold flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-amber-500" />
                        <span>VIP</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Systems & Data Utilities (Expanded Area) */}
        <div id="section-system-tools" className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-orange-500" />
              Systems & Telemetry
            </span>
          </div>

          {/* Linux Software Center */}
          <button
            onClick={() => onSetActiveTab('linux-software')}
            className={`w-full min-h-[46px] p-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'linux-software'
                ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-600 dark:text-orange-300 shadow-sm'
                : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
            }`}
            title="Linux Software Center & Terminal Utilities"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-900/40 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4 text-orange-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">Linux Software Suite</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Debian & CLI Center</p>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold">
              SYS
            </span>
          </button>

          {/* Number Tracker */}
          <button
            onClick={() => onSetActiveTab('number-tracker')}
            className={`w-full min-h-[46px] p-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'number-tracker'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
            }`}
            title="Number & IP Tracker - Telecom security & lookup"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">Number & IP Tracker</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Carrier Intelligence</p>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
              INTEL
            </span>
          </button>

          {/* Real-time AI Health Dashboard */}
          <button
            onClick={() => onSetActiveTab('ai-health')}
            className={`w-full min-h-[46px] p-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'ai-health'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 shadow-sm'
                : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-white/5 text-slate-700 dark:text-slate-200'
            }`}
            title="Real-time AI Health Dashboard - Live latency & uptime tracking"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">AI Health Dashboard</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">Live Latency & Uptime</p>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </span>
          </button>
        </div>

        {/* SECTION 4: Chat History & Active Conversations */}
        <div id="section-chats-history" className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
              Conversations ({chats.length})
            </span>
            <button
              onClick={scrollToTop}
              className="text-[10px] font-mono text-slate-400 hover:text-indigo-500 flex items-center gap-0.5 cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
              Top
            </button>
          </div>

          {/* Search Bar */}
          {user && chats.length > 0 && (
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter conversations..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-200/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="space-y-1">
            {user ? (
              filteredChats.length === 0 ? (
                <div className="text-center py-6 px-4 text-slate-400 dark:text-slate-500">
                  <MessageSquare className="w-6 h-6 mx-auto stroke-[1.5] mb-1.5 opacity-50" />
                  <p className="text-xs">No conversations found</p>
                </div>
              ) : (
                filteredChats.map((chat, idx) => {
                  const isActive = chat.id === activeChatId && activeTab === 'chat';
                  const isEditing = chat.id === editingChatId;
                  const chatKey = chat.id && chat.id !== 'undefined' ? chat.id : `chat-fallback-${idx}`;

                  return (
                    <div
                      key={chatKey}
                      onClick={() => {
                        onSetActiveTab('chat');
                        onSelectChat(chat.id);
                      }}
                      className={`group relative min-h-[42px] flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs transition-all ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-indigo-900/40 shadow-sm'
                          : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/50 border border-transparent text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                      
                      {isEditing ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => handleSaveRename(chat.id)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(chat.id)}
                          autoFocus
                          className="flex-1 bg-white dark:bg-slate-800 border border-indigo-500 focus:outline-none rounded px-2 py-0.5 text-xs font-normal"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <div className="flex-1 min-w-0 flex items-center gap-1.5 pr-14">
                          <span className="truncate">{chat.title}</span>
                          {chat.isShared && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" title="Public share link active" />
                          )}
                        </div>
                      )}

                      {/* Actions (visible on hover) */}
                      {!isEditing && (
                        <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          {onOpenShareModal && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenShareModal(chat);
                              }}
                              className="p-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500 cursor-pointer"
                              title="Share chat"
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={(e) => handleStartRename(chat, e)}
                            className="p-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            title="Rename"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )
            ) : (
              <div className="text-center py-6 px-4 text-slate-400 dark:text-slate-500">
                <Sparkles className="w-6 h-6 mx-auto stroke-[1.5] mb-1.5 animate-pulse" />
                <p className="text-xs">Sign in to save chats and cloud memories</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Area: Pricing Bar, 5-Day Free Trial Tracker + User Profile Box */}
      <div className="shrink-0 border-t border-slate-200/60 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        {user ? (() => {
          const trial = getTrialInfo(user);
          if (trial.isStudent) {
            return (
              <div className="p-2.5 space-y-1.5">
                <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 shadow-sm">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    <span>Student Lifetime Pass</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/30">
                    $0 Free
                  </span>
                </div>
              </div>
            );
          }

          if (trial.isPaid) {
            return (
              <div className="p-2.5 space-y-1.5">
                <button
                  onClick={() => onOpenPricing('account')}
                  className="w-full min-h-[42px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 hover:from-amber-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 border border-amber-500/30 dark:border-amber-500/30 text-slate-800 dark:text-slate-100 transition-all shadow-sm group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                    <span>{user.subscriptionTier} Active</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-500/30">
                    Unlimited
                  </span>
                </button>
              </div>
            );
          }

          if (trial.isTrialActive) {
            return (
              <div className="p-2.5 space-y-1.5">
                <div 
                  onClick={() => onOpenPricing('plans')}
                  className="w-full p-2.5 rounded-xl text-xs bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 border border-amber-500/30 text-slate-800 dark:text-slate-100 cursor-pointer shadow-sm group transition-all"
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>5-Day Free Access</span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold">
                      {trial.daysRemaining >= 1 ? `${trial.daysRemaining}d left` : `${trial.hoursRemaining}h left`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(8, (trial.daysRemaining / 5) * 100))}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>All 70+ AI's Unlocked</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline flex items-center gap-0.5">
                      View Plans <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                
                {/* 1-click free student activation */}
                <button
                  onClick={() => {
                    localStorage.setItem('nova_student_pass', 'active');
                    toast.success('🎓 Verified Student Access Granted! 100% Free Lifetime Pass activated across all AI models.');
                    setTimeout(() => window.location.reload(), 800);
                  }}
                  className="w-full py-1 px-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center justify-center gap-1 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Are you a student? Claim $0 Lifetime Pass</span>
                </button>
              </div>
            );
          }

          // Trial Expired (> 5 days and not student/paid)
          return (
            <div className="p-2.5 space-y-2">
              <div 
                onClick={() => onOpenPricing('plans')}
                className="w-full p-2.5 rounded-xl text-xs bg-red-500/10 border border-red-500/30 text-slate-800 dark:text-slate-100 cursor-pointer shadow-sm group hover:border-red-500/50 transition-all"
              >
                <div className="flex items-center justify-between font-bold text-red-600 dark:text-red-400 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>5-Day Free Trial Ended</span>
                  </span>
                  <span className="text-[10px] font-bold underline group-hover:translate-x-0.5 transition-transform">
                    View Programs
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  Upgrade or activate student pass to keep full access to all 70+ AI models.
                </p>
              </div>

              <button
                onClick={() => {
                  localStorage.setItem('nova_student_pass', 'active');
                  toast.success('🎓 Verified Student Access Granted! 100% Free Lifetime Pass activated across all AI models.');
                  setTimeout(() => window.location.reload(), 800);
                }}
                className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student / Educator? 100% Free Access</span>
              </button>
            </div>
          );
        })() : (
          <div className="p-2.5 space-y-1.5">
            <button
              onClick={onOpenAuth}
              className="w-full min-h-[38px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sign In (5 Days Free AI)</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Profile Footer Area */}
        {user && (
          <div className="relative px-2.5 pb-2.5">
            <div 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 cursor-pointer transition-all border border-transparent hover:border-slate-200/50 dark:hover:border-white/5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs uppercase flex-shrink-0 shadow-sm">
                  {user.name ? user.name.substring(0, 2) : 'AI'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                      {user.subscriptionTier}
                    </span>
                    {user.role === 'Admin' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-500/15 text-red-600 dark:text-red-400 font-bold uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-90' : ''}`} />
            </div>

            {/* User Account Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute bottom-16 left-2.5 right-2.5 rounded-2xl glass border border-slate-200/80 dark:border-white/10 shadow-2xl p-2 z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-150">
                {user.role === 'Admin' ? (
                  <button
                    onClick={() => {
                      onOpenAdmin();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (onOpenSpecialAdmin) {
                        onOpenSpecialAdmin();
                      } else {
                        onOpenAdmin();
                      }
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl transition-colors cursor-pointer"
                  >
                    <Key className="w-4 h-4 text-amber-500" />
                    Special Admin Code 🔑
                  </button>
                )}
                <button
                  onClick={() => {
                    onOpenSettings();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  Settings & Profile
                </button>
                <button
                  onClick={() => {
                    onSetActiveTab('dashboard');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer text-indigo-600 dark:text-indigo-400"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Analytics & Workspace
                </button>
                <button
                  onClick={() => {
                    onOpenPricing('account');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer text-emerald-600 dark:text-emerald-400"
                >
                  <CreditCard className="w-4 h-4" />
                  Billing & Invoices
                </button>
                <button
                  onClick={() => {
                    onOpenPricing('plans', 'Ultra Premium');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer text-amber-600 dark:text-amber-400"
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                  Upgrade to Ultra High Tier
                </button>
                <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
                <button
                  onClick={() => {
                    onLogout();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Shelby.ai Founder Signature */}
        <div className="px-3.5 py-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50/50 dark:bg-slate-900/30">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">Shelby.ai</span>
          <span className="truncate">Founder: <strong className="text-slate-700 dark:text-slate-300 font-sans font-semibold">Shivam Kumar</strong></span>
        </div>
      </div>
    </div>
  );
}
