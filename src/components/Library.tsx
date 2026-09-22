import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, BookOpen, Search, Sparkles, Globe, Award, Lightbulb, 
  Send, Loader2, ArrowRight, Bookmark, HelpCircle, MessageSquare, ChevronRight, 
  CornerDownRight, Plus, Trash2, Volume2, VolumeX, Play, Pause, Square, 
  FileText, UploadCloud, CheckCircle, Languages, ArrowLeft, ExternalLink, 
  BookmarkCheck, Check, RotateCcw, Tag, Brain, Layers, GraduationCap, ArrowUpRight
} from 'lucide-react';
import { User, LibraryBook, BookChapter, BookAnnotation, BookBookmark, UserLearningPath, StudyQuiz, StudyQuizQuestion, StudyFlashcard } from '../types';
import { CURATED_LIBRARY } from '../data/curated_books';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from '../utils/toast';

interface LibraryProps {
  user: User | null;
  onOpenAuth: () => void;
}

export default function Library({ user, onOpenAuth }: LibraryProps) {
  // Library Books state
  const [books, setBooks] = useState<LibraryBook[]>(CURATED_LIBRARY);
  const [selectedBook, setSelectedBook] = useState<LibraryBook>(CURATED_LIBRARY[0]);
  const [activeChapter, setActiveChapter] = useState<BookChapter>(CURATED_LIBRARY[0].chapters[0]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  
  // Progress tracker state
  const [progressMap, setProgressMap] = useState<Record<string, { lastChapterId: string; lastChapterTitle: string; percentComplete: number; updatedAt: string }>>({});
  
  // Fetch overall progress for all books
  const fetchProgress = async () => {
    // Default to reading from local storage first
    const local = localStorage.getItem('nova_book_progress');
    if (local) {
      try {
        setProgressMap(JSON.parse(local));
      } catch (e) {
        console.error("Error reading cached local progress:", e);
      }
    }

    if (!user) return;

    try {
      const q = query(collection(db, 'bookProgress'), where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);
      const map: Record<string, any> = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        map[data.bookId] = {
          lastChapterId: data.lastChapterId,
          lastChapterTitle: data.lastChapterTitle,
          percentComplete: data.percentComplete,
          updatedAt: data.updatedAt
        };
      });
      setProgressMap(map);
      localStorage.setItem('nova_book_progress', JSON.stringify(map));
    } catch (error) {
      console.warn("Firestore progress sync bypassed/failed (using local storage fallback):", error);
    }
  };

  // Save current book progress to Firestore and local state
  const saveProgress = async (bookId: string, chapterId: string, chapterTitle: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const chapterIndex = book.chapters.findIndex(c => c.id === chapterId);
    if (chapterIndex === -1) return;

    const percentComplete = Math.round(((chapterIndex + 1) / book.chapters.length) * 100);
    const progressData = {
      lastChapterId: chapterId,
      lastChapterTitle: chapterTitle,
      percentComplete,
      updatedAt: new Date().toISOString()
    };

    // Update local state instantly
    const updatedMap = {
      ...progressMap,
      [bookId]: progressData
    };
    setProgressMap(updatedMap);
    localStorage.setItem('nova_book_progress', JSON.stringify(updatedMap));

    // Save to Firestore if user is authenticated
    if (user) {
      try {
        const progressDocRef = doc(db, 'bookProgress', `${user.id}_${bookId}`);
        await setDoc(progressDocRef, {
          userId: user.id,
          bookId,
          lastChapterId: chapterId,
          lastChapterTitle: chapterTitle,
          percentComplete,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Firestore saveProgress error:", error);
      }
    }
  };
  
  // Navigation tabs
  const [librarySubTab, setLibrarySubTab] = useState<'browse' | 'reader' | 'paths' | 'upload'>('browse');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showUserUploadedOnly, setShowUserUploadedOnly] = useState(false);

  // E-reader visual state
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [readerSidebarTab, setReaderSidebarTab] = useState<'chat' | 'summary' | 'quiz' | 'notes'>('chat');

  // Multi-language translation state
  const [targetLang, setTargetLang] = useState<string>('');
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  // Sync state (Bookmarks & Highlights)
  const [annotations, setAnnotations] = useState<BookAnnotation[]>([]);
  const [bookmarks, setBookmarks] = useState<BookBookmark[]>([]);
  const [selectedHighlightColor, setSelectedHighlightColor] = useState<string>('yellow');
  const [activeAnnotationText, setActiveAnnotationText] = useState('');
  const [activeAnnotationComment, setActiveAnnotationComment] = useState('');
  const [selectedParagraphIdx, setSelectedParagraphIdx] = useState<number | null>(null);

  // Audio (Text-To-Speech) state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1);
  const [speechVoice, setSpeechVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speakingParagraphIdx, setSpeakingParagraphIdx] = useState<number | null>(null);

  // AI Chapter Companion state
  const [companionQuery, setCompanionQuery] = useState('');
  const [companionHistory, setCompanionHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [companionLoading, setCompanionLoading] = useState(false);

  // AI Summary State
  const [chapterSummary, setChapterSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  // Quizzes & Flashcards state
  const [quizData, setQuizData] = useState<StudyQuiz | null>(null);
  const [flashcards, setFlashcards] = useState<StudyFlashcard[]>([]);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [activeFlashcardIdx, setActiveFlashcardIdx] = useState(0);
  const [revealFlashcard, setRevealFlashcard] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Personalized Learning Paths state
  const [learningPaths, setLearningPaths] = useState<UserLearningPath[]>([]);
  const [lpGoal, setLpGoal] = useState('');
  const [lpGrade, setLpGrade] = useState('College');
  const [lpDifficulty, setLpDifficulty] = useState('Intermediate');
  const [generatingLP, setGeneratingLP] = useState(false);
  const [activeLP, setActiveLP] = useState<UserLearningPath | null>(null);

  // File upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Literature');
  const [uploadGrade, setUploadGrade] = useState('College');
  const [uploadDiff, setUploadDiff] = useState('Intermediate');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Load User Books and Sync Data on mount/user change
  useEffect(() => {
    fetchBooks();
    fetchProgress();
    if (user) {
      fetchSyncData();
    } else {
      setAnnotations([]);
      setBookmarks([]);
      setLearningPaths([]);
    }
  }, [user]);

  // Save progress when activeChapter or selectedBook changes in the reader
  useEffect(() => {
    if (librarySubTab === 'reader' && selectedBook && activeChapter) {
      saveProgress(selectedBook.id, activeChapter.id, activeChapter.title);
    }
  }, [activeChapter, selectedBook, librarySubTab]);

  // 2. Load TTS Voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices.filter(v => v.lang.startsWith('en') || v.lang.startsWith('es') || v.lang.startsWith('fr')));
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 3. Clear E-Reader context when book or chapter changes
  useEffect(() => {
    setTranslatedText(null);
    setTargetLang('');
    setChapterSummary(null);
    setQuizData(null);
    setFlashcards([]);
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(null);
    setActiveFlashcardIdx(0);
    setRevealFlashcard(false);
    setCompanionHistory([]);
    stopAudio();
    setSelectedParagraphIdx(null);
  }, [selectedBook, activeChapter]);

  // Fetch all books (curated + uploaded)
  const fetchBooks = async () => {
    if (!user) {
      setBooks(CURATED_LIBRARY);
      return;
    }
    setLoadingBooks(true);
    try {
      const res = await fetch('/api/books', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (res.ok) {
        const data = await res.json();
        const merged = [...CURATED_LIBRARY, ...(data.userBooks || [])];
        setBooks(merged);
        
        // Retain selection if existing
        const found = merged.find(b => b.id === selectedBook.id);
        if (found) setSelectedBook(found);
      }
    } catch (e) {
      console.error("Error loading books:", e);
    } finally {
      setLoadingBooks(false);
    }
  };

  // Fetch notes, highlights & bookmarks from server (Cloud Sync)
  const fetchSyncData = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/books/sync', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnnotations(data.annotations || []);
        setBookmarks(data.bookmarks || []);
      }
    } catch (e) {
      console.error("Sync fetch error:", e);
    }
  };

  // Push notes & bookmarks to server
  const saveSyncData = async (newAnns: BookAnnotation[], newBms: BookBookmark[]) => {
    if (!user) return;
    try {
      await fetch('/api/books/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({ annotations: newAnns, bookmarks: newBms })
      });
    } catch (e) {
      console.error("Sync save error:", e);
    }
  };

  // 4. Translate Active Chapter Text
  const translateChapter = async (lang: string) => {
    if (!lang) {
      setTranslatedText(null);
      return;
    }
    if (!user) {
      onOpenAuth();
      return;
    }
    setTranslating(true);
    try {
      const res = await fetch('/api/books/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          text: activeChapter.content,
          targetLanguage: lang
        })
      });
      if (res.ok) {
        const data = await res.json();
        setTranslatedText(data.translation);
        setTargetLang(lang);
      } else {
        toast.error("Failed to translate the chapter. Please try again.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTranslating(false);
    }
  };

  // 5. Generate AI Chapter Summary
  const generateSummary = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setSummarizing(true);
    try {
      const res = await fetch('/api/books/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          title: selectedBook.title,
          chapterTitle: activeChapter.title,
          content: activeChapter.content
        })
      });
      if (res.ok) {
        const data = await res.json();
        setChapterSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSummarizing(false);
    }
  };

  // 6. Generate Chapter Quiz & Flashcards
  const generateQuiz = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setGeneratingQuiz(true);
    try {
      const res = await fetch('/api/books/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          bookTitle: selectedBook.title,
          chapterTitle: activeChapter.title,
          content: activeChapter.content
        })
      });
      if (res.ok) {
        const data = await res.json();
        setQuizData({
          id: `quiz-${activeChapter.id}`,
          bookId: selectedBook.id,
          chapterId: activeChapter.id,
          questions: data.questions || []
        });
        setFlashcards(data.flashcards || []);
        setSelectedAnswers({});
        setSubmittedQuiz(false);
        setQuizScore(null);
        setActiveFlashcardIdx(0);
        setRevealFlashcard(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  // 7. Generate Personalized Learning Path
  const generateLearningPath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lpGoal.trim()) return;
    if (!user) {
      onOpenAuth();
      return;
    }
    setGeneratingLP(true);
    try {
      const res = await fetch('/api/books/learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          goal: lpGoal,
          gradeLevel: lpGrade,
          difficulty: lpDifficulty
        })
      });
      if (res.ok) {
        const data = await res.json();
        const newLP: UserLearningPath = {
          id: data.id || `lp-${Math.random().toString(36).substring(7)}`,
          goal: data.goal || lpGoal,
          gradeLevel: data.gradeLevel || lpGrade,
          difficulty: data.difficulty || lpDifficulty,
          milestones: data.milestones || [],
          createdAt: new Date().toISOString()
        };
        setLearningPaths(prev => [newLP, ...prev]);
        setActiveLP(newLP);
        setLpGoal('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingLP(false);
    }
  };

  // Toggle milestone completion state
  const toggleMilestone = (pathId: string, milestoneId: string) => {
    setLearningPaths(prev => prev.map(lp => {
      if (lp.id === pathId) {
        const updated = lp.milestones.map(m => m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m);
        return { ...lp, milestones: updated };
      }
      return lp;
    }));
  };

  // Open book from milestone direct links
  const handleMilestoneLink = (bookId: string, chapterId?: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      if (chapterId) {
        const ch = book.chapters.find(c => c.id === chapterId);
        if (ch) {
          setActiveChapter(ch);
        } else {
          setActiveChapter(book.chapters[0]);
        }
      } else {
        setActiveChapter(book.chapters[0]);
      }
      setLibrarySubTab('reader');
    }
  };

  // 8. Text-To-Speech Audiobook Player
  const startAudio = (paragraphIndex?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    let textToSpeak = activeChapter.content;
    const paragraphs = (translatedText || activeChapter.content).split('\n\n').filter(p => p.trim());

    if (paragraphIndex !== undefined) {
      textToSpeak = paragraphs[paragraphIndex];
      setSpeakingParagraphIdx(paragraphIndex);
    } else {
      setSpeakingParagraphIdx(0);
      textToSpeak = paragraphs[0];
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechSpeed;

    // Set custom voice if chosen
    if (speechVoice) {
      const foundVoice = availableVoices.find(v => v.name === speechVoice);
      if (foundVoice) utterance.voice = foundVoice;
    }

    utterance.onend = () => {
      if (paragraphIndex === undefined && speakingParagraphIdx !== null && speakingParagraphIdx < paragraphs.length - 1) {
        // Automatically play next paragraph in full audiobook mode
        const nextIdx = speakingParagraphIdx + 1;
        setSpeakingParagraphIdx(nextIdx);
        startAudio(nextIdx);
      } else {
        setSpeakingParagraphIdx(null);
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };

    utterance.onerror = () => {
      setSpeakingParagraphIdx(null);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if (typeof window === 'undefined') return;
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopAudio = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingParagraphIdx(null);
  };

  // 9. Highlights & Sticky Notes Annotations
  const handleParagraphClick = (idx: number, text: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setSelectedParagraphIdx(idx);
    setActiveAnnotationText(text);
    // Check if annotation already exists
    const existing = annotations.find(a => a.bookId === selectedBook.id && a.chapterId === activeChapter.id && a.text === text);
    if (existing) {
      setActiveAnnotationComment(existing.comment || '');
      setSelectedHighlightColor(existing.color);
    } else {
      setActiveAnnotationComment('');
    }
  };

  const saveAnnotation = (type: 'highlight' | 'note') => {
    if (!user || selectedParagraphIdx === null) return;
    
    // Remove existing annotation for same text if present
    const cleanAnns = annotations.filter(a => !(a.bookId === selectedBook.id && a.chapterId === activeChapter.id && a.text === activeAnnotationText));
    
    const newAnn: BookAnnotation = {
      id: `ann-${Math.random().toString(36).substring(7)}`,
      bookId: selectedBook.id,
      chapterId: activeChapter.id,
      text: activeAnnotationText,
      comment: activeAnnotationComment.trim() ? activeAnnotationComment : undefined,
      color: selectedHighlightColor,
      type,
      createdAt: new Date().toISOString()
    };

    const updated = [newAnn, ...cleanAnns];
    setAnnotations(updated);
    saveSyncData(updated, bookmarks);
    setSelectedParagraphIdx(null);
    setActiveAnnotationComment('');
  };

  const deleteAnnotation = (annId: string) => {
    const updated = annotations.filter(a => a.id !== annId);
    setAnnotations(updated);
    saveSyncData(updated, bookmarks);
  };

  // Bookmarks toggle
  const toggleBookmark = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    const isBookmarked = bookmarks.some(b => b.bookId === selectedBook.id && b.chapterId === activeChapter.id);
    let updated: BookBookmark[] = [];
    if (isBookmarked) {
      updated = bookmarks.filter(b => !(b.bookId === selectedBook.id && b.chapterId === activeChapter.id));
    } else {
      updated = [...bookmarks, {
        id: `bm-${Math.random().toString(36).substring(7)}`,
        bookId: selectedBook.id,
        chapterId: activeChapter.id,
        createdAt: new Date().toISOString()
      }];
    }
    setBookmarks(updated);
    saveSyncData(annotations, updated);
  };

  // 10. AI Literary Chat Companion
  const sendCompanionMessage = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const query = customQ || companionQuery;
    if (!query.trim() || !user) return;

    const userMsg = { role: 'user' as const, text: query };
    setCompanionHistory(prev => [...prev, userMsg]);
    if (!customQ) setCompanionQuery('');
    setCompanionLoading(true);

    try {
      const res = await fetch('/api/books/discuss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          query,
          bookTitle: selectedBook.title,
          bookAuthor: selectedBook.author,
          chapterTitle: activeChapter.title,
          chapterContent: activeChapter.content
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCompanionHistory(prev => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        setCompanionHistory(prev => [...prev, { role: 'assistant', text: "I'm sorry, I encountered an issue analyzing this text. Please try again." }]);
      }
    } catch (err) {
      setCompanionHistory(prev => [...prev, { role: 'assistant', text: "Request timed out. Please try again." }]);
    } finally {
      setCompanionLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // 11. User Document Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, "")); // Auto-fill title
      setUploadError('');
      setUploadSuccess(false);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileBase64(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) {
      setUploadError("Book title and valid file are required.");
      return;
    }
    if (!user) {
      onOpenAuth();
      return;
    }
    setUploading(true);
    setUploadError('');
    setUploadSuccess(false);

    const fileExt = uploadFile.name.split('.').pop()?.toLowerCase();

    try {
      const response = await fetch('/api/books/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          title: uploadTitle,
          author: uploadAuthor,
          description: uploadDesc,
          fileContent: fileBase64,
          fileType: fileExt,
          category: uploadCategory,
          gradeLevel: uploadGrade,
          difficulty: uploadDiff
        })
      });

      if (response.ok) {
        const newBook = await response.json();
        setUploadSuccess(true);
        setUploadFile(null);
        setFileBase64('');
        setUploadTitle('');
        setUploadAuthor('');
        setUploadDesc('');
        
        // Reload books list
        await fetchBooks();
        
        // Select newly uploaded book and open reader
        setSelectedBook(newBook);
        setActiveChapter(newBook.chapters[0]);
        setLibrarySubTab('reader');
      } else {
        const errData = await response.json();
        setUploadError(errData.error || "Failed to process document.");
      }
    } catch (err: any) {
      setUploadError(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  // Standard simple TXT downloader
  const downloadBookTxt = (book: LibraryBook) => {
    let fullText = `${book.title.toUpperCase()}\nBy ${book.author}\nCategory: ${book.category} | Grade: ${book.gradeLevel}\n\n`;
    book.chapters.forEach(ch => {
      fullText += `\n--- ${ch.title.toUpperCase()} ---\n\n${ch.content}\n\n`;
    });
    
    const element = document.createElement("a");
    const file = new Blob([fullText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${book.title.replace(/\s+/g, '_')}_AetherLibrary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to check answer
  const submitQuizAnswers = () => {
    if (!quizData) return;
    let score = 0;
    quizData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) score++;
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
  };

  // Filter calculations
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesGrade = selectedGrade === 'All' || b.gradeLevel === selectedGrade;
    const matchesDiff = selectedDifficulty === 'All' || b.difficulty === selectedDifficulty;
    const matchesUserUploaded = !showUserUploadedOnly || b.isUserUploaded;
    return matchesSearch && matchesCategory && matchesGrade && matchesDiff && matchesUserUploaded;
  });

  const isBookmarked = bookmarks.some(b => b.bookId === selectedBook.id && b.chapterId === activeChapter.id);

  return (
    <div className="flex-1 overflow-y-auto h-full px-4 py-8 md:p-8 bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Modern Athena Digital Library Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl glass border border-slate-200/80 dark:border-white/5 shadow-2xl relative overflow-hidden bg-white/40 dark:bg-slate-900/40">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold rounded-full border border-indigo-100 dark:border-indigo-900/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              ATHENA AI DIGITAL LIBRARY
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-950 dark:text-white">
              Athena Digital Library
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Access curated open-license literature, dictionaries, and textbooks. Utilize integrated AI tutors, dynamic translations, custom study quizzes, and personalized learning paths.
            </p>
          </div>

          {/* Quick Sub-tabs Navigation */}
          <div className="flex flex-wrap gap-2 relative z-10">
            <button
              onClick={() => setLibrarySubTab('browse')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                librarySubTab === 'browse'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
              Explore Books
            </button>
            <button
              onClick={() => setLibrarySubTab('reader')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                librarySubTab === 'reader'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Book className="w-3.5 h-3.5 inline mr-1.5" />
              Interactive Reader
            </button>
            <button
              onClick={() => setLibrarySubTab('paths')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                librarySubTab === 'paths'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 inline mr-1.5" />
              Learning Paths
            </button>
            <button
              onClick={() => setLibrarySubTab('upload')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                librarySubTab === 'upload'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 inline mr-1.5" />
              Upload Books
            </button>
          </div>
        </div>

        {/* SUBTAB 1: BROWSE AND EXPLORE BOOKS */}
        {librarySubTab === 'browse' && (
          <div className="space-y-6">
            {/* Filter controls panel */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-md space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, authors, descriptions..."
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  />
                </div>

                {/* Grade & Difficulty Filters */}
                <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="All">All Grades</option>
                    <option value="Grade 1-5">Grade 1-5</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                    <option value="College">College</option>
                    <option value="Professional">Professional</option>
                  </select>

                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>

                  {user && (
                    <button
                      onClick={() => setShowUserUploadedOnly(!showUserUploadedOnly)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        showUserUploadedOnly
                          ? 'bg-indigo-500/15 border-indigo-400/50 text-indigo-600 dark:text-indigo-400'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      My Uploads ({books.filter(b => b.isUserUploaded).length})
                    </button>
                  )}
                </div>

              </div>

              {/* Subject Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                {['All', 'Philosophy', 'Science', 'Mathematics', 'AI', 'Law', 'Literature', 'Medicine', 'Business'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Books Cards Grid */}
            {loadingBooks ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-sm text-slate-500">Retrieving digital books library...</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-sm">
                <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3 stroke-[1.25]" />
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No books match your criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try adjusting filters, searching different keywords, or upload your own text/docx file to expand the repository!
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedGrade('All');
                    setSelectedDifficulty('All');
                    setSearchQuery('');
                    setShowUserUploadedOnly(false);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-md hover:shadow-xl transition-all hover:border-indigo-400/50 relative"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase tracking-wide font-mono">
                          {book.category}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold border border-slate-200/40 dark:border-slate-850/40">
                            {book.gradeLevel}
                          </span>
                          {book.isUserUploaded && (
                            <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                              Uploaded
                            </span>
                          )}
                          {book.isPublicDomain && (
                            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                              Public Domain
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          By <span className="font-semibold text-slate-700 dark:text-slate-300">{book.author}</span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed pt-1">
                          {book.description}
                        </p>
                      </div>

                      {/* Visual Progress Tracker */}
                      {progressMap[book.id] && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850/50 space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-semibold">
                            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" />
                              {progressMap[book.id].percentComplete}% Complete
                            </span>
                            <span className="text-slate-400 truncate max-w-[140px]" title={progressMap[book.id].lastChapterTitle}>
                              {progressMap[book.id].lastChapterTitle}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${progressMap[book.id].percentComplete}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-850/60 mt-5">
                      <div className="flex gap-2">
                        {book.authorSourceUrl && (
                          <a
                            href={book.authorSourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 transition-all"
                            title="Author / Source Wiki Biography"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {(book.isPublicDomain || book.isUserUploaded) && (
                          <button
                            onClick={() => downloadBookTxt(book)}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 transition-all"
                            title="Download TXT format"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          const progress = progressMap[book.id];
                          if (progress && progress.lastChapterId) {
                            const foundCh = book.chapters.find(c => c.id === progress.lastChapterId);
                            if (foundCh) {
                              setActiveChapter(foundCh);
                            } else {
                              setActiveChapter(book.chapters[0]);
                            }
                          } else {
                            setActiveChapter(book.chapters[0]);
                          }
                          setLibrarySubTab('reader');
                        }}
                        className="px-4.5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-1"
                      >
                        {progressMap[book.id] ? "Resume Learning" : "Start Learning"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: MODERN E-READER INTERFACE */}
        {librarySubTab === 'reader' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            
            {/* Left Content Column (E-reader and chapter navigation) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-lg space-y-6">
                
                {/* Book & Chapter Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase font-mono">
                        {selectedBook.category}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">
                        {selectedBook.difficulty} Difficulty
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                      {selectedBook.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      By <span className="font-semibold">{selectedBook.author}</span>
                    </p>
                  </div>

                  {/* Visual Progress Tracker inside Reader */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/50 dark:border-slate-850/50 min-w-[200px]">
                    <div className="flex items-center justify-between w-full gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {progressMap[selectedBook.id]?.percentComplete || 0}% Read
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">
                        Chapter {selectedBook.chapters.findIndex(c => c.id === activeChapter.id) + 1} of {selectedBook.chapters.length}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressMap[selectedBook.id]?.percentComplete || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Chapter Select dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      value={activeChapter.id}
                      onChange={(e) => {
                        const found = selectedBook.chapters.find(c => c.id === e.target.value);
                        if (found) setActiveChapter(found);
                      }}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-xs"
                    >
                      {selectedBook.chapters.map(ch => (
                        <option key={ch.id} value={ch.id}>{ch.title}</option>
                      ))}
                    </select>

                    {/* Bookmark state */}
                    <button
                      onClick={toggleBookmark}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isBookmarked 
                          ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400' 
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={isBookmarked ? "Bookmarked" : "Add Bookmark"}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* E-Reader Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850/50">
                  
                  {/* Speech synthesis player */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => isSpeaking ? pauseAudio() : startAudio()}
                      className={`p-2 rounded-lg transition-all ${
                        isSpeaking && !isPaused
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                          : 'bg-indigo-600 text-white shadow'
                      }`}
                      title="Read aloud using Text-To-Speech"
                    >
                      {isSpeaking && !isPaused ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopAudio}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-red-500"
                        title="Stop reading"
                      >
                        <Square className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      {isSpeaking ? (isPaused ? "Audio Paused" : "Listening...") : "Audiobook Player"}
                    </span>
                  </div>

                  {/* Font Adjuster & Translations */}
                  <div className="flex items-center gap-3">
                    
                    {/* Translation Language */}
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={targetLang}
                        onChange={(e) => translateChapter(e.target.value)}
                        disabled={translating}
                        className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                      >
                        <option value="">Original</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Arabic">Arabic</option>
                      </select>
                    </div>

                    {/* Font sizes */}
                    <div className="flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900">
                      {(['sm', 'base', 'lg', 'xl'] as const).map(sz => (
                        <button
                          key={sz}
                          onClick={() => setReaderFontSize(sz)}
                          className={`px-2 py-1 text-[10px] font-bold rounded ${
                            readerFontSize === sz
                              ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-extrabold'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                          }`}
                        >
                          {sz.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* E-reader core text content */}
                <div className="relative pt-2">
                  {translating && (
                    <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Translating text...</span>
                      </div>
                    </div>
                  )}

                  {/* Chapter Active View Area */}
                  <div className="space-y-5 select-text">
                    <h3 className="text-lg font-bold font-display text-indigo-600 dark:text-indigo-400 tracking-tight flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {activeChapter.title} {targetLang && `(Translated into ${targetLang})`}
                    </h3>

                    {/* Rendering text paragraph by paragraph for click-to-highlight support */}
                    <div className={`leading-relaxed text-slate-700 dark:text-slate-300 font-serif ${
                      readerFontSize === 'sm' ? 'text-sm' :
                      readerFontSize === 'base' ? 'text-base' :
                      readerFontSize === 'lg' ? 'text-lg' : 'text-xl'
                    } space-y-4`}>
                      {(translatedText || activeChapter.content).split('\n\n').filter(p => p.trim()).map((para, idx) => {
                        // Check if paragraph matches any saved highlights/annotations
                        const matchingAnn = annotations.find(
                          a => a.bookId === selectedBook.id && 
                          a.chapterId === activeChapter.id && 
                          a.text === para
                        );
                        const isCurrentlySpeaking = speakingParagraphIdx === idx;

                        return (
                          <div
                            key={idx}
                            onClick={() => handleParagraphClick(idx, para)}
                            className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative group ${
                              isCurrentlySpeaking
                                ? 'bg-indigo-500/10 border-indigo-400/40 shadow-sm'
                                : matchingAnn
                                ? matchingAnn.color === 'yellow' ? 'bg-yellow-500/15 border-yellow-400/40' :
                                  matchingAnn.color === 'green' ? 'bg-emerald-500/15 border-emerald-400/40' :
                                  matchingAnn.color === 'pink' ? 'bg-pink-500/15 border-pink-400/40' :
                                  'bg-sky-500/15 border-sky-400/40'
                                : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                            }`}
                          >
                            <p className="relative z-10">{para}</p>
                            
                            {matchingAnn?.comment && (
                              <div className="mt-2 text-xs font-sans text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 pt-2 flex items-start gap-1">
                                <MessageSquare className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                                <span><strong>Sticky Note:</strong> {matchingAnn.comment}</span>
                              </div>
                            )}

                            {/* Little helper action label */}
                            <span className="absolute right-3 bottom-1.5 opacity-0 group-hover:opacity-100 text-[9px] font-sans text-slate-400 dark:text-slate-500 pointer-events-none transition-opacity">
                              Click to highlight / add notes
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Paragraph Highlight/Note Popup Panel */}
                <AnimatePresence>
                  {selectedParagraphIdx !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 shadow-md space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-indigo-500" />
                          Annotate Selection
                        </span>
                        <button
                          onClick={() => setSelectedParagraphIdx(null)}
                          className="text-xs text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>

                      {/* Displaying snippet */}
                      <p className="text-xs text-slate-500 line-clamp-2 italic bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
                        "{activeAnnotationText}"
                      </p>

                      {/* Color chooser */}
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Highlight:</span>
                        <div className="flex gap-2">
                          {['yellow', 'green', 'pink', 'blue'].map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedHighlightColor(color)}
                              className={`w-5.5 h-5.5 rounded-full border transition-all ${
                                selectedHighlightColor === color ? 'ring-2 ring-indigo-500 scale-110' : ''
                              } ${
                                color === 'yellow' ? 'bg-yellow-400' :
                                color === 'green' ? 'bg-emerald-400' :
                                color === 'pink' ? 'bg-pink-400' :
                                'bg-sky-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment Input */}
                      <div className="space-y-1.5">
                        <textarea
                          value={activeAnnotationComment}
                          onChange={(e) => setActiveAnnotationComment(e.target.value)}
                          placeholder="Write a sticky note or reflection for active recall..."
                          className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          {annotations.some(a => a.bookId === selectedBook.id && a.chapterId === activeChapter.id && a.text === activeAnnotationText) && (
                            <button
                              onClick={() => {
                                const matched = annotations.find(a => a.bookId === selectedBook.id && a.chapterId === activeChapter.id && a.text === activeAnnotationText);
                                if (matched) deleteAnnotation(matched.id);
                                setSelectedParagraphIdx(null);
                              }}
                              className="text-[10px] font-bold text-red-500 hover:underline"
                            >
                              Remove Annotation
                            </button>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveAnnotation('highlight')}
                            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg"
                          >
                            Highlight Only
                          </button>
                          <button
                            onClick={() => saveAnnotation('note')}
                            className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Right Interactive AI Learning Panel Column */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-lg flex flex-col h-[580px] lg:h-[720px] relative">
                
                {/* Panel Tab selector header */}
                <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950 flex-shrink-0">
                  <button
                    onClick={() => setReaderSidebarTab('chat')}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                      readerSidebarTab === 'chat'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Companion
                  </button>
                  <button
                    onClick={() => {
                      setReaderSidebarTab('summary');
                      if (!chapterSummary) generateSummary();
                    }}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                      readerSidebarTab === 'summary'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    AI Summary
                  </button>
                  <button
                    onClick={() => {
                      setReaderSidebarTab('quiz');
                      if (!quizData) generateQuiz();
                    }}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                      readerSidebarTab === 'quiz'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Quiz & Swiper
                  </button>
                  <button
                    onClick={() => setReaderSidebarTab('notes')}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                      readerSidebarTab === 'notes'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    My Notes
                  </button>
                </div>

                {/* Tab content area (scrolling) */}
                <div className="flex-1 overflow-y-auto py-4 min-h-0 relative scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                  
                  {/* TAB A: AI CHAT COMPANION */}
                  {readerSidebarTab === 'chat' && (
                    <div className="space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                        <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-xs text-slate-600 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-extrabold rounded mb-2 border border-indigo-100 dark:border-indigo-900/10">
                            Active Tutor
                          </span>
                          <p>
                            Ask questions regarding specific lines, symbolism, structural motifs, or vocabulary in <strong className="text-indigo-600 dark:text-indigo-400">"{activeChapter.title}"</strong>.
                          </p>
                        </div>

                        {/* Suggested quick inputs */}
                        {companionHistory.length === 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Suggested questions:</p>
                            {[
                              "What are the central logical claims of this chapter?",
                              "Analyze the rhetorical tone and writing style.",
                              "Highlight any foundational arguments or equations."
                            ].map((q, idx) => (
                              <button
                                key={idx}
                                onClick={() => sendCompanionMessage(undefined, q)}
                                className="w-full text-left p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 hover:border-indigo-400/50 hover:bg-slate-100/50 dark:hover:bg-slate-900 hover:text-indigo-600 text-xs transition-all flex items-center justify-between group cursor-pointer"
                              >
                                <span className="truncate pr-4">{q}</span>
                                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Chat History */}
                        <div className="space-y-3 pt-2">
                          {companionHistory.map((msg, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl max-w-[90%] text-xs border ${
                                msg.role === 'user'
                                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ml-auto'
                                  : 'bg-indigo-500/5 dark:bg-indigo-950/20 border-indigo-500/10 mr-auto'
                              }`}
                            >
                              <div className="font-mono text-[9px] font-bold uppercase mb-1 text-slate-400">
                                {msg.role === 'user' ? 'You' : 'Athena Assistant'}
                              </div>
                              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                          ))}

                          {companionLoading && (
                            <div className="p-3 mr-auto rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs flex items-center gap-2">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                              <span className="text-slate-500">Synthesizing analytical answer...</span>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>
                      </div>

                      {/* Chat Form */}
                      <form onSubmit={sendCompanionMessage} className="pt-2 border-t border-slate-100 dark:border-slate-850 flex-shrink-0 mt-3">
                        <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5">
                          <input
                            type="text"
                            value={companionQuery}
                            onChange={(e) => setCompanionQuery(e.target.value)}
                            placeholder="Ask an academic question..."
                            className="flex-1 bg-transparent border-none outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 py-1"
                          />
                          <button
                            type="submit"
                            disabled={companionLoading || !companionQuery.trim()}
                            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* TAB B: AI SUMMARY */}
                  {readerSidebarTab === 'summary' && (
                    <div className="space-y-4">
                      {summarizing ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                          <p className="text-xs text-slate-500">Constructing high-fidelity academic chapter summaries...</p>
                        </div>
                      ) : chapterSummary ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] px-2.5 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold rounded">
                              AI SUMMARY GENERATED
                            </span>
                            <button
                              onClick={generateSummary}
                              className="text-[10px] font-bold text-indigo-500 hover:underline flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" /> Re-generate
                            </button>
                          </div>
                          
                          {/* Rich display */}
                          <div className="text-xs space-y-3 leading-relaxed text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                            {chapterSummary.split('\n').map((line, idx) => {
                              if (line.startsWith('### ')) {
                                return (
                                  <h4 key={idx} className="font-display font-bold text-xs text-slate-950 dark:text-white mt-4 border-b border-slate-100 dark:border-slate-850 pb-1 text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                    <CornerDownRight className="w-3 h-3" />
                                    {line.replace('### ', '')}
                                  </h4>
                                );
                              }
                              if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                                return (
                                  <div key={idx} className="flex gap-2 pl-2">
                                    <span className="text-indigo-500">•</span>
                                    <p className="flex-1">{line.trim().substring(2)}</p>
                                  </div>
                                );
                              }
                              if (line.trim() === '') return <div key={idx} className="h-2" />;
                              return <p key={idx}>{line}</p>;
                            })}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={generateSummary}
                          className="w-full py-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-850 hover:border-indigo-400 text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Generate Chapter Summary</span>
                          <span className="text-[10px] text-slate-400 font-medium">Click to generate structural key notes & concepts</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* TAB C: INTERACTIVE QUIZZES & STUDY FLASHCARDS */}
                  {readerSidebarTab === 'quiz' && (
                    <div className="space-y-4">
                      {generatingQuiz ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                          <p className="text-xs text-slate-500">Formulating custom active-recall quiz & flashcards...</p>
                        </div>
                      ) : quizData ? (
                        <div className="space-y-6">
                          
                          {/* Selector: Quiz vs Flashcards */}
                          <div className="flex rounded-lg border border-slate-200/50 dark:border-slate-800/50 p-0.5 bg-slate-50 dark:bg-slate-950">
                            <button
                              onClick={() => setQuizScore(null)} // reset to quiz
                              className={`flex-1 py-1.5 text-[10px] font-bold rounded-md ${
                                quizScore === null
                                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                              }`}
                            >
                              Interactive Quiz
                            </button>
                            <button
                              onClick={() => setQuizScore(-1)} // trigger flashcards view flag
                              className={`flex-1 py-1.5 text-[10px] font-bold rounded-md ${
                                quizScore === -1
                                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                              }`}
                            >
                              Active Recall Flashcards
                            </button>
                          </div>

                          {/* SCENARIO A: QUIZ QUESTIONS */}
                          {quizScore !== -1 && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">
                                  STUDENT RECOGNITION TEST
                                </span>
                                <button
                                  onClick={generateQuiz}
                                  className="text-[9px] font-bold text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                                >
                                  <RotateCcw className="w-2.5 h-2.5" /> Re-build
                                </button>
                              </div>

                              <div className="space-y-4 overflow-y-auto max-h-[420px] pr-1">
                                {quizData.questions.map((q, qIdx) => (
                                  <div key={qIdx} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2.5">
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                      {qIdx + 1}. {q.question}
                                    </p>
                                    <div className="space-y-1.5">
                                      {q.options.map((opt, oIdx) => {
                                        const isSelected = selectedAnswers[qIdx] === oIdx;
                                        const isCorrect = q.answerIndex === oIdx;
                                        return (
                                          <button
                                            key={oIdx}
                                            onClick={() => {
                                              if (submittedQuiz) return;
                                              setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                                              submittedQuiz
                                                ? isCorrect
                                                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                                                  : isSelected
                                                  ? 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
                                                  : 'bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 opacity-70'
                                                : isSelected
                                                ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                                                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-850/40'
                                            }`}
                                          >
                                            <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-[9px]">
                                              {String.fromCharCode(65 + oIdx)}
                                            </span>
                                            <span>{opt}</span>
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {/* Explanation on submit */}
                                    {submittedQuiz && (
                                      <div className="mt-2.5 p-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                        <strong className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                          <Brain className="w-3.5 h-3.5 text-indigo-500" /> Academic Explanation:
                                        </strong>
                                        <p className="mt-1">{q.explanation}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Action Footer */}
                              {!submittedQuiz ? (
                                <button
                                  onClick={submitQuizAnswers}
                                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer"
                                >
                                  Submit Quiz Answers
                                </button>
                              ) : (
                                <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-center space-y-2">
                                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    Your Score: <span className="text-indigo-600 dark:text-indigo-400 text-lg">{quizScore} / {quizData.questions.length}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400">
                                    {quizScore && quizScore >= 3 ? "Excellent retention! You have successfully mastered these concepts." : "Review the explanations above and try again to solidy retention."}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setSelectedAnswers({});
                                      setSubmittedQuiz(false);
                                      setQuizScore(null);
                                    }}
                                    className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                                  >
                                    Reset Quiz
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* SCENARIO B: ACTIVE RECALL FLASHCARDS SWIPER */}
                          {quizScore === -1 && flashcards.length > 0 && (
                            <div className="space-y-4">
                              <div className="text-center">
                                <span className="text-[9px] font-bold font-mono text-purple-500 uppercase">
                                  FLASHCARD STUDY {activeFlashcardIdx + 1} OF {flashcards.length}
                                </span>
                              </div>

                              {/* Flashcard Box */}
                              <div
                                onClick={() => setRevealFlashcard(!revealFlashcard)}
                                className={`h-48 p-6 rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-500 relative bg-slate-50 dark:bg-slate-950/40 hover:border-indigo-400 ${
                                  revealFlashcard ? 'border-emerald-500/50' : 'border-indigo-500/30'
                                }`}
                              >
                                <span className="absolute top-2 right-2 text-[9px] font-mono font-bold text-slate-400 uppercase">
                                  Click to Flip
                                </span>
                                
                                <div className="space-y-2">
                                  {!revealFlashcard ? (
                                    <>
                                      <Brain className="w-5 h-5 mx-auto text-indigo-500 animate-pulse" />
                                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        {flashcards[activeFlashcardIdx].front}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <Check className="w-5 h-5 mx-auto text-emerald-500" />
                                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {flashcards[activeFlashcardIdx].back}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex items-center justify-between gap-3">
                                <button
                                  disabled={activeFlashcardIdx === 0}
                                  onClick={() => {
                                    setActiveFlashcardIdx(prev => prev - 1);
                                    setRevealFlashcard(false);
                                  }}
                                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold disabled:opacity-50 cursor-pointer"
                                >
                                  Previous Card
                                </button>

                                <button
                                  onClick={() => setRevealFlashcard(!revealFlashcard)}
                                  className="px-3.5 py-2 bg-indigo-500/10 border border-indigo-400/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold"
                                >
                                  {revealFlashcard ? "Show Question" : "Reveal Answer"}
                                </button>

                                <button
                                  disabled={activeFlashcardIdx === flashcards.length - 1}
                                  onClick={() => {
                                    setActiveFlashcardIdx(prev => prev + 1);
                                    setRevealFlashcard(false);
                                  }}
                                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold disabled:opacity-50 cursor-pointer"
                                >
                                  Next Card
                                </button>
                              </div>
                            </div>
                          )}

                        </div>
                      ) : (
                        <button
                          onClick={generateQuiz}
                          className="w-full py-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-850 hover:border-indigo-400 text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <Brain className="w-6 h-6 text-indigo-500 animate-pulse" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Construct Chapters Quiz</span>
                          <span className="text-[10px] text-slate-400 font-medium">Click to generate interactive MCQs and active flashcards</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* TAB D: MY ANNOTATIONS & SYNC STATUS */}
                  {readerSidebarTab === 'notes' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">
                          SAVED NOTES ({annotations.filter(a => a.bookId === selectedBook.id).length})
                        </span>
                        {user && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase">
                            <Check className="w-3 h-3" /> Cloud Synced
                          </span>
                        )}
                      </div>

                      {annotations.filter(a => a.bookId === selectedBook.id).length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-8">
                          No active annotations or notes highlighted on this book yet. Click any paragraph inside the reader above to highlight it and add custom reflections!
                        </p>
                      ) : (
                        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                          {annotations
                            .filter(a => a.bookId === selectedBook.id)
                            .map((ann) => (
                              <div
                                key={ann.id}
                                className={`p-3 rounded-xl border relative group ${
                                  ann.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-400/25' :
                                  ann.color === 'green' ? 'bg-emerald-500/10 border-emerald-400/25' :
                                  ann.color === 'pink' ? 'bg-pink-500/10 border-pink-400/25' :
                                  'bg-sky-500/10 border-sky-400/25'
                                }`}
                              >
                                <button
                                  onClick={() => deleteAnnotation(ann.id)}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-0.5 transition-opacity"
                                  title="Delete Note"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                                
                                <p className="text-[10px] font-mono font-extrabold uppercase text-slate-400">
                                  {selectedBook.chapters.find(c => c.id === ann.chapterId)?.title || "General Section"}
                                </p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-serif line-clamp-2 mt-1 italic">
                                  "{ann.text}"
                                </p>
                                {ann.comment && (
                                  <div className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-lg text-[10px] text-slate-600 dark:text-slate-400 flex items-start gap-1">
                                    <MessageSquare className="w-3 h-3 text-indigo-500 flex-shrink-0 mt-0.5" />
                                    <span>{ann.comment}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 3: PERSONALIZED LEARNING PATHS */}
        {librarySubTab === 'paths' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Goal Input form */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-md space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Brain className="w-5 h-5 text-indigo-500 animate-pulse" />
                    AI Academic Advisor
                  </h3>
                  <p className="text-xs text-slate-500">
                    Input your target milestone goals or career aims, and our AI will draft a complete sequential curriculum using materials from our library!
                  </p>
                </div>

                <form onSubmit={generateLearningPath} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Learning Goal</label>
                    <textarea
                      value={lpGoal}
                      onChange={(e) => setLpGoal(e.target.value)}
                      placeholder="e.g., I want to learn deep learning and self-attention, starting from a high school level"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Target Grade</label>
                      <select
                        value={lpGrade}
                        onChange={(e) => setLpGrade(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Difficulty</label>
                      <select
                        value={lpDifficulty}
                        onChange={(e) => setLpDifficulty(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={generatingLP || !lpGoal.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {generatingLP ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Formulating curriculum...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Learning Path
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Path Display Panel (Middle & Right columns combined) */}
              <div className="lg:col-span-2 space-y-4">
                {activeLP ? (
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-md space-y-6">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-4">
                      <div className="space-y-1">
                        <div className="flex gap-1.5">
                          <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded">
                            {activeLP.gradeLevel} Curriculum
                          </span>
                          <span className="text-[9px] px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold rounded">
                            {activeLP.difficulty}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight">
                          Goal: "{activeLP.goal}"
                        </h3>
                        <p className="text-[10px] text-slate-400">Created: {new Date(activeLP.createdAt).toLocaleDateString()}</p>
                      </div>

                      {/* Reset path chooser */}
                      {learningPaths.length > 1 && (
                        <select
                          value={activeLP.id}
                          onChange={(e) => {
                            const found = learningPaths.find(lp => lp.id === e.target.value);
                            if (found) setActiveLP(found);
                          }}
                          className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold"
                        >
                          {learningPaths.map((lp, idx) => (
                            <option key={lp.id} value={lp.id}>Path #{idx + 1}: {lp.goal.substring(0, 25)}...</option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Milestones sequential view */}
                    <div className="space-y-4 relative pl-4 border-l-2 border-indigo-100 dark:border-indigo-950 ml-2">
                      {activeLP.milestones.map((ms, idx) => (
                        <div key={ms.id} className="relative space-y-2">
                          
                          {/* Circle Badge Indicator */}
                          <button
                            onClick={() => toggleMilestone(activeLP.id, ms.id)}
                            className={`absolute -left-[27px] top-0 w-5.5 h-5.5 rounded-full flex items-center justify-center border transition-all ${
                              ms.isCompleted
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow'
                                : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-400 hover:border-indigo-500'
                            }`}
                          >
                            {ms.isCompleted ? <Check className="w-3.5 h-3.5" /> : <span className="font-mono text-[9px] font-bold">{idx + 1}</span>}
                          </button>

                          {/* Milestone Information */}
                          <div className="bg-slate-50 dark:bg-slate-950/40 p-4.5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={`font-bold text-sm text-slate-900 dark:text-slate-100 ${ms.isCompleted ? 'line-through opacity-60' : ''}`}>
                                {ms.title}
                              </h4>
                              
                              {/* Direct Learning link */}
                              {ms.bookId && (
                                <button
                                  onClick={() => handleMilestoneLink(ms.bookId!, ms.chapterId)}
                                  className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold border border-indigo-500/20 transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  Read Lesson
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
                              {ms.description}
                            </p>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-850 text-center py-20 space-y-2">
                    <GraduationCap className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 stroke-[1.25]" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">No active learning path formulated yet</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Fill out the form on the left with your academic goals, and our advisor will map out a structural path with milestone indicators and book assignments!
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 4: UPLOAD USER BOOKS */}
        {librarySubTab === 'upload' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-1.5">
                  <UploadCloud className="w-5.5 h-5.5 text-indigo-600 animate-pulse" />
                  Upload Personal Documents & Books
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Support copyright laws by uploading your own notes, licensed textbooks, or public domain pieces. Easily study them with our integrated audiobook speakers, translate tools, summaries, and quiz machines!
                </p>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded-lg font-bold">
                  {uploadError}
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Book uploaded successfully and added to your cloud catalog!
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                
                {/* Drag zone */}
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-850 hover:border-indigo-500/60 transition-all p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-center relative cursor-pointer group">
                  <input
                    type="file"
                    accept=".txt,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2 pointer-events-none">
                    <FileText className="w-10 h-10 mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {uploadFile ? uploadFile.name : "Click to select or drag and drop document"}
                    </p>
                    <p className="text-[10px] text-slate-400">Supports .TXT or .DOCX format up to 5MB</p>
                  </div>
                </div>

                {uploadFile && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Book Title</label>
                      <input
                        type="text"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        placeholder="Enter the title"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Author Name</label>
                      <input
                        type="text"
                        value={uploadAuthor}
                        onChange={(e) => setUploadAuthor(e.target.value)}
                        placeholder="e.g. Self, Professor"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Brief Description</label>
                      <input
                        type="text"
                        value={uploadDesc}
                        onChange={(e) => setUploadDesc(e.target.value)}
                        placeholder="Summarize what this document covers..."
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Subject / Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        <option value="Literature">Literature</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Science">Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="AI">AI / Technology</option>
                        <option value="Law">Law</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Target Grade Level</label>
                      <select
                        value={uploadGrade}
                        onChange={(e) => setUploadGrade(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        <option value="Grade 1-5">Grade 1-5</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || !uploadFile}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Parsing and registering document...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      Publish to Private Library
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
