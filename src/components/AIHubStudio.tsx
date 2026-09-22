import React, { useState } from 'react';
import { 
  Sparkles, Bot, Layers, Palette, Image as ImageIcon, Video, 
  Share2, Zap, FileSpreadsheet, Globe, Wand2, RefreshCw, ExternalLink, 
  Download, Check, Play, FileText, CheckCircle, Search, BookOpen,
  Calculator, GraduationCap, FileCode, Terminal, Music, Mic, Volume2,
  Workflow, ArrowRight, ShieldCheck, Database, Rocket, Cpu, Sparkle, Presentation,
  Film, SlidersHorizontal, Scissors, Clapperboard, Pause, VolumeX, RotateCcw, Activity
} from 'lucide-react';
import { User, getTrialInfo, isStudentUser, isUltraHighPremium } from '../types';
import ScrollControls from './ScrollControls';
import { getSuperAiTool } from '../data/superAiToolsData';
import { toast } from '../utils/toast';

export interface ToolConfig {
  id: string;
  name: string;
  category: 'LLM & Chat' | 'Education & Math' | 'Research & Science' | 'Coding & IDEs' | 'No-Code & Builders' | 'Image & Design' | 'Video & 3D' | 'Productivity & Writing' | 'Voice & Audio' | 'Automation & Agents';
  badge: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  defaultPrompt: string;
  actions: string[];
  sampleOutputTitle: string;
  sampleDetails: { label: string; value: string }[];
  iconType?: string;
}

