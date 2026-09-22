import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, Folder, FileCode, Play, Terminal, Sparkles, Check, 
  Loader2, X, ChevronRight, CornerDownRight, Settings, Command, 
  RefreshCw, Copy, MessageSquare, Send, Code, HelpCircle, Laptop, 
  Undo, RotateCcw, Monitor, Info, ArrowUpRight, CheckCircle, Flame,
  Maximize2, Minimize2
} from 'lucide-react';
import { User, CursorWorkspace, CursorFile, CursorChatMessage } from '../types';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import ScrollControls from './ScrollControls';
import { toast } from '../utils/toast';

interface CursorAIProps {
  user: User | null;
  onOpenAuth?: () => void;
}

// ----------------------------------------------------
// STARTER WORKSPACE TEMPLATES
// ----------------------------------------------------
const TEMPLATE_COUNTER: CursorFile[] = [
  {
    path: 'App.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';
import Counter from './Counter';

export default function App() {
  const [accentColor, setAccentColor] = useState('indigo');
  
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-4">
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Super Counter.ai
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Edit App.tsx or Counter.tsx to refactor me!
        </p>
      </div>

      <Counter accent={accentColor} />

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Accent Theme:</span>
        <div className="flex gap-2">
          {['indigo', 'emerald', 'rose', 'amber'].map(color => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className={\`w-4 h-4 rounded-full border border-white shadow-sm ring-1 ring-offset-1 \${
                accentColor === color ? 'ring-indigo-500' : 'ring-transparent'
              } \${
                color === 'indigo' ? 'bg-indigo-600' :
                color === 'emerald' ? 'bg-emerald-600' :
                color === 'rose' ? 'bg-rose-600' : 'bg-amber-500'
              }\`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`
  },
  {
    path: 'Counter.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';

interface CounterProps {
  accent: string;
}

export default function Counter({ accent }: CounterProps) {
  const [count, setCount] = useState(10);
  
  const getBgClass = () => {
    switch(accent) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200';
      case 'rose': return 'bg-rose-600 hover:bg-rose-500 shadow-rose-200';
      case 'amber': return 'bg-amber-500 hover:bg-amber-400 shadow-amber-200';
      default: return 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="text-5xl font-black text-slate-800 tracking-tight my-4">
        {count}
      </div>
      
      <div className="flex gap-2 w-full">
        <button
          onClick={() => setCount(count - 1)}
          className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-xl transition-all active:scale-95"
        >
          - Decrement
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className={\`flex-1 py-2 text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md \${getBgClass()}\`}
        >
          + Increment
        </button>
      </div>

      <button
        onClick={() => setCount(0)}
        className="mt-3 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-all"
      >
        Reset Counter
      </button>
    </div>
  );
}`
  }
];

const TEMPLATE_WEATHER: CursorFile[] = [
  {
    path: 'WeatherApp.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState('New York');
  const [temp, setTemp] = useState(72);
  const [condition, setCondition] = useState('Sunny');

  const fetchWeather = (searchCity: string) => {
    setCity(searchCity);
    if (searchCity.toLowerCase().includes('tokyo')) {
      setTemp(65);
      setCondition('Rainy');
    } else if (searchCity.toLowerCase().includes('london')) {
      setTemp(58);
      setCondition('Cloudy');
    } else if (searchCity.toLowerCase().includes('paris')) {
      setTemp(68);
      setCondition('Windy');
    } else {
      setTemp(Math.floor(Math.random() * 30) + 60);
      setCondition(['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]);
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto bg-gradient-to-b from-sky-400 to-sky-600 rounded-3xl text-white shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold tracking-wider uppercase opacity-85">Weather.ai</span>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Live Preview</span>
      </div>

      <div className="text-center my-6 space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight">{city}</h2>
        <div className="text-6xl font-black">{temp}°F</div>
        <div className="text-sm font-semibold opacity-90">{condition}</div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex gap-1.5">
          {['Tokyo', 'London', 'Paris'].map(c => (
            <button
              key={c}
              onClick={() => fetchWeather(c)}
              className="flex-1 py-1.5 bg-white/20 hover:bg-white/30 text-xs font-bold rounded-lg transition-all"
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search custom city..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchWeather((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
          className="w-full px-3 py-2 text-xs bg-white/15 hover:bg-white/25 focus:bg-white text-white focus:text-slate-800 rounded-xl placeholder-white/70 outline-none transition-all"
        />
      </div>
    </div>
  );
}`
  }
];

const TEMPLATE_TODO: CursorFile[] = [
  {
    path: 'TodoList.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Learn advanced React features', completed: true },
    { id: '2', text: 'Refactor code using Cursor.ai', completed: false },
    { id: '3', text: 'Compile production ready build', completed: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: input, completed: false }]);
    setInput('');
  };

  return (
    <div className="p-5 max-w-sm mx-auto bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-black text-base text-indigo-400">Task Tracker</h3>
        <span className="text-[10px] font-mono text-slate-500">Cursor Project</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-4">
        {todos.map(todo => (
          <div
            key={todo.id}
            onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
            className="flex items-center gap-3 p-2.5 bg-slate-850 hover:bg-slate-800 rounded-xl cursor-pointer transition-all border border-slate-800/40"
          >
            <div className={\`w-4 h-4 rounded border flex items-center justify-center \${
              todo.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
            }\`}>
              {todo.completed && '✓'}
            </div>
            <span className={\`text-xs \${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}\`}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-3 py-2 text-xs bg-slate-800 focus:bg-slate-750 text-slate-100 rounded-xl outline-none border border-slate-700 focus:border-indigo-500 transition-all"
        />
        <button
          onClick={addTodo}
          className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
        >
          Add
        </button>
      </div>
    </div>
  );
}`
  }
];

export default function CursorAI({ user, onOpenAuth }: CursorAIProps) {
  // --- WORKSPACE & EDITOR STATE ---
  const [workspaces, setWorkspaces] = useState<CursorWorkspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<CursorWorkspace | null>(null);
  const [activeFilePath, setActiveFilePath] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  
  // Tab Bar
  const [openTabs, setOpenTabs] = useState<string[]>([]);

  // Modals
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // Inline Cmd+K Copilot State
  const [isInlineBarOpen, setIsInlineBarOpen] = useState(false);
  const [inlineInstruction, setInlineInstruction] = useState('');
  const [isProcessingInline, setIsProcessingInline] = useState(false);

  // Suggested Code Changes Review Diff
  const [suggestedDiff, setSuggestedDiff] = useState<{ original: string; modified: string } | null>(null);
  const [diffReason, setDiffReason] = useState<string>('');

  // Terminal Simulator State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'nova-compiler: ready to serve sandbox environment.',
    'Type standard commands or click [Run Live Preview] to initialize live visual testing.',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isDevServerRunning, setIsDevServerRunning] = useState(false);

  // Live Preview Widget Render State
  const [previewVersion, setPreviewVersion] = useState(0);

  // Sidebar Chat State
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-pro-preview'>('gemini-3.8-flash');
  const [chatMessages, setChatMessages] = useState<CursorChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const filesExplorerRef = useRef<HTMLDivElement>(null);

  // --- MOUNT & WORKSPACE LOAD ---
  useEffect(() => {
    loadWorkspaces();
  }, [user]);

  const loadWorkspaces = async () => {
    const local = localStorage.getItem('nova_cursor_workspaces');
    let items: CursorWorkspace[] = local ? JSON.parse(local) : [];

    // If no workspaces, populate default templates
    if (items.length === 0) {
      const defCounter: CursorWorkspace = {
        id: 'ws-counter',
        userId: user?.id || 'guest',
        name: 'React Stateful Counter App',
        createdAt: new Date().toISOString(),
        files: TEMPLATE_COUNTER
      };
      const defWeather: CursorWorkspace = {
        id: 'ws-weather',
        userId: user?.id || 'guest',
        name: 'Live Weather Dashboard',
        createdAt: new Date().toISOString(),
        files: TEMPLATE_WEATHER
      };
      const defTodo: CursorWorkspace = {
        id: 'ws-todo',
        userId: user?.id || 'guest',
        name: 'Interactive Task Tracker',
        createdAt: new Date().toISOString(),
        files: TEMPLATE_TODO
      };
      items = [defCounter, defWeather, defTodo];
      localStorage.setItem('nova_cursor_workspaces', JSON.stringify(items));
    }

    setWorkspaces(items);
    if (items.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(items[0]);
    }
  };

  // Switch workspace
  useEffect(() => {
    if (selectedWorkspace) {
      const files = selectedWorkspace.files;
      if (files.length > 0) {
        setOpenTabs([files[0].path]);
        handleOpenFile(files[0].path);
      } else {
        setOpenTabs([]);
        setActiveFilePath('');
        setEditorContent('');
      }
      setChatMessages([
        {
          id: 'chat-init',
          role: 'assistant',
          content: `👋 Welcome to Cursor.ai Workspace for **"${selectedWorkspace.name}"**!\n\nHere you can edit code directly in the editor, highlight code and press **Cmd+K / Ctrl+K** to edit inline, or ask me code-level questions in the chat! Click **"Run Server"** to view live visual rendering instantly!`,
          createdAt: new Date().toISOString()
        }
      ]);
      setSuggestedDiff(null);
    }
  }, [selectedWorkspace]);

  // Handle open file
  const handleOpenFile = (path: string) => {
    if (!selectedWorkspace) return;
    const file = selectedWorkspace.files.find(f => f.path === path);
    if (file) {
      setActiveFilePath(path);
      setEditorContent(file.content);
      setSelectedCode('');
      setIsInlineBarOpen(false);
      setSuggestedDiff(null);
      if (!openTabs.includes(path)) {
        setOpenTabs(prev => [...prev, path]);
      }
    }
  };

  const handleCloseTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = openTabs.filter(t => t !== path);
    setOpenTabs(updated);
    if (activeFilePath === path) {
      if (updated.length > 0) {
        handleOpenFile(updated[0]);
      } else {
        setActiveFilePath('');
        setEditorContent('');
      }
    }
  };

  // --- EDITOR INTERACTIONS & HIGH-LIGHTS ---
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    
    // Save live editor content back to current workspace state (locally)
    if (selectedWorkspace && activeFilePath) {
      const updatedFiles = selectedWorkspace.files.map(f => {
        if (f.path === activeFilePath) {
          return { ...f, content: e.target.value };
        }
        return f;
      });
      const updatedWorkspace = { ...selectedWorkspace, files: updatedFiles };
      setSelectedWorkspace(updatedWorkspace);

      const updatedAll = workspaces.map(ws => ws.id === selectedWorkspace.id ? updatedWorkspace : ws);
      setWorkspaces(updatedAll);
      localStorage.setItem('nova_cursor_workspaces', JSON.stringify(updatedAll));
    }
  };

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const selection = target.value.substring(target.selectionStart, target.selectionEnd);
    if (selection.trim()) {
      setSelectedCode(selection);
    } else {
      setSelectedCode('');
    }
  };

  // Handle Ctrl+K Keyboard Event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsInlineBarOpen(true);
    }
  };

  // --- CMD+K INLINE EDIT IMPLEMENTATION ---
  const handleInlineGenerate = async () => {
    if (!inlineInstruction.trim() || !selectedWorkspace || !activeFilePath) return;
    
    setIsProcessingInline(true);
    const activeFile = selectedWorkspace.files.find(f => f.path === activeFilePath);
    if (!activeFile) return;

    try {
      const res = await fetch('/api/cursor/copilot-k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest'}`
        },
        body: JSON.stringify({
          file: { path: activeFile.path, language: activeFile.language },
          content: editorContent,
          selectedCode: selectedCode || editorContent, // fallback to whole file if nothing highlighted
          instruction: inlineInstruction,
          model: selectedModel
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Replicate visual diff feedback
      setSuggestedDiff({
        original: selectedCode || editorContent,
        modified: data.modifiedCode
      });
      setDiffReason(data.diffDescription || 'Copilot modifications complete.');

    } catch (err: any) {
      toast.error(`Inline Edit error: ${err.message || 'Verification of API token required.'}`);
    } finally {
      setIsProcessingInline(false);
      setIsInlineBarOpen(false);
    }
  };

  const handleAcceptDiff = () => {
    if (!suggestedDiff || !selectedWorkspace || !activeFilePath) return;

    let finalContent = '';
    if (selectedCode) {
      // Replace just the highlighted part
      finalContent = editorContent.replace(suggestedDiff.original, suggestedDiff.modified);
    } else {
      // Replace the whole file content
      finalContent = suggestedDiff.modified;
    }

    setEditorContent(finalContent);
    setSuggestedDiff(null);
    setSelectedCode('');
    setInlineInstruction('');

    // Save
    const updatedFiles = selectedWorkspace.files.map(f => {
      if (f.path === activeFilePath) {
        return { ...f, content: finalContent };
      }
      return f;
    });
    const updatedWorkspace = { ...selectedWorkspace, files: updatedFiles };
    setSelectedWorkspace(updatedWorkspace);

    const updatedAll = workspaces.map(ws => ws.id === selectedWorkspace.id ? updatedWorkspace : ws);
    setWorkspaces(updatedAll);
    localStorage.setItem('nova_cursor_workspaces', JSON.stringify(updatedAll));

    setTerminalLogs(prev => [
      ...prev,
      `[Nova Live Loader] Accepted AI Code modification: "${diffReason}"`,
      `[Nova Live Loader] Compiled ${activeFilePath} successfully.`
    ]);

    // Refresh live preview to reflect code change
    setPreviewVersion(v => v + 1);
  };

  const handleRejectDiff = () => {
    setSuggestedDiff(null);
    setTerminalLogs(prev => [...prev, `[Nova Copilot] Inline edits rejected by user.`]);
  };

  // --- SIDEBAR COPILOT CHAT ---
  const handleSendChat = async () => {
    if (!chatInput.trim() || !selectedWorkspace || !activeFilePath || isSendingChat) return;

    const userMsg: CursorChatMessage = {
      id: 'chat-' + Math.random().toString(36).substring(7),
      role: 'user',
      content: chatInput.trim(),
      selectedFile: activeFilePath,
      selectedCode: selectedCode || undefined,
      createdAt: new Date().toISOString()
    };

    const updatedChats = [...chatMessages, userMsg];
    setChatMessages(updatedChats);
    setChatInput('');
    setIsSendingChat(true);

    // Auto-scroll chat
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    const activeFile = selectedWorkspace.files.find(f => f.path === activeFilePath);
    if (!activeFile) return;

    try {
      const res = await fetch('/api/cursor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest'}`
        },
        body: JSON.stringify({
          file: { path: activeFile.path, language: activeFile.language },
          content: editorContent,
          selectedCode: selectedCode || undefined,
          prompt: userMsg.content,
          messages: updatedChats,
          model: selectedModel
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const assistantMsg: CursorChatMessage = {
        id: 'chat-' + Math.random().toString(36).substring(7),
        role: 'assistant',
        content: data.explanation,
        createdAt: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, assistantMsg]);

      // If copilot returned code changes, pre-load them as inline diff proposal!
      if (data.codeChanges) {
        setSuggestedDiff({
          original: data.codeChanges.original,
          modified: data.codeChanges.modified
        });
        setDiffReason('Suggested modification from Copilot Chat.');
      }

    } catch (err: any) {
      setChatMessages(prev => [
        ...prev,
        {
          id: 'chat-err-' + Math.random().toString(36).substring(7),
          role: 'assistant',
          content: `⚠️ Copilot Chat failed: ${err.message || 'Make sure server configuration matches model parameters.'}`,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setIsSendingChat(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  // --- SIMULATED COMPILER AND TERMINAL ---
  const triggerDevServer = () => {
    if (isDevServerRunning) {
      setTerminalLogs(prev => [...prev, '[Nova Server] Stopping development process...', 'Process exited with code 0']);
      setIsDevServerRunning(false);
    } else {
      setIsDevServerRunning(true);
      setTerminalLogs(prev => [
        ...prev,
        `[Nova Compiler] npm run dev`,
        `[Nova Compiler] vite v5.1.4 dev server starting...`,
        `[Nova Compiler] Port 3000 selected for reverse proxy integration.`,
        `[Nova Compiler] Hot Module Replacement (HMR) set to offline mode.`,
        `[Nova Compiler] Loaded configuration schema successfully.`,
        `[Nova Compiler] Compiled target entry points: "${activeFilePath}"`,
        `[Nova Server] Localhost address bounds: http://localhost:3000`,
        `[Nova Server] Production build bundles created in /dist`,
        `[Nova Live Loader] Rerouting live preview rendering...`
      ]);
      setPreviewVersion(v => v + 1);
    }
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let response = '';

    if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'npm run build') {
      response = `[Nova Build] Building for production...\n[Nova Build] Bundled 3 custom modules.\n[Nova Build] Output saved in /dist/assets/index.js (42.8 KB)\n[Nova Build] Complete!`;
    } else if (cmd === 'ls') {
      response = `Files in active workspace:\n${selectedWorkspace?.files.map(f => ` - ${f.path} (${f.language})`).join('\n')}`;
    } else if (cmd === 'help') {
      response = `Available commands:\n - clear: Clear logs\n - ls: List active files\n - npm run build: Test production bundle build\n - node test.js: Execute script evaluation`;
    } else {
      response = `bash: command not found: ${cmd}`;
    }

    setTerminalLogs(prev => [...prev, `guest@nova-sandbox:~$ ${terminalInput}`, response]);
    setTerminalInput('');
  };

  // --- WORKSPACE FILE CRUD ---
  const handleCreateFile = () => {
    if (!newFileName.trim() || !selectedWorkspace) return;

    // Detect language
    const ext = newFileName.split('.').pop() || 'ts';
    const lang = ['js', 'jsx'].includes(ext) ? 'javascript' : ['ts', 'tsx'].includes(ext) ? 'typescript' : 'python';

    const newFile: CursorFile = {
      path: newFileName.trim(),
      language: lang,
      content: `// New file ${newFileName.trim()}\nexport default function Widget() {\n  return <div>New Widget Component</div>;\n}`
    };

    const updatedWorkspace = {
      ...selectedWorkspace,
      files: [...selectedWorkspace.files, newFile]
    };

    setSelectedWorkspace(updatedWorkspace);
    const updatedAll = workspaces.map(ws => ws.id === selectedWorkspace.id ? updatedWorkspace : ws);
    setWorkspaces(updatedAll);
    localStorage.setItem('nova_cursor_workspaces', JSON.stringify(updatedAll));

    setNewFileName('');
    setIsNewFileModalOpen(false);
    handleOpenFile(newFile.path);

    setTerminalLogs(prev => [...prev, `[Nova Files] Created empty custom file "${newFile.path}"`]);
  };

  const handleDeleteFile = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;
    if (!selectedWorkspace) return;

    const updatedFiles = selectedWorkspace.files.filter(f => f.path !== path);
    const updatedWorkspace = { ...selectedWorkspace, files: updatedFiles };
    
    setSelectedWorkspace(updatedWorkspace);
    const updatedAll = workspaces.map(ws => ws.id === selectedWorkspace.id ? updatedWorkspace : ws);
    setWorkspaces(updatedAll);
    localStorage.setItem('nova_cursor_workspaces', JSON.stringify(updatedAll));

    handleCloseTab(path, e);
    setTerminalLogs(prev => [...prev, `[Nova Files] Deleted file "${path}" from workspace.`]);
  };

  // Create workspace
  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) return;

    const newWs: CursorWorkspace = {
      id: 'ws-' + Math.random().toString(36).substring(7),
      userId: user?.id || 'guest',
      name: newWorkspaceName.trim(),
      createdAt: new Date().toISOString(),
      files: [
        {
          path: 'index.tsx',
          language: 'typescript',
          content: `import React from 'react';\n\nexport default function Index() {\n  return (\n    <div className="p-6 text-center bg-white rounded-2xl border">\n      <h2 className="text-lg font-bold">New Workspace: ${newWorkspaceName}</h2>\n      <p className="text-xs text-slate-500 mt-1">Grounding template in space context</p>\n    </div>\n  );\n}`
        }
      ]
    };

    const updated = [newWs, ...workspaces];
    setWorkspaces(updated);
    localStorage.setItem('nova_cursor_workspaces', JSON.stringify(updated));
    setSelectedWorkspace(newWs);
    setIsNewWorkspaceModalOpen(false);
    setNewWorkspaceName('');
  };

  // Render the real interactive mock app in Live Preview frame
  const renderInteractiveLivePreview = () => {
    if (!selectedWorkspace) return null;

    // 1. App Stateful Counter App
    if (selectedWorkspace.id === 'ws-counter') {
      // Parse content values to make preview dynamic if user edits
      const countMatch = editorContent.match(/useState\((\d+)\)/);
      const accentMatch = editorContent.match(/useState\('(\w+)'\)/);
      
      const parsedCount = countMatch ? parseInt(countMatch[1]) : 10;
      const parsedAccent = accentMatch ? accentMatch[1] : 'indigo';

      return (
        <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-full max-w-[280px] bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 text-center space-y-4">
            <div>
              <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Interactive Build</h4>
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white mt-0.5">Counter Sandbox</h2>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-white/5">
              <span className="text-4xl font-black text-slate-800 dark:text-white">{parsedCount}</span>
            </div>

            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              Active Accent Palette: <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{parsedAccent}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              "Try typing in the editor or selecting code. The Copilot will rebuild changes live!"
            </p>
          </div>
        </div>
      );
    }

    // 2. Weather Dashboard
    if (selectedWorkspace.id === 'ws-weather') {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-full max-w-[280px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-2xl shadow-xl space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black tracking-widest uppercase">Weather.ai</span>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-mono">3000/api</span>
            </div>

            <div className="text-center space-y-0.5">
              <h3 className="text-xl font-bold">New York City</h3>
              <div className="text-5xl font-black">72°F</div>
              <p className="text-xs opacity-90">Cloudy Breezes</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px] bg-white/10 p-2.5 rounded-xl">
              <div>
                <p className="opacity-75">Wind Speed</p>
                <p className="font-bold">12 mph</p>
              </div>
              <div>
                <p className="opacity-75">Humidity</p>
                <p className="font-bold">64%</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Todo List Tracker
    if (selectedWorkspace.id === 'ws-todo') {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-full max-w-[280px] bg-slate-900 text-white p-5 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-indigo-400">Task Tracker Sandbox</h4>
              <span className="text-[9px] font-mono text-slate-500">Live Preview</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 p-2 bg-slate-850 rounded-lg border border-slate-800/40">
                <span className="text-indigo-500">✓</span>
                <span className="text-xs line-through text-slate-400">Build interactive client previews</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-slate-850 rounded-lg border border-slate-800/40">
                <span className="text-slate-600">○</span>
                <span className="text-xs text-slate-200">Refactor code with Cmd+K</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default template fall-back
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="text-center space-y-2 p-6 max-w-xs">
          <Code className="w-8 h-8 text-indigo-500 mx-auto animate-pulse" />
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Custom Workspace Compilation</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Click [Run Server] inside the compiler window to run full container logic rendering in this preview panel.
          </p>
        </div>
      </div>
    );
  };


  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-50 dark:bg-slate-950">
      
      {/* 1. LEFT COLUMN: WORKSPACE AND FILE EXPLORER */}
      <div className="w-full lg:w-60 border-r border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900 flex flex-col shrink-0 min-h-0">
        
        {/* Workspace choosing panel */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Sandbox</span>
            </div>
            <button
              onClick={() => setIsNewWorkspaceModalOpen(true)}
              className="p-1 rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
              title="New Workspace sandbox"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <select
            value={selectedWorkspace?.id || ''}
            onChange={(e) => {
              const ws = workspaces.find(w => w.id === e.target.value);
              if (ws) setSelectedWorkspace(ws);
            }}
            className="w-full px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {workspaces.map(w => (
              <option key={w.id} value={w.id}>
                📁 {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Files Explorer Title & Add File button */}
        <div className="p-3.5 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Project Files</span>
          <button
            onClick={() => setIsNewFileModalOpen(true)}
            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add file
          </button>
        </div>

        {/* Files list */}
        <div ref={filesExplorerRef} className="flex-1 overflow-y-auto p-3 space-y-1 relative">
          <ScrollControls containerRef={filesExplorerRef} showProgress={false} />
          {selectedWorkspace?.files.map(file => {
            const isActive = file.path === activeFilePath;
            return (
              <div
                key={file.path}
                onClick={() => handleOpenFile(file.path)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold border-l-2 border-indigo-600 dark:border-indigo-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-850/50 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                  <span className="text-xs truncate">{file.path}</span>
                </div>
                {selectedWorkspace.files.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteFile(file.path, e)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 text-slate-400 transition-all cursor-pointer"
                    title="Delete file"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Info label */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/40 text-[10px] text-slate-400 text-center space-y-1">
          <p className="font-semibold text-slate-500 dark:text-slate-400">⚡ Keyboard shortcuts</p>
          <p>Highlight text + press <kbd className="bg-slate-200 dark:bg-slate-850 px-1 py-0.5 rounded font-mono text-[9px]">Cmd+K</kbd> to edit with AI</p>
        </div>
      </div>

      {/* 2. CENTER PANEL: ACTIVE CODE EDITOR, DIFFS, SIMULATED TERMINAL & LIVE PREVIEW */}
      <div className="flex-1 flex flex-col border-r border-slate-200/80 dark:border-white/5 min-w-0 bg-slate-900">
        
        {/* Editor Tabs bar */}
        <div className="flex items-center justify-between bg-slate-950 px-4 py-1.5 border-b border-slate-850 overflow-x-auto shrink-0">
          <div className="flex gap-1">
            {openTabs.map(tabPath => {
              const isActive = tabPath === activeFilePath;
              return (
                <div
                  key={tabPath}
                  onClick={() => handleOpenFile(tabPath)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-900 text-slate-100 font-bold border-t border-indigo-500'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>{tabPath}</span>
                  <button
                    onClick={(e) => handleCloseTab(tabPath, e)}
                    className="p-0.5 rounded-full hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerDevServer}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow ${
                isDevServerRunning
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Play className="w-3 h-3" />
              {isDevServerRunning ? "Server Running" : "Run Server"}
            </button>
          </div>
        </div>

        {/* Suggested AI Diff Review banner (Cursor acceptance engine) */}
        {suggestedDiff && (
          <div className="bg-gradient-to-r from-emerald-950/90 to-slate-900 p-4 border-b border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-100 shrink-0">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="font-extrabold text-xs text-emerald-400 uppercase tracking-widest">Review suggested changes:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic pr-4">
                "{diffReason}"
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleRejectDiff}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-lg cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptDiff}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-900/30"
              >
                <Check className="w-3.5 h-3.5" /> Accept change
              </button>
            </div>
          </div>
        )}

        {/* Editor text canvas or Diff code panels */}
        <div className="flex-1 relative overflow-hidden flex flex-col min-h-0 bg-slate-900">
          
          {suggestedDiff ? (
            // SIDE-BY-SIDE DIFF VIEW (Cursor Code Diff Engine)
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-850 overflow-y-auto font-mono text-xs">
              <div className="p-4 bg-red-950/10 space-y-2">
                <div className="text-[10px] font-extrabold text-red-400 tracking-wider uppercase mb-2">Original Content:</div>
                <pre className="whitespace-pre-wrap text-red-300 line-through p-3 bg-red-950/25 rounded-xl border border-red-900/20">{suggestedDiff.original}</pre>
              </div>
              <div className="p-4 bg-emerald-950/10 space-y-2">
                <div className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase mb-2">AI Refactored Suggestions:</div>
                <pre className="whitespace-pre-wrap text-emerald-200 p-3 bg-emerald-950/25 rounded-xl border border-emerald-900/20">{suggestedDiff.modified}</pre>
              </div>
            </div>
          ) : (
            // REGULAR TEXT CODE EDITOR
            <div className="flex-1 relative flex">
              {/* Line Numbers column */}
              <div className="w-12 py-4 bg-slate-950/50 text-right pr-3 select-none text-slate-600 font-mono text-xs space-y-0 border-r border-slate-850/80">
                {editorContent.split('\n').map((_, i) => (
                  <div key={i} className="leading-relaxed h-5">{i + 1}</div>
                ))}
              </div>

              {/* Editable overlay textarea */}
              <textarea
                ref={textareaRef}
                value={editorContent}
                onChange={handleEditorChange}
                onSelect={handleTextSelection}
                onKeyDown={handleKeyDown}
                disabled={!activeFilePath}
                className="flex-1 p-4 bg-transparent text-slate-100 font-mono text-xs leading-relaxed outline-none resize-none overflow-y-auto whitespace-pre h-full"
                placeholder={activeFilePath ? "// Code sandbox environment. Highlight code and press Ctrl+K to start..." : "// Double click a file on the left side to open editing sandbox..."}
              />

              {/* Floating widget popup if text is highlighted (Ask AI shortcut helper) */}
              {selectedCode && !isInlineBarOpen && (
                <div className="absolute top-4 right-4 bg-slate-950 border border-slate-800 rounded-xl p-2.5 shadow-2xl flex items-center gap-2.5 z-10 text-slate-200 animate-in fade-in zoom-in-95">
                  <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Highlighted ({selectedCode.split('\n').length} lines)
                  </span>
                  <button
                    onClick={() => setIsInlineBarOpen(true)}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Cmd+K edit
                  </button>
                </div>
              )}

              {/* FLOATING INLINE INPUT BAR (Cmd+K interface overlay) */}
              {isInlineBarOpen && (
                <div className="absolute inset-x-4 top-1/3 max-w-2xl mx-auto bg-slate-950 border-2 border-indigo-500/80 shadow-2xl rounded-2xl p-4 space-y-3 z-25 text-slate-200 animate-in slide-in-from-top-10">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                      <Command className="w-4 h-4" />
                      <span>Cursor Inline Refactor (Ctrl+K)</span>
                    </div>
                    <button
                      onClick={() => setIsInlineBarOpen(false)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={inlineInstruction}
                    onChange={(e) => setInlineInstruction(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInlineGenerate()}
                    placeholder="e.g., add email regex parameter check, refactor loops, convert to async await..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 outline-none px-3 py-2.5 text-xs text-slate-150 placeholder-slate-500 rounded-xl transition-all"
                    autoFocus
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      Will edit: <span className="font-semibold text-slate-400">{selectedCode ? "Selected code snippet" : "Entire active file"}</span>
                    </span>
                    <button
                      onClick={handleInlineGenerate}
                      disabled={isProcessingInline || !inlineInstruction.trim()}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                    >
                      {isProcessingInline ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" /> Coding...
                        </>
                      ) : (
                        <>Refactor code <ChevronRight className="w-3 h-3" /></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: RESIZABLE ROW DIVIDED INTO [CONSOLE LOGGER] & [LIVE VISUAL PREVIEW] */}
        <div className="h-64 bg-slate-950 border-t border-slate-850 flex divide-x divide-slate-850 shrink-0">
          
          {/* Terminal Console Panel */}
          <div className="flex-1 flex flex-col p-4 font-mono text-xs text-slate-400 min-w-0">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850 mb-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Output Sandbox Logs
              </span>
              <button 
                onClick={() => setTerminalLogs(['nova-compiler: logs flushed.'])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-bold hover:underline"
              >
                Clear console
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-[11px] leading-relaxed select-text">
              {terminalLogs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>

            {/* Input line for simulated bash terminal */}
            <form onSubmit={handleTerminalCommand} className="flex items-center gap-2 border-t border-slate-850 pt-2 mt-2">
              <span className="text-indigo-400 font-bold">guest@nova:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type ls, help, or npm run build..."
                className="flex-1 bg-transparent border-none outline-none text-slate-200 text-xs placeholder-slate-600"
              />
            </form>
          </div>

          {/* Live Viewport Panel */}
          <div className="w-80 flex flex-col bg-slate-950 p-4 shrink-0 min-w-0">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850 mb-3">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-widest flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-emerald-400" /> Preview (Localhost:3000)
              </span>
              <button
                onClick={() => setPreviewVersion(v => v + 1)}
                className="text-slate-500 hover:text-slate-300 cursor-pointer"
                title="Force refresh viewport"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl flex flex-col overflow-hidden border border-slate-800">
              {isDevServerRunning ? (
                renderInteractiveLivePreview()
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <Play className="w-7 h-7 text-indigo-500 stroke-[1.5] animate-bounce mb-2" />
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">Live preview offline</p>
                  <button
                    onClick={triggerDevServer}
                    className="mt-2.5 px-3 py-1 bg-indigo-600/10 hover:bg-indigo-600/25 text-indigo-400 text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Click to Start Server
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: COPILOT SIDEBAR CHAT (Cmd+L workflow) */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900 flex flex-col shrink-0 min-h-0">
        
        {/* Model Chooser & title */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Code Composer
            </span>
            <button
              onClick={() => {
                setChatMessages([
                  {
                    id: 'chat-clear',
                    role: 'assistant',
                    content: `👋 Chat logs restarted. Ask me how to refactor your active workspace!`,
                    createdAt: new Date().toISOString()
                  }
                ]);
              }}
              className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold hover:underline"
            >
              Reset chat
            </button>
          </div>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="w-full px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="gemini-3.8-flash">💡 Gemini 3.8 Flash (Copilot)</option>
            <option value="gemini-3.1-pro-preview">🧠 Gemini 3.1 Pro (Heavy reasoning)</option>
          </select>
        </div>

        {/* Chat History Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0 relative">
          <ScrollControls containerRef={chatContainerRef} />
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col space-y-1 max-w-[90%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold">
                <span>{msg.role === 'user' ? "Me" : "Nova Copilot"}</span>
                {msg.selectedFile && (
                  <span className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    ref: {msg.selectedFile}
                  </span>
                )}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                    : 'bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-slate-150 rounded-tl-sm border border-slate-100 dark:border-white/5 shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Container */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="space-y-2">
            {selectedCode && (
              <div className="flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900/30 rounded-xl px-3 py-1.5 text-[10px] text-indigo-600 dark:text-indigo-400">
                <span className="truncate max-w-[200px]">Attached selection: "{selectedCode.slice(0, 40)}..."</span>
                <button
                  onClick={() => setSelectedCode('')}
                  className="hover:text-red-500 font-bold"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="relative">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendChat())}
                placeholder="Ask how to debug or code refactor..."
                rows={2}
                className="w-full pr-10 pl-3.5 py-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 placeholder-slate-400 resize-none shadow-sm"
              />
              <button
                onClick={handleSendChat}
                disabled={isSendingChat || !chatInput.trim()}
                className="absolute right-2.5 bottom-2.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow transition-all cursor-pointer disabled:opacity-40"
              >
                {isSendingChat ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. DIALOGS & OVERLAY MODALS --- */}
      
      {/* Modal: New Workspace */}
      {isNewWorkspaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-white/5 p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
              <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Create Sandbox Workspace</h3>
              <button onClick={() => setIsNewWorkspaceModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Workspace Name</label>
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="e.g. Weather Widget Dashboard"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-500 text-slate-850 dark:text-slate-150"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsNewWorkspaceModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkspace}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer"
              >
                Create sandbox
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add File */}
      {isNewFileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-white/5 p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
              <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Create Workspace File</h3>
              <button onClick={() => setIsNewFileModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">File Path Name (include extension)</label>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="e.g. analytics.ts, ButtonWidget.tsx"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-500 text-slate-850 dark:text-slate-150"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsNewFileModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer"
              >
                Create File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
