import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, MessageSquare, Compass, ShieldAlert, CreditCard, LayoutDashboard,
  Brain, Wand2, Film, PenTool, Video, Code, Headphones, Presentation, Globe, Bot, Flame
} from 'lucide-react';
import { User, Chat, Message, Attachment, isUltraHighPremium } from './types';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import ImageGenerator from './components/ImageGenerator';
import SettingsModal from './components/SettingsModal';
import PricingModal from './components/PricingModal';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import UltraHighPremiumGate from './components/UltraHighPremiumGate';
import Library from './components/Library';
import NotebookLM from './components/NotebookLM';
import CursorAI from './components/CursorAI';
import GammaAI from './components/GammaAI';
import PerplexityAI from './components/PerplexityAI';
import OpenAI from './components/OpenAI';
import GrokAI from './components/GrokAI';
import ClaudeAI from './components/ClaudeAI';
import NanoBananaAI from './components/NanoBananaAI';
import HighsfieldAI from './components/HighsfieldAI';
import FigmaAI from './components/FigmaAI';
import HeyGenAI from './components/HeyGenAI';
import LovableAI from './components/LovableAI';
import MidjourneyAI from './components/MidjourneyAI';
import RunwayGen3 from './components/RunwayGen3';
import GoogleSlidesAI from './components/GoogleSlidesAI';
import AIHubStudio from './components/AIHubStudio';
import LinuxSoftware from './components/LinuxSoftware';
import NumberTracker from './components/NumberTracker';
import UniversalDatabaseManager from './components/UniversalDatabaseManager';
import SavedGallery from './components/SavedGallery';
import QRGenerator from './components/QRGenerator';
import ShareModal from './components/ShareModal';
import SharedChatView from './components/SharedChatView';
import NovaBanner from './components/NovaBanner';
import NovaBannerHero from './components/NovaBannerHero';
import SuperAICatalog from './components/SuperAICatalog';
import { RealtimeAIHealthDashboard } from './components/RealtimeAIHealthDashboard';
import GodsEye3DView from './components/GodsEye3DView';
import ToastContainer from './components/ToastContainer';
import { getSuperAiTool } from './data/superAiToolsData';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  
  // Share states
  const [shareIdFromUrl, setShareIdFromUrl] = useState<string | null>(null);
  const [shareModalChat, setShareModalChat] = useState<Chat | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>(() => {
    const saved = localStorage.getItem('nova_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      return saved as 'light' | 'dark' | 'auto';
    }
    const legacy = localStorage.getItem('nova_theme');
    if (legacy === 'light') return 'light';
    if (legacy === 'dark') return 'dark';
    return 'dark'; // default
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const mode = localStorage.getItem('nova_theme_mode');
    if (mode === 'light') return false;
    if (mode === 'dark') return true;
    if (mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    const legacy = localStorage.getItem('nova_theme');
    return legacy !== 'light';
  });

  // Responsive mobile drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [pricingInitialTab, setPricingInitialTab] = useState<'plans' | 'checkout' | 'account'>('plans');
  const [pricingInitialTier, setPricingInitialTier] = useState<'Pro' | 'Premium' | 'Ultra Premium'>('Pro');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenPricing = (tab: 'plans' | 'checkout' | 'account' = 'plans', tier: 'Pro' | 'Premium' | 'Ultra Premium' = 'Pro') => {
    setPricingInitialTab(tab);
    setPricingInitialTier(tier);
    setIsPricingOpen(true);
  };

  // 1. Initial boot check for Token in LocalStorage and Share URL parameter
  useEffect(() => {
    // Check for share query parameter ?share=... or ?s=...
    const urlParams = new URLSearchParams(window.location.search);
    const share = urlParams.get('share') || urlParams.get('s');
    if (share) {
      setShareIdFromUrl(share);
    }

    const savedToken = localStorage.getItem('nova_token');
    if (savedToken) {
      setToken(savedToken);
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${savedToken}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then((data: User) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('nova_token');
          setToken(null);
        });
    }
  }, []);

  // 2. Fetch User's chats when authenticated
  useEffect(() => {
    if (user && token) {
      fetch('/api/chats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then((data: Chat[]) => {
          setChats(data);
          if (data.length > 0 && !activeChatId) {
            setActiveChatId(data[0].id);
          }
        })
        .catch(() => {});
    } else {
      setChats([]);
      setActiveChatId(null);
    }
  }, [user, token]);

  // 3. Sync Dark/Light/Auto Theme classes on Document Elements
  useEffect(() => {
    let resolvedDark = themeMode === 'dark';
    let cleanup: (() => void) | undefined = undefined;

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      resolvedDark = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('nova_theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('nova_theme', 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      cleanup = () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    setIsDarkMode(resolvedDark);
    if (resolvedDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
    }
    localStorage.setItem('nova_theme_mode', themeMode);

    return cleanup;
  }, [themeMode]);

  // 4. Keyboard Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Create new chat trigger: Ctrl + N / Cmd + N
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        if (user) {
          handleCreateChat();
        } else {
          setIsAuthOpen(true);
        }
      }
      // Close open modals on Escape
      if (e.key === 'Escape') {
        setIsAuthOpen(false);
        setIsSettingsOpen(false);
        setIsPricingOpen(false);
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [user, chats]);

  const handleAuthSuccess = (authUser: User, authToken: string) => {
    setUser(authUser);
    setToken(authToken);
    localStorage.setItem('nova_token', authToken);
  };

  const handleLogout = () => {
    signOut(auth).catch((err) => console.error("Firebase sign out error:", err));
    setUser(null);
    setToken(null);
    localStorage.removeItem('nova_token');
    setActiveTab('chat');
  };

  // Chat Actions
  const handleCreateChat = async () => {
    if (!user || !token) {
      setIsAuthOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `Conversation ${chats.length + 1}`,
          model: selectedModel
        })
      });

      const newChat = await response.json();
      if (response.ok) {
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setActiveTab('chat');
        setMobileSidebarOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setMobileSidebarOpen(false);
    
    // Auto-update model to match selected chat parameters
    const found = chats.find(c => c.id === chatId);
    if (found) {
      setSelectedModel(found.model || 'gemini-3.8-flash');
    }
  };

  const handleRenameChat = async (chatId: string, title: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/chats/${chatId}/rename`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, title } : c));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const remaining = chats.filter(c => c.id !== chatId);
        setChats(remaining);
        if (activeChatId === chatId) {
          setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Readable Streams message completion
  const handleSendMessage = async (content: string, attachments: Attachment[], useRAG = false) => {
    if (!activeChatId || !token || !user) return;

    setIsSending(true);

    const userMsgId = `msg-temp-user-${Math.random().toString(36).substring(7)}`;
    const assistantMsgId = `msg-temp-assistant-${Math.random().toString(36).substring(7)}`;

    // Optimistically update the UI with User Message
    const userMessage: Message = {
      id: userMsgId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
      attachments
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage]
        };
      }
      return chat;
    }));

    // Create a temporary streaming message for the assistant
    const assistantPlaceholder: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      isStreaming: true
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, assistantPlaceholder]
        };
      }
      return chat;
    }));

    try {
      const response = await fetch(`/api/chats/${activeChatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content, attachments, useRAG })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Readable stream not supported.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialLine = '';
      let assistantText = '';
      let groundingUrls: any[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        const lines = (partialLine + chunkText).split('\n');
        partialLine = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              
              if (data.error) {
                assistantText = `⚠️ Error generating response: ${data.error}`;
                break;
              } else if (data.text) {
                assistantText += data.text;
                
                // Real-time update the streaming message content
                setChats(prev => prev.map(chat => {
                  if (chat.id === activeChatId) {
                    return {
                      ...chat,
                      messages: chat.messages.map(msg => 
                        msg.id === assistantMsgId 
                          ? { ...msg, content: assistantText } 
                          : msg
                      )
                    };
                  }
                  return chat;
                }));
              } else if (data.done) {
                groundingUrls = data.groundingUrls || [];
                const ragCitations = data.ragCitations || [];
                
                // Finalize and replace the temporary message with the real saved message from database
                // We re-fetch or simply stabilize the ID
                setChats(prev => prev.map(chat => {
                  if (chat.id === activeChatId) {
                    return {
                      ...chat,
                      messages: chat.messages.map(msg => 
                        msg.id === assistantMsgId 
                          ? { 
                              id: data.messageId, 
                              role: 'assistant', 
                              content: assistantText, 
                              createdAt: new Date().toISOString(),
                              groundingUrls: groundingUrls.length > 0 ? groundingUrls : undefined,
                              ragCitations: ragCitations.length > 0 ? ragCitations : undefined
                            } 
                          : msg
                      )
                    };
                  }
                  return chat;
                }));
              }
            } catch (e) {
              // Ignore incomplete lines
            }
          }
        }
      }

    } catch (err: any) {
      console.error(err);
      // Remove placeholder or show error
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === assistantMsgId 
                ? { ...msg, content: `⚠️ Stream Connection Failed: ${err.message || 'Check your internet connection.'}` } 
                : msg
            )
          };
        }
        return chat;
      }));
    } finally {
      setIsSending(false);
      // Refresh the entire chats list to align timestamps and latest titles
      if (token) {
        fetch('/api/chats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then((data: Chat[]) => setChats(data))
          .catch(() => {});
      }
    }
  };

  const handleRegenerateResponse = () => {
    const currentChat = chats.find(c => c.id === activeChatId);
    if (!currentChat || currentChat.messages.length < 2) return;

    // Find the last user message
    const lastUserMsg = [...currentChat.messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      // Remove last assistant response from state first
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          const filtered = chat.messages.filter((_, idx) => idx !== chat.messages.length - 1);
          return { ...chat, messages: filtered };
        }
        return chat;
      }));
      handleSendMessage(lastUserMsg.content, lastUserMsg.attachments || []);
    }
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    // Treat as editing the message, clearing subsequent logs, and sending again
    const currentChat = chats.find(c => c.id === activeChatId);
    if (!currentChat) return;

    const msgIdx = currentChat.messages.findIndex(m => m.id === messageId);
    if (msgIdx !== -1) {
      // Crop chats message list up to this index, edit its content, then trigger send!
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          const cropped = chat.messages.slice(0, msgIdx);
          return { ...chat, messages: cropped };
        }
        return chat;
      }));
      handleSendMessage(newContent, currentChat.messages[msgIdx].attachments || []);
    }
  };

  const handleModelChange = async (newModel: string) => {
    setSelectedModel(newModel);
    // Persist model in the current active chat database
    if (activeChatId && token) {
      // We can create a simple update API or just local state align
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, model: newModel } : c));
    }
  };

  const handleToggleTheme = () => {
    if (themeMode === 'auto') {
      setThemeMode('light');
    } else if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('auto');
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  // Render Shared Chat Read-Only View if visiting a shared URL
  if (shareIdFromUrl) {
    return (
      <SharedChatView
        shareId={shareIdFromUrl}
        user={user}
        token={token}
        onOpenAuth={() => setIsAuthOpen(true)}
        onStartNewChat={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('share');
          url.searchParams.delete('s');
          window.history.replaceState({}, '', url.toString());
          setShareIdFromUrl(null);
        }}
        onImportSuccess={(newChatId) => {
          const url = new URL(window.location.href);
          url.searchParams.delete('share');
          url.searchParams.delete('s');
          window.history.replaceState({}, '', url.toString());
          setShareIdFromUrl(null);
          if (token) {
            fetch('/api/chats', { headers: { 'Authorization': `Bearer ${token}` } })
              .then(res => res.json())
              .then((data: Chat[]) => {
                setChats(data);
                setActiveChatId(newChatId);
                setActiveTab('chat');
              });
          }
        }}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Mobile Drawer Trigger Bar */}
      <div className="md:hidden fixed top-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-850 shadow-md backdrop-blur-md text-slate-700 dark:text-slate-300 z-50 cursor-pointer"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation drawer overlay on mobile */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity"
        />
      )}

      {/* Primary Sidebar - Drawer on Mobile, Static on Desktop */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-80 z-35 transition-transform duration-300 transform shrink-0
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <Sidebar
          user={user}
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onCreateChat={handleCreateChat}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
          onOpenShareModal={(chatToShare) => {
            setShareModalChat(chatToShare);
            setIsShareModalOpen(true);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenPricing={handleOpenPricing}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onLogout={handleLogout}
          onOpenAuth={() => setIsAuthOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          themeMode={themeMode}
          onSetActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </aside>

      {/* Main Panel Content Box */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Nova.ai by Shelby.ai Global Top Banner */}
        <NovaBanner
          onOpenPricing={() => handleOpenPricing('plans')}
          onOpenAuth={!user ? () => setIsAuthOpen(true) : undefined}
        />

        {/* Dynamic Screen Routing */}
        {!user ? (
          <LandingPage
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenPricing={() => handleOpenPricing('plans')}
          />
        ) : activeTab === 'chat' ? (
          <ChatArea
            user={user}
            chat={activeChat}
            onSendMessage={handleSendMessage}
            onRegenerateResponse={handleRegenerateResponse}
            onEditMessage={handleEditMessage}
            isSending={isSending}
            selectedModel={selectedModel}
            onChangeModel={handleModelChange}
            onOpenShareModal={(chatToShare) => {
              setShareModalChat(chatToShare);
              setIsShareModalOpen(true);
            }}
            onOpenPricing={() => handleOpenPricing('plans')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
          />
        ) : activeTab === 'image-generator' ? (
          <ImageGenerator user={user} />
        ) : activeTab === 'qr-generator' ? (
          <QRGenerator user={user} onOpenAuth={() => setIsAuthOpen(true)} onOpenPricing={() => handleOpenPricing('plans')} />
        ) : activeTab === 'gallery' ? (
          <SavedGallery user={user} onOpenPricing={() => handleOpenPricing('plans')} />
        ) : activeTab === 'library' ? (
          <Library user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        ) : activeTab === 'notebooklm' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="NotebookLM.ai Deep Research"
              toolSubtitle="Multi-source document synthesis, audio podcast deep-dives, and citation explorer"
              toolIcon={<Headphones className="w-8 h-8 text-violet-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <NotebookLM user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'cursor' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Cursor.ai Developer Studio"
              toolSubtitle="Autonomous full-stack AI engineer with terminal execution and codebase comprehension"
              toolIcon={<Code className="w-8 h-8 text-indigo-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <CursorAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'gamma' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Gamma.ai Presentation Engine"
              toolSubtitle="Interactive cards, live web presentations, and executive visual deck creator"
              toolIcon={<Presentation className="w-8 h-8 text-pink-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <GammaAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'perplexity' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Perplexity.ai Web Intelligence"
              toolSubtitle="Real-time web search grounding with live academic citations and facts"
              toolIcon={<Globe className="w-8 h-8 text-teal-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <PerplexityAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'openai' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="OpenAI GPT-4o & Canvas"
              toolSubtitle="Multimodal reasoning, vision analytics, and real-time writing canvas"
              toolIcon={<Bot className="w-8 h-8 text-emerald-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <OpenAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'claude' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Claude 3.7 Sonnet & Artifacts"
              toolSubtitle="Anthropic's premier reasoning AI model with live interactive artifacts and extended thinking"
              toolIcon={<Brain className="w-8 h-8 text-amber-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <ClaudeAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'nanobanana' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="NanoBanana.ai Studio"
              toolSubtitle="Hyper-fast generative image synthesis and 60fps video generation engine"
              toolIcon={<Wand2 className="w-8 h-8 text-yellow-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <NanoBananaAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'highsfield' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Highsfield Motion Cinema"
              toolSubtitle="Ultra-realistic cinematic video engine with dynamic camera paths and physics simulation"
              toolIcon={<Film className="w-8 h-8 text-cyan-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <HighsfieldAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'figma' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Figma.ai Vector Canvas"
              toolSubtitle="Autonomous UI/UX design assistant, design tokens, and interactive canvas generator"
              toolIcon={<PenTool className="w-8 h-8 text-purple-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <FigmaAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'heygen' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="HeyGen.ai Voice & Avatars"
              toolSubtitle="AI video avatar synthesis, lip-sync translation, and multilingual broadcast engine"
              toolIcon={<Video className="w-8 h-8 text-rose-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <HeyGenAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'grok' ? (
          !isUltraHighPremium(user) ? (
            <UltraHighPremiumGate
              toolName="Grok 3 Realtime Superintelligence"
              toolSubtitle="Live telemetric reasoning, real-time X news stream, and raw computing power"
              toolIcon={<Flame className="w-8 h-8 text-orange-400" />}
              user={user}
              onOpenPricing={handleOpenPricing}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSpecialAdmin={() => setIsAdminOpen(true)}
            />
          ) : (
            <GrokAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          )
        ) : activeTab === 'lovable' ? (
          <LovableAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        ) : activeTab === 'midjourney' ? (
          <MidjourneyAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        ) : activeTab === 'runway' ? (
          <RunwayGen3 user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        ) : activeTab === 'google_slides' ? (
          <GoogleSlidesAI user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        ) : activeTab === 'super-ai-catalog' || activeTab === 'ai-directory' || activeTab === 'ai-catalog' ? (
          <SuperAICatalog
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLaunchTool={(toolId) => setActiveTab(toolId)}
            onOpenHealth={() => setActiveTab('ai-health')}
          />
        ) : (getSuperAiTool(activeTab) || [
          'reccloud', 'ms_designer', 'virality_ai', 'bardeen', 'laxis', 'photopea', 'tenweb', 'icons8',
          'khanmigo', 'quizlet', 'photomath', 'wolfram_alpha', 'google_scholar', 'elicit', 'consensus', 
          'semantic_scholar', 'scite', 'connected_papers', 'github_copilot', 'claude_code', 'replit_agent', 
          'windsurf', 'continue_dev', 'tabnine', 'aider', 'hugging_face', 'google_colab', 'bolt_new', 
          'softr', 'bubble', 'glide', 'base44', 'vercel_v0', 'adobe_firefly', 'ideogram', 'leonardo_ai', 
          'canva_magic', 'krea_ai', 'freepik_ai', 'synthesia', 'pika', 'kling_ai', 'google_flow', 'luma_ai', 
          'invideo_ai', 'descript', 'opus_clip', 'premiere_pro', 'davinci_resolve', 'capcut', 'notion_ai', 'otter_ai', 'powerpoint_ai', 'beautiful_ai', 
          'prezi_ai', 'grammarly', 'quillbot', 'wordtune', 'elevenlabs', 'suno_ai', 'udio_ai', 'zapier_central', 
          'make_com', 'n8n_ai'
        ].includes(activeTab)) ? (
          <AIHubStudio 
            toolId={activeTab} 
            user={user} 
            onOpenAuth={() => setIsAuthOpen(true)}
            onBrowseCatalog={() => setActiveTab('super-ai-catalog')}
            onOpenHealth={() => setActiveTab('ai-health')}
          />
        ) : activeTab === 'linux-software' ? (
          <LinuxSoftware user={user} onOpenAuth={() => setIsAuthOpen(true)} onOpenPricing={() => handleOpenPricing('plans')} />
        ) : activeTab === 'number-tracker' ? (
          <NumberTracker user={user} onOpenAuth={() => setIsAuthOpen(true)} onOpenPricing={() => handleOpenPricing('plans')} />
        ) : activeTab === 'ai-health' || activeTab === 'health' || activeTab === 'health-dashboard' ? (
          <RealtimeAIHealthDashboard 
            user={user} 
            onOpenAuth={() => setIsAuthOpen(true)} 
            onOpenPricing={() => handleOpenPricing('plans')} 
          />
        ) : activeTab === 'universal_db' || activeTab === 'database' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
            <UniversalDatabaseManager 
              user={user} 
              onOpenAuth={() => setIsAuthOpen(true)} 
              onOpenPricing={() => handleOpenPricing('checkout', 'Ultra Premium')}
              onUpgradeSuccess={(updatedUser) => setUser(updatedUser)}
            />
          </div>
        ) : activeTab === 'banner' ? (
          <div className="flex-1 overflow-y-auto bg-[#070913]">
            <NovaBannerHero
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenPricing={() => handleOpenPricing('plans')}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          </div>
        ) : activeTab === 'gods-eye' || activeTab === 'gods-eye-view' || activeTab === 'godseye' ? (
          <GodsEye3DView
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenPricing={() => handleOpenPricing('plans')}
          />
        ) : activeTab === 'dashboard' ? (
          <AdminPanel user={user} onClose={() => setActiveTab('chat')} onProfileUpdate={(updatedUser) => setUser(updatedUser)} />
        ) : (
          <ChatArea
            user={user}
            chat={activeChat}
            onSendMessage={handleSendMessage}
            onRegenerateResponse={handleRegenerateResponse}
            onEditMessage={handleEditMessage}
            isSending={isSending}
            selectedModel={selectedModel}
            onChangeModel={handleModelChange}
            onOpenShareModal={(chatToShare) => {
              setShareModalChat(chatToShare);
              setIsShareModalOpen(true);
            }}
            onOpenPricing={() => handleOpenPricing('plans')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Modals & Popups */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onProfileUpdate={(updatedUser) => setUser(updatedUser)}
        themeMode={themeMode}
        onChangeThemeMode={(mode) => setThemeMode(mode)}
        selectedModel={selectedModel}
        onChangeModel={handleModelChange}
        onOpenPricing={handleOpenPricing}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        user={user}
        onUpgradeSuccess={(updatedUser) => setUser(updatedUser)}
        onOpenAuth={() => setIsAuthOpen(true)}
        initialTab={pricingInitialTab}
        initialTier={pricingInitialTier}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        chat={shareModalChat}
        token={token}
        user={user}
        onShareUpdated={(updatedChat) => {
          setChats(prev => prev.map(c => c.id === updatedChat.id ? updatedChat : c));
        }}
      />

      <ToastContainer />
    </div>
  );
}
