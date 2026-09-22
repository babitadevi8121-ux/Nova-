const fs = require('fs');
const path = require('path');

const raw = `ChatGPT, Claude, Gemini, Copilot, Grok, Perplexity, DeepSeek, Qwen, Le Chat, Poe, You.com, Phind, Komo AI, Brave Search, Exa, Tavily, Andi, Kagi, Arc Search, Consensus, Grammarly, QuillBot, Wordtune, ProWritingAid, LanguageTool, Hemingway Editor, Writer, Sudowrite, Rytr, Jenni AI, Jasper, Copy.ai, Writesonic, Anyword, Hypotenuse AI, Simplified, Scalenut, Peppertype, Neuroflash, Narrato, Midjourney, Adobe Firefly, Ideogram, Leonardo AI, FLUX, Stable Diffusion, Google Imagen, Recraft, Krea, Playground, Topaz Photo AI, Remini, Magnific, Let's Enhance, Clipdrop, Cleanup.pictures, Photoroom, Pixlr, Fotor, Picsart, Canva, Adobe Express, Figma, Framer, Looka, Brandmark, Uizard, Visily, Galileo AI, Microsoft Designer, Sora, Veo, Runway, Kling AI, Luma Dream Machine, Pika, Hailuo AI, PixVerse, Vidu, CapCut, Descript, Premiere Pro, DaVinci Resolve, VEED, InVideo AI, Filmora, OpusClip, Wisecut, Kapwing, HeyGen, Synthesia, D-ID, Colossyan, Tavus, Elai.io, Hour One, DeepBrain AI, Vidnoz, ElevenLabs, Murf, PlayHT, Speechify, WellSaid Labs, LOVO, Resemble AI, Listnr, Typecast, NaturalReader, Suno, Udio, AIVA, Soundraw, Beatoven.ai, Loudly, Mubert, Boomy, Soundful, Adobe Podcast, Auphonic, Krisp, Cleanvoice AI, Podcastle, LANDR, iZotope RX, Audo Studio, LALAL.AI, Otter.ai, Fireflies.ai, Fathom, tl;dv, Avoma, Read AI, Grain, Supernormal, Notta, Sonix, Gamma, Beautiful.ai, Tome, Plus AI, SlidesAI, Pitch, Prezi AI, Decktopus, Presentations.AI, Khanmigo, Quizlet, Photomath, Socratic, Wolfram Alpha, StudyFetch, MagicSchool, SchoolAI, Gauth, Elicit, Scite, ResearchRabbit, Connected Papers, Semantic Scholar, Litmaps, Iris.ai, Inciteful, ResearchKick, NotebookLM, Adobe Acrobat AI, ChatPDF, AskYourPDF, Humata, Smallpdf AI, UPDF AI, PDFgear, Documind, LightPDF, DeepL, Google Translate, Microsoft Translator, Reverso, Papago, Lingvanex, Wordvice AI, Mate Translate, PROMT, GitHub Copilot, Cursor, Windsurf, Claude Code, Gemini Code Assist, Amazon Q Developer, Replit Agent, Tabnine, Codeium, JetBrains AI Assistant, Lovable, Bolt.new, v0, Replit, Firebase Studio, Wix AI, Hostinger AI Website Builder, 10Web, Durable, SonarQube, Snyk, Codacy, Qodo, Amazon CodeGuru, DeepSource, Semgrep, Sentry, Datadog, New Relic, Julius AI, Rows AI, Ajelix, Formula Bot, Numerous.ai, DataLab, Hex, Obviously AI, Polymer, Power BI Copilot, Tableau Pulse, ThoughtSpot, Looker, Qlik, Domo, Sisense, Metabase, Databricks, Snowflake Cortex, Notion AI, Mem, Evernote, Reflect, Heptabase, Tana, Capacities, Anytype, Obsidian, Readwise, ClickUp AI, Asana AI, monday AI, Atlassian Intelligence, Linear, Motion, Reclaim AI, Sunsama, Akiflow, Height, Zapier AI, Make, n8n, Bardeen, Relay.app, Gumloop, Lindy, Relevance AI, Pipedream, Activepieces, OpenAI Agents SDK, LangChain, LangGraph, CrewAI, AutoGen, LlamaIndex, Dify, Flowise, Botpress, Voiceflow, Intercom Fin, Zendesk AI, Ada, Forethought, Gorgias AI, Freshworks Freddy AI, Tidio Lyro, Crisp, Chatbase, Botsonic, Salesforce Einstein, HubSpot AI, Gong, Clari, Apollo AI, Clay, Lavender, Regie.ai, 11x, Outreach, Surfer, Semrush, Ahrefs, Frase, MarketMuse, Clearscope, NeuronWriter, Outranking, Alli AI, Buffer AI, Hootsuite OwlyWriter, Predis.ai, Ocoya, FeedHive, Publer, Vista Social, Flick, Taplio, Typefully, Superhuman, Shortwave, SaneBox, Mailbutler, Missive, Compose AI, Flowrite, Merlin, LinkedIn Recruiter, HireVue, Eightfold AI, Paradox, Greenhouse, Workable, SeekOut, Textio, Leena AI, Rippling, Intuit Assist, QuickBooks AI, Xero, Datarails, Vic.ai, Ramp Intelligence, Brex, Docyt, Numeric, Harvey, CoCounsel, Lexis+ AI, Westlaw Precision AI, Clio Duo, Ironclad AI, Luminance, Spellbook, Robin AI, LegalOn, Dragon Copilot, Abridge, Ambience Healthcare, Nabla Copilot, Glass Health, AlphaFold, AlphaGenome, RoseTTAFold, ChemCrow, IBM RXN, Molecule.one, Chematica, DeepChem, PubChem, Wolfram Language, Meshy, Tripo AI, Luma Genie, Kaedim, Spline AI, Scenario, Rodin, Masterpiece X, CSM, Polycam, Planner 5D AI, Homestyler, ReimagineHome, Interior AI, RoomGPT, Architechtures, Finch3D, Hypar, TestFit, Autodesk Forma, HeyGen Translation, ElevenLabs Dubbing, Rask AI, Papercup, Dubverse, Deepdub, Veed Translate, Maestra, Captions, Kapwing Translate, Submagic, VEED Subtitles, Kapwing Subtitles, Descript Captions, Zubtitle, Happy Scribe, remove.bg, Pixelcut, Erase.bg, Cutout.Pro, Slazzer, BgSub, insMind, Miro AI, FigJam AI, Lucidchart, Whimsical, Creately, Eraser, Mermaid, Draw.io, tldraw, Napkin AI, Glean, Guru, Slite, Document360, Bloomfire, Tettra, Confluence, PromptBase, FlowGPT, AIPRM, PromptHero, Snack Prompt, Learn Prompting, OpenAI Prompting Guide, Anthropic Prompt Engineering, Google Prompting Guide, Microsoft Prompt Engineering, OpenAI API, Anthropic API, Google AI Studio, Google Vertex AI, Hugging Face, Together AI, GroqCloud, Replicate, Fireworks AI, Cohere, GPTZero, Originality.ai, Copyleaks, Turnitin, Winston AI, ZeroGPT, Quetext, Hive Moderation, Reality Defender, Content Credentials`;