export const MASTER_AI_DIRECTORY: Record<string, ToolConfig> = {
  // Education & Math
  khanmigo: {
    id: 'khanmigo',
    name: 'Khanmigo AI Tutor',
    category: 'Education & Math',
    badge: 'Socratic Education Copilot',
    tagline: 'Personalized interactive tutoring, step-by-step math hints, and essay feedback without giving away direct answers',
    gradient: 'from-emerald-600 to-teal-700',
    accentColor: 'text-emerald-400',
    defaultPrompt: 'Guide me through solving calculus optimization problems using the second derivative test.',
    actions: ['Step-by-Step Socratic Hint', 'Practice Problem Generator', 'Essay Argument Analysis', 'Concept Map Breakdown'],
    sampleOutputTitle: 'Interactive Socratic Guidance Session',
    sampleDetails: [
      { label: 'Learning Mode', value: 'Socratic Dialogue & Active Recall' },
      { label: 'Target Subject', value: 'AP Calculus BC / Optimization' },
      { label: 'Next Guiding Question', value: 'What happens to the rate of change when f\'(x) = 0?' }
    ]
  },
  quizlet: {
    id: 'quizlet',
    name: 'Quizlet AI Q-Chat',
    category: 'Education & Math',
    badge: 'Adaptive Flashcards & Spaced Repetition',
    tagline: 'Instant smart study deck generation, active recall tests, and spaced repetition schedule optimizer',
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: 'text-blue-400',
    defaultPrompt: 'Create a 20-card medical terminology study set focusing on cardiology and pharmacology.',
    actions: ['Generate Smart Flashcards', 'Start Spaced Repetition Drill', 'Create Multiple-Choice Exam', 'Extract from Notes'],
    sampleOutputTitle: 'Generated Adaptive Deck (25 Cards)',
    sampleDetails: [
      { label: 'Mastery Prediction', value: '94% Retention in 7 Days' },
      { label: 'Active Spacing Interval', value: '1d -> 3d -> 7d -> 14d optimal' },
      { label: 'Quiz Mode', value: 'Feynman Technique & Multiple Choice' }
    ]
  },
  photomath: {
    id: 'photomath',
    name: 'Photomath AI Solver',
    category: 'Education & Math',
    badge: 'OCR & Mathematical Step Breakdown',
    tagline: 'Scan handwritten equations, parse matrices, and solve complex integrals with graph projections',
    gradient: 'from-rose-500 to-red-600',
    accentColor: 'text-rose-400',
    defaultPrompt: 'Solve the system of equations: 3x + 2y - z = 11, 2x - 4y + 3z = -2, x + y + z = 6 step-by-step.',
    actions: ['Step-by-Step Solution', 'Render 2D/3D Graph', 'Alternative Solving Methods', 'LaTeX Export'],
    sampleOutputTitle: 'Mathematical Proof & Step Sequence',
    sampleDetails: [
      { label: 'Identified Formula', value: 'System of Linear Equations (3 Variables)' },
      { label: 'Solution Set', value: 'x = 2, y = 3, z = 1' },
      { label: 'Verification', value: 'Substituted into Eq. 1: 3(2) + 2(3) - (1) = 11 (True)' }
    ]
  },
  wolfram_alpha: {
    id: 'wolfram_alpha',
    name: 'Wolfram|Alpha Pro',
    category: 'Education & Math',
    badge: 'Computational Knowledge Engine',
    tagline: 'Curated scientific datasets, symbolic algebraic simplification, differential equations, and thermodynamic constants',
    gradient: 'from-amber-600 to-red-600',
    accentColor: 'text-amber-400',
    defaultPrompt: 'integrate x^3 * e^(-2x) dx from 0 to infinity and display symbolic evaluation steps',
    actions: ['Compute Symbolic Result', 'Plot Vector Field', 'Retrieve Physical Constants', 'Differential Equations'],
    sampleOutputTitle: 'Wolfram Computational Kernel Output',
    sampleDetails: [
      { label: 'Exact Symbolic Result', value: '3 / 16 (0.1875)' },
      { label: 'Indefinite Integral', value: '-1/8 e^(-2x) (4x^3 + 6x^2 + 6x + 3) + C' },
      { label: 'Computation Time', value: '18 ms (Wolfram Mathematica 14 Kernel)' }
    ]
  },

  // Research & Science
  google_scholar: {
    id: 'google_scholar',
    name: 'Google Scholar Copilot',
    category: 'Research & Science',
    badge: 'Peer-Reviewed Academic Index',
    tagline: 'Search 200M+ academic journals, citation graph rankings, h-index telemetry, and BibTeX citations',
    gradient: 'from-blue-600 to-sky-600',
    accentColor: 'text-sky-400',
    defaultPrompt: 'Find latest 2025-2026 peer-reviewed papers on Sub-Quadratic Attention Mechanisms and State Space Models.',
    actions: ['Search Academic Journals', 'Export BibTeX / APA', 'Rank by Citation Impact', 'Find Open Access PDF'],
    sampleOutputTitle: 'Academic Literature Index (84 Papers Found)',
    sampleDetails: [
      { label: 'Top Cited Paper', value: 'Mamba-3: Linear-Time Sequence Modeling with Selective State (2025)' },
      { label: 'Citation Count', value: '1,420 Citations across Nature & IEEE' },
      { label: 'Impact Factor', value: 'h-index: 128 • Peer-Reviewed' }
    ]
  },
  elicit: {
    id: 'elicit',
    name: 'Elicit AI Research Assistant',
    category: 'Research & Science',
    badge: 'Systematic Literature Review',
    tagline: 'Extract methodology, sample size, outcome metrics, and effect sizes across 100+ papers simultaneously',
    gradient: 'from-purple-600 to-indigo-700',
    accentColor: 'text-purple-400',
    defaultPrompt: 'What are the measurable cognitive effects of intermittent fasting on neuroplasticity in human clinical trials?',
    actions: ['Synthesize 50+ Papers Table', 'Extract Methodologies', 'Filter Randomized Trials', 'Export Synthesis Matrix'],
    sampleOutputTitle: 'Systematic Review Matrix & Meta-Analysis',
    sampleDetails: [
      { label: 'Analyzed Papers', value: '42 Clinical Studies (28 RCTs, 14 Cohort)' },
      { label: 'Pooled Effect Size', value: 'Hedges\' g = 0.48 [95% CI: 0.32, 0.64]' },
      { label: 'Evidence Grade', value: 'High (GRADE Criteria Verified)' }
    ]
  },
  consensus: {
    id: 'consensus',
    name: 'Consensus.app AI',
    category: 'Research & Science',
    badge: 'Scientific Consensus Meter',
    tagline: 'Query direct questions to scientific literature and get instant percentage consensus meters backed by peer-reviewed findings',
    gradient: 'from-emerald-600 to-cyan-700',
    accentColor: 'text-emerald-400',
    defaultPrompt: 'Does creatine monohydrate supplementation improve working memory performance in sleep-deprived adults?',
    actions: ['Calculate Consensus Meter', 'Extract Key Quotes', 'Filter Study Types', 'Generate Research Brief'],
    sampleOutputTitle: 'Consensus Meter: 86% YES (24 Studies)',
    sampleDetails: [
      { label: 'Consensus Distribution', value: '86% Yes | 10% Inconclusive | 4% No' },
      { label: 'Primary Mechanism', value: 'Phosphocreatine brain resynthesis during acute metabolic stress' },
      { label: 'Source Rigor', value: 'Systematic Reviews & Double-Blind Placebo Trials' }
    ]
  },
  semantic_scholar: {
    id: 'semantic_scholar',
    name: 'Semantic Scholar AI',
    category: 'Research & Science',
    badge: 'Allen AI Semantic Citation Graph',
    tagline: 'Influential citation tracking, automated TLDR summaries, and author collaboration networks',
    gradient: 'from-teal-600 to-indigo-700',
    accentColor: 'text-teal-400',
    defaultPrompt: 'Identify highly influential papers that cited the original Transformer architecture "Attention Is All You Need".',
    actions: ['Generate Semantic TLDR', 'Extract Influential Citations', 'Author Collaboration Map', 'Venue Benchmark'],
    sampleOutputTitle: 'Influential Citation Hierarchy',
    sampleDetails: [
      { label: 'Total Citations', value: '148,000+ Total Citations' },
      { label: 'Highly Influential Citations', value: '8,450 Direct Architectural Derivations' },
      { label: 'Key Lineage', value: 'BERT -> GPT -> T5 -> LLaMA -> Claude 3' }
    ]
  },
  scite: {
    id: 'scite',
    name: 'Scite.ai Smart Citations',
    category: 'Research & Science',
    badge: 'Smart Citation Context & Validation',
    tagline: 'Classify whether subsequent research supported, mentioned, or contrasted a published scientific claim',
    gradient: 'from-blue-600 to-violet-700',
    accentColor: 'text-blue-400',
    defaultPrompt: 'Verify whether the replicability crisis in social priming experiments has been supported or refuted by scite smart citations.',
    actions: ['Analyze Smart Citations', 'Classify Supporting vs Contrasting', 'Check Retraction Alerts', 'Claim Verification'],
    sampleOutputTitle: 'Smart Citation Classification Report',
    sampleDetails: [
      { label: 'Supporting Citations', value: '184 Independent Validations' },
      { label: 'Contrasting Citations', value: '62 Failed Replication Reports' },
      { label: 'Mentioning Citations', value: '1,290 General References' }
    ]
  },
  connected_papers: {
    id: 'connected_papers',
    name: 'Connected Papers 2.0',
    category: 'Research & Science',
    badge: 'Visual Field & Citation Graph Topology',
    tagline: 'Visual 2D topological graph of related papers, derivative works, and prior seminal literature',
    gradient: 'from-violet-600 to-pink-600',
    accentColor: 'text-violet-400',
    defaultPrompt: 'Generate interactive topological citation graph for Retrieval-Augmented Generation (RAG) research.',
    actions: ['Build 2D Citation Graph', 'Discover Derivative Works', 'Find Seminal Ancestors', 'Export Graph (.JSON)'],
    sampleOutputTitle: 'Visual Research Graph (128 Connected Nodes)',
    sampleDetails: [
      { label: 'Central Node', value: 'Lewis et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP"' },
      { label: 'Clustering Metric', value: 'Co-citation and Bibliographic Coupling Similarity' },
      { label: 'Emerging Clusters', value: 'Self-RAG, Corrective RAG, GraphRAG' }
    ]
  },

  // Coding & IDEs
  github_copilot: {
    id: 'github_copilot',
    name: 'GitHub Copilot Enterprise',
    category: 'Coding & IDEs',
    badge: 'AI Pair Programmer',
    tagline: 'Context-aware multi-file autocomplete, unit test synthesis, PR explanations, and security vulnerability patching',
    gradient: 'from-slate-800 to-indigo-900',
    accentColor: 'text-indigo-400',
    defaultPrompt: 'Write a high-performance concurrent worker pool in Go with channels, context cancellation, and exponential backoff retry.',
    actions: ['Generate Full Function', 'Synthesize Unit Test Suite', 'Explain RegEx & SQL', 'Security Vulnerability Scan'],
    sampleOutputTitle: 'Synthesized Production Code & Tests',
    sampleDetails: [
      { label: 'Language', value: 'Go 1.23 / Concurrency Patterns' },
      { label: 'Test Coverage', value: '100% Branch Coverage Generated' },
      { label: 'Linting Status', value: '0 Warnings (golangci-lint passed)' }
    ]
  },
  claude_code: {
    id: 'claude_code',
    name: 'Claude Code Terminal Agent',
    category: 'Coding & IDEs',
    badge: 'Autonomous CLI Developer',
    tagline: 'Terminal-based coding agent that edits multi-file repositories, runs tests, fixes git merge conflicts, and commits clean code',
    gradient: 'from-amber-600 to-orange-700',
    accentColor: 'text-amber-400',
    defaultPrompt: 'Refactor our Express backend to handle WebSocket streaming with token bucket rate limiting and graceful shutdown.',
    actions: ['Run Multi-File Git Refactor', 'Auto-Fix Failing Tests', 'Resolve Merge Conflicts', 'Generate PR Description'],
    sampleOutputTitle: 'Autonomous Git Branch Execution: 6 Files Modified',
    sampleDetails: [
      { label: 'Agent Steps', value: 'Plan -> Search -> Surgical Edits -> Test Verification' },
      { label: 'Modified Files', value: 'server.ts, rateLimiter.ts, types.ts, test.spec.ts' },
      { label: 'Test Suite Result', value: '38 Passed, 0 Failed (npm test)' }
    ]
  },
  replit_agent: {
    id: 'replit_agent',
    name: 'Replit Agent AI',
    category: 'Coding & IDEs',
    badge: 'Cloud Full-Stack Deployer',
    tagline: 'From natural language prompt to live hosted database, backend API, and frontend web app in one command',
    gradient: 'from-red-600 to-orange-600',
    accentColor: 'text-red-400',
    defaultPrompt: 'Build a multiplayer collaborative pixel art canvas with PostgreSQL and real-time WebSockets.',
    actions: ['Scaffold Full-Stack Project', 'Provision PostgreSQL DB', 'Deploy Live URL', 'Configure Environment Secrets'],
    sampleOutputTitle: 'Live Deployed Container App',
    sampleDetails: [
      { label: 'Hosting Status', value: 'Live on Cloud Run / Port 3000' },
      { label: 'Database', value: 'PostgreSQL 16 with Drizzle ORM' },
      { label: 'Realtime Layer', value: 'Socket.IO / Binary WebSocket Frames' }
    ]
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf AI (Codeium)',
    category: 'Coding & IDEs',
    badge: 'Cascade Flow AI Engine',
    tagline: 'Deep codebase understanding, multi-turn Cascade agent flows, and instant terminal command execution',
    gradient: 'from-cyan-600 to-blue-700',
    accentColor: 'text-cyan-400',
    defaultPrompt: 'Analyze this React codebase and optimize all bundle imports using dynamic lazy loading and code splitting.',
    actions: ['Trigger Cascade Flow', 'Deep Codebase Indexing', 'Instant Terminal Run', 'Optimize Bundle Size'],
    sampleOutputTitle: 'Cascade Flow Execution Log',
    sampleDetails: [
      { label: 'Bundle Reduction', value: '-42% Initial JS Payload (1.2MB -> 698KB)' },
      { label: 'Lighthouse Score', value: '99 Performance (Sub-1s LCP)' },
      { label: 'Flow Confidence', value: '98.5% Code Precision' }
    ]
  },
  continue_dev: {
    id: 'continue_dev',
    name: 'Continue.dev Open IDE',
    category: 'Coding & IDEs',
    badge: 'Open-Source Local & Cloud Copilot',
    tagline: 'Connect local Ollama models or cloud LLMs directly inside VS Code and JetBrains with custom slash commands',
    gradient: 'from-indigo-600 to-purple-800',
    accentColor: 'text-indigo-400',
    defaultPrompt: '/edit Add docstrings and type annotations to all exported TypeScript helper functions in utils.ts',
    actions: ['Custom Slash Command', 'Connect Local Ollama', 'Context Embeddings Sync', 'Refactor Selected Block'],
    sampleOutputTitle: 'Continue Custom Slash Execution',
    sampleDetails: [
      { label: 'Active LLM Engine', value: 'Local DeepSeek-Coder-V2 (Ollama)' },
      { label: 'Token Throughput', value: '85 tokens/sec (Local GPU)' },
      { label: 'Latency', value: '12ms Time-To-First-Token' }
    ]
  },
  tabnine: {
    id: 'tabnine',
    name: 'Tabnine Enterprise',
    category: 'Coding & IDEs',
    badge: 'Private & Air-Gapped Code Assistant',
    tagline: 'Zero-data-retention AI code completion trained purely on permissive open-source with SOC-2 enterprise compliance',
    gradient: 'from-purple-700 to-indigo-900',
    accentColor: 'text-purple-300',
    defaultPrompt: 'Generate a secure AES-256-GCM encryption and decryption utility module with salted key derivation.',
    actions: ['Generate Secure Utility', 'Audit Code Compliance', 'Private Model Tuning', 'Air-Gapped Autocomplete'],
    sampleOutputTitle: 'Enterprise Cryptographic Module',
    sampleDetails: [
      { label: 'Compliance Level', value: 'SOC-2 Type II, HIPAA & GDPR Compliant' },
      { label: 'Training Rigor', value: '100% Permissive Open Source (No GPL contamination)' },
      { label: 'Security Scan', value: 'Zero CVE Vulnerabilities Detected' }
    ]
  },
  aider: {
    id: 'aider',
    name: 'Aider AI Pair Programmer',
    category: 'Coding & IDEs',
    badge: 'Terminal Git Pair Programmer',
    tagline: 'Command-line pair programmer that directly writes edits into your git repo with automated git commit messages',
    gradient: 'from-emerald-700 to-teal-900',
    accentColor: 'text-emerald-300',
    defaultPrompt: 'aider --architect: Design a modular authentication service with JWT verification and refresh token rotation.',
    actions: ['Architect Model Plan', 'Apply Multi-File Edits', 'Create Git Commit', 'Voice-to-Code Dictation'],
    sampleOutputTitle: 'Aider Git Commit: feat: implement JWT refresh token rotation',
    sampleDetails: [
      { label: 'Git Commit Hash', value: 'a4f9b2c (HEAD -> main)' },
      { label: 'Files Updated', value: 'src/auth/jwt.ts, src/middleware/verify.ts' },
      { label: 'Architect Reasoning', value: 'Separated token signing from verification middleware' }
    ]
  },
  hugging_face: {
    id: 'hugging_face',
    name: 'Hugging Face Hub & Spaces',
    category: 'Coding & IDEs',
    badge: 'Open-Source AI Model Ecosystem',
    tagline: 'Browse, deploy, and fine-tune 1,000,000+ open-source models, datasets, and Gradio/Streamlit Spaces',
    gradient: 'from-amber-500 to-yellow-600',
    accentColor: 'text-amber-300',
    defaultPrompt: 'Deploy a fine-tuned Whisper-Large-v3 speech recognition endpoint on GPU Space with FastAPI backend.',
    actions: ['Launch Gradio Space', 'Inference API Benchmark', 'Download PyTorch Checkpoint', 'Fine-Tune with LoRA'],
    sampleOutputTitle: 'Hugging Face Space Endpoint: Ready',
    sampleDetails: [
      { label: 'Model Tag', value: 'openai/whisper-large-v3' },
      { label: 'Hardware Allocated', value: '1x Nvidia A10G (24GB VRAM)' },
      { label: 'Inference Latency', value: '45ms per audio chunk' }
    ]
  },
  google_colab: {
    id: 'google_colab',
    name: 'Google Colab AI Pro',
    category: 'Coding & IDEs',
    badge: 'Cloud Jupyter Notebook & Free GPU',
    tagline: 'Interactive Python notebooks with integrated AI code generation, TPU/GPU acceleration, and Google Drive sync',
    gradient: 'from-orange-500 to-amber-600',
    accentColor: 'text-orange-400',
    defaultPrompt: 'Train a PyTorch Convolutional Neural Network on CIFAR-100 with data augmentation and TensorBoard logging.',
    actions: ['Generate Notebook Cell', 'Connect GPU Runtime (T4/A100)', 'Plot Matplotlib Charts', 'Export .ipynb'],
    sampleOutputTitle: 'Jupyter Kernel State: Execution Complete',
    sampleDetails: [
      { label: 'Runtime Environment', value: 'Python 3.11 • Nvidia A100-SXM4-40GB' },
      { label: 'Epochs Completed', value: '50/50 (Validation Accuracy: 84.6%)' },
      { label: 'Memory Utilized', value: '14.2 GB / 40.0 GB VRAM' }
    ]
  },

  // No-Code & App Builders
  bolt_new: {
    id: 'bolt_new',
    name: 'Bolt.new Autonomous Full-Stack',
    category: 'No-Code & Builders',
    badge: 'WebContainers Browser IDE',
    tagline: 'Prompt, build, and run complete full-stack Node.js, Next.js, and Vite web apps entirely inside browser WebContainers',
    gradient: 'from-blue-600 to-indigo-600',
    accentColor: 'text-blue-400',
    defaultPrompt: 'Create a realtime Kanban board with drag-and-drop, local SQLite database, and customizable tag filters.',
    actions: ['Boot WebContainer Dev Server', 'Install npm Packages', 'Hot Reload Live App', 'Deploy to Netlify/Vercel'],
    sampleOutputTitle: 'WebContainer Browser VM: Running Port 3000',
    sampleDetails: [
      { label: 'Framework Stack', value: 'React 18 + Vite + Tailwind CSS + Lucide' },
      { label: 'Node VM Execution', value: 'In-Browser WASM WebContainer' },
      { label: 'Live Server Status', value: '100% Operational (0.2s hot-reload)' }
    ]
  },
  softr: {
    id: 'softr',
    name: 'Softr.io AI Web Builder',
    category: 'No-Code & Builders',
    badge: 'Airtable & Google Sheets Web Portal',
    tagline: 'Turn your Airtable bases and Google Sheets into client portals, partner directories, and internal dashboards in 5 minutes',
    gradient: 'from-pink-600 to-rose-600',
    accentColor: 'text-pink-400',
    defaultPrompt: 'Generate a customer portal connected to Airtable for tracking project milestones, invoices, and deliverables.',
    actions: ['Sync Airtable Database', 'Generate User Auth Roles', 'Customize Component Blocks', 'Publish Custom Domain'],
    sampleOutputTitle: 'Client Portal Architecture: Published',
    sampleDetails: [
      { label: 'Data Source', value: 'Airtable Base (Real-time 2-way sync)' },
      { label: 'Role Permissions', value: 'Admin, Client, Contractor tiered access' },
      { label: 'Responsive Viewports', value: 'Mobile, Tablet, Desktop auto-optimized' }
    ]
  },
  bubble: {
    id: 'bubble',
    name: 'Bubble.io AI Visual Engine',
    category: 'No-Code & Builders',
    badge: 'Full-Stack Visual Database & Workflows',
    tagline: 'Design complex relational databases, user authentication rules, dynamic workflows, and API integrations with zero code',
    gradient: 'from-blue-700 to-indigo-900',
    accentColor: 'text-blue-300',
    defaultPrompt: 'Create a marketplace workflow for booking fractional compute power with escrow payment logic.',
    actions: ['Generate Visual Workflow', 'Schema Database Builder', 'Configure Stripe Webhook', 'Deploy Live Version'],
    sampleOutputTitle: 'Visual Database & Event Workflows',
    sampleDetails: [
      { label: 'Database Entities', value: 'Users, ComputeNodes, EscrowTransactions, Reviews' },
      { label: 'Backend Workflows', value: 'Trigger Stripe Hold -> Authorize Node -> Release Payout' },
      { label: 'API Connector', value: 'REST API + OAuth2 Authentication' }
    ]
  },
  glide: {
    id: 'glide',
    name: 'Glide Apps AI',
    category: 'No-Code & Builders',
    badge: 'Mobile App Builder from Spreadsheets',
    tagline: 'Transform Excel sheets, Google Sheets, and SQL databases into polished mobile and web apps for field teams and inventory',
    gradient: 'from-indigo-500 to-cyan-600',
    accentColor: 'text-indigo-300',
    defaultPrompt: 'Build a mobile warehouse inventory tracking app with barcode scanner, stock level alerts, and reorder triggers.',
    actions: ['Generate Mobile PWA', 'Barcode Scanner Action', 'Automated Push Alerts', 'Export Native APK/PWA'],
    sampleOutputTitle: 'Glide PWA Mobile Suite: Deployed',
    sampleDetails: [
      { label: 'Input Source', value: 'Google Sheets / InventoryMaster.xlsx' },
      { label: 'Camera Permissions', value: 'Hardware Barcode & QR Scanner Enabled' },
      { label: 'Offline Support', value: 'Local Cache + Background Sync' }
    ]
  },
  base44: {
    id: 'base44',
    name: 'Base44 Autonomous Builder',
    category: 'No-Code & Builders',
    badge: 'Full-Stack AI Software Synthesizer',
    tagline: 'End-to-end autonomous software development synthesizing frontend, backend API, database schemas, and documentation',
    gradient: 'from-violet-600 to-purple-800',
    accentColor: 'text-violet-300',
    defaultPrompt: 'Synthesize a multi-tenant SaaS billing and subscription portal with Stripe Metered Usage API.',
    actions: ['Synthesize Full Stack', 'Auto Schema Migration', 'Test API Endpoints', 'Generate OpenAPI Docs'],
    sampleOutputTitle: 'Synthesized Production SaaS Repo',
    sampleDetails: [
      { label: 'Architecture', value: 'Modular Clean Architecture (TypeScript)' },
      { label: 'Stripe Integration', value: 'Metered Usage Webhooks & Customer Portal' },
      { label: 'Code Quality', value: '100% Type-Safe • Zero Any' }
    ]
  },
  vercel_v0: {
    id: 'vercel_v0',
    name: 'v0 by Vercel',
    category: 'No-Code & Builders',
    badge: 'Generative UI with shadcn/ui & Tailwind',
    tagline: 'Generates beautiful, accessible React UI components, complex dashboards, and landing pages with copy-paste shadcn code',
    gradient: 'from-slate-900 to-black',
    accentColor: 'text-white',
    defaultPrompt: 'Create a dark-mode luxury crypto trading dashboard with order book depth charts and candlestick preview.',
    actions: ['Generate shadcn/ui Component', 'Toggle Dark/Light Mode', 'Copy React TSX Code', 'Deploy to Vercel'],
    sampleOutputTitle: 'Generated shadcn/ui React Component',
    sampleDetails: [
      { label: 'Styling', value: 'Tailwind CSS v4 + Radix Primitives' },
      { label: 'Accessibility', value: 'ARIA 1.2 Compliant • Keyboard Navigable' },
      { label: 'Export Code', value: 'Production TypeScript TSX' }
    ]
  },

  // Image & Design
  adobe_firefly: {
    id: 'adobe_firefly',
    name: 'Adobe Firefly 3',
    category: 'Image & Design',
    badge: 'Commercial-Safe Generative AI',
    tagline: 'Generative fill, text-to-vector SVG graphics, generative expand, and color matching designed specifically for commercial safety',
    gradient: 'from-red-600 to-amber-600',
    accentColor: 'text-red-400',
    defaultPrompt: 'Generative fill: Add glowing ethereal bioluminescent flora to the mystical enchanted forest background.',
    actions: ['Generative Fill Inpainting', 'Text to Vector SVG', 'Generative Expand Canvas', 'Color Style Match'],
    sampleOutputTitle: 'Adobe Firefly Vector & Raster Asset',
    sampleDetails: [
      { label: 'Commercial License', value: '100% Safe for Commercial Use (Adobe Stock Trained)' },
      { label: 'Output Formats', value: 'Scalable Vector Graphic (.SVG) & 4K PNG' },
      { label: 'Content Credentials', value: 'C2PA Cryptographic Provenance Tagged' }
    ]
  },
  ideogram: {
    id: 'ideogram',
    name: 'Ideogram v2.0',
    category: 'Image & Design',
    badge: 'Flawless Typography & Graphic Design AI',
    tagline: 'The undisputed champion of rendering crisp, legible typography, vintage logos, poster designs, and typographic artwork',
    gradient: 'from-orange-500 to-pink-600',
    accentColor: 'text-orange-300',
    defaultPrompt: 'Vintage retro 1970s typography poster reading "FUTURE IS NOW" with psychedelic chrome gradient reflections.',
    actions: ['Render Typography Poster', 'Logo & Emblem Synthesizer', 'Magic Prompt Enhancer', '4K Upscale'],
    sampleOutputTitle: 'Ideogram Typographic Render',
    sampleDetails: [
      { label: 'Text Accuracy', value: '100% Perfect Lettering & Kerning' },
      { label: 'Style Archetype', value: 'Retro 70s Typographic Chrome Poster' },
      { label: 'Resolution', value: '4096 x 4096 px (300 DPI)' }
    ]
  },
  leonardo_ai: {
    id: 'leonardo_ai',
    name: 'Leonardo AI Phoenix',
    category: 'Image & Design',
    badge: 'Game Assets & Production Visuals',
    tagline: 'Custom LoRA fine-tuning, transparent PNG asset generator, 3D texture mapping, and real-time canvas inpainting',
    gradient: 'from-purple-600 to-indigo-600',
    accentColor: 'text-purple-400',
    defaultPrompt: '3D isometric isometric fantasy RPG potion bottle with glowing magical blue elixir, transparent background.',
    actions: ['Generate Isometric Game Asset', 'Transparent PNG Mode', 'Realtime Canvas Inpaint', 'Train Custom LoRA'],
    sampleOutputTitle: 'Game Production Asset Package',
    sampleDetails: [
      { label: 'Asset Format', value: 'Alpha Channel Transparent PNG (2048x2048)' },
      { label: 'Render Pipeline', value: 'Leonardo Phoenix Engine + Alchemy V2' },
      { label: 'Game Engine Ready', value: 'Unity & Unreal Engine Sprite Sheet' }
    ]
  },
  canva_magic: {
    id: 'canva_magic',
    name: 'Canva Magic Studio',
    category: 'Image & Design',
    badge: 'All-in-One Design Automation',
    tagline: 'Magic resize across 20+ social formats, Magic Eraser, AI presentation drafter, and animated video transitions',
    gradient: 'from-cyan-500 to-purple-600',
    accentColor: 'text-cyan-300',
    defaultPrompt: 'Generate a complete social marketing campaign kit for a cyber-security product launch.',
    actions: ['Magic Resize All Formats', 'Magic Eraser & Background', 'Brand Kit Auto-Apply', 'Animate Graphics'],
    sampleOutputTitle: 'Canva Social Campaign Kit (8 Formats)',
    sampleDetails: [
      { label: 'Supported Ratios', value: '1:1 (IG), 9:16 (Stories/Reels), 16:9 (YouTube), 4:5 (LinkedIn)' },
      { label: 'Brand Kit Sync', value: 'Corporate Hex Palettes & Typography Applied' },
      { label: 'Animation Style', value: 'Smooth Fade & Kinetic Pop' }
    ]
  },
  krea_ai: {
    id: 'krea_ai',
    name: 'Krea.ai Realtime Canvas',
    category: 'Image & Design',
    badge: 'Real-Time Latent Brush Synthesis',
    tagline: 'Paint rough geometric brush strokes on one side and watch hyper-detailed 4K photorealistic images generate instantaneously in real-time',
    gradient: 'from-teal-500 to-emerald-600',
    accentColor: 'text-teal-300',
    defaultPrompt: 'Realtime Latent Stream: Draw circle and curve -> instant futuristic cybernetic eye with optical reflection.',
    actions: ['Realtime Latent Canvas', 'AI Video Enhancer (4K/8K)', 'Illusion & Pattern Art', 'Screen Mirror Stream'],
    sampleOutputTitle: 'Real-Time Latent Frame Stream',
    sampleDetails: [
      { label: 'Latency', value: '< 25ms per brush stroke update' },
      { label: 'Upscaling Engine', value: 'Krea 4K Texture Synthesizer' },
      { label: 'Mode', value: 'Realtime GPU Latent Diffusion' }
    ]
  },
  freepik_ai: {
    id: 'freepik_ai',
    name: 'Freepik Mystic AI',
    category: 'Image & Design',
    badge: 'Stock Vector & High-Res Generative Fill',
    tagline: 'Access millions of premium stock vectors, AI background expanders, mockup generators, and high-fidelity photo generators',
    gradient: 'from-blue-600 to-sky-500',
    accentColor: 'text-blue-300',
    defaultPrompt: '3D packaging mockup for organic botanical skincare serum on stone podium surrounded by water ripples.',
    actions: ['Generate 3D Product Mockup', 'Vector Asset Exporter', 'AI Background Expander', 'Commercial Stock License'],
    sampleOutputTitle: 'Photorealistic Product Mockup & Stock Asset',
    sampleDetails: [
      { label: 'Asset Type', value: 'Layered Mockup PSD + 4K PNG Render' },
      { label: 'Lighting Rig', value: 'Studio Softbox with Caustic Water Reflections' },
      { label: 'Stock Royalty', value: 'Full Commercial License Included' }
    ]
  },

  // Video & 3D
  synthesia: {
    id: 'synthesia',
    name: 'Synthesia AI Video Studio',
    category: 'Video & 3D',
    badge: 'Enterprise AI Video & 140+ Avatars',
    tagline: 'Create professional training, onboarding, and customer support videos in 130+ languages without cameras or microphones',
    gradient: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-400',
    defaultPrompt: 'Generate a 2-minute employee cybersecurity training video with a bilingual presenter avatar in English and Spanish.',
    actions: ['Select 140+ Presenter Avatars', 'Synthesize 130+ Languages', 'Add Screen Recorder Overlay', 'Export 1080p MP4'],
    sampleOutputTitle: 'Synthesia Corporate Training Video',
    sampleDetails: [
      { label: 'Avatar Selected', value: 'Alex (Executive Studio Attire)' },
      { label: 'Language Tracks', value: 'English (US) & Spanish (Castilian)' },
      { label: 'Lip-Sync Accuracy', value: '99.8% Phoneme Alignment' }
    ]
  },
  pika: {
    id: 'pika',
    name: 'Pika 2.0 Video Engine',
    category: 'Video & 3D',
    badge: 'Pikaffects & Generative Physics',
    tagline: 'Text-to-video, image-to-video, and surreal physics Pikaffects (Crush it, Inflate it, Melt it, Explode it) with sound FX synthesis',
    gradient: 'from-violet-600 to-purple-600',
    accentColor: 'text-violet-400',
    defaultPrompt: 'Pikaffects: Melt an emerald crystal skull into a pool of glowing holographic liquid with ambient sound effects.',
    actions: ['Apply Pikaffect (Melt / Inflate)', 'Generate Sound Effects (SFX)', 'Modify Video Region (Inpaint)', 'Extend Video +4s'],
    sampleOutputTitle: 'Pika 2.0 Generative Video with Audio',
    sampleDetails: [
      { label: 'Applied Effect', value: 'Pikaffects: Liquid Phase Melting' },
      { label: 'Sound FX', value: 'Synchronized Generative Audio (WAV 48kHz)' },
      { label: 'Frame Rate', value: '24fps Cinematic Motion' }
    ]
  },
  kling_ai: {
    id: 'kling_ai',
    name: 'Kling AI 1.5 HD',
    category: 'Video & 3D',
    badge: 'High-Motion Physical Simulation Video',
    tagline: 'High-definition 1080p text-to-video up to 2 minutes with exceptional human motion fluidity and accurate physical simulation',
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: 'text-emerald-400',
    defaultPrompt: 'Cinematic wide shot of a master chef tossing fresh noodles in a flaming wok with sparks flying and steam rising in slow motion.',
    actions: ['Generate 1080p HD Video', 'Extend Duration to 2 mins', 'Camera Motion Director', 'Motion Brush Controls'],
    sampleOutputTitle: 'Kling 1.5 HD Video Simulation',
    sampleDetails: [
      { label: 'Simulation Physics', value: 'Fluid Dynamics & Thermodynamic Flame Momentum' },
      { label: 'Duration', value: '10s Extended Sequence (1080p HD)' },
      { label: 'Temporal Consistency', value: 'High (No limb distortion or flickering)' }
    ]
  },
  google_flow: {
    id: 'google_flow',
    name: 'Google Veo / Flow AI',
    category: 'Video & 3D',
    badge: 'DeepMind Generative Video Foundation',
    tagline: 'Google DeepMind\'s premier high-definition 1080p video generation foundation model with cinematic camera terminology comprehension',
    gradient: 'from-red-500 via-amber-500 to-blue-600',
    accentColor: 'text-amber-400',
    defaultPrompt: 'Timelapse aerial tracking shot across a bioluminescent coral reef in 1080p cinematic photorealism.',
    actions: ['Veo Cinematic Generation', 'Camera Track & Dolly Zoom', 'Visual Consistency Anchor', 'Export High-Bitrate Video'],
    sampleOutputTitle: 'Google Veo Foundation Video Render',
    sampleDetails: [
      { label: 'Model Architecture', value: 'Google DeepMind Veo Video Latent Diffusion' },
      { label: 'Prompt Comprehension', value: 'Understands complex cinematic lens & camera verbs' },
      { label: 'Visual Clarity', value: 'Full 1080p High-Bitrate Native Output' }
    ]
  },
  luma_ai: {
    id: 'luma_ai',
    name: 'Luma Dream Machine 1.5',
    category: 'Video & 3D',
    badge: 'Fast High-Fidelity Video & 3D Gaussian Splats',
    tagline: 'Hyper-realistic video generation and 3D Gaussian Splatting converting photos and videos into real-time interactive 3D scenes',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'text-cyan-400',
    defaultPrompt: 'Hyper-realistic camera fly-through of an ancient Roman marble amphitheater with sunlight streaming through dust motes.',
    actions: ['Generate Dream Video', '3D Gaussian Splatting Capture', 'Interactive 3D Viewport', 'Export .PLY / .GLTF 3D'],
    sampleOutputTitle: 'Dream Machine Video & 3D Gaussian Splat',
    sampleDetails: [
      { label: 'Generation Speed', value: '120s Full Video Generation' },
      { label: '3D Reconstruction', value: 'Interactive Gaussian Splat (1.2M points)' },
      { label: 'Realtime Viewport', value: '60fps WebGL 3D Navigation' }
    ]
  },
  invideo_ai: {
    id: 'invideo_ai',
    name: 'InVideo AI 2.0',
    category: 'Video & 3D',
    badge: 'Full Script-to-Video Engine with Voiceover',
    tagline: 'Enter any topic and InVideo writes the script, finds matching stock footage, adds subtitles, generates human voiceovers, and edits music',
    gradient: 'from-blue-600 to-indigo-600',
    accentColor: 'text-blue-400',
    defaultPrompt: 'Create a 60-second YouTube Short about "How Quantum Computers Will Break Modern Encryption" with dramatic music.',
    actions: ['Script-to-Video Synthesizer', 'Clone Human Voiceover', 'Dynamic Subtitle Animations', 'Export 4K Video'],
    sampleOutputTitle: 'Complete Script-to-Video Project (60s)',
    sampleDetails: [
      { label: 'Script', value: 'Full Viral Retention Script with Hook & Call-to-Action' },
      { label: 'Voiceover', value: 'Ultra-Realistic AI Voice (Deep English US)' },
      { label: 'Media B-Roll', value: '24 Curated 4K Stock Clips Synced to Beat' }
    ]
  },
  descript: {
    id: 'descript',
    name: 'Descript AI Video & Podcast Editor',
    category: 'Video & 3D',
    badge: 'Text-Based Video Editing & Overdub',
    tagline: 'Edit video and audio by editing the transcript text. Remove filler words ("um", "uh") with one click and fix typos using voice cloning',
    gradient: 'from-teal-600 to-emerald-700',
    accentColor: 'text-teal-300',
    defaultPrompt: 'Transcribe raw podcast recording, remove all 48 filler words, and apply Studio Sound noise removal.',
    actions: ['Edit Video via Transcript Text', '1-Click Remove Filler Words', 'Apply AI Studio Sound', 'AI Overdub Voice Correction'],
    sampleOutputTitle: 'Cleaned Transcript & Studio Audio',
    sampleDetails: [
      { label: 'Filler Words Removed', value: '48 instances of "um", "like", "you know"' },
      { label: 'Studio Sound DSP', value: 'Room Reverb Removed • 48kHz Broadcast Quality' },
      { label: 'Overdub Edits', value: 'Corrected 3 misspoken technical names seamlessly' }
    ]
  },
  opus_clip: {
    id: 'opus_clip',
    name: 'OpusClip 3.0',
    category: 'Video & 3D',
    badge: '1-Click Long Video into Viral Shorts',
    tagline: 'Upload 1 hour of video and get 10 viral short clips with AI Virality Score, auto-reframe speaker tracking, and animated karaoke captions',
    gradient: 'from-purple-600 to-pink-600',
    accentColor: 'text-purple-300',
    defaultPrompt: 'Analyze 45-minute YouTube podcast and extract the top 5 most engaging viral moments with dynamic captions.',
    actions: ['Extract Top 5 Viral Clips', 'Auto-Reframe Active Speaker', 'Animated Karaoke Captions', 'Generate Viral Titles & Hooks'],
    sampleOutputTitle: '5 Viral Shorts Generated (Top Score: 98/100)',
    sampleDetails: [
      { label: 'Top Viral Hook', value: '"The Exact Moment AI Changed Everything" (Score: 98)' },
      { label: 'Auto-Reframe', value: '9:16 Active Speaker Face Tracking' },
      { label: 'Captions Style', value: 'Alex Hormozi Yellow/Green Kinetic Text' }
    ]
  },
  premiere_pro: {
    id: 'premiere_pro',
    name: 'Adobe Premiere Pro CC',
    category: 'Video & 3D',
    badge: 'Industry-Standard NLE & Lumetri Color',
    tagline: 'Professional multi-track timeline editing, Lumetri deep 32-bit floating point color grading, Essential Sound AI ducking, and auto Speech-to-Text captioning',
    gradient: 'from-indigo-600 via-purple-700 to-pink-600',
    accentColor: 'text-indigo-400',
    defaultPrompt: 'Import 4K multicam A-roll and B-roll footage, balance interview audio with Essential Sound, apply cinematic Kodak 2383 LUT, and export ProRes 422 HQ.',
    actions: ['Ripple Edit & Razor Cut', 'Apply Lumetri Color & Scopes', 'AI Speech-to-Text Subtitles', 'Export 4K Master (ProRes/H.265)'],
    sampleOutputTitle: 'Premiere Pro 4K Sequence • Lumetri Scopes & Timeline',
    sampleDetails: [
      { label: 'Sequence Resolution', value: '3840x2160 UHD • 23.976 fps • ProRes 422 HQ' },
      { label: 'Color Engine', value: 'Lumetri Deep Color 32-bit Float HDR Pipeline' },
      { label: 'Hardware Acceleration', value: 'Mercury Playback Engine (CUDA / Metal)' },
      { label: 'Audio Engine', value: 'Essential Sound AI Auto-Ducking (-18 LUFS Broadcast)' }
    ]
  },
  davinci_resolve: {
    id: 'davinci_resolve',
    name: 'DaVinci Resolve Studio 19',
    category: 'Video & 3D',
    badge: 'Hollywood Color Science & Fairlight DAW',
    tagline: 'Hollywood benchmark node-based primary/secondary color grading, Fairlight digital audio workstation with 2,000 tracks, and Fusion 3D VFX node compositor',
    gradient: 'from-rose-600 via-amber-600 to-indigo-700',
    accentColor: 'text-rose-400',
    defaultPrompt: 'Grade Blackmagic RAW 6K clips in ACEScc color science, track actor face with Magic Mask AI, and mix 5.1 Dolby surround audio.',
    actions: ['Primary Color Wheels & Scopes', 'Fusion Node Visual Compositor', 'Fairlight 5.1 Dynamic Surround Mix', 'Deliver Page YouTube 4K / DCP'],
    sampleOutputTitle: 'DaVinci Node Color Tree (6 Nodes) & Fairlight Audio Master',
    sampleDetails: [
      { label: 'Color Science', value: 'DaVinci YRGB Color Managed (ACEScc v1.3 Gamut)' },
      { label: 'Node Tree Graph', value: '6 Serial & Parallel Nodes with AI Magic Mask' },
      { label: 'Audio Subsystem', value: 'Fairlight DAW 48kHz / 24-bit 5.1 Surround Master' },
      { label: 'Neural Engine', value: 'Speed Warp Optical Flow Retiming & UltraNR' }
    ]
  },
  capcut: {
    id: 'capcut',
    name: 'CapCut Pro Desktop',
    category: 'Video & 3D',
    badge: 'Viral Auto-Captions & Speed Ramping',
    tagline: 'High-speed creator suite for viral short-form video with 1-click animated word-by-word captions, bezier curve speed ramping, smart cutout, and sound effects',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    accentColor: 'text-cyan-400',
    defaultPrompt: 'Auto-transcribe 9:16 vertical TikTok reel, apply glowing word-by-word karaoke captions, snap cuts to beat markers, and speed ramp action highlights.',
    actions: ['1-Click Animated Auto-Captions', 'Apply Speed Ramp Curve (0.2x-4x)', 'AI Smart Background Cutout', 'Export 1080x1920 60fps MP4'],
    sampleOutputTitle: 'Viral 9:16 Reel Project (Captions, Ramping & SFX)',
    sampleDetails: [
      { label: 'Aspect Canvas', value: '9:16 Vertical (1080x1920) Optimized for Shorts/Reels' },
      { label: 'Auto-Captions', value: 'Kinetic Word-by-Word Bouncing Highlight Font' },
      { label: 'Speed Curve', value: 'Hero Ramping (0.2x Slow-Mo into 3.5x Whip Snap)' },
      { label: 'Audio Sync', value: 'Beat Grid Detection & Auto-Snapping Keyframes' }
    ]
  },

  // Productivity & Writing
  notion_ai: {
    id: 'notion_ai',
    name: 'Notion AI Q&A',
    category: 'Productivity & Writing',
    badge: 'Connected Workspace Knowledge Base',
    tagline: 'Search across your entire team workspace, databases, meeting notes, and roadmap documents to answer complex questions instantly',
    gradient: 'from-slate-800 to-slate-950',
    accentColor: 'text-slate-200',
    defaultPrompt: 'Summarize our Q3 product roadmap decisions and list all pending dependencies for the billing launch.',
    actions: ['Workspace Deep Search', 'Summarize Meeting Notes', 'Generate Task Table', 'Draft Technical PRD'],
    sampleOutputTitle: 'Workspace Synthesis & PRD Output',
    sampleDetails: [
      { label: 'Queried Pages', value: '142 Workspace Docs & Database Records' },
      { label: 'Pending Dependencies', value: '3 Security Reviews, 1 Stripe Webhook Audit' },
      { label: 'PRD Status', value: 'Draft Generated with Acceptance Criteria' }
    ]
  },
  otter_ai: {
    id: 'otter_ai',
    name: 'Otter.ai Realtime Meeting Agent',
    category: 'Productivity & Writing',
    badge: 'Live Automated Meeting Transcriber',
    tagline: 'Joins Zoom, Google Meet, and MS Teams meetings automatically to transcribe live conversation, tag speakers, and summarize action items',
    gradient: 'from-blue-600 to-sky-600',
    accentColor: 'text-sky-400',
    defaultPrompt: 'Record executive meeting, identify who committed to each deliverable, and send Slack summary.',
    actions: ['Live Meeting Recording', 'Speaker Diarization Tagging', 'Automated Slack Summary', 'Action Item Assignment'],
    sampleOutputTitle: 'Live Meeting Notes & Action Register',
    sampleDetails: [
      { label: 'Duration', value: '45 mins (Zoom Integration)' },
      { label: 'Speakers Identified', value: 'Shivam Kumar, Lead DevOps, Security Architect' },
      { label: 'Action Items Assigned', value: '6 items pushed to Slack #engineering' }
    ]
  },
  powerpoint_ai: {
    id: 'powerpoint_ai',
    name: 'Microsoft PowerPoint Copilot',
    category: 'Productivity & Writing',
    badge: 'Enterprise Presentation & Office 365 AI',
    tagline: 'Transform Word documents into formatted PowerPoint slide decks with company branding, smart animations, and speaker notes',
    gradient: 'from-orange-600 to-red-600',
    accentColor: 'text-orange-400',
    defaultPrompt: 'Convert 10-page annual strategy document into a 12-slide executive presentation with corporate theme.',
    actions: ['Document to Presentation', 'Auto-Format Slide Layouts', 'Generate Speaker Notes', 'Export .PPTX'],
    sampleOutputTitle: 'Generated Corporate Slide Deck (.PPTX)',
    sampleDetails: [
      { label: 'Slides Synthesized', value: '12 Executive Slides' },
      { label: 'Brand Compliance', value: 'Corporate Hex Palettes & Slide Masters Applied' },
      { label: 'Speaker Notes', value: 'Full Presentation Talking Points Generated' }
    ]
  },
  beautiful_ai: {
    id: 'beautiful_ai',
    name: 'Beautiful.ai Smart Slides',
    category: 'Productivity & Writing',
    badge: 'Design-First Smart Slide Layouts',
    tagline: 'Presentation software with built-in design rules that automatically adjusts formatting as you add text and images',
    gradient: 'from-cyan-600 to-blue-700',
    accentColor: 'text-cyan-300',
    defaultPrompt: 'Create a venture capital pitch deck with traction metrics, TAM calculation, and competition matrix.',
    actions: ['Smart Slide Layout Grid', 'Interactive Traction Charts', 'Team Bio Card Generator', 'Export High-Res PDF'],
    sampleOutputTitle: 'Design-Perfect VC Pitch Deck',
    sampleDetails: [
      { label: 'Design Engine', value: 'Adaptive Smart Spacing & Alignment Rules' },
      { label: 'Traction Chart', value: 'ARR Growth from $0 to $10M ARR projected' },
      { label: 'Export Format', value: 'Vector PDF & Live Interactive Presentation' }
    ]
  },
  prezi_ai: {
    id: 'prezi_ai',
    name: 'Prezi AI Dynamic Presenter',
    category: 'Productivity & Writing',
    badge: 'Non-Linear Zooming Visual Storytelling',
    tagline: 'Break free from linear slides with dynamic zooming spatial presentations and video overlays that place you next to your content',
    gradient: 'from-blue-600 to-indigo-800',
    accentColor: 'text-blue-300',
    defaultPrompt: 'Create a spatial zooming presentation mapping the entire history of artificial intelligence from Turing to Transformers.',
    actions: ['Build Zooming Spatial Canvas', 'Prezi Video Overlay Stream', 'Interactive Topic Bubbles', 'Presenter Mode'],
    sampleOutputTitle: 'Non-Linear Spatial Canvas Map',
    sampleDetails: [
      { label: 'Canvas Structure', value: 'Dynamic 3D Zooming Hierarchy (6 Macro Clusters)' },
      { label: 'Video Integration', value: 'Live Camera Presenter Overlay Stream' },
      { label: 'Interactivity', value: 'Clickable Topic Nodes with Drill-Down Depth' }
    ]
  },
  grammarly: {
    id: 'grammarly',
    name: 'Grammarly Pro AI',
    category: 'Productivity & Writing',
    badge: 'Executive Tone & Grammar Intelligence',
    tagline: 'Real-time tone rewrites, conciseness trimming, passive-to-active voice corrections, and plagiarism detection',
    gradient: 'from-emerald-600 to-green-700',
    accentColor: 'text-emerald-300',
    defaultPrompt: 'Rewrite this cold outreach email to sound authoritative, persuasive, and crisp while removing fluff.',
    actions: ['Executive Tone Rewrite', 'Trim 30% Word Count', 'Plagiarism Scan Check', 'Clarity Score Benchmark'],
    sampleOutputTitle: 'Executive Writing Audit (Score: 98/100)',
    sampleDetails: [
      { label: 'Clarity Score', value: '98 / 100 (Very Clear & Direct)' },
      { label: 'Tone Delivery', value: 'Confident, Professional, and Action-Oriented' },
      { label: 'Word Reduction', value: 'Trimmed from 240 words to 128 words (47% tighter)' }
    ]
  },
  quillbot: {
    id: 'quillbot',
    name: 'QuillBot AI Paraphraser',
    category: 'Productivity & Writing',
    badge: 'Multi-Mode Paraphrasing & Summarizer',
    tagline: 'Paraphrase text across 7 modes (Standard, Fluency, Formal, Simple, Creative, Expand, Shorten) with freeze words',
    gradient: 'from-green-600 to-teal-700',
    accentColor: 'text-green-300',
    defaultPrompt: 'Paraphrase complex research abstract in "Formal" and "Academic" mode while keeping technical terms intact.',
    actions: ['Paraphrase (Formal / Fluency)', 'Summarize Key Sentences', 'Citation Generator', 'Freeze Word Locks'],
    sampleOutputTitle: 'Paraphrased Academic Text',
    sampleDetails: [
      { label: 'Active Mode', value: 'Formal & Academic Synthesizer' },
      { label: 'Vocabulary Enhancement', value: 'High Synonyms Replacement Selected' },
      { label: 'Readability', value: 'College Graduate Level (Flesch-Kincaid: Grade 14)' }
    ]
  },
  wordtune: {
    id: 'wordtune',
    name: 'Wordtune Spices AI',
    category: 'Productivity & Writing',
    badge: 'Contextual Sentence Rewriter & Spices',
    tagline: 'Offers multiple alternative ways to phrase every single sentence, adds supporting facts ("Spices"), and explains counterarguments',
    gradient: 'from-purple-600 to-indigo-700',
    accentColor: 'text-purple-300',
    defaultPrompt: 'Add a supporting statistic and an illustrative historical example to strengthen this paragraph about cloud computing.',
    actions: ['Sentence Alternative Suggestions', 'Add AI Spice (Statistic / Fact)', 'Make It Casual vs Formal', 'Translate & Rewrite'],
    sampleOutputTitle: 'Wordtune Rewritten Options & Spices',
    sampleDetails: [
      { label: 'Suggested Rewrites', value: '5 distinct phrasing variations' },
      { label: 'Added Spice', value: 'Cited 2025 Gartner Cloud Migration Statistic' },
      { label: 'Rhetorical Impact', value: 'High Persuasion Score' }
    ]
  },

  // Voice & Audio
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs Voice AI v3',
    category: 'Voice & Audio',
    badge: 'Hyper-Realistic Voice Cloning & Dubbing',
    tagline: 'Industry-standard ultra-realistic text-to-speech, instant voice cloning with 1-minute audio, and automated AI video dubbing in 29+ languages',
    gradient: 'from-slate-900 to-indigo-950',
    accentColor: 'text-indigo-400',
    defaultPrompt: 'Generate emotional, cinematic audiobook narration with nuanced pauses and breathing realism.',
    actions: ['Synthesize Speech (TTS v3)', 'Instant Voice Cloning', 'AI Video Dubbing (29 Languages)', 'Sound Effects Generator'],
    sampleOutputTitle: 'ElevenLabs Broadcast Audio (48kHz)',
    sampleDetails: [
      { label: 'Voice Model', value: 'Eleven Multilingual v3 (High Emotion & Pacing)' },
      { label: 'Audio Quality', value: 'Uncompressed 48kHz / 24-bit Lossless WAV' },
      { label: 'Natural Pauses', value: 'Human breath simulation and dynamic prosody' }
    ]
  },
  suno_ai: {
    id: 'suno_ai',
    name: 'Suno AI v4',
    category: 'Voice & Audio',
    badge: 'Complete Song & Music Generation',
    tagline: 'Generate complete, broadcast-ready songs with vocals, instrumentation, verse-chorus structure, and genre blending from text prompts',
    gradient: 'from-rose-600 to-purple-600',
    accentColor: 'text-rose-400',
    defaultPrompt: 'Upbeat 80s synthwave anthem about coding autonomous AI agents late at night, soaring female vocals, analog synths.',
    actions: ['Generate Full Song (3 mins)', 'Custom Lyrics Mode', 'Stem Separation (Vocals / Drums)', 'Extend Song Track'],
    sampleOutputTitle: 'Suno v4 Complete Mastered Track',
    sampleDetails: [
      { label: 'Genre Blend', value: '80s Synthwave / Cyberpunk Pop' },
      { label: 'Structure', value: 'Intro -> Verse 1 -> Chorus -> Guitar Solo -> Outro' },
      { label: 'Audio Master', value: 'Studio Mastered Stereo 320kbps MP3' }
    ]
  },
  udio_ai: {
    id: 'udio_ai',
    name: 'Udio AI 1.5 Pro',
    category: 'Voice & Audio',
    badge: 'Pro Music Production & Stem Separation',
    tagline: 'High-fidelity audio fidelity, complex harmonic chord progressions, jazz/orchestral/electronic synthesis, and stem downloads',
    gradient: 'from-violet-600 to-indigo-700',
    accentColor: 'text-violet-300',
    defaultPrompt: 'Complex progressive neo-soul jazz track with Rhodes piano chords, soulful trumpet solo, and intricate drum groove.',
    actions: ['Generate Pro Master Track', 'Download Stems (Bass, Vocal, Drums)', 'Harmonic Chord Infill', 'Extend Track Section'],
    sampleOutputTitle: 'Udio 1.5 Mastered Session & Stems',
    sampleDetails: [
      { label: 'Audio Engine', value: 'Udio 1.5 HD Audio Clarity' },
      { label: 'Separated Stems', value: 'Vocals.wav, Bass.wav, Drums.wav, Rhodes.wav' },
      { label: 'Sample Rate', value: '48kHz 24-bit Broadcast Master' }
    ]
  },

  // Automation & Agents
  zapier_central: {
    id: 'zapier_central',
    name: 'Zapier Central & AI Zaps',
    category: 'Automation & Agents',
    badge: '6,000+ App Integration Ecosystem',
    tagline: 'Create autonomous AI agents that trigger multi-step workflows across 6,000+ connected apps without writing code',
    gradient: 'from-orange-500 to-red-500',
    accentColor: 'text-orange-400',
    defaultPrompt: 'When a new lead fills out Stripe checkout, create a HubSpot deal, send a Slack alert, and draft a personalized email in Gmail.',
    actions: ['Build 4-Step Multi-App Zap', 'Test Webhook Payload', 'Deploy Autonomous Bot', 'Error Monitoring'],
    sampleOutputTitle: 'Active Zap: Stripe -> HubSpot -> Slack -> Gmail',
    sampleDetails: [
      { label: 'Connected Ecosystem', value: '6,000+ Verified SaaS Connectors' },
      { label: 'Execution Speed', value: 'Instant Webhook Trigger (< 500ms)' },
      { label: 'Success Rate', value: '99.99% Reliability across 10,000 runs' }
    ]
  },
  make_com: {
    id: 'make_com',
    name: 'Make.com (Integromat) AI',
    category: 'Automation & Agents',
    badge: 'Visual Multi-Branch Workflow Architecture',
    tagline: 'Design complex visual automation scenarios with conditional branching, data routers, JSON transformations, and error handling',
    gradient: 'from-purple-600 to-indigo-600',
    accentColor: 'text-purple-400',
    defaultPrompt: 'Build a multi-branch scenario with JSON parsing that routes enterprise tickets to Slack VIP channel and standard tickets to Jira.',
    actions: ['Visual Router Scenario Builder', 'JSON & RegEx Data Parsing', 'Error-Handling Fallback Route', 'Real-Time Data Flow Test'],
    sampleOutputTitle: 'Visual Scenario: Multi-Branch Router Running',
    sampleDetails: [
      { label: 'Visual Modules', value: 'Webhook -> Router -> [Route A: VIP Slack | Route B: Jira API]' },
      { label: 'Data Processing', value: 'JSON Arrays Aggregated & Transformed' },
      { label: 'Execution Log', value: '0 Errors (Automated Fallback active)' }
    ]
  },
  n8n_ai: {
    id: 'n8n_ai',
    name: 'n8n Autonomous AI Agents',
    category: 'Automation & Agents',
    badge: 'Self-Hosted Fair-Code AI Workflow Engine',
    tagline: 'Self-hostable workflow automation platform featuring native LangChain AI agent nodes, vector memory stores, and custom JavaScript/Python execution',
    gradient: 'from-rose-600 to-red-700',
    accentColor: 'text-rose-400',
    defaultPrompt: 'Build an autonomous LangChain agent node connected to Pinecone vector store that answers support tickets and invokes refund APIs.',
    actions: ['Deploy LangChain Agent Node', 'Connect Vector Database Memory', 'Custom JS/Python Code Node', 'Self-Hosted Webhook Endpoint'],
    sampleOutputTitle: 'n8n LangChain Autonomous Workflow',
    sampleDetails: [
      { label: 'Agent Tools Loaded', value: 'Pinecone Vector Store, Stripe Refund API, Gmail Tool' },
      { label: 'Memory Retention', value: 'Buffer Window Memory (Last 10 turns)' },
      { label: 'Hosting Freedom', value: 'Self-Hosted Docker Container / Zero Vendor Lock-in' }
    ]
  }
};

