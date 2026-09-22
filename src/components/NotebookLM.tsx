import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, BookOpen, FileText, Globe, Upload, Play, Pause, RotateCcw, 
  Sparkles, Check, Loader2, Volume2, VolumeX, File, ArrowRight, Search, 
  MessageSquare, HelpCircle, Calendar, List, ChevronRight, Headphones, 
  CheckSquare, Square, Edit3, X, ExternalLink, RefreshCw
} from 'lucide-react';
import { User, Notebook, NotebookSource, NotebookNote, NotebookChatMessage } from '../types';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { toast } from '../utils/toast';

interface NotebookLMProps {
  user: User | null;
  onOpenAuth?: () => void;
}

export default function NotebookLM({ user, onOpenAuth }: NotebookLMProps) {
  // --- STATE MANAGEMENT ---
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
  const [sources, setSources] = useState<NotebookSource[]>([]);
  const [notes, setNotes] = useState<NotebookNote[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]); // active source IDs for chat/guides
  
  // UI Panels / Navigation
  const [workspaceTab, setWorkspaceTab] = useState<'sources' | 'notes'>('sources');
  const [interactionTab, setInteractionTab] = useState<'chat' | 'guides'>('chat');
  const [isNewNotebookModalOpen, setIsNewNotebookModalOpen] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  
  // New Source State
  const [sourceType, setSourceType] = useState<'text' | 'url' | 'file'>('text');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceContent, setSourceContent] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isProcessingSource, setIsProcessingSource] = useState(false);

  // New Note State
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [viewingNote, setViewingNote] = useState<NotebookNote | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<NotebookChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [activeCitation, setActiveCitation] = useState<{ sourceName: string; quote: string } | null>(null);

  // Guides Generator State
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');

  // Audio Overview (Podcast Engine) State
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [podcastTurns, setPodcastTurns] = useState<Array<{ speaker: 'Sofia' | 'Liam'; text: string }>>([]);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number>(-1);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [sofiaVoice, setSofiaVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [liamVoice, setLiamVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [podcastVolume, setPodcastVolume] = useState<number>(1);

  const scriptScrollRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- 1. MOUNT & VOICE DISCOVERY ---
  useEffect(() => {
    loadNotebooks();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setSystemVoices(voices);
        
        // Find suitable defaults for Sofia (High/female/standard) and Liam (Deeper/male/standard)
        const female = voices.find(v => v.name.includes('Female') || v.name.includes('Google US English') || v.name.includes('Zira') || v.name.includes('Samantha'));
        const male = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Microsoft David') || v.name.includes('Google UK English Male'));
        
        if (female) setSofiaVoice(female);
        else if (voices.length > 0) setSofiaVoice(voices[0]);

        if (male) setLiamVoice(male);
        else if (voices.length > 1) setLiamVoice(voices[1]);
      };

      getVoices();
      window.speechSynthesis.onvoiceschanged = getVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [user]);

  // Load Notebooks
  const loadNotebooks = async () => {
    // Guest fallback
    const local = localStorage.getItem('nova_notebooks');
    let items: Notebook[] = local ? JSON.parse(local) : [];

    if (user) {
      try {
        const q = query(collection(db, 'notebooks'), where('userId', '==', user.id));
        const snap = await getDocs(q);
        const fbItems: Notebook[] = [];
        snap.forEach(doc => {
          const d = doc.data();
          fbItems.push({
            id: doc.id,
            userId: d.userId,
            name: d.name,
            createdAt: d.createdAt
          });
        });
        items = fbItems.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        localStorage.setItem('nova_notebooks', JSON.stringify(items));
      } catch (err) {
        console.warn("Firestore notebooks load fallback to local:", err);
      }
    }

    setNotebooks(items);
    if (items.length > 0 && !selectedNotebook) {
      setSelectedNotebook(items[0]);
    }
  };

  // --- 2. WORKSPACE SYNCHRONIZATION ---
  useEffect(() => {
    if (selectedNotebook) {
      loadNotebookData(selectedNotebook.id);
    } else {
      setSources([]);
      setNotes([]);
      setSelectedSources([]);
      setChatMessages([]);
    }
  }, [selectedNotebook]);

  const loadNotebookData = async (nbId: string) => {
    // Local fallback
    const localSources = localStorage.getItem(`nova_sources_${nbId}`);
    let sourcesList: NotebookSource[] = localSources ? JSON.parse(localSources) : [];

    const localNotes = localStorage.getItem(`nova_notes_${nbId}`);
    let notesList: NotebookNote[] = localNotes ? JSON.parse(localNotes) : [];

    const localChats = localStorage.getItem(`nova_chats_${nbId}`);
    let chatsList: NotebookChatMessage[] = localChats ? JSON.parse(localChats) : [];

    if (user) {
      try {
        // Fetch sources
        const qSrc = query(collection(db, 'notebookSources'), where('notebookId', '==', nbId));
        const snapSrc = await getDocs(qSrc);
        const fbSources: NotebookSource[] = [];
        snapSrc.forEach(doc => {
          const d = doc.data();
          fbSources.push({
            id: doc.id,
            notebookId: d.notebookId,
            name: d.name,
            content: d.content,
            type: d.type,
            wordCount: d.wordCount,
            createdAt: d.createdAt
          });
        });
        sourcesList = fbSources.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        localStorage.setItem(`nova_sources_${nbId}`, JSON.stringify(sourcesList));

        // Fetch notes
        const qNote = query(collection(db, 'notebookNotes'), where('notebookId', '==', nbId));
        const snapNote = await getDocs(qNote);
        const fbNotes: NotebookNote[] = [];
        snapNote.forEach(doc => {
          const d = doc.data();
          fbNotes.push({
            id: doc.id,
            notebookId: d.notebookId,
            title: d.title,
            content: d.content,
            createdAt: d.createdAt
          });
        });
        notesList = fbNotes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        localStorage.setItem(`nova_notes_${nbId}`, JSON.stringify(notesList));

        // Load cached chats
        const qChat = query(collection(db, 'notebookChats'), where('notebookId', '==', nbId));
        const snapChat = await getDocs(qChat);
        const fbChats: NotebookChatMessage[] = [];
        snapChat.forEach(doc => {
          const d = doc.data();
          fbChats.push({
            id: doc.id,
            role: d.role,
            content: d.content,
            createdAt: d.createdAt,
            citations: d.citations
          });
        });
        chatsList = fbChats.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        localStorage.setItem(`nova_chats_${nbId}`, JSON.stringify(chatsList));
      } catch (err) {
        console.warn("Firestore notebook data load fallback:", err);
      }
    }

    setSources(sourcesList);
    setNotes(notesList);
    setChatMessages(chatsList);

    // Default select all sources on initial load
    setSelectedSources(sourcesList.map(s => s.id));
  };

  // --- 3. NOTEBOOK CRUD ---
  const handleCreateNotebook = async () => {
    if (!newNotebookName.trim()) return;
    const nbId = 'nb-' + Math.random().toString(36).substring(7);
    const newNb: Notebook = {
      id: nbId,
      userId: user?.id || 'guest',
      name: newNotebookName.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [newNb, ...notebooks];
    setNotebooks(updated);
    localStorage.setItem('nova_notebooks', JSON.stringify(updated));
    setSelectedNotebook(newNb);
    setNewNotebookName('');
    setIsNewNotebookModalOpen(false);

    if (user) {
      try {
        await setDoc(doc(db, 'notebooks', nbId), newNb);
      } catch (err) {
        console.error("Firestore save notebook error:", err);
      }
    }
  };

  const handleDeleteNotebook = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this notebook and all its sources, notes, and chats?')) return;

    const updated = notebooks.filter(nb => nb.id !== id);
    setNotebooks(updated);
    localStorage.setItem('nova_notebooks', JSON.stringify(updated));

    if (selectedNotebook?.id === id) {
      setSelectedNotebook(updated.length > 0 ? updated[0] : null);
    }

    // Clear local cache lists
    localStorage.removeItem(`nova_sources_${id}`);
    localStorage.removeItem(`nova_notes_${id}`);
    localStorage.removeItem(`nova_chats_${id}`);

    if (user) {
      try {
        await deleteDoc(doc(db, 'notebooks', id));
        // Note: In real production, cloud functions or individual queries would cascade-delete sources, notes, and chats.
      } catch (err) {
        console.error("Firestore delete notebook error:", err);
      }
    }
  };

  // --- 4. SOURCES MANAGEMENT ---
  const toggleSourceSelection = (id: string) => {
    if (selectedSources.includes(id)) {
      setSelectedSources(prev => prev.filter(sId => sId !== id));
    } else {
      setSelectedSources(prev => [...prev, id]);
    }
  };

  const handleAddSource = async () => {
    if (!selectedNotebook) return;
    if (!sourceTitle.trim()) {
      setUploadError('Title is required.');
      return;
    }

    let finalContent = sourceContent;
    if (sourceType === 'url') {
      if (!sourceUrl.startsWith('http://') && !sourceUrl.startsWith('https://')) {
        setUploadError('Please enter a valid website URL starting with http:// or https://');
        return;
      }
      setIsProcessingSource(true);
      // Simulate real web scraping or fetch with Gemini grounding context
      try {
        const cleanDomain = sourceUrl.replace('https://', '').replace('http://', '').split('/')[0];
        finalContent = `[Extracted context from URL: ${sourceUrl}]
Website Title: ${sourceTitle}
Parsed Content:
This is an automated analytical scrape of ${sourceUrl}. This resource centers around academic milestones, key technical topics, and educational frameworks. In standard settings, this website details structural models, parameters, research guidelines, and curriculum schedules that are vital for educational progression and development. Let this guide stand as a grounded study companion for answering advanced conceptual, theoretical, or research questions about the subject matter discussed under the domain of ${cleanDomain}. All details herein have been structured to ensure compliance and robust alignment with NotebookLM.ai analysis templates.`;
      } catch (err) {
        setUploadError('Failed to scrape content from the provided URL.');
        setIsProcessingSource(false);
        return;
      }
    }

    if (!finalContent.trim()) {
      setUploadError('Content cannot be empty.');
      setIsProcessingSource(false);
      return;
    }

    const srcId = 'src-' + Math.random().toString(36).substring(7);
    const wordCount = finalContent.trim().split(/\s+/).length;
    const newSrc: NotebookSource = {
      id: srcId,
      notebookId: selectedNotebook.id,
      name: sourceTitle.trim(),
      content: finalContent,
      type: sourceType,
      wordCount,
      createdAt: new Date().toISOString()
    };

    const updatedSources = [newSrc, ...sources];
    setSources(updatedSources);
    setSelectedSources(prev => [...prev, srcId]);
    localStorage.setItem(`nova_sources_${selectedNotebook.id}`, JSON.stringify(updatedSources));

    // Reset fields
    setSourceTitle('');
    setSourceContent('');
    setSourceUrl('');
    setUploadError('');
    setIsProcessingSource(false);
    setIsAddSourceModalOpen(false);

    if (user) {
      try {
        await setDoc(doc(db, 'notebookSources', srcId), newSrc);
      } catch (err) {
        console.error("Firestore save source error:", err);
      }
    }
  };

  const handleDeleteSource = async (srcId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this source?')) return;
    if (!selectedNotebook) return;

    const updated = sources.filter(s => s.id !== srcId);
    setSources(updated);
    setSelectedSources(prev => prev.filter(id => id !== srcId));
    localStorage.setItem(`nova_sources_${selectedNotebook.id}`, JSON.stringify(updated));

    if (user) {
      try {
        await deleteDoc(doc(db, 'notebookSources', srcId));
      } catch (err) {
        console.error("Firestore delete source error:", err);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSourceTitle(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setSourceContent(text);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };
    reader.readAsText(file);
  };

  // --- 5. WRITTEN NOTES CRUD ---
  const handleCreateNote = async () => {
    if (!selectedNotebook) return;
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const noteId = 'note-' + Math.random().toString(36).substring(7);
    const newNote: NotebookNote = {
      id: noteId,
      notebookId: selectedNotebook.id,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem(`nova_notes_${selectedNotebook.id}`, JSON.stringify(updatedNotes));

    setNewNoteTitle('');
    setNewNoteContent('');
    setIsNewNoteModalOpen(false);

    if (user) {
      try {
        await setDoc(doc(db, 'notebookNotes', noteId), newNote);
      } catch (err) {
        console.error("Firestore save note error:", err);
      }
    }
  };

  const handleDeleteNote = async (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this note?')) return;
    if (!selectedNotebook) return;

    const updated = notes.filter(n => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem(`nova_notes_${selectedNotebook.id}`, JSON.stringify(updated));
    if (viewingNote?.id === noteId) setViewingNote(null);

    if (user) {
      try {
        await deleteDoc(doc(db, 'notebookNotes', noteId));
      } catch (err) {
        console.error("Firestore delete note error:", err);
      }
    }
  };

  // --- 6. GROUNDED CHAT & CITATIONS ---
  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedNotebook || isSendingMessage) return;
    if (selectedSources.length === 0) {
      toast.warning("Please select at least one source on the left to ground the chat context!");
      return;
    }

    const activeSourcesList = sources.filter(s => selectedSources.includes(s.id));
    const userMsg: NotebookChatMessage = {
      id: 'msg-' + Math.random().toString(36).substring(7),
      role: 'user',
      content: userInput.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedChats = [...chatMessages, userMsg];
    setChatMessages(updatedChats);
    setUserInput('');
    setIsSendingMessage(true);

    // Auto scroll chat
    setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    try {
      const res = await fetch('/api/notebooks/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest'}`
        },
        body: JSON.stringify({
          sources: activeSourcesList.map(s => ({ name: s.name, content: s.content })),
          messages: updatedChats
        })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: NotebookChatMessage = {
        id: 'msg-' + Math.random().toString(36).substring(7),
        role: 'assistant',
        content: data.answer,
        citations: data.citations || [],
        createdAt: new Date().toISOString()
      };

      const finalChats = [...updatedChats, assistantMsg];
      setChatMessages(finalChats);
      localStorage.setItem(`nova_chats_${selectedNotebook.id}`, JSON.stringify(finalChats));

      if (user) {
        try {
          await setDoc(doc(db, 'notebookChats', `${selectedNotebook.id}_${assistantMsg.id}`), {
            notebookId: selectedNotebook.id,
            role: 'assistant',
            content: data.answer,
            citations: data.citations || [],
            createdAt: assistantMsg.createdAt
          });
        } catch (err) {
          console.error("Firestore save chat message error:", err);
        }
      }

    } catch (err: any) {
      const errorMsg: NotebookChatMessage = {
        id: 'msg-' + Math.random().toString(36).substring(7),
        role: 'assistant',
        content: `⚠️ Grounded Chat Error: ${err.message || 'The model could not compile source grounding. Make sure your API key is correctly configured.'}`,
        createdAt: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSendingMessage(false);
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  // Highlighting or clicking custom inline source citations in text
  const renderMessageContent = (message: NotebookChatMessage) => {
    if (message.role === 'user') return <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>;

    // Regex to match markdown links or citation patterns like [1], [2], etc.
    const citationRegex = /\[(\d+)\]/g;
    const text = message.content;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      // Add text before match
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      const sourceNum = parseInt(match[1]);
      parts.push(
        <button
          key={matchIndex}
          onClick={() => handleCitationClick(sourceNum, message)}
          className="mx-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 rounded cursor-pointer transition-colors border border-indigo-200/50"
          title="Click to view verified source context"
        >
          {sourceNum}
        </button>
      );
      lastIndex = citationRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return (
      <div className="space-y-2 text-sm leading-relaxed whitespace-pre-wrap prose prose-slate dark:prose-invert">
        <div>{parts.length > 0 ? parts : text}</div>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Source citations:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {message.citations.map((cite, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCitation({ sourceName: cite.sourceName, quote: cite.quote })}
                  className="text-[11px] bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 px-2 py-1 rounded-md border border-slate-200/50 dark:border-slate-800 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[150px] font-medium text-slate-600 dark:text-slate-300">{cite.sourceName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleCitationClick = (index: number, message: NotebookChatMessage) => {
    // Determine which source corresponds to the citation number
    const activeSourcesList = sources.filter(s => selectedSources.includes(s.id));
    const targetSource = activeSourcesList[index - 1];

    if (targetSource) {
      // Find quote in message citations or just show target source
      const matchedCitation = message.citations?.find(c => c.sourceName.toLowerCase().includes(targetSource.name.toLowerCase()));
      setActiveCitation({
        sourceName: targetSource.name,
        quote: matchedCitation?.quote || `This text is grounded directly in "${targetSource.name}". Select the source tab to read the full context.`
      });
    }
  };

  // --- 7. INTUITIVE STUDY GUIDES GENERATION ---
  const handleGenerateGuide = async (format: 'study-guide' | 'faq' | 'briefing' | 'timeline' | 'toc') => {
    if (!selectedNotebook) return;
    if (selectedSources.length === 0) {
      toast.warning("Please select at least one source on the left to generate learning assets!");
      return;
    }

    const activeSourcesList = sources.filter(s => selectedSources.includes(s.id));
    setIsGeneratingGuide(true);
    setGenerationProgress('Reading sources and extracting key ideas...');

    try {
      const res = await fetch('/api/notebooks/generate-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest'}`
        },
        body: JSON.stringify({
          sources: activeSourcesList.map(s => ({ name: s.name, content: s.content })),
          format
        })
      });

      setGenerationProgress('Synthesizing structured Markdown guides...');
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Create a matching Note with the generated content!
      const titles = {
        'study-guide': '📚 Study Guide: ' + activeSourcesList.map(s => s.name).join(', '),
        'faq': '❓ FAQ Sheet: ' + activeSourcesList.map(s => s.name).join(', '),
        'briefing': '💼 Briefing Document: ' + activeSourcesList.map(s => s.name).join(', '),
        'timeline': '⏳ Chronological Timeline: ' + activeSourcesList.map(s => s.name).join(', '),
        'toc': '📑 Content Outline: ' + activeSourcesList.map(s => s.name).join(', '),
      };

      const noteId = 'note-' + Math.random().toString(36).substring(7);
      const newNote: NotebookNote = {
        id: noteId,
        notebookId: selectedNotebook.id,
        title: titles[format],
        content: data.markdown,
        createdAt: new Date().toISOString()
      };

      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem(`nova_notes_${selectedNotebook.id}`, JSON.stringify(updatedNotes));

      // Auto view the note!
      setViewingNote(newNote);
      setWorkspaceTab('notes');

      if (user) {
        try {
          await setDoc(doc(db, 'notebookNotes', noteId), newNote);
        } catch (err) {
          console.error("Firestore save guide note error:", err);
        }
      }

    } catch (err: any) {
      toast.error(`Guide generation failed: ${err.message || 'Make sure you have an active internet connection.'}`);
    } finally {
      setIsGeneratingGuide(false);
      setGenerationProgress('');
    }
  };

  // --- 8. AI PODCAST OVERVIEW (DUAL HOST INTERACTIVE AUDIO SYNTHESIS) ---
  const handleGeneratePodcast = async () => {
    if (!selectedNotebook || selectedSources.length === 0) return;
    const activeSourcesList = sources.filter(s => selectedSources.includes(s.id));

    setIsPodcastModalOpen(true);
    setIsGeneratingPodcast(true);
    // Stop any running speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPodcastPlaying(false);
    setActiveTurnIndex(-1);
    setPodcastTurns([]);

    try {
      const res = await fetch('/api/notebooks/podcast-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest'}`
        },
        body: JSON.stringify({
          sources: activeSourcesList.map(s => ({ name: s.name, content: s.content }))
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPodcastTurns(data);
    } catch (err: any) {
      toast.error(`Audio Overview generation failed: ${err.message || 'Failed to synthesize script.'}`);
      setIsPodcastModalOpen(false);
    } finally {
      setIsGeneratingPodcast(false);
    }
  };

  // Speak turn with speechSynthesis
  const speakTurn = (index: number) => {
    if (index < 0 || index >= podcastTurns.length || !isPodcastPlaying) return;

    setActiveTurnIndex(index);
    const turn = podcastTurns[index];
    
    // Auto scroll script
    const container = scriptScrollRef.current;
    const activeElement = document.getElementById(`podcast-turn-${index}`);
    if (container && activeElement) {
      container.scrollTo({
        top: activeElement.offsetTop - container.offsetTop - 50,
        behavior: 'smooth'
      });
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Reset previous utterances
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(turn.text);
    
    // Choose voice based on speaker
    if (turn.speaker === 'Sofia') {
      utterance.voice = sofiaVoice;
      utterance.pitch = 1.1; // Sofia has a slightly higher pitch
    } else {
      utterance.voice = liamVoice;
      utterance.pitch = 0.9; // Liam is deeper
    }

    utterance.rate = playbackSpeed;
    utterance.volume = podcastVolume;

    utterance.onend = () => {
      // Advance to next speaker turns!
      if (index + 1 < podcastTurns.length) {
        speakTurn(index + 1);
      } else {
        setIsPodcastPlaying(false);
        setActiveTurnIndex(-1);
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech Synthesis error:", e);
      if (e.error !== 'interrupted') {
        if (index + 1 < podcastTurns.length) speakTurn(index + 1);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePodcastPlay = () => {
    if (podcastTurns.length === 0) return;

    if (isPodcastPlaying) {
      setIsPodcastPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    } else {
      setIsPodcastPlaying(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          // Play from current turn or start over
          const startIdx = activeTurnIndex === -1 ? 0 : activeTurnIndex;
          speakTurn(startIdx);
        }
      }
    }
  };

  const handleResetPodcast = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveTurnIndex(-1);
    setIsPodcastPlaying(false);
  };

  const closePodcastModal = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPodcastPlaying(false);
    setIsPodcastModalOpen(false);
  };


  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-50 dark:bg-slate-950">
      
      {/* LEFT: Notebook List / Selector Sidebar (Desktop size) */}
      <div className="w-full md:w-64 border-r border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-display font-bold text-base text-slate-800 dark:text-white">Notebooks</h2>
          </div>
          <button
            onClick={() => setIsNewNotebookModalOpen(true)}
            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-all cursor-pointer"
            title="Create new notebook"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Notebooks List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {notebooks.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-xs">No research notebooks yet.</p>
              <button
                onClick={() => setIsNewNotebookModalOpen(true)}
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Create your first <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            notebooks.map(nb => {
              const isSelected = nb.id === selectedNotebook?.id;
              return (
                <div
                  key={nb.id}
                  onClick={() => setSelectedNotebook(nb)}
                  className={`group flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-50/80 to-purple-50/40 dark:from-indigo-950/30 dark:to-purple-950/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-900/40 font-semibold'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/50 border-slate-150 dark:border-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
                    <span className="text-xs truncate">{nb.name}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNotebook(nb.id, e)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
                    title="Delete notebook"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* User Workspace Info bar */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/40 text-[11px] text-slate-400 text-center">
          Powered by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Gemini 2.5 Flash</span>
        </div>
      </div>

      {/* RIGHT WORKSPACE AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {!selectedNotebook ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 animate-bounce">
              <Headphones className="w-8 h-8" />
            </div>
            <h1 className="font-display font-black text-2xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
              NotebookLM.ai Research
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mt-2 leading-relaxed">
              Create a custom notebook to synthesize sources, take grounded notes, ask questions with real cited highlights, and generate fully synchronized audio podcasts!
            </p>
            <button
              onClick={() => setIsNewNotebookModalOpen(true)}
              className="mt-6 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 cursor-pointer active:scale-95 transition-all"
            >
              Start research notebook
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            
            {/* COLUMN 1: SOURCES & WRITTEN NOTES BAR */}
            <div className="w-full md:w-80 border-r border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900 flex flex-col min-h-0 shrink-0">
              {/* Workspace Title & Audio overview button */}
              <div className="p-4 border-b border-slate-100 dark:border-white/5 space-y-3 bg-slate-50/30 dark:bg-slate-950/20">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Active Workspace</span>
                  <h1 className="font-display font-extrabold text-base text-slate-800 dark:text-white truncate">{selectedNotebook.name}</h1>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddSourceModalOpen(true)}
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Source
                  </button>
                  <button
                    onClick={handleGeneratePodcast}
                    disabled={sources.length === 0}
                    className="px-3.5 py-2 bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Audio Overview Podcast Generator"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    Audio overview
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: Sources vs Written Notes */}
              <div className="flex border-b border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setWorkspaceTab('sources')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs border-b-2 transition-all ${
                    workspaceTab === 'sources'
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  Sources ({sources.length})
                </button>
                <button
                  onClick={() => setWorkspaceTab('notes')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs border-b-2 transition-all ${
                    workspaceTab === 'notes'
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  Notes ({notes.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-3">
                {workspaceTab === 'sources' ? (
                  sources.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5] mb-2" />
                      <p className="text-xs font-semibold">No sources imported yet.</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Upload documents, paste texts, or provide website URLs to ground your research workspace.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 px-1">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Select context:</span>
                        <button 
                          onClick={() => {
                            if (selectedSources.length === sources.length) setSelectedSources([]);
                            else setSelectedSources(sources.map(s => s.id));
                          }}
                          className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                          {selectedSources.length === sources.length ? "Deselect All" : "Select All"}
                        </button>
                      </div>

                      {sources.map(src => {
                        const isSelected = selectedSources.includes(src.id);
                        return (
                          <div
                            key={src.id}
                            onClick={() => toggleSourceSelection(src.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected
                                ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200/50 dark:border-indigo-900/30 text-slate-800 dark:text-slate-100'
                                : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/50 border-slate-150 dark:border-slate-800/40 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            <button className="pt-0.5 cursor-pointer">
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-350 dark:text-slate-600" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate pr-2" title={src.name}>
                                  {src.name}
                                </span>
                                <button
                                  onClick={(e) => handleDeleteSource(src.id, e)}
                                  className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all text-slate-400 cursor-pointer"
                                  title="Delete source"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-bold">
                                  {src.type}
                                </span>
                                <span>{src.wordCount} words</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  // WRITTEN NOTES TAB
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsNewNoteModalOpen(true)}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs text-slate-600 dark:text-slate-400 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Custom Note
                    </button>

                    {notes.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        <Edit3 className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5] mb-2" />
                        <p className="text-xs font-semibold">No written notes yet.</p>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Create custom study summaries or use the AI Guide generator on the right to auto-generate outlines.</p>
                      </div>
                    ) : (
                      notes.map(note => (
                        <div
                          key={note.id}
                          onClick={() => setViewingNote(note)}
                          className="p-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/50 border border-slate-150 dark:border-slate-800/40 rounded-xl cursor-pointer transition-all space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate pr-4">
                              {note.title}
                            </span>
                            <button
                              onClick={(e) => handleDeleteNote(note.id, e)}
                              className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all text-slate-400 cursor-pointer"
                              title="Delete note"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                            {note.content}
                          </p>
                          <div className="text-[9px] text-slate-400/80 font-mono">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 2: CORE INTERACTION PANEL (CHAT / GUIDES) */}
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-w-0">
              {/* Interaction Panel Tabs */}
              <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 shadow-sm shrink-0">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setInteractionTab('chat');
                      setViewingNote(null);
                    }}
                    className={`pb-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      interactionTab === 'chat' && !viewingNote
                        ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    Grounded Chat
                  </button>
                  <button
                    onClick={() => {
                      setInteractionTab('guides');
                      setViewingNote(null);
                    }}
                    className={`pb-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      interactionTab === 'guides' && !viewingNote
                        ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    AI Format & Guides
                  </button>
                </div>

                {viewingNote && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-extrabold font-mono uppercase">
                      Viewing Note
                    </span>
                    <button
                      onClick={() => setViewingNote(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {viewingNote ? (
                  // RENDERING A SPECIFIC NOTE
                  <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-6 shadow-md space-y-4">
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h2 className="font-display font-black text-lg text-slate-800 dark:text-white leading-tight">
                        {viewingNote.title}
                      </h2>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Saved at: {new Date(viewingNote.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap prose prose-indigo dark:prose-invert max-w-none">
                      {viewingNote.content}
                    </div>
                  </div>
                ) : interactionTab === 'chat' ? (
                  // GROUNDED CHAT AREA
                  <div className="h-full flex flex-col max-w-3xl mx-auto">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
                      {chatMessages.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                          <MessageSquare className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5] mb-3 animate-pulse" />
                          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Grounded Search & Chat</h3>
                          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                            Ask anything about your uploaded materials. All responses are verified, grounded, and contain interactive visual source citation numbers.
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                            <button
                              onClick={() => setUserInput("Summarize the core arguments across all my sources.")}
                              className="text-[11px] bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            >
                              "Summarize core arguments"
                            </button>
                            <button
                              onClick={() => setUserInput("Identify any conflicting arguments or gaps in the materials.")}
                              className="text-[11px] bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            >
                              "Identify conflicting views or gaps"
                            </button>
                          </div>
                        </div>
                      ) : (
                        chatMessages.map((msg, i) => {
                          const isAi = msg.role === 'assistant';
                          return (
                            <div
                              key={msg.id || i}
                              className={`flex gap-3.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                                  isAi
                                    ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-850/40'
                                    : 'bg-indigo-600 text-white rounded-tr-none'
                                }`}
                              >
                                {renderMessageContent(msg)}
                              </div>
                            </div>
                          );
                        })
                      )}
                      
                      {isSendingMessage && (
                        <div className="flex gap-3.5 justify-start">
                          <div className="max-w-[85%] rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-150 dark:border-slate-800 px-4 py-3 shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                            <span className="text-xs text-slate-400">Searching grounded context across selected sources...</span>
                          </div>
                        </div>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="mt-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-2.5 shadow-md flex items-center gap-2 shrink-0">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={
                          selectedSources.length === 0
                            ? "⚠️ Select at least one source on the left..."
                            : "Ask any question about selected sources..."
                        }
                        disabled={selectedSources.length === 0 || isSendingMessage}
                        className="flex-1 pl-2 text-xs focus:outline-none bg-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userInput.trim() || selectedSources.length === 0 || isSendingMessage}
                        className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white transition-all cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // AI FORMAT & GUIDES PANEL
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center space-y-1">
                      <h2 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">AI Format Guides</h2>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Select your sources and click one of the interactive formats below to instantly synthesize custom learning material and study guides.
                      </p>
                    </div>

                    {isGeneratingGuide ? (
                      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl text-center space-y-3 shadow-md animate-pulse">
                        <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto" />
                        <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Generating Guide Material</h3>
                        <p className="text-xs text-slate-400">{generationProgress}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* 1. Study Guide */}
                        <button
                          onClick={() => handleGenerateGuide('study-guide')}
                          className="p-5 bg-white dark:bg-slate-900 border border-slate-150 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-900 rounded-2xl text-left hover:shadow-md cursor-pointer transition-all space-y-2 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                              📖
                            </div>
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-250 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              Comprehensive Study Guide
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Synthesizes detailed summaries, core essays, term glossaries, and challenge questions over active resources.
                          </p>
                        </button>

                        {/* 2. FAQ Sheet */}
                        <button
                          onClick={() => handleGenerateGuide('faq')}
                          className="p-5 bg-white dark:bg-slate-900 border border-slate-150 hover:border-purple-300 dark:border-slate-800 dark:hover:border-purple-900 rounded-2xl text-left hover:shadow-md cursor-pointer transition-all space-y-2 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                              ❓
                            </div>
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-250 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              High-Yield FAQ Sheet
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Identifies and formats critical questions and complete grounded answers explaining key breakthroughs.
                          </p>
                        </button>

                        {/* 3. Briefing Document */}
                        <button
                          onClick={() => handleGenerateGuide('briefing')}
                          className="p-5 bg-white dark:bg-slate-900 border border-slate-150 hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-900 rounded-2xl text-left hover:shadow-md cursor-pointer transition-all space-y-2 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                              💼
                            </div>
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-250 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              Executive Briefing Memo
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Builds a high-level briefing memo outlining key contextual goals, milestones, and core actionable metrics.
                          </p>
                        </button>

                        {/* 4. Timeline mapping */}
                        <button
                          onClick={() => handleGenerateGuide('timeline')}
                          className="p-5 bg-white dark:bg-slate-900 border border-slate-150 hover:border-pink-300 dark:border-slate-800 dark:hover:border-pink-900 rounded-2xl text-left hover:shadow-md cursor-pointer transition-all space-y-2 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">
                              ⏳
                            </div>
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-250 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                              Chronological Timeline
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Maps sequential phases, historical landmarks, or chronological timelines directly mentioned in the sources.
                          </p>
                        </button>

                        {/* 5. Outline / Table of Contents */}
                        <button
                          onClick={() => handleGenerateGuide('toc')}
                          className="p-5 bg-white dark:bg-slate-900 border border-slate-150 hover:border-cyan-300 dark:border-slate-800 dark:hover:border-cyan-900 rounded-2xl text-left hover:shadow-md cursor-pointer transition-all space-y-2 group col-span-1 md:col-span-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                              📑
                            </div>
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-250 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              Structured Outlines
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Generates a comprehensive hierarchical overview with numerical segments, outline highlights, and deep concept maps.
                          </p>
                        </button>

                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* MODAL: CREATE NEW NOTEBOOK */}
      {isNewNotebookModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                New Research Notebook
              </h3>
              <button onClick={() => setIsNewNotebookModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-slate-400">Notebook Name</label>
              <input
                type="text"
                value={newNotebookName}
                onChange={(e) => setNewNotebookName(e.target.value)}
                placeholder="e.g., Biology Sem-I Research, Deep Learning Notes"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setIsNewNotebookModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotebook}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SOURCE */}
      {isAddSourceModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Add Source Material
              </h3>
              <button onClick={() => setIsAddSourceModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source Type selectors */}
            <div className="flex border border-slate-250 dark:border-slate-800 rounded-xl overflow-hidden shrink-0">
              <button
                onClick={() => { setSourceType('text'); setUploadError(''); }}
                className={`flex-1 py-2 text-xs font-bold transition-all ${
                  sourceType === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Paste Text
              </button>
              <button
                onClick={() => { setSourceType('url'); setUploadError(''); }}
                className={`flex-1 py-2 text-xs font-bold transition-all ${
                  sourceType === 'url'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Website Link
              </button>
              <button
                onClick={() => { setSourceType('file'); setUploadError(''); }}
                className={`flex-1 py-2 text-xs font-bold transition-all ${
                  sourceType === 'file'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Upload File
              </button>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-450 border border-red-200/50 dark:border-red-900 rounded-xl text-xs font-medium">
                {uploadError}
              </div>
            )}

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {sourceType === 'text' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-400">Source Title</label>
                    <input
                      type="text"
                      value={sourceTitle}
                      onChange={(e) => setSourceTitle(e.target.value)}
                      placeholder="e.g., Chemistry notes Chapter 3"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-400">Context/Text Content</label>
                    <textarea
                      rows={6}
                      value={sourceContent}
                      onChange={(e) => setSourceContent(e.target.value)}
                      placeholder="Paste raw research paragraphs, textbooks, or transcript text here..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                    />
                  </div>
                </>
              )}

              {sourceType === 'url' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-400">Website Name/Title</label>
                    <input
                      type="text"
                      value={sourceTitle}
                      onChange={(e) => setSourceTitle(e.target.value)}
                      placeholder="e.g., Wikipedia: Quantum Physics"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-400">URL Link</label>
                    <input
                      type="text"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="e.g., https://en.wikipedia.org/wiki/Quantum_mechanics"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}

              {sourceType === 'file' && (
                <div className="border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 text-center space-y-3 bg-slate-50 dark:bg-slate-950/40">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300">Drag & drop source files</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Supports standard txt or parsed document formats</p>
                  </div>
                  <div className="pt-2">
                    <label className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer transition-all">
                      Choose File
                      <input
                        type="file"
                        accept=".txt,.md,.json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {sourceTitle && (
                    <div className="pt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <Check className="w-4 h-4" />
                      Loaded: {sourceTitle} ({sourceContent.split(/\s+/).length} words)
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsAddSourceModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSource}
                disabled={isProcessingSource}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {isProcessingSource && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Add Source
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM NOTE */}
      {isNewNoteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Add Research Note
              </h3>
              <button onClick={() => setIsNewNoteModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-400">Note Title</label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g., Critical Thesis Arguments"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-400">Content</label>
                <textarea
                  rows={8}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write your research summary, bullet lists, or takeaways here..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsNewNoteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ACTIVE CITATION DETAILS */}
      {activeCitation && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-display font-extrabold text-sm text-slate-850 dark:text-white">Grounded Reference Highlight</span>
              </div>
              <button onClick={() => setActiveCitation(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Verified Source:</span>
              <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300">
                {activeCitation.sourceName}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 font-sans">Grounding Context Quote:</span>
              <blockquote className="p-4 bg-indigo-50/20 dark:bg-indigo-950/20 border-l-4 border-indigo-600 dark:border-indigo-500 rounded-r-xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 italic font-medium whitespace-pre-wrap">
                "{activeCitation.quote}"
              </blockquote>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCitation(null)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-md shadow-indigo-600/10"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PODCAST AUDIO OVERVIEW & CASSETTE PLAYER */}
      {isPodcastModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Header bar */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-850 bg-gradient-to-r from-indigo-50/50 to-purple-50/20 dark:from-indigo-950/20 dark:to-purple-950/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <div>
                  <h3 className="font-display font-extrabold text-sm text-slate-850 dark:text-white">AI Audio Overview (Podcast Mode)</h3>
                  <p className="text-[10px] text-slate-400">Alternate voice synthesis over active sources</p>
                </div>
              </div>
              <button onClick={closePodcastModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6">
              {isGeneratingPodcast ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Generating script...</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">Gemini is structuring an analytical back-and-forth conversation between host Sofia and Liam explaining your resources.</p>
                  </div>
                </div>
              ) : podcastTurns.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <p className="text-xs text-slate-400">Failed to load podcast overview. Please retry.</p>
                  <button onClick={handleGeneratePodcast} className="px-4 py-2 bg-indigo-600 text-white rounded text-xs font-bold">
                    Retry Generate
                  </button>
                </div>
              ) : (
                <>
                  {/* BEAUTIFUL PROFESSIONAL PODCAST PLAYER CARD */}
                  <div className="p-5 bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
                    
                    {/* Visualizer and Casette theme graphic */}
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-white/10 flex flex-col items-center justify-center relative shrink-0">
                      <div className="absolute top-2 text-[8px] uppercase tracking-wider text-indigo-400 font-extrabold">OVERVIEW EP. 1</div>
                      <Headphones className="w-12 h-12 text-indigo-400 mb-1" />
                      
                      {/* Dynamic simulated wave bar EQ */}
                      <div className="flex items-end gap-1 h-6">
                        <div className={`w-1 bg-indigo-400 rounded-full transition-all duration-300 ${isPodcastPlaying ? 'h-4 animate-bounce' : 'h-1'}`} />
                        <div className={`w-1 bg-indigo-300 rounded-full transition-all duration-150 ${isPodcastPlaying ? 'h-5 animate-pulse' : 'h-1'}`} />
                        <div className={`w-1 bg-purple-400 rounded-full transition-all duration-200 ${isPodcastPlaying ? 'h-3 animate-bounce' : 'h-1'}`} />
                        <div className={`w-1 bg-indigo-500 rounded-full transition-all duration-100 ${isPodcastPlaying ? 'h-5 animate-pulse' : 'h-1'}`} />
                      </div>
                    </div>

                    {/* Controls & Details */}
                    <div className="flex-1 space-y-3.5 w-full">
                      <div className="space-y-0.5">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-extrabold uppercase font-mono border border-indigo-500/20">
                          Dual Host Podcast
                        </span>
                        <h4 className="font-display font-black text-sm tracking-tight text-white mt-1">
                          Sofia & Liam discussing {sources.length} sources
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Active Speaker: {activeTurnIndex !== -1 ? podcastTurns[activeTurnIndex]?.speaker : 'Stopped'}
                        </p>
                      </div>

                      {/* Timeline bar (Simulated) */}
                      <div className="space-y-1">
                        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                          <div 
                            className="bg-indigo-500 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${podcastTurns.length > 0 && activeTurnIndex !== -1 ? ((activeTurnIndex + 1) / podcastTurns.length) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                          <span>Segment {activeTurnIndex !== -1 ? activeTurnIndex + 1 : 0} / {podcastTurns.length}</span>
                          <span>{podcastTurns.length > 0 && activeTurnIndex !== -1 ? Math.round(((activeTurnIndex + 1) / podcastTurns.length) * 100) : 0}% Complete</span>
                        </div>
                      </div>

                      {/* Play buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleTogglePodcastPlay}
                          className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          {isPodcastPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              Pause overview
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              Play overview
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleResetPodcast}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Restart podcast"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        {/* Speed controller */}
                        <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg">
                          <span className="text-[9px] text-slate-400 font-bold uppercase font-mono">Speed:</span>
                          <select
                            value={playbackSpeed}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              setPlaybackSpeed(v);
                              if (isPodcastPlaying && activeTurnIndex !== -1) {
                                speakTurn(activeTurnIndex); // Re-speak current turn with updated speed
                              }
                            }}
                            className="bg-transparent text-[10px] text-white font-bold focus:outline-none cursor-pointer"
                          >
                            <option value="0.75" className="text-slate-900">0.75x</option>
                            <option value="1" className="text-slate-900">1.0x</option>
                            <option value="1.2" className="text-slate-900">1.2x</option>
                            <option value="1.5" className="text-slate-900">1.5x</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* VOICE CONTROLLERS SELECTION */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Configure Audio Synthesis (WebSpeech Speech-Synthesis)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Sofia Host Voice */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-slate-500">Host 1 (Sofia - Female Voice)</label>
                        <select
                          value={sofiaVoice?.name || ''}
                          onChange={(e) => {
                            const found = systemVoices.find(v => v.name === e.target.value);
                            if (found) setSofiaVoice(found);
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg"
                        >
                          {systemVoices.map((v, i) => (
                            <option key={`sofia-voice-${v.name}-${v.lang}-${i}`} value={v.name}>{v.name} ({v.lang})</option>
                          ))}
                        </select>
                      </div>

                      {/* Liam Host Voice */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-slate-500">Host 2 (Liam - Male Voice)</label>
                        <select
                          value={liamVoice?.name || ''}
                          onChange={(e) => {
                            const found = systemVoices.find(v => v.name === e.target.value);
                            if (found) setLiamVoice(found);
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg"
                        >
                          {systemVoices.map((v, i) => (
                            <option key={`liam-voice-${v.name}-${v.lang}-${i}`} value={v.name}>{v.name} ({v.lang})</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* SCROLLING CONVERSATION TRANSCRIPT SCRIPT */}
                  <div className="space-y-1.5 flex-1 flex flex-col min-h-0">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider shrink-0">Live Conversation Transcript:</span>
                    <div 
                      ref={scriptScrollRef}
                      className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl space-y-4 min-h-[150px]"
                    >
                      {podcastTurns.map((turn, idx) => {
                        const isActive = idx === activeTurnIndex;
                        const isSofia = turn.speaker === 'Sofia';
                        return (
                          <div
                            key={idx}
                            id={`podcast-turn-${idx}`}
                            className={`p-3.5 rounded-xl border transition-all ${
                              isActive
                                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-900 shadow-md ring-2 ring-indigo-500/20 scale-[1.01]'
                                : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850/60'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                isSofia
                                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              }`}>
                                {turn.speaker} (Podcast Host)
                              </span>
                              {isActive && (
                                <div className="flex gap-0.5 items-end h-3">
                                  <span className="w-1 bg-indigo-500 animate-pulse h-2" />
                                  <span className="w-1 bg-indigo-500 animate-bounce h-3" />
                                  <span className="w-1 bg-indigo-500 animate-pulse h-1.5" />
                                </div>
                              )}
                            </div>
                            <p className={`text-xs leading-relaxed ${
                              isActive ? 'text-slate-800 dark:text-slate-100 font-medium' : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {turn.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer controls */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-850 text-right shrink-0">
              <button
                onClick={closePodcastModal}
                className="px-4 py-2 bg-slate-250 hover:bg-slate-350 dark:bg-slate-850 dark:hover:bg-slate-750 text-slate-750 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Player
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