const names = raw.split(',').map(s => s.trim().replace(/\.$/, '')).filter(Boolean);

// Helper to make clean slug ID
function makeSlug(name) {
  return name.toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/\.ai/g, '_ai')
    .replace(/\.com/g, '_com')
    .replace(/\.new/g, '_new')
    .replace(/\.pictures/g, '_pictures')
    .replace(/\.app/g, '_app')
    .replace(/\.bg/g, '_bg')
    .replace(/\.one/g, '_one')
    .replace(/\.io/g, '_io')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Categorization database rules & metadata lookup
const TOOL_METADATA = {
  'ChatGPT': {
    cat: 'LLMs & Conversational AI',
    badge: 'OpenAI Flagship Chatbot',
    tagline: 'World-leading conversational AI powered by GPT-4o, o1, and o3 reasoning models with web search, voice, and vision.',
    web: 'https://chatgpt.com',
    price: 'Freemium',
    actions: ['Generate Deep Analysis', 'Draft Executive Proposal', 'Code Review & Refactor', 'Multi-Modal Vision Q&A'],
    prompt: 'Explain the mathematical intuition behind multi-head latent attention in modern transformer architectures.',
    accent: 'text-emerald-400',
    grad: 'from-emerald-600 to-teal-700',
    tags: ['openai', 'gpt4o', 'reasoning', 'chat', 'multimodal']
  },
  'Claude': {
    cat: 'LLMs & Conversational AI',
    badge: 'Anthropic Constitutional AI',
    tagline: 'Industry benchmark for nuance, deep reasoning, long-context analysis (200k tokens), and artifact rendering.',
    web: 'https://claude.ai',
    price: 'Freemium',
    actions: ['Extended Thinking Mode', 'Live Artifact Rendering', 'Document Synthesis', 'Clean Code Synthesis'],
    prompt: 'Analyze this distributed consensus algorithm and outline edge cases during network partition.',
    accent: 'text-amber-400',
    grad: 'from-amber-600 to-orange-700',
    tags: ['anthropic', 'sonnet', 'opus', 'artifacts', 'thinking']
  },
  'Gemini': {
    cat: 'LLMs & Conversational AI',
    badge: 'Google DeepMind Native Multimodal',
    tagline: 'Google foundation model with 2M token context window, live video, audio ingestion, and Google Workspace grounding.',
    web: 'https://gemini.google.com',
    price: 'Freemium',
    actions: ['2M Context Deep Query', 'Workspace Integration', 'Multimodal Video Reasoning', 'Grounding via Google Search'],
    prompt: 'Cross-reference this 50-page financial filing with Google search data to project Q3 market share shifts.',
    accent: 'text-blue-400',
    grad: 'from-blue-600 to-indigo-700',
    tags: ['google', 'deepmind', 'flash', 'pro', 'multimodal', 'search']
  },
  'Copilot': {
    cat: 'LLMs & Conversational AI',
    badge: 'Microsoft 365 Copilot',
    tagline: 'Enterprise AI assistant deeply woven across Windows, Edge, Excel, PowerPoint, Word, and Microsoft Teams.',
    web: 'https://copilot.microsoft.com',
    price: 'Freemium',
    actions: ['Excel Pivot Generation', 'PowerPoint Deck Creator', 'Enterprise Search', 'Email Catchup Summary'],
    prompt: 'Summarize today\'s high-priority emails and prepare a bulleted briefing for the morning standup.',
    accent: 'text-sky-400',
    grad: 'from-sky-600 to-blue-700',
    tags: ['microsoft', 'office', 'windows', 'excel', 'enterprise']
  },
  'Grok': {
    cat: 'LLMs & Conversational AI',
    badge: 'xAI Real-Time Superintelligence',
    tagline: 'Uncensored, witty, and deeply grounded real-time reasoning model trained on the Colossus 100k H100 GPU cluster.',
    web: 'https://x.ai',
    price: 'Paid',
    actions: ['Live X Telemetry Query', 'Deep Mathematical Proof', 'Think Mode Reasoning', 'Image Generation via Aurora'],
    prompt: 'Break down the latest breaking aerospace telemetry events with physics simulations and trajectory vectors.',
    accent: 'text-orange-400',
    grad: 'from-orange-600 to-red-700',
    tags: ['xai', 'elon', 'colossus', 'grok3', 'realtime']
  },
  'Perplexity': {
    cat: 'AI Search & Web Engines',
    badge: 'Answer Engine with Live Citations',
    tagline: 'Reinventing search with direct, synthesized answers backed by clickable academic, financial, and web citations.',
    web: 'https://perplexity.ai',
    price: 'Freemium',
    actions: ['Pro Multi-Step Search', 'Focus on Academic Papers', 'Search Financial Filings', 'Generate Source Dossier'],
    prompt: 'What are the key technical differences between monolithic transformers and mixture-of-experts (MoE)? Provide peer-reviewed citations.',
    accent: 'text-teal-400',
    grad: 'from-teal-600 to-emerald-700',
    tags: ['search', 'citations', 'research', 'sources', 'web']
  },
  'DeepSeek': {
    cat: 'LLMs & Conversational AI',
    badge: 'Open-Weights Efficiency Leader',
    tagline: 'Revolutionary open-weights reasoning model (DeepSeek-R1 / V3) utilizing Multi-Head Latent Attention and DeepSeekMoE.',
    web: 'https://deepseek.com',
    price: 'Freemium',
    actions: ['Run DeepSeek-R1 Reasoning', 'Synthesize Algorithmic Code', 'Verify Math Logic', 'Export CoT Trace'],
    prompt: 'Prove whether the set of all polynomial functions with rational coefficients is countable or uncountable.',
    accent: 'text-blue-400',
    grad: 'from-blue-600 to-cyan-700',
    tags: ['deepseek', 'r1', 'moe', 'openweights', 'math']
  },
  'Qwen': {
    cat: 'LLMs & Conversational AI',
    badge: 'Alibaba Cloud Flagship LLM',
    tagline: 'Top-tier open and commercial multilingual LLM family (Qwen 2.5) with premier coding, math, and vision performance.',
    web: 'https://chat.qwenlm.ai',
    price: 'Freemium',
    actions: ['Multilingual Translation', 'Run Qwen2.5-Coder', 'Visual OCR Extraction', 'Complex Reasoning Trace'],
    prompt: 'Write an optimized CUDA kernel for FlashAttention-2 with warp-level tile matrix multiplications.',
    accent: 'text-purple-400',
    grad: 'from-purple-600 to-indigo-700',
    tags: ['alibaba', 'qwen2.5', 'coder', 'chinese', 'multilingual']
  }
};