interface AIHubStudioProps {
  toolId: string;
  user: User | null;
  onOpenAuth: () => void;
  onBrowseCatalog?: () => void;
  onOpenHealth?: () => void;
}

export default function AIHubStudio({ toolId, user, onOpenAuth, onBrowseCatalog, onOpenHealth }: AIHubStudioProps) {
  const superTool = getSuperAiTool(toolId);
  const config: ToolConfig = MASTER_AI_DIRECTORY[toolId] || (superTool ? {
    id: superTool.id,
    name: superTool.name,
    category: superTool.category as any,
    badge: superTool.badge,
    tagline: superTool.tagline,
    gradient: superTool.gradient,
    accentColor: superTool.accentColor,
    defaultPrompt: superTool.defaultPrompt,
    actions: superTool.actions,
    sampleOutputTitle: superTool.sampleOutputTitle,
    sampleDetails: superTool.sampleDetails
  } : MASTER_AI_DIRECTORY.khanmigo);
  const [prompt, setPrompt] = useState(config.defaultPrompt);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [turboMode, setTurboMode] = useState(true);
  const [latencyMs, setLatencyMs] = useState(12);
  const [throughputTokens, setThroughputTokens] = useState(265);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [parallelActive, setParallelActive] = useState(true);
  
  // Interactive state for tools
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [paraphraseMode, setParaphraseMode] = useState<'Standard' | 'Fluency' | 'Formal' | 'Creative' | 'Shorten'>('Standard');
  const [imageStyle, setImageStyle] = useState<'Cinematic' | 'Photorealistic' | '3D Render' | 'Anime' | 'Cyberpunk'>('Cinematic');
  const [selectedCodeTab, setSelectedCodeTab] = useState<'code' | 'preview' | 'tests'>('preview');
  const [studentPassActive, setStudentPassActive] = useState(true);

  // Video Editing Suite States (Premiere Pro, DaVinci Resolve, CapCut)
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(14.8);
  const [activeEditorTab, setActiveEditorTab] = useState<'timeline' | 'color' | 'audio' | 'captions' | 'speed'>('timeline');
  const [lumetriTemperature, setLumetriTemperature] = useState(14);
  const [lumetriExposure, setLumetriExposure] = useState(0.35);
  const [lumetriLut, setLumetriLut] = useState('Teal & Orange Cinematic');
  const [davinciLift, setDavinciLift] = useState(-3);
  const [davinciGamma, setDavinciGamma] = useState(2);
  const [davinciGain, setDavinciGain] = useState(6);
  const [speedRampFactor, setSpeedRampFactor] = useState(1.0);
  const [activeCaptionStyle, setActiveCaptionStyle] = useState('Word-by-Word Glow');
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedClipId, setSelectedClipId] = useState<string>('clip-1');

  // Playback timer simulation
  React.useEffect(() => {
    let interval: any;
    if (videoPlaying) {
      interval = setInterval(() => {
        setVideoCurrentTime(prev => (prev >= 59.9 ? 0 : Number((prev + 0.1).toFixed(1))));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [videoPlaying]);

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24);
    return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  // Sync default prompt when toolId changes
  React.useEffect(() => {
    setPrompt(config.defaultPrompt);
    setOutputResult(null);
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setAudioPlaying(false);
    setActiveSlideIndex(0);
    setVideoPlaying(false);
  }, [toolId, config]);

  const handleRunAction = (actionName?: string) => {
    setIsProcessing(true);
    const execTime = turboMode ? Math.floor(Math.random() * 150 + 100) : 600;
    setTimeout(() => {
      setIsProcessing(false);
      setLatencyMs(turboMode ? Math.floor(Math.random() * 8 + 6) : 38);
      setThroughputTokens(turboMode ? Math.floor(Math.random() * 70 + 270) : 120);
      const chosenAct = actionName || config.actions[0];
      setOutputResult(`⚡ [${config.name} - Accelerated AI Execution Complete]\nAction Triggered: "${chosenAct}"\nTarget Directive: "${prompt}"\nNeural Engine: Distributed Tensor Core v4.2 with Sub-15ms Latency\nStatus: 200 OK • Artifact Verified • Output Synced to Student Workspace.`);
    }, execTime);
  };

  const handleCopyArtifact = () => {
    const exportData = {
      ai_engine: config.name,
      category: config.category,
      badge: config.badge,
      student_tier: '100% Free Lifetime Student Pass Verified',
      runtime_telemetry: {
        latency_ms: latencyMs,
        throughput_tok_sec: throughputTokens,
        turbo_acceleration: turboMode ? 'Active (Sub-15ms)' : 'Standard',
        parallel_nodes: parallelActive ? '32 H100 Cluster' : 'Single Instance'
      },
      specifications: config.sampleDetails,
      prompt: prompt,
      generated_output: outputResult || config.sampleOutputTitle
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dedicated Math Equations and Step data
  const sampleMathSteps = [
    { step: '1. Problem Formulation', formula: 'f(x) = 2x³ - 9x² + 12x + 5', note: 'Find local extrema on ℝ' },
    { step: '2. First Derivative (Critical Points)', formula: 'f\'(x) = 6x² - 18x + 12 = 0', note: 'Factor: 6(x - 1)(x - 2) = 0 → x₁ = 1, x₂ = 2' },
    { step: '3. Second Derivative Test', formula: 'f\'\'(x) = 12x - 18', note: 'f\'\'(1) = -6 < 0 (Local Max), f\'\'(2) = 6 > 0 (Local Min)' },
    { step: '4. Exact Coordinates', formula: '(1, 10) [Local Max], (2, 9) [Local Min]', note: 'Verified by Wolfram Kernel' }
  ];

  // Dedicated Flashcards Data for Quizlet / Khanmigo
  const sampleFlashcards = [
    { q: 'What is the Second Derivative Test used for?', a: 'Determining whether a critical point where f\'(x)=0 is a local maximum (f\'\'(c)<0) or a local minimum (f\'\'(c)>0).' },
    { q: 'What is the Power Rule for Differentiation?', a: 'd/dx [xⁿ] = n · xⁿ⁻¹ for any real number exponent n.' },
    { q: 'Define the Central Limit Theorem (CLT)', a: 'The distribution of sample means approximates a normal distribution as sample size n increases (typically n ≥ 30), regardless of population shape.' },
    { q: 'What is the Big-O Time Complexity of Merge Sort?', a: 'O(n log n) in best, average, and worst cases due to divide-and-conquer splitting.' }
  ];

  // Dedicated Academic Papers for Research Engines
  const samplePapers = [
    { title: 'Attention Is All You Need', authors: 'Vaswani, Shazeer, Parmar et al.', venue: 'NeurIPS 2017', citations: '128,450', tldr: 'Introduces the Transformer architecture based solely on self-attention mechanisms, replacing recurrence and convolutions.', impact: '99.9%' },
    { title: 'Deep Residual Learning for Image Recognition', authors: 'He, Zhang, Ren, Sun', venue: 'CVPR 2016', citations: '198,320', tldr: 'Presents ResNet framework easing the training of substantially deeper neural networks through identity shortcut connections.', impact: '99.8%' },
    { title: 'Mastering the Game of Go with Deep Neural Networks', authors: 'Silver, Huang, Maddison et al.', venue: 'Nature 2016', citations: '42,100', tldr: 'AlphaGo combines tree search with deep neural networks trained by supervised learning and reinforcement learning.', impact: '99.5%' }
  ];

  // Dedicated Presentation Slides
  const sampleSlides = [
    { num: 1, title: 'Autonomous AI Architecture', subtitle: 'Distributed Tensor Processing & Sub-15ms Inference', bullets: ['Parallel Speculative Decoding', 'KV-Cache Spatial Reuse', 'Zero Cold-Start Containerized Latency'] },
    { num: 2, title: 'Mathematical & Scientific Rigor', subtitle: 'Symbolic Proof Engines and Citation Synthesis', bullets: ['Formal proof verification with Lean 4', '200M+ Peer-Reviewed Studies Index', 'Automated Risk-of-Bias Classification'] },
    { num: 3, title: 'Student & Educator Access', subtitle: '100% Free Lifetime Tier with Zero Resource Throttling', bullets: ['Unrestricted H100 GPU compute access', 'All 70+ AI models unlocked forever', 'Real-time collaborative workspace sync'] }
  ];

  const trial = getTrialInfo(user);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      <ScrollControls />
      
      {/* 5-Day Free Trial / Student 100% Free Access Banner */}
      <div className="px-6 py-2 bg-gradient-to-r from-emerald-950/90 via-indigo-950/80 to-purple-950/80 border-b border-emerald-500/30 flex items-center justify-between text-xs font-semibold flex-wrap gap-2">
        <div className="flex items-center gap-2 text-emerald-300">
          {trial.isStudent ? (
            <>
              <GraduationCap className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>🎓 <strong>100% Free Lifetime Student & Educator Access Active</strong> — All 70+ AI Engines Unlocked ($0/mo)</span>
            </>
          ) : trial.isTrialActive ? (
            <>
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-amber-200">✨ <strong>5-Day Free AI Trial Active</strong> ({trial.daysRemaining} days left) — All 70+ AI Engines Unlocked</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>🎓 Students & Educators get <strong>100% Free Lifetime Access</strong> ($0 forever)</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          {trial.isStudent ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Student ID: Verified ✓
            </span>
          ) : (
            <button
              onClick={() => {
                localStorage.setItem('nova_student_pass', 'active');
                toast.success('🎓 Student Free Lifetime Access Verified! 100% Free Lifetime Pass activated.');
                setTimeout(() => window.location.reload(), 800);
              }}
              className="px-2.5 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer"
            >
              🎓 Activate Student Free Pass
            </button>
          )}
          <span className="text-slate-400">Zero Paywalls</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-3.5 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${config.gradient} flex items-center justify-center text-white shadow-lg`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-base text-white">{config.name}</h1>
              <span className={`px-2 py-0.5 rounded-full bg-white/10 ${config.accentColor} text-[10px] font-bold border border-white/10 font-mono`}>
                {config.badge}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold border border-slate-700 font-mono hidden sm:inline">
                {config.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{config.tagline}</p>
          </div>
        </div>

        {/* Turbo Acceleration & Export Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTurboMode(!turboMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border ${
              turboMode 
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            title="Accelerate token pipeline with H100 distributed matrix execution"
          >
            <Zap className={`w-3.5 h-3.5 ${turboMode ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{turboMode ? 'TURBO ULTRA 10X' : 'STANDARD SPEED'}</span>
          </button>

          {onOpenHealth ? (
            <button
              onClick={onOpenHealth}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-mono text-slate-300 transition-all cursor-pointer group"
              title="Open Real-time AI Health Dashboard"
            >
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {latencyMs}ms
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400 font-bold">{throughputTokens} t/s</span>
              <span className="text-[10px] text-emerald-400 font-sans font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded ml-0.5 group-hover:bg-emerald-500/25">
                Live Health
              </span>
            </button>
          ) : (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {latencyMs}ms
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400 font-bold">{throughputTokens} t/s</span>
            </div>
          )}

          {onBrowseCatalog && (
            <button
              onClick={onBrowseCatalog}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-xs font-semibold text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Open full 1,970+ AI Tools Master Directory"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">1.9K+ Tools</span>
            </button>
          )}

          <button
            onClick={handleCopyArtifact}
            className="px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Action Controls */}
        <div className="lg:col-span-5 border-r border-white/5 p-5 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3.5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Wand2 className={`w-3.5 h-3.5 ${config.accentColor}`} />
                  Input Directive & Learning Context
                </label>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  {turboMode ? 'Parallel Matrix Active' : 'Sequential Queue'}
                </span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Direct AI Execution Workflows</span>
                <span className="text-[10px] text-slate-500 font-mono">1-Click Trigger</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.actions.map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRunAction(act)}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <Zap className={`w-3.5 h-3.5 ${config.accentColor} shrink-0 group-hover:scale-110 transition-transform`} />
                    <span className="truncate">{act}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware & Latency Benchmark */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <div className="font-bold text-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Student Supercomputing Core</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Free Plan</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Connected directly to Nova AI’s high-throughput neural cluster with speculative tensor decoding, running <strong>10x faster</strong> than standalone consumer models.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/50">
                <span>⚡ Latency: &lt;15ms</span>
                <span>🔥 Speed: {throughputTokens} tok/s</span>
                <span>🎓 Access: Lifetime Free</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleRunAction()}
            disabled={isProcessing}
            className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r ${config.gradient} hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 cursor-pointer mt-3`}
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
            <span>
              {isProcessing 
                ? 'Synthesizing High-Throughput Output...' 
                : `Execute ${config.name} (${turboMode ? 'Turbo 10x' : 'Standard'})`}
            </span>
          </button>
        </div>

        {/* Right Dynamic Live Interactive Workspace */}
        <div className="lg:col-span-7 p-5 overflow-y-auto flex flex-col justify-start space-y-4">
          
          {/* DOMAIN 1: EDUCATION & MATH (Khanmigo, Quizlet, Photomath, Wolfram Alpha) */}
          {config.category === 'Education & Math' && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    {config.id === 'quizlet' ? 'Adaptive Flashcard Study Deck' : 'Step-by-Step Computational Breakdown'}
                  </h3>
                  <p className="text-xs text-slate-400">Subject: AP Calculus / Physics / STEM • Live Verified Proofs</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                  Student Free Verified
                </span>
              </div>

              {/* Quizlet Flashcard View */}
              {config.id === 'quizlet' ? (
                <div className="space-y-4">
                  <div 
                    onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                    className="h-48 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-indigo-500/30 p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl relative overflow-hidden transition-transform active:scale-98"
                  >
                    <div className="absolute top-3 left-3 text-[10px] font-mono text-indigo-400">
                      Card {flashcardIndex + 1} of {sampleFlashcards.length} • {flashcardFlipped ? 'Answer (Click to flip)' : 'Question (Click to flip)'}
                    </div>
                    <p className="text-base font-bold text-slate-100 max-w-md">
                      {flashcardFlipped ? sampleFlashcards[flashcardIndex].a : sampleFlashcards[flashcardIndex].q}
                    </p>
                    <div className="absolute bottom-3 text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Spaced Repetition Mastery: 94%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : sampleFlashcards.length - 1));
                        setFlashcardFlipped(false);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
                    >
                      ← Previous Card
                    </button>
                    <button
                      onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
                    >
                      Flip Card 🔄
                    </button>
                    <button
                      onClick={() => {
                        setFlashcardIndex((prev) => (prev < sampleFlashcards.length - 1 ? prev + 1 : 0));
                        setFlashcardFlipped(false);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
                    >
                      Next Card →
                    </button>
                  </div>
                </div>
              ) : (
                /* Photomath / Wolfram Alpha / Khanmigo Step by Step */
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs font-mono text-indigo-200">
                    <span className="text-indigo-400 font-bold">Input Equation:</span> 2x³ - 9x² + 12x + 5 = y
                  </div>
                  {sampleMathSteps.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 font-medium">
                        <span>{st.step}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{st.note}</span>
                      </div>
                      <div className="text-slate-100 font-mono font-bold text-sm bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        {st.formula}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DOMAIN 2: RESEARCH & SCIENCE (Google Scholar, Elicit, Consensus, Semantic Scholar, Scite, Connected Papers) */}
          {config.category === 'Research & Science' && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Peer-Reviewed Literature Synthesis Matrix
                  </h3>
                  <p className="text-xs text-slate-400">Indexed 200M+ Academic Journals • BibTeX & APA Citations</p>
                </div>
                <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                  {config.id === 'consensus' ? '88% Consensus Agreement' : 'Semantic Index v4'}
                </span>
              </div>

              <div className="space-y-3">
                {samplePapers.map((paper, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2 hover:border-slate-700 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-100 text-sm leading-snug">{paper.title}</h4>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] shrink-0">
                        {paper.citations} citations
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      <strong>Authors:</strong> {paper.authors} • <span className="text-cyan-300">{paper.venue}</span>
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                      <strong className="text-amber-400">TL;DR:</strong> {paper.tldr}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                      <span>Scientific Impact: <strong className="text-emerald-400">{paper.impact}</strong></span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toast.success(`Copied BibTeX citation for "${paper.title}"!`)}
                          className="hover:text-cyan-300 underline cursor-pointer"
                        >
                          BibTeX
                        </button>
                        <button 
                          onClick={() => toast.success(`Downloaded full peer-reviewed study PDF!`)}
                          className="hover:text-emerald-300 underline cursor-pointer"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOMAIN 3: CODING & DEVELOPER AGENTS */}
          {config.category === 'Coding & IDEs' && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 pl-2">neural_agent_cluster.ts</span>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                  <button 
                    onClick={() => setSelectedCodeTab('preview')}
                    className={`px-2.5 py-1 rounded-md ${selectedCodeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Code & Tests
                  </button>
                  <button 
                    onClick={() => setSelectedCodeTab('code')}
                    className={`px-2.5 py-1 rounded-md ${selectedCodeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Terminal Logs
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
                <p className="text-purple-400">// {config.name} Production Code Engine</p>
                <p className="text-indigo-300">import <span className="text-white">&#123; TensorCluster, SpeculativeDecoder &#125;</span> from <span className="text-emerald-400">'@nova/neural'</span>;</p>
                <br />
                <p className="text-blue-400">export async function <span className="text-amber-300">executeAutonomousPipeline</span>(prompt: <span className="text-cyan-300">string</span>) &#123;</p>
                <p className="text-slate-300 pl-4">const cluster = await TensorCluster.initialize(&#123; latency: 'sub-15ms', nodes: 32 &#125;);</p>
                <p className="text-slate-300 pl-4">const stream = await cluster.generateStream(prompt, &#123; turbo: true &#125;);</p>
                <p className="text-emerald-400 pl-4">// 100% Student Free Verified: 0 Throttling</p>
                <p className="text-slate-300 pl-4">return &#123; status: 200, latencyMs: 12, tokensPerSec: 280 &#125;;</p>
                <p className="text-blue-400">&#125;</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Unit Test Suite Passed (12/12 Tests Green)</span>
                </div>
                <button
                  onClick={() => toast.success('All test cases compiled and passed in 8ms!')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Re-Run Tests
                </button>
              </div>
            </div>
          )}

          {/* DOMAIN 4: VOICE, AUDIO & MUSIC */}
          {config.category === 'Voice & Audio' && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Music className="w-4 h-4 text-purple-400" />
                    Hi-Fi 48kHz Neural Audio & Stem Synthesis
                  </h3>
                  <p className="text-xs text-slate-400">Lossless Master • Stem Split (Vocals, Bass, Drums, Synths)</p>
                </div>
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                  48kHz Lossless
                </span>
              </div>

              {/* Interactive Equalizer Bars */}
              <div className="h-28 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border border-purple-500/20 p-4 flex items-end justify-center gap-1.5">
                {[40, 65, 85, 30, 95, 70, 50, 90, 60, 45, 80, 100, 75, 55, 90, 65, 40, 85, 60, 30].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: audioPlaying ? `${Math.floor(Math.random() * 70 + 20)}%` : `${height}%` }}
                    className={`w-2 rounded-t-full transition-all duration-150 ${
                      audioPlaying ? 'bg-gradient-to-t from-purple-500 to-amber-400' : 'bg-purple-600/50'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                  >
                    {audioPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <div>
                    <h5 className="text-xs font-bold text-slate-100">Cyberpunk Odyssey (Stem Master v4)</h5>
                    <p className="text-[10px] text-slate-400 font-mono">02:45 • Key of D Minor • 128 BPM</p>
                  </div>
                </div>
                <button
                  onClick={() => toast.info('Exporting separate FLAC stems (Vocals, Bass, Drums, Synths)...')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Stems
                </button>
              </div>
            </div>
          )}

          {/* DOMAIN 5: PRESENTATIONS & PRODUCTIVITY (Gamma, Google Slides, PowerPoint, Notion) */}
          {(config.category === 'Productivity & Writing' || config.id === 'gamma' || config.id === 'google_slides') && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-amber-400" />
                    Interactive Presentation Deck (Slide {activeSlideIndex + 1} of {sampleSlides.length})
                  </h3>
                  <p className="text-xs text-slate-400">Design-Rule Adaptive Layout • Export to PPTX / PDF</p>
                </div>
                <div className="flex gap-1.5">
                  {sampleSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all ${
                        activeSlideIndex === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Slide Canvas */}
              <div className="h-52 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    Slide {sampleSlides[activeSlideIndex].num} • Executive Overview
                  </span>
                  <h2 className="text-lg font-black text-white mt-1">
                    {sampleSlides[activeSlideIndex].title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {sampleSlides[activeSlideIndex].subtitle}
                  </p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {sampleSlides[activeSlideIndex].bullets.map((b, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DOMAIN: VIDEO EDITING & PRODUCTION SUITE (Premiere Pro, DaVinci Resolve, CapCut, etc.) */}
          {(['premiere_pro', 'davinci_resolve', 'capcut', 'invideo_ai', 'descript', 'opus_clip'].includes(config.id) || config.category === 'Video & 3D') && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl space-y-4">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    {config.id === 'premiere_pro' ? (
                      <Film className="w-4 h-4 text-indigo-400" />
                    ) : config.id === 'davinci_resolve' ? (
                      <SlidersHorizontal className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Scissors className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {config.id === 'premiere_pro' 
                        ? 'Premiere Pro Lumetri NLE Sequencer' 
                        : config.id === 'davinci_resolve' 
                        ? 'DaVinci Resolve Color & Fairlight Suite' 
                        : config.id === 'capcut'
                        ? 'CapCut Pro 9:16 Viral Creator Studio'
                        : `${config.name} Live Viewport`}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {config.id === 'davinci_resolve' 
                        ? 'Color Managed ACEScc • 32-bit Float • 6-Node Graph' 
                        : config.id === 'capcut'
                        ? 'Auto-Captions & Speed Ramping • TikTok / Reels Preset' 
                        : 'Mercury Playback Engine • 4K UHD 23.976 fps'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold rounded-lg border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    0 Dropped Frames
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono font-bold rounded-lg border border-slate-700">
                    {config.id === 'capcut' ? '1080x1920 9:16' : '3840x2160 4K'}
                  </span>
                </div>
              </div>

              {/* Cinema Monitor Viewport */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[220px] max-h-[300px]">
                {/* Background video simulation canvas */}
                <div 
                  className={`w-full h-full absolute inset-0 transition-all duration-300 opacity-80 ${
                    config.id === 'premiere_pro'
                      ? 'bg-gradient-to-tr from-slate-950 via-indigo-950/60 to-purple-950/40'
                      : config.id === 'davinci_resolve'
                      ? 'bg-gradient-to-tr from-stone-950 via-rose-950/50 to-amber-950/40'
                      : 'bg-gradient-to-tr from-slate-950 via-cyan-950/50 to-teal-950/40'
                  }`}
                  style={{
                    filter: config.id === 'premiere_pro' 
                      ? `saturate(${1 + lumetriExposure}) contrast(1.15)` 
                      : config.id === 'davinci_resolve'
                      ? `contrast(${1 + davinciGain * 0.03}) saturate(${1 + Math.abs(davinciGamma) * 0.05})`
                      : 'none'
                  }}
                />

                {/* Broadcast Safe Margins Guide Line */}
                <div className="absolute inset-4 border border-dashed border-white/10 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                    <span>ACTION SAFE 90%</span>
                    <span>TITLE SAFE 80%</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                    <span>TC: {formatTimecode(videoCurrentTime)}</span>
                    <span>PRORES 422 HQ</span>
                  </div>
                </div>

                {/* Viewport Center Mockup */}
                <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                  {config.id === 'capcut' ? (
                    /* CapCut Vertical Smartphone Subtitle Preview */
                    <div className="max-w-xs space-y-2">
                      <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-400 font-bold border border-cyan-500/30 inline-block">
                        9:16 VERTICAL REEL PREVIEW
                      </div>
                      <div className="text-sm sm:text-base font-black tracking-tight text-yellow-300 drop-shadow-[0_2px_8px_rgba(234,179,8,0.8)] animate-pulse">
                        "{videoCurrentTime > 30 ? 'DEPLOYING ULTRA AI SUPERCOMPUTE ⚡' : 'HOW TO 10X YOUR VIDEO PRODUCTION 🚀'}"
                      </div>
                      <p className="text-[10px] text-white/80 font-medium">
                        Style: <span className="text-cyan-300 font-bold">{activeCaptionStyle}</span> • Speed: <span className="text-yellow-400 font-bold">{speedRampFactor}x</span>
                      </p>
                    </div>
                  ) : config.id === 'davinci_resolve' ? (
                    /* DaVinci Resolve Color Grade Scopes Preview */
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold">
                          Blackmagic RAW 6K
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                          ACEScc Color Managed
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-semibold max-w-sm">
                        Node 04 Active: Primary Lift ({davinciLift > 0 ? `+${davinciLift}` : davinciLift}) • Gamma ({davinciGamma > 0 ? `+${davinciGamma}` : davinciGamma}) • Gain (+{davinciGain})
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-slate-400">
                        <Activity className="w-3 h-3 text-rose-400" />
                        <span>Vectorscope & Waveform Calibrated</span>
                      </div>
                    </div>
                  ) : (
                    /* Premiere Pro Multicam & Lumetri Preview */
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
                          Sequence 01 • Multicam Sync
                        </span>
                        <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-mono font-bold">
                          LUT: {lumetriLut}
                        </span>
                      </div>
                      <div className="text-xs text-slate-200 font-semibold">
                        A-Roll Cam 1 (Wide) + B-Roll Cutaway (Macro 85mm)
                      </div>
                      <div className="text-[10px] font-mono text-indigo-300/80">
                        Lumetri Temp: {lumetriTemperature > 0 ? `+${lumetriTemperature}` : lumetriTemperature}K • Exposure: {lumetriExposure > 0 ? `+${lumetriExposure}` : lumetriExposure} EV
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Edge: Realtime Bouncing Audio VU Meters */}
                <div className="absolute right-3 top-3 bottom-3 flex items-end gap-1 px-1.5 py-2 rounded-lg bg-black/60 border border-white/10">
                  <div className="flex flex-col items-center gap-0.5 h-full justify-end">
                    <span className="text-[8px] font-mono text-slate-400">L</span>
                    <div className="w-1.5 h-20 bg-slate-800 rounded-sm overflow-hidden flex flex-col-reverse">
                      <div 
                        className={`w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-rose-500 transition-all duration-75 ${
                          videoPlaying && !audioMuted ? 'h-[75%]' : 'h-[10%]'
                        }`} 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 h-full justify-end">
                    <span className="text-[8px] font-mono text-slate-400">R</span>
                    <div className="w-1.5 h-20 bg-slate-800 rounded-sm overflow-hidden flex flex-col-reverse">
                      <div 
                        className={`w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-rose-500 transition-all duration-75 ${
                          videoPlaying && !audioMuted ? 'h-[70%]' : 'h-[10%]'
                        }`} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport Control Bar */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                        videoPlaying 
                          ? 'bg-amber-500 hover:bg-amber-600 text-black' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                      title={videoPlaying ? 'Pause Playback (Space)' : 'Start Realtime Playback (Space)'}
                    >
                      {videoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={() => setVideoCurrentTime(prev => Math.max(0, Number((prev - 1).toFixed(1))))}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title="Step -1s"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setVideoCurrentTime(0)}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-mono font-bold text-slate-300 transition-colors cursor-pointer"
                    >
                      00:00
                    </button>

                    <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
                      {formatTimecode(videoCurrentTime)} <span className="text-slate-500">/ 00:01:00:00</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAudioMuted(!audioMuted)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        audioMuted 
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                      title={audioMuted ? 'Unmute Audio' : 'Mute Audio Track'}
                    >
                      {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        setOutputResult(`✂️ [${config.name}] Razor Cut Created at ${formatTimecode(videoCurrentTime)} on Track V1 & A1.`);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                      title="Split Clip at Current Playhead (C)"
                    >
                      <Scissors className="w-3 h-3 text-indigo-400" />
                      <span>Razor Split</span>
                    </button>
                  </div>
                </div>

                {/* Timeline Scrubber Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-400">0s</span>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="0.1"
                    value={videoCurrentTime}
                    onChange={(e) => setVideoCurrentTime(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400">60s</span>
                </div>
              </div>

              {/* Editing Controls Workspace Sub-Tabs */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs">
                  <button
                    onClick={() => setActiveEditorTab('timeline')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeEditorTab === 'timeline' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Multi-Track Timeline</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('color')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeEditorTab === 'color' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>{config.id === 'davinci_resolve' ? 'DaVinci Color Wheels' : 'Lumetri Color Grading'}</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('captions')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeEditorTab === 'captions' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>AI Subtitles & Captions</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('speed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeEditorTab === 'speed' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Speed Ramping & Curve</span>
                  </button>
                </div>

                {/* Sub-Tab 1: Multi-Track Timeline */}
                {activeEditorTab === 'timeline' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                      <span>TRACK ASSIGNMENT</span>
                      <span>IN / OUT DURATION</span>
                    </div>

                    {/* Track V2 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="w-8 text-indigo-400 font-bold shrink-0">V2</span>
                      <div className="flex-1 flex gap-1.5">
                        <div 
                          onClick={() => setSelectedClipId('clip-v2')}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] transition-all cursor-pointer truncate ${
                            selectedClipId === 'clip-v2' 
                              ? 'bg-purple-600/30 border-purple-500 text-purple-200 font-bold' 
                              : 'bg-purple-950/40 border-purple-800/40 text-purple-300'
                          }`}
                        >
                          B-Roll_Drone_4K.mov [00:10 - 00:35]
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">25.0s</span>
                    </div>

                    {/* Track V1 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="w-8 text-blue-400 font-bold shrink-0">V1</span>
                      <div className="flex-1 flex gap-1.5">
                        <div 
                          onClick={() => setSelectedClipId('clip-v1')}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] transition-all cursor-pointer truncate ${
                            selectedClipId === 'clip-v1' 
                              ? 'bg-blue-600/30 border-blue-500 text-blue-200 font-bold' 
                              : 'bg-blue-950/40 border-blue-800/40 text-blue-300'
                          }`}
                        >
                          Interview_CamA_Wide.r3d [00:00 - 00:58]
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">58.0s</span>
                    </div>

                    {/* Track A1 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="w-8 text-emerald-400 font-bold shrink-0">A1</span>
                      <div className="flex-1">
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[10px] truncate">
                          Dialogue_Lavalier_48k.wav • Essential Sound AI Active
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">-14 dB</span>
                    </div>

                    {/* Track A2 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="w-8 text-amber-400 font-bold shrink-0">A2</span>
                      <div className="flex-1">
                        <div className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-300 text-[10px] truncate">
                          Cinematic_Score_Modern.mp3 • Auto-Ducked (-22 dB)
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">-22 dB</span>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 2: Color Grading (Lumetri / DaVinci) */}
                {activeEditorTab === 'color' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                    {config.id === 'davinci_resolve' ? (
                      /* DaVinci 3-Way Primary Color Wheels */
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
                          <span>Primary Color Wheels (Lift, Gamma, Gain)</span>
                          <span className="text-[10px] font-mono text-slate-400">ACEScc v1.3</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {/* Lift */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                            <span className="text-[11px] font-bold text-slate-300 block">LIFT (Shadows)</span>
                            <div className="w-14 h-14 mx-auto rounded-full border-2 border-blue-500/40 bg-gradient-to-b from-blue-950/40 to-slate-900 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm" />
                            </div>
                            <input 
                              type="range" 
                              min="-10" 
                              max="10" 
                              value={davinciLift} 
                              onChange={(e) => setDavinciLift(parseInt(e.target.value))} 
                              className="w-full accent-blue-500 h-1 bg-slate-800"
                            />
                            <span className="text-[10px] font-mono text-slate-400">{davinciLift > 0 ? `+${davinciLift}` : davinciLift}</span>
                          </div>

                          {/* Gamma */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                            <span className="text-[11px] font-bold text-slate-300 block">GAMMA (Midtones)</span>
                            <div className="w-14 h-14 mx-auto rounded-full border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-slate-900 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" />
                            </div>
                            <input 
                              type="range" 
                              min="-10" 
                              max="10" 
                              value={davinciGamma} 
                              onChange={(e) => setDavinciGamma(parseInt(e.target.value))} 
                              className="w-full accent-emerald-500 h-1 bg-slate-800"
                            />
                            <span className="text-[10px] font-mono text-slate-400">{davinciGamma > 0 ? `+${davinciGamma}` : davinciGamma}</span>
                          </div>

                          {/* Gain */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                            <span className="text-[11px] font-bold text-slate-300 block">GAIN (Highlights)</span>
                            <div className="w-14 h-14 mx-auto rounded-full border-2 border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-900 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm" />
                            </div>
                            <input 
                              type="range" 
                              min="-10" 
                              max="10" 
                              value={davinciGain} 
                              onChange={(e) => setDavinciGain(parseInt(e.target.value))} 
                              className="w-full accent-rose-500 h-1 bg-slate-800"
                            />
                            <span className="text-[10px] font-mono text-slate-400">+{davinciGain}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Premiere Pro Lumetri Color Controls */
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                          <span>Lumetri Basic Color Calibration</span>
                          <span className="text-[10px] font-mono text-slate-400">32-bit Float</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300">
                              <span>Temperature:</span>
                              <span className="font-mono text-indigo-400">{lumetriTemperature > 0 ? `+${lumetriTemperature}` : lumetriTemperature}K</span>
                            </div>
                            <input
                              type="range"
                              min="-30"
                              max="30"
                              value={lumetriTemperature}
                              onChange={(e) => setLumetriTemperature(parseInt(e.target.value))}
                              className="w-full accent-indigo-500 h-1 bg-slate-800 rounded"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300">
                              <span>Exposure EV:</span>
                              <span className="font-mono text-indigo-400">{lumetriExposure > 0 ? `+${lumetriExposure}` : lumetriExposure}</span>
                            </div>
                            <input
                              type="range"
                              min="-1.5"
                              max="1.5"
                              step="0.05"
                              value={lumetriExposure}
                              onChange={(e) => setLumetriExposure(parseFloat(e.target.value))}
                              className="w-full accent-indigo-500 h-1 bg-slate-800 rounded"
                            />
                          </div>
                        </div>

                        {/* LUT Preset Selector */}
                        <div className="space-y-1 pt-1">
                          <label className="text-[11px] text-slate-400 font-medium">Creative 3D LUT Look:</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {['Teal & Orange Cinematic', 'Kodak 2383 Print', 'Fuji Eterna 3510', 'Clean Rec.709'].map((lut) => (
                              <button
                                key={lut}
                                onClick={() => setLumetriLut(lut)}
                                className={`p-1.5 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer truncate ${
                                  lumetriLut === lut 
                                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' 
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {lut}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Tab 3: AI Subtitles & Captions */}
                {activeEditorTab === 'captions' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">Speech-to-Text Dynamic Transcript</span>
                      <button
                        onClick={() => {
                          setOutputResult(`🎙️ [${config.name}] AI Auto-Captions Synced! 384 words transcribed with 99.8% phoneme alignment.`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 cursor-pointer"
                      >
                        1-Click Auto-Transcribe
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400">Caption Typography Style:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {['Word-by-Word Glow', 'Alex Hormozi Karaoke', 'Cinema Lower Third', 'Minimalist Clean'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setActiveCaptionStyle(st)}
                            className={`p-1.5 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer truncate ${
                              activeCaptionStyle === st 
                                ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 max-h-24 overflow-y-auto">
                      <div className="text-emerald-400">[00:00 - 00:04] "Welcome back everyone. Today we are exploring..."</div>
                      <div className="text-yellow-300 font-bold">[00:04 - 00:09] "How to 10x your entire video production workflow..."</div>
                      <div className="text-slate-400">[00:09 - 00:15] "Using advanced hardware neural engines and multi-track timelines."</div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 4: Speed Ramping & Curve */}
                {activeEditorTab === 'speed' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">Bezier Curve Speed Ramping</span>
                      <span className="text-[10px] font-mono text-slate-400">Optical Flow Retiming</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400">Preset Velocity Curve:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        {[
                          { label: '0.2x Slow-Mo', val: 0.2 },
                          { label: '0.5x Cinematic', val: 0.5 },
                          { label: '1.0x Realtime', val: 1.0 },
                          { label: '2.0x Hyper', val: 2.0 },
                          { label: '4.0x Whip Snap', val: 4.0 }
                        ].map((sp) => (
                          <button
                            key={sp.label}
                            onClick={() => setSpeedRampFactor(sp.val)}
                            className={`p-1.5 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer truncate ${
                              speedRampFactor === sp.val 
                                ? 'bg-amber-600/30 border-amber-500 text-amber-200 font-bold' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {sp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-slate-200 font-medium">Neural Speed Warp (Optical Flow Motion Vector)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Enabled</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Generated Execution Banner if triggered */}
          {outputResult && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 font-mono whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-top duration-300">
              {outputResult}
            </div>
          )}

          {/* Specifications & Hardware Matrix */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Neural Specifications & Hardware Pipeline
            </div>
            {config.sampleDetails.map((det, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs hover:border-slate-700 transition-colors">
                <span className="text-slate-400 font-medium">{det.label}</span>
                <span className="text-slate-200 font-bold font-mono">{det.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Zero-Throttling High-Bandwidth Cluster</span>
            </div>
            <button
              onClick={() => toast.success(`🚀 ${config.name} production artifact exported with cryptographic verification!`)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Production Artifact
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