// Generates fallback metadata based on name and keyword analysis
function inferMetadata(name) {
  const n = name.toLowerCase();

  // 1. LLMs & Chat
  if (['le chat', 'poe', 'you.com'].includes(n)) {
    return {
      cat: 'LLMs & Conversational AI',
      badge: 'Conversational LLM Platform',
      tagline: `${name} provides fast multi-model chat access, bot creation, and multimodal assistants.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Chat with Multiple Models', 'Create Custom Bot Persona', 'Compare LLM Answers', 'Export Transcript'],
      prompt: `Hello ${name}, summarize the key breakthroughs in quantum computing over the past 2 years.`,
      accent: 'text-indigo-400',
      grad: 'from-indigo-600 to-purple-700',
      tags: ['llm', 'chat', 'conversational', 'ai']
    };
  }

  // 2. AI Search & Web Engines
  if (['phind', 'komo ai', 'brave search', 'exa', 'tavily', 'andi', 'kagi', 'arc search', 'consensus'].includes(n)) {
    return {
      cat: 'AI Search & Web Engines',
      badge: 'Neural Search & Knowledge',
      tagline: `${name} delivers intelligent semantic search, clean citations, and autonomous web data extraction.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Live Web Extraction', 'Verified Citation Synthesis', 'Filter Academic / Tech Domains', 'Deep Research Brief'],
      prompt: `Search across latest benchmarks comparing next-gen inference chips and return key data tables.`,
      accent: 'text-teal-400',
      grad: 'from-teal-600 to-cyan-700',
      tags: ['search', 'web', 'citations', 'neural', 'realtime']
    };
  }

  // 3. Writing & Grammar
  if (['grammarly', 'quillbot', 'wordtune', 'prowritingaid', 'languagetool', 'hemingway editor', 'writer', 'sudowrite', 'rytr', 'jenni ai', 'wordvice ai'].includes(n)) {
    return {
      cat: 'Writing & Grammar Assistants',
      badge: 'Executive Prose & Style Editor',
      tagline: `${name} improves sentence clarity, fixes grammatical subtleties, adjusts tone, and enhances readability.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Clarity & Style Rewrite', 'Grammar & Mechanics Scan', 'Tone Adjustment (Executive)', 'Plagiarism & Citation Check'],
      prompt: `Refactor this technical abstract to eliminate passive voice, reduce jargon, and maximize executive clarity.`,
      accent: 'text-emerald-400',
      grad: 'from-emerald-600 to-green-700',
      tags: ['writing', 'grammar', 'editing', 'paraphrase', 'clarity']
    };
  }

  // 4. Copywriting & Content Marketing
  if (['jasper', 'copy.ai', 'writesonic', 'anyword', 'hypotenuse ai', 'simplified', 'scalenut', 'peppertype', 'neuroflash', 'narrato'].includes(n)) {
    return {
      cat: 'Copywriting & Content Marketing',
      badge: 'High-Converting Copy Engine',
      tagline: `${name} generates SEO blog posts, high-converting ad copy, landing page headlines, and brand voice campaigns.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate High-CTR Ad Copy', 'Draft 2,000-Word SEO Article', 'Brand Voice Harmonization', 'Multi-Channel Social Kit'],
      prompt: `Create a comprehensive product launch campaign including 5 LinkedIn hooks, 3 Google Ads, and a landing page hero.`,
      accent: 'text-pink-400',
      grad: 'from-pink-600 to-rose-700',
      tags: ['copywriting', 'marketing', 'seo', 'content', 'growth']
    };
  }

  // 5. Image Gen & Enhancement
  if (['midjourney', 'adobe firefly', 'ideogram', 'leonardo ai', 'flux', 'stable diffusion', 'google imagen', 'recraft', 'krea', 'playground', 'topaz photo ai', 'remini', 'magnific', "let's enhance", 'clipdrop'].includes(n)) {
    return {
      cat: 'Image Generation & Enhancement',
      badge: 'Photorealistic Visual Synthesis',
      tagline: `${name} renders breathtaking high-fidelity visuals, 8K upscales, precise graphic typography, and vector SVG art.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate 4K Photoreal Image', 'Ultra-Resolution 8K Upscale', 'Inpaint & Generative Fill', 'Vector SVG Export'],
      prompt: `Cinematic 85mm portrait of an astronaut on a neon cyberpunk metropolis terrace, volumetric lighting, photorealistic textures --ar 16:9`,
      accent: 'text-purple-400',
      grad: 'from-purple-600 to-pink-700',
      tags: ['image', 'art', 'photorealism', 'upscaling', 'generation']
    };
  }

  // 6. Photo Editing & Background Removal
  if (['cleanup.pictures', 'photoroom', 'pixlr', 'fotor', 'picsart', 'remove.bg', 'pixelcut', 'erase.bg', 'cutout.pro', 'slazzer', 'bgsub', 'insmind'].includes(n)) {
    return {
      cat: 'Photo Editing & Background Removal',
      badge: 'Automated Image Clean & Cutout',
      tagline: `${name} performs instant pixel-perfect background removals, object erasures, product shadow generation, and batch editing.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Instant Transparent Cutout', 'Erase Unwanted Objects', 'Add Studio Studio Shadows', 'Batch Export PNGs'],
      prompt: `Isolate product foreground, remove background clutter, and place on clean studio shadow backdrop.`,
      accent: 'text-amber-400',
      grad: 'from-amber-600 to-orange-700',
      tags: ['editing', 'background-removal', 'ecommerce', 'cleanup', 'photo']
    };
  }

  // 7. Design & UI/UX
  if (['canva', 'adobe express', 'figma', 'framer', 'looka', 'brandmark', 'uizard', 'visily', 'galileo ai', 'microsoft designer'].includes(n)) {
    return {
      cat: 'Design & UI/UX Systems',
      badge: 'AI UI/UX & Brand Identity Studio',
      tagline: `${name} creates vector interfaces, design system components, animated landing pages, and cohesive brand identities.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Responsive UI Mockup', 'Export Production React/Tailwind', 'Create Cohesive Brand Kit', 'Animate Interactive Prototype'],
      prompt: `Design a sleek dark-mode crypto portfolio dashboard featuring analytics charts, card balance, and quick trade drawer.`,
      accent: 'text-cyan-400',
      grad: 'from-cyan-600 to-blue-700',
      tags: ['design', 'ui', 'ux', 'figma', 'brand', 'vector']
    };
  }

  // 8. Diagramming & Visual Thinking
  if (['miro ai', 'figjam ai', 'lucidchart', 'whimsical', 'creately', 'eraser', 'mermaid', 'draw.io', 'tldraw', 'napkin ai'].includes(n)) {
    return {
      cat: 'Diagramming & Visual Thinking',
      badge: 'Architecture & Mindmap Engine',
      tagline: `${name} transforms text, code, and system specs into interactive architecture diagrams, flowcharts, and mindmaps.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Architecture Flowchart', 'Convert Text to Mindmap', 'Export Clean SVG / Mermaid', 'Facilitate Collaborative Whiteboard'],
      prompt: `Generate a cloud-native microservices architecture diagram with Kubernetes cluster, Kafka queues, and Redis caching.`,
      accent: 'text-blue-400',
      grad: 'from-blue-600 to-indigo-700',
      tags: ['diagram', 'flowchart', 'architecture', 'mindmap', 'whiteboard']
    };
  }

  // 9. Video Gen & Neural Avatars
  if (['sora', 'veo', 'runway', 'kling ai', 'luma dream machine', 'pika', 'hailuo ai', 'pixverse', 'vidu', 'heygen', 'synthesia', 'd-id', 'colossyan', 'tavus', 'elai.io', 'hour one', 'deepbrain ai', 'vidnoz'].includes(n)) {
    return {
      cat: 'Video Generation & Neural Avatars',
      badge: 'Photorealistic AI Video Studio',
      tagline: `${name} synthesizes cinematic 4K video clips, lifelike talking digital avatars, and consistent character animations.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Generate 4K Cinematic Scene', 'Create Talking Presenter Avatar', 'Text-to-Video Camera Sweep', 'Lip-Sync to Audio'],
      prompt: `Drone fly-through shot entering a glass architectural villa overlooking misty mountain pine forests at golden hour.`,
      accent: 'text-rose-400',
      grad: 'from-rose-600 to-red-700',
      tags: ['video', 'avatars', 'cinematic', 'camera', 'sora', 'veo']
    };
  }

  // 10. Video Editing & Repurposing
  if (['capcut', 'descript', 'premiere pro', 'davinci resolve', 'veed', 'invideo ai', 'filmora', 'opusclip', 'wisecut', 'kapwing'].includes(n)) {
    return {
      cat: 'Video Editing & Repurposing',
      badge: 'Timeline Editing & Viral Repurposing',
      tagline: `${name} powers timeline video editing, multi-track audio mastering, color grading, and automatic viral clip extraction.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Extract Viral Shorts from Long Video', 'Auto-Cut Silence & Fillers', 'Lumetri Color Grading Matrix', 'Export Multi-Format 9:16 / 16:9'],
      prompt: `Process 1-hour podcast recording, extract 5 high-hook 60s clips, add animated captions, and color grade.`,
      accent: 'text-indigo-400',
      grad: 'from-indigo-600 to-purple-700',
      tags: ['video-editing', 'timeline', 'color-grading', 'opusclip', 'repurposing']
    };
  }

  // 11. Auto-Captions & Subtitles
  if (['captions', 'kapwing translate', 'submagic', 'veed subtitles', 'kapwing subtitles', 'descript captions', 'zubtitle', 'happy scribe'].includes(n)) {
    return {
      cat: 'Auto-Captions & Subtitles',
      badge: 'Kinetic Subtitles & Translation',
      tagline: `${name} creates viral animated TikTok/Reels captions, dynamic word highlights, and multi-language subtitle tracks.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Kinetic Word Highlights', 'Export SRT / VTT Subtitle Files', 'Translate Subtitles to 40+ Languages', 'Auto-Align Audio & Video'],
      prompt: `Transcribe vertical video, apply bold yellow animated subtitles with pop-in transitions and emojis.`,
      accent: 'text-yellow-400',
      grad: 'from-yellow-600 to-amber-700',
      tags: ['captions', 'subtitles', 'submagic', 'transcription', 'shorts']
    };
  }

  // 12. Voice Cloning, TTS & Dubbing
  if (['elevenlabs', 'murf', 'playht', 'speechify', 'wellsaid labs', 'lovo', 'resemble ai', 'listnr', 'typecast', 'naturalreader', 'heygen translation', 'elevenlabs dubbing', 'rask ai', 'papercup', 'dubverse', 'deepdub', 'veed translate', 'maestra'].includes(n)) {
    return {
      cat: 'Voice Cloning, TTS & Dubbing',
      badge: 'Human-Parity Neural Voice Studio',
      tagline: `${name} produces ultra-realistic voice cloning, emotionally expressive narration, and AI video lip-sync dubbing.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Clone Voice from 30s Audio', 'Synthesize Expressive TTS', 'Auto-Dub Video to 50+ Languages', 'Adjust Pitch, Cadence & Warmth'],
      prompt: `Synthesize this documentary narration with a deep, authoritative tone, gentle pacing, and subtle pauses.`,
      accent: 'text-violet-400',
      grad: 'from-violet-600 to-purple-700',
      tags: ['voice', 'tts', 'dubbing', 'cloning', 'elevenlabs', 'speech']
    };
  }

  // 13. Audio Cleanup & Podcasting
  if (['adobe podcast', 'auphonic', 'krisp', 'cleanvoice ai', 'podcastle', 'landr', 'izotope rx', 'audo studio', 'lalal.ai'].includes(n)) {
    return {
      cat: 'Audio Cleanup & Podcasting',
      badge: 'Studio-Grade Noise Removal & Mastering',
      tagline: `${name} isolates stems, removes background noise and room echo, balances loudness, and masters audio to broadcast standards.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Enhance Voice / Eliminate Echo', 'Split Vocal & Instrumental Stems', 'Broadcast Loudness Mastering (LUFS)', 'Remove Mouth Clicks & Stutters'],
      prompt: `Clean noisy laptop microphone recording, remove AC hum, and apply broadcast studio compression.`,
      accent: 'text-sky-400',
      grad: 'from-sky-600 to-teal-700',
      tags: ['audio', 'podcast', 'noise-reduction', 'mastering', 'stems']
    };
  }

  // 14. AI Music Generation
  if (['suno', 'udio', 'aiva', 'soundraw', 'beatoven.ai', 'loudly', 'mubert', 'boomy', 'soundful'].includes(n)) {
    return {
      cat: 'AI Music Generation',
      badge: 'Full-Song Composition & Instrumentals',
      tagline: `${name} generates complete studio-mastered songs with layered instrumentation, vocals, lyrics, and stems.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Compose Full Song with Vocals', 'Generate Royalty-Free BGM', 'Export Multi-Track MIDI & Audio Stems', 'Loop for Video Backgrounds'],
      prompt: `Create an upbeat cinematic synthwave track at 120 BPM with nostalgic 80s analog synthesizers and driving bassline.`,
      accent: 'text-pink-400',
      grad: 'from-pink-600 to-rose-700',
      tags: ['music', 'song', 'synth', 'soundtrack', 'suno', 'udio']
    };
  }

  // 15. Meeting Assistants & Transcription
  if (['otter.ai', 'fireflies.ai', 'fathom', 'tl;dv', 'avoma', 'read ai', 'grain', 'supernormal', 'notta', 'sonix'].includes(n)) {
    return {
      cat: 'Meeting Assistants & Transcription',
      badge: 'Live Transcription & Action Summaries',
      tagline: `${name} records Zoom/Teams/Meet sessions, extracts speaker action items, timestamps decisions, and syncs to CRM.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Auto-Join & Record Call', 'Generate Action Items Checklist', 'Timestamp Key Decisions & Objections', 'Push Summary to Slack / Notion'],
      prompt: `Summarize 45-minute sprint planning call, extract Jira ticket tasks with assignees, and flag technical blockers.`,
      accent: 'text-indigo-400',
      grad: 'from-indigo-600 to-blue-700',
      tags: ['meetings', 'transcription', 'notes', 'zoom', 'teams']
    };
  }

  // 16. Presentations & Slide Decks
  if (['gamma', 'beautiful.ai', 'tome', 'plus ai', 'slidesai', 'pitch', 'prezi ai', 'decktopus', 'presentations.ai'].includes(n)) {
    return {
      cat: 'Presentations & Slide Decks',
      badge: 'Generative Pitch Decks & Slide Design',
      tagline: `${name} formats prompts, outlines, or docs into designer-grade pitch decks, interactive presentations, and web docs.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Prompt-to-10-Slide Pitch Deck', 'Smart Layout Redesign', 'Generate Supporting Infographics', 'Export to PDF / PowerPoint PPTX'],
      prompt: `Create a 10-slide Series A investor pitch deck for an autonomous developer tooling platform.`,
      accent: 'text-amber-400',
      grad: 'from-amber-600 to-orange-700',
      tags: ['presentation', 'slides', 'deck', 'pitch', 'gamma']
    };
  }

  // 17. Education & Math
  if (['khanmigo', 'quizlet', 'photomath', 'socratic', 'wolfram alpha', 'studyfetch', 'magicschool', 'schoolai', 'gauth'].includes(n)) {
    return {
      cat: 'Education & Math Problem Solving',
      badge: 'Socratic Tutor & Math Engine',
      tagline: `${name} explains tough homework concepts, solves algebraic equations step-by-step, and tailors lesson plans.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Step-by-Step Problem Solving', 'Generate Adaptive Practice Quiz', 'Socratic Active Recall Mode', 'Lesson Plan Synthesis'],
      prompt: `Explain how to solve differential equations using Laplace transforms with step-by-step breakdown.`,
      accent: 'text-emerald-400',
      grad: 'from-emerald-600 to-teal-700',
      tags: ['education', 'math', 'homework', 'tutoring', 'quiz']
    };
  }

  // 18. Academic Research & Citations
  if (['elicit', 'scite', 'researchrabbit', 'connected papers', 'semantic scholar', 'litmaps', 'iris.ai', 'inciteful', 'researchkick'].includes(n)) {
    return {
      cat: 'Academic Research & Citations',
      badge: 'Scientific Literature & Citation Graphs',
      tagline: `${name} surfaces peer-reviewed research papers, visualizes citation networks, and extracts experimental methodologies.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Synthesize Literature Review', 'Generate 2D Citation Network', 'Verify Supporting vs Refuting Claims', 'Export BibTeX / Zotero'],
      prompt: `Find all randomized controlled trials testing GLP-1 receptor agonists on neurodegenerative markers.`,
      accent: 'text-purple-400',
      grad: 'from-purple-600 to-indigo-700',
      tags: ['research', 'academic', 'papers', 'citations', 'science']
    };
  }

  // 19. Science, Biology & Chemistry
  if (['alphafold', 'alphagenome', 'rosettafold', 'chemcrow', 'ibm rxn', 'molecule.one', 'chematica', 'deepchem', 'pubchem', 'wolfram language'].includes(n)) {
    return {
      cat: 'Science, Biology & Chemistry',
      badge: 'Computational Biochemistry & Synthesis',
      tagline: `${name} models 3D protein structures, predicts retrosynthetic chemical reaction routes, and analyzes molecular datasets.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Open Source',
      actions: ['Predict 3D Protein Folding', 'Calculate Retrosynthesis Route', 'Simulate Molecular Binding Affinity', 'Query Chemical Knowledge Base'],
      prompt: `Predict binding conformation and amino acid residue contacts between ligand and target kinase domain.`,
      accent: 'text-teal-400',
      grad: 'from-teal-600 to-cyan-700',
      tags: ['science', 'biology', 'chemistry', 'proteins', 'alphafold', 'molecules']
    };
  }

  // 20. Document & PDF AI
  if (['notebooklm', 'adobe acrobat ai', 'chatpdf', 'askyourpdf', 'humata', 'smallpdf ai', 'updf ai', 'pdfgear', 'documind', 'lightpdf'].includes(n)) {
    return {
      cat: 'Document & PDF AI',
      badge: 'Multi-Document Ingestion & Synthesis',
      tagline: `${name} queries complex PDFs, financial disclosures, and contracts with page citations and audio summaries.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Chat with 500-Page Document', 'Generate Audio Deep-Dive Discussion', 'Extract Tables to Clean CSV', 'Compare Two Contract Revisions'],
      prompt: `Analyze uploaded lease agreement and identify indemnification clauses, termination notice periods, and liability caps.`,
      accent: 'text-violet-400',
      grad: 'from-violet-600 to-indigo-700',
      tags: ['pdf', 'document', 'notebooklm', 'contracts', 'rag']
    };
  }

  // 21. Translation & Localization
  if (['deepl', 'google translate', 'microsoft translator', 'reverso', 'papago', 'lingvanex', 'mate translate', 'promt'].includes(n)) {
    return {
      cat: 'Translation & Localization',
      badge: 'Neural Machine Translation',
      tagline: `${name} provides culturally accurate document translation, idiom preservation, and real-time multilingual localization.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Translate Full Document preserving formatting', 'Formal vs Informal Tone Switching', 'Dictionary & Context Conjugation', 'Real-Time Voice Translate'],
      prompt: `Translate this technical legal disclaimer into German, French, and Japanese maintaining statutory precision.`,
      accent: 'text-blue-400',
      grad: 'from-blue-600 to-sky-700',
      tags: ['translation', 'languages', 'deepl', 'localization', 'multilingual']
    };
  }

  // 22. Coding, IDEs & Software Engineering
  if (['github copilot', 'cursor', 'windsurf', 'claude code', 'gemini code assist', 'amazon q developer', 'tabnine', 'codeium', 'jetbrains ai assistant'].includes(n)) {
    return {
      cat: 'Coding, IDEs & Pair Programmers',
      badge: 'AI Pair Programmer & Codebase Agent',
      tagline: `${name} indexes entire repositories, generates multi-file refactors, writes test suites, and automates terminal tasks.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Full Repository Indexing & Query', 'Multi-File Autonomous Refactor', 'Generate Unit & Integration Tests', 'Terminal Command Execution'],
      prompt: `Trace this React render loop, locate stale state dependencies, and optimize with useMemo and callback stabilization.`,
      accent: 'text-indigo-400',
      grad: 'from-indigo-600 to-purple-700',
      tags: ['coding', 'ide', 'developer', 'copilot', 'cursor', 'github']
    };
  }

  // 23. Autonomous Agents & Software Dev
  if (['replit agent', 'lovable', 'bolt.new', 'v0', 'replit', 'firebase studio', 'wix ai', 'hostinger ai website builder', '10web', 'durable'].includes(n)) {
    return {
      cat: 'No-Code & App Builders',
      badge: 'Autonomous Full-Stack App Synthesizer',
      tagline: `${name} builds full-stack web applications, landing pages, databases, and APIs from natural language prompts.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Full Web Application', 'Deploy Live Cloud Container', 'Create Database Schema & Auth', 'Live In-Browser Code Preview'],
      prompt: `Build a modern real-estate listing directory with interactive map markers, search filters, and booking inquiry form.`,
      accent: 'text-pink-400',
      grad: 'from-pink-600 to-rose-700',
      tags: ['builder', 'web', 'nocode', 'lovable', 'v0', 'bolt']
    };
  }

  // 24. Code Quality, Security & DevOps
  if (['sonarqube', 'snyk', 'codacy', 'qodo', 'amazon codeguru', 'deepsource', 'semgrep', 'sentry', 'datadog', 'new relic'].includes(n)) {
    return {
      cat: 'Code Quality, Security & DevOps',
      badge: 'Static Analysis & Observability AI',
      tagline: `${name} monitors telemetry, detects CVE vulnerabilities, pinpoints performance bottlenecks, and enforces clean code standards.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Enterprise',
      actions: ['Scan Codebase for Vulnerabilities', 'Root-Cause Crash Investigation', 'Performance Bottleneck Profiling', 'CI/CD Automated Gate Check'],
      prompt: `Analyze repository pull request for SQL injection risks, exposed secrets, and unhandled memory leaks.`,
      accent: 'text-red-400',
      grad: 'from-red-600 to-rose-700',
      tags: ['security', 'devops', 'observability', 'sentry', 'datadog', 'snyk']
    };
  }

  // 25. Data Analysis & BI
  if (['julius ai', 'rows ai', 'ajelix', 'formula bot', 'numerous.ai', 'datalab', 'hex', 'obviously ai', 'polymer', 'power bi copilot', 'tableau pulse', 'thoughtspot', 'looker', 'qlik', 'domo', 'sisense', 'metabase', 'databricks', 'snowflake cortex'].includes(n)) {
    return {
      cat: 'Data Analysis, BI & Spreadsheets',
      badge: 'Autonomous Data Science & SQL Engine',
      tagline: `${name} cleans CSVs, writes complex Excel formulas, executes Python data science models, and builds interactive BI dashboards.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Execute Python / Pandas Analysis', 'Generate SQL Query from Question', 'Render Interactive Visual Charts', 'Forecast Trends & Anomalies'],
      prompt: `Upload customer churn dataset, train a random forest model to predict high-risk accounts, and plot feature importance.`,
      accent: 'text-cyan-400',
      grad: 'from-cyan-600 to-teal-700',
      tags: ['data', 'analytics', 'sql', 'excel', 'bi', 'snowflake', 'databricks']
    };
  }

  // 26. Notes, Knowledge & Productivity
  if (['notion ai', 'mem', 'evernote', 'reflect', 'heptabase', 'tana', 'capacities', 'anytype', 'obsidian', 'readwise', 'glean', 'guru', 'slite', 'document360', 'bloomfire', 'tettra', 'confluence'].includes(n)) {
    return {
      cat: 'Knowledge Bases & Second Brains',
      badge: 'Connected Workspace & Knowledge Graph',
      tagline: `${name} organizes personal notes, bidirectional links, enterprise documentation, and team wikis with instant semantic search.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Semantic Enterprise Search', 'Synthesize Project Wiki Doc', 'Bidirectional Knowledge Linking', 'Generate Meeting Followups'],
      prompt: `Search all internal engineering docs and write an onboarding summary on our container deployment process.`,
      accent: 'text-slate-300',
      grad: 'from-slate-700 to-slate-900',
      tags: ['notes', 'knowledge', 'wiki', 'notion', 'obsidian', 'confluence']
    };
  }

  // 27. Project & Task Management
  if (['clickup ai', 'asana ai', 'monday ai', 'atlassian intelligence', 'linear', 'motion', 'reclaim ai', 'sunsama', 'akiflow', 'height'].includes(n)) {
    return {
      cat: 'Project & Task Management',
      badge: 'Smart Calendar & Task Orchestration',
      tagline: `${name} schedules tasks, predicts project deadlines, allocates resources, and keeps developer backlogs prioritized.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Auto-Schedule Tasks into Calendar', 'Break Epic into User Stories', 'Estimate Sprint Velocity', 'Daily Focus Agenda Builder'],
      prompt: `Optimize my calendar for 4 hours of uninterrupted deep-work coding while scheduling client review meetings.`,
      accent: 'text-blue-400',
      grad: 'from-blue-600 to-indigo-700',
      tags: ['project-management', 'tasks', 'calendar', 'linear', 'asana', 'clickup']
    };
  }

  // 28. Automation & Agents
  if (['zapier ai', 'make', 'n8n', 'bardeen', 'relay.app', 'gumloop', 'lindy', 'relevance ai', 'pipedream', 'activepieces', 'openai agents sdk', 'langchain', 'langgraph', 'crewai', 'autogen', 'llamaindex', 'dify', 'flowise', 'botpress', 'voiceflow'].includes(n)) {
    return {
      cat: 'Automation, Agents & Workflows',
      badge: 'Autonomous Multi-Step AI Agent Stack',
      tagline: `${name} orchestrates multi-agent systems, connects 6,000+ APIs, automates repetitive human tasks, and deploys bots.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Deploy Autonomous Multi-Agent Team', 'Build Visual Workflow Pipeline', 'Connect APIs with Custom Logic', 'Monitor Execution Telemetry'],
      prompt: `Build an automated pipeline that monitors inbound customer emails, enriches sender data via CRM, and drafts replies.`,
      accent: 'text-orange-400',
      grad: 'from-orange-600 to-red-700',
      tags: ['automation', 'agents', 'workflow', 'langchain', 'zapier', 'n8n']
    };
  }

  // 29. Customer Support & Chatbots
  if (['intercom fin', 'zendesk ai', 'ada', 'forethought', 'gorgias ai', 'freshworks freddy ai', 'tidio lyro', 'crisp', 'chatbase', 'botsonic'].includes(n)) {
    return {
      cat: 'Customer Support & Chatbots',
      badge: 'Autonomous Tier-1 Resolution Bot',
      tagline: `${name} resolves customer support tickets 24/7, handles refunds and order status, and escalates complex inquiries to humans.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Instant Support Resolution (80%+)', 'Sync with Help Center Docs', 'Order Tracking & Refund Actions', 'Human Agent Co-Pilot Drafter'],
      prompt: `Customer asks for partial refund on delayed shipment. Check policy, verify tracking number, and draft polite response.`,
      accent: 'text-emerald-400',
      grad: 'from-emerald-600 to-teal-700',
      tags: ['support', 'customer-service', 'chatbots', 'intercom', 'zendesk']
    };
  }

  // 30. Sales, CRM & Outbound AI
  if (['salesforce einstein', 'hubspot ai', 'gong', 'clari', 'apollo ai', 'clay', 'lavender', 'regie.ai', '11x', 'outreach'].includes(n)) {
    return {
      cat: 'Sales, CRM & Outbound AI',
      badge: 'B2B Prospecting & Revenue Intelligence',
      tagline: `${name} discovers ideal customer prospects, enriches lead data, drafts hyper-personalized outbound emails, and forecasts revenue.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Enrich 500 Prospect Leads', 'Score Deal Win Probability', 'Draft High-Response Cold Outreach', 'Analyze Call Objection Trends'],
      prompt: `Analyze Gong transcript for prospect pricing objections and suggest a tailored counter-proposal package.`,
      accent: 'text-purple-400',
      grad: 'from-purple-600 to-pink-700',
      tags: ['sales', 'crm', 'outreach', 'leads', 'salesforce', 'hubspot']
    };
  }

  // 31. SEO & Content Strategy
  if (['surfer', 'semrush', 'ahrefs', 'frase', 'marketmuse', 'clearscope', 'neuronwriter', 'outranking', 'alli ai'].includes(n)) {
    return {
      cat: 'SEO & Content Strategy',
      badge: 'Algorithmic Search Optimization',
      tagline: `${name} audits search engine competition, identifies keyword search volume gaps, and optimizes content to rank on Google Page 1.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Audit Top 10 SERP Competitors', 'Calculate Content Optimization Score', 'Keyword Clustering & Gap Matrix', 'Generate Technical SEO Fixes'],
      prompt: `Analyze keyword 'best enterprise ai platforms' and generate an outline targeting top search intent signals.`,
      accent: 'text-amber-400',
      grad: 'from-amber-600 to-yellow-700',
      tags: ['seo', 'keywords', 'serp', 'ranking', 'semrush', 'ahrefs']
    };
  }

  // 32. Social Media & Marketing
  if (['buffer ai', 'hootsuite owlywriter', 'predis.ai', 'ocoya', 'feedhive', 'publer', 'vista social', 'flick', 'taplio', 'typefully'].includes(n)) {
    return {
      cat: 'Social Media & Growth',
      badge: 'Multi-Platform Scheduling & Viral Hooks',
      tagline: `${name} schedules social content across X, LinkedIn, Instagram, and TikTok with viral hook suggestions and analytics.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Viral LinkedIn Carousel', 'Schedule Across 5 Social Networks', 'Predict Engagement Score', 'Repurpose Long Post to Threads'],
      prompt: `Turn this engineering case study into an engaging 7-part LinkedIn carousel with concise, impactful takeaways.`,
      accent: 'text-blue-400',
      grad: 'from-blue-600 to-cyan-700',
      tags: ['social-media', 'twitter', 'linkedin', 'buffer', 'hootsuite', 'marketing']
    };
  }

  // 33. Email & Communications
  if (['superhuman', 'shortwave', 'sanebox', 'mailbutler', 'missive', 'compose ai', 'flowrite', 'merlin'].includes(n)) {
    return {
      cat: 'Email & Communication AI',
      badge: 'Inbox Zero & Autonomous Triage',
      tagline: `${name} triages incoming mail, drafts responses in your writing voice, and clears your inbox at lightning speed.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Reach Inbox Zero in 5 Minutes', 'Draft 1-Click Contextual Reply', 'Summarize Long Thread History', 'Schedule Smart Follow-Up Reminders'],
      prompt: `Draft a warm, polite response accepting the partnership invitation while suggesting meeting slots next Tuesday.`,
      accent: 'text-rose-400',
      grad: 'from-rose-600 to-pink-700',
      tags: ['email', 'inbox', 'superhuman', 'communication', 'productivity']
    };
  }

  // 34. HR, Recruiting & Talent
  if (['linkedin recruiter', 'hirevue', 'eightfold ai', 'paradox', 'greenhouse', 'workable', 'seekout', 'textio', 'leena ai', 'rippling'].includes(n)) {
    return {
      cat: 'HR, Recruiting & Talent',
      badge: 'Talent Acquisition & Candidate Matching',
      tagline: `${name} sources top candidates, scans resumes against job descriptions, removes bias, and automates employee onboarding.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Enterprise',
      actions: ['Match Candidates to Senior Staff Role', 'Audit Job Description for Inclusivity', 'Automate Candidate Screening Interview', 'Generate Structured Interview Rubric'],
      prompt: `Parse candidate resume and benchmark qualifications against Principal Distributed Systems Architect requirements.`,
      accent: 'text-teal-400',
      grad: 'from-teal-600 to-emerald-700',
      tags: ['hr', 'recruiting', 'talent', 'hiring', 'linkedin', 'greenhouse']
    };
  }

  // 35. Finance, Accounting & Tax
  if (['intuit assist', 'quickbooks ai', 'xero', 'datarails', 'vic.ai', 'ramp intelligence', 'brex', 'docyt', 'numeric'].includes(n)) {
    return {
      cat: 'Finance, Accounting & Tax',
      badge: 'Automated Bookkeeping & FP&A Forecasting',
      tagline: `${name} reconciles bank transactions, flags expense anomalies, automates invoice coding, and builds financial models.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Paid',
      actions: ['Reconcile Month-End Transactions', 'Detect Duplicate / Flagged Expenses', 'Build 12-Month Cash Runway Forecast', 'Generate Audit-Ready Financial Statements'],
      prompt: `Analyze Q2 expense breakdown, highlight cost categories exceeding 15% variance, and suggest runway optimizations.`,
      accent: 'text-emerald-400',
      grad: 'from-emerald-600 to-green-700',
      tags: ['finance', 'accounting', 'quickbooks', 'expenses', 'budget']
    };
  }

  // 36. Legal AI & Compliance
  if (['harvey', 'cocounsel', 'lexis+ ai', 'westlaw precision ai', 'clio duo', 'ironclad ai', 'luminance', 'spellbook', 'robin ai', 'legalon'].includes(n)) {
    return {
      cat: 'Legal AI & Contract Analysis',
      badge: 'Enterprise Legal Intelligence & Diligence',
      tagline: `${name} conducts precedent legal research, redlines master services agreements, and prepares trial briefs.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Enterprise',
      actions: ['Automated Contract Redlining', 'Precedent Case Law Search', 'Draft Non-Disclosure / Service Agreement', 'Risk Diligence Report'],
      prompt: `Review this software licensing agreement and flag any un-capped indemnification or non-standard governing law provisions.`,
      accent: 'text-amber-400',
      grad: 'from-amber-600 to-red-700',
      tags: ['legal', 'contracts', 'compliance', 'law', 'harvey', 'ironclad']
    };
  }

  // 37. Healthcare & Clinical AI
  if (['dragon copilot', 'abridge', 'ambience healthcare', 'nabla copilot', 'glass health'].includes(n)) {
    return {
      cat: 'Healthcare & Clinical AI',
      badge: 'Ambient Clinical Scribing & Medical Notes',
      tagline: `${name} listens to patient-clinician conversations, structures SOAP clinical notes, and suggests diagnostic pathways.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Enterprise',
      actions: ['Ambient SOAP Note Generation', 'ICD-10 & CPT Billing Code Extraction', 'Medication Interaction Safety Check', 'Generate Patient After-Visit Summary'],
      prompt: `Convert patient consultation audio into structured SOAP note with differential diagnosis and follow-up lab orders.`,
      accent: 'text-cyan-400',
      grad: 'from-cyan-600 to-blue-700',
      tags: ['medical', 'healthcare', 'clinical', 'soap-notes', 'doctors']
    };
  }

  // 38. 3D, Architecture & Interior Design
  if (['meshy', 'tripo ai', 'luma genie', 'kaedim', 'spline ai', 'scenario', 'rodin', 'masterpiece x', 'csm', 'polycam', 'planner 5d ai', 'homestyler', 'reimaginehome', 'interior ai', 'roomgpt', 'architechtures', 'finch3d', 'hypar', 'testfit', 'autodesk forma'].includes(n)) {
    return {
      cat: '3D, Architecture & Interior Design',
      badge: 'Generative 3D Meshes & Architectural Design',
      tagline: `${name} creates textured 3D game assets, photorealistic interior renders, and algorithmic floor plans.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Generate Textured 3D Mesh (GLB/FBX)', 'Virtual Room Interior Staging', 'Parametric Building Massing Optimization', 'Extract 3D Gaussian Splats from Video'],
      prompt: `Generate a low-poly stylized medieval tavern asset with PBR textures ready for game engine export.`,
      accent: 'text-violet-400',
      grad: 'from-violet-600 to-indigo-700',
      tags: ['3d', 'architecture', 'interior-design', 'mesh', 'spline', 'polycam']
    };
  }

  // 39. Prompt Engineering & Guides
  if (['promptbase', 'flowgpt', 'aiprm', 'prompthero', 'snack prompt', 'learn prompting', 'openai prompting guide', 'anthropic prompt engineering', 'google prompting guide', 'microsoft prompt engineering'].includes(n)) {
    return {
      cat: 'Prompt Engineering & Prompt Hubs',
      badge: 'Model Optimization & Prompt Frameworks',
      tagline: `${name} provides tested system prompts, chain-of-thought frameworks, and prompt engineering playbooks for LLMs.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Free',
      actions: ['Browse Tested Prompt Templates', 'Optimize Prompt with Few-Shot Examples', 'Test System Prompt Across 5 LLMs', 'Export Prompt to API Request JSON'],
      prompt: `Structure a chain-of-thought system prompt for extracting structured financial line items from unstructured earnings calls.`,
      accent: 'text-amber-400',
      grad: 'from-amber-600 to-yellow-700',
      tags: ['prompts', 'prompt-engineering', 'templates', 'guides', 'optimization']
    };
  }

  // 40. Cloud AI APIs & Platforms
  if (['openai api', 'anthropic api', 'google ai studio', 'google vertex ai', 'hugging face', 'together ai', 'groqcloud', 'replicate', 'fireworks ai', 'cohere'].includes(n)) {
    return {
      cat: 'Cloud AI APIs & Model Platforms',
      badge: 'High-Performance Inference & Model Hub',
      tagline: `${name} provides low-latency inference APIs, open-source model hosting, fine-tuning infrastructure, and enterprise deployment.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Pay-As-You-Go',
      actions: ['Run Low-Latency LPU Inference', 'Deploy Custom Fine-Tuned Model', 'Manage API Keys & Rate Limits', 'Monitor Token Latency & Throughput'],
      prompt: `Benchmark latency and tokens-per-second across Llama 3.3 70B and Mistral Large on serverless GPUs.`,
      accent: 'text-cyan-400',
      grad: 'from-cyan-600 to-indigo-700',
      tags: ['api', 'cloud', 'inference', 'groq', 'huggingface', 'vertex']
    };
  }

  // 41. AI Detection & Safety
  if (['gptzero', 'originality.ai', 'copyleaks', 'turnitin', 'winston ai', 'zerogpt', 'quetext', 'hive moderation', 'reality defender', 'content credentials'].includes(n)) {
    return {
      cat: 'AI Detection, Safety & Moderation',
      badge: 'Synthetic Content Detection & Watermarking',
      tagline: `${name} detects AI-generated text, deepfakes, copyright risks, and inspects C2PA provenance credentials.`,
      web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
      price: 'Freemium',
      actions: ['Analyze Text for AI Probability Score', 'Detect Deepfake Video / Audio Artifacts', 'Verify C2PA Cryptographic Provenance', 'Scan for Plagiarized Sources'],
      prompt: `Analyze this 1,500-word essay for burstiness and perplexity indicators to estimate likelihood of AI generation.`,
      accent: 'text-rose-400',
      grad: 'from-rose-600 to-red-700',
      tags: ['detection', 'safety', 'moderation', 'deepfake', 'gptzero', 'c2pa']
    };
  }

  // Default fallback
  return {
    cat: 'Productivity & Specialized AI',
    badge: 'Specialized AI Capability',
    tagline: `${name} delivers intelligent workflows, smart automation, and specialized neural computing.`,
    web: `https://${makeSlug(name).replace(/_/g, '')}.com`,
    price: 'Freemium',
    actions: ['Execute Specialized AI Workflow', 'Synthesize Project Data', 'Export Structured Report', 'Launch Cloud Sandbox'],
    prompt: `Analyze system requirements and provide optimized step-by-step guidance using ${name}.`,
    accent: 'text-indigo-400',
    grad: 'from-indigo-600 to-purple-700',
    tags: ['ai', 'productivity', 'tools']
  };
}

// Generate the items
const items = names.map((name, index) => {
  const id = makeSlug(name);
  const meta = TOOL_METADATA[name] || inferMetadata(name);
  
  return {
    id,
    name,
    category: meta.cat,
    badge: meta.badge,
    tagline: meta.tagline,
    website: meta.web,
    pricingType: meta.price,
    actions: meta.actions,
    defaultPrompt: meta.prompt,
    sampleOutputTitle: `${name} Simulation Result`,
    sampleDetails: [
      { label: 'Platform Engine', value: `${name} Production Core v4.8` },
      { label: 'Latency / Speed', value: '18ms - 240ms (Accelerated)' },
      { label: 'Security & Privacy', value: 'SOC-2 Type II Certified • Zero Data Retention' }
    ],
    accentColor: meta.accent,
    gradient: meta.grad,
    tags: Array.from(new Set([name.toLowerCase(), meta.cat.toLowerCase(), ...(meta.tags || [])]))
  };
});

// Category list
const categories = Array.from(new Set(items.map(i => i.category))).sort();

// Create code content
const code = `// AUTO-GENERATED: Master AI Directory containing all 451 AI & Software Tools
// Generated for Google AI Studio Nova AI Platform

export interface SuperAiToolItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  website: string;
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Enterprise' | 'Pay-As-You-Go';
  actions: string[];
  defaultPrompt: string;
  sampleOutputTitle: string;
  sampleDetails: { label: string; value: string }[];
  accentColor: string;
  gradient: string;
  tags: string[];
}

export const SUPER_AI_CATEGORIES: string[] = ${JSON.stringify(categories, null, 2)};

export const SUPER_AI_TOOLS: SuperAiToolItem[] = ${JSON.stringify(items, null, 2)};

export const SUPER_AI_TOOLS_MAP: Record<string, SuperAiToolItem> = SUPER_AI_TOOLS.reduce((acc, tool) => {
  acc[tool.id] = tool;
  return acc;
}, {} as Record<string, SuperAiToolItem>);

export function getSuperAiTool(id: string): SuperAiToolItem | undefined {
  return SUPER_AI_TOOLS_MAP[id] || SUPER_AI_TOOLS.find(t => t.id === id || t.name.toLowerCase() === id.toLowerCase());
}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/superAiToolsData.ts'), code);
console.log('Successfully wrote src/data/superAiToolsData.ts with', items.length, 'tools across', categories.length, 'categories!');
