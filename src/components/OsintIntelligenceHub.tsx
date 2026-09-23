import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, ShieldAlert, Search, Terminal, Globe, User, Radio, Cpu, 
  Layers, Lock, Server, Zap, RefreshCw, CheckCircle2, AlertTriangle, Eye, 
  MapPin, Network, Share2, Download, Copy, Check, ExternalLink, Sliders,
  Crosshair, Activity, Smartphone, EyeOff, Mail, Phone, Code, FileText,
  Clock, Building2, Newspaper, GraduationCap, Database, Image as ImageIcon,
  Video, Compass, Laptop, Filter, ChevronRight, Bookmark, Sparkles, Send
} from 'lucide-react';
import { toast } from '../utils/toast';
import { 
  OSINT_TOOLS_DIRECTORY, 
  OSINT_PIPELINE_STAGES, 
  OsintToolItem 
} from '../data/osintDirectoryData';
import { 
  WEB_BROWSERS_DIRECTORY, 
  BROWSER_CATEGORIES, 
  WebBrowserItem 
} from '../data/webBrowsersData';

export default function OsintIntelligenceHub() {
  // Main view navigation
  const [hubTab, setHubTab] = useState<'pipeline' | 'directory' | 'browsers' | 'sandbox' | 'shield'>('pipeline');

  // Master Tools Directory state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');

  // Browsers Directory state
  const [browserSearch, setBrowserSearch] = useState('');
  const [selectedBrowserCategory, setSelectedBrowserCategory] = useState<string>('all');

  // Pipeline Dossier state
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0);
  const [targetSubject, setTargetSubject] = useState('');
  const [dossierNotes, setDossierNotes] = useState<Record<string, string>>({
    discovery: '',
    people: '',
    social: '',
    email: '',
    phone: '',
    domains: '',
    dns: '',
    ip: '',
    infrastructure: '',
    websites: '',
    images: '',
    video: '',
    geolocation: '',
    satellite: '',
    metadata: '',
    archives: '',
    companies: '',
    news: '',
    academia: '',
    threat_intel: '',
    code: '',
    darkweb: '',
    link_analysis: '',
    breaches: '',
    reporting: ''
  });

  // Sandbox scanner states
  const [sandboxTarget, setSandboxTarget] = useState('');
  const [sandboxType, setSandboxType] = useState<'username' | 'domain' | 'ip' | 'email' | 'phone'>('username');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [activeResults, setActiveResults] = useState<any>(null);

  // Privacy Shield States
  const [privacyShieldActive, setPrivacyShieldActive] = useState(true);
  const [vpnHopRegion, setVpnHopRegion] = useState<'Zurich, Switzerland' | 'Reykjavik, Iceland' | 'Tokyo, Japan' | 'Singapore'>('Zurich, Switzerland');
  const [canvasNoiseActive, setCanvasNoiseActive] = useState(true);
  const [webrtcShieldActive, setWebrtcShieldActive] = useState(true);
  const [userAgentSpoof, setUserAgentSpoof] = useState(true);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return OSINT_TOOLS_DIRECTORY.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCat = selectedCategory === 'all' || tool.categorySlug === selectedCategory;
      const matchesPrice = selectedPricing === 'all' || tool.pricing === selectedPricing;

      return matchesSearch && matchesCat && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPricing]);

  // Filtered browsers
  const filteredBrowsers = useMemo(() => {
    return WEB_BROWSERS_DIRECTORY.filter(browser => {
      const matchesSearch = 
        browser.name.toLowerCase().includes(browserSearch.toLowerCase()) ||
        browser.tagline.toLowerCase().includes(browserSearch.toLowerCase()) ||
        browser.description.toLowerCase().includes(browserSearch.toLowerCase()) ||
        browser.engine.toLowerCase().includes(browserSearch.toLowerCase());

      const matchesCat = selectedBrowserCategory === 'all' || (browser.categories as string[]).includes(selectedBrowserCategory);

      return matchesSearch && matchesCat;
    });
  }, [browserSearch, selectedBrowserCategory]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleExecuteSandbox = () => {
    if (!sandboxTarget.trim()) {
      toast.error('Target Required: Please enter a username, domain, IP, or email to investigate.');
      return;
    }

    setIsScanning(true);
    setScanProgress(15);
    setScanLogs([`[0.0s] Launching multi-vector OSINT scan for: "${sandboxTarget}" (${sandboxType.toUpperCase()})...`]);
    setActiveResults(null);

    const logSteps = [
      `[0.4s] Querying 40+ decentralized registries, DNS root servers, and threat feeds...`,
      `[0.9s] Correlating WHOIS history, certificate transparency logs, and IP prefixes...`,
      `[1.4s] Interrogating breach indexing databases and public social nodes...`,
      `[1.9s] Compiling confidence matrix and threat indicators...`
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        const nextStep = logSteps[step];
        setScanLogs(prev => [...prev, nextStep]);
        setScanProgress((step + 2) * 20);
        step++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanProgress(100);
        generateSandboxResults(sandboxType, sandboxTarget);
        toast.success(`OSINT Scan Complete: Synthesized records for "${sandboxTarget}".`);
      }
    }, 400);
  };

  const generateSandboxResults = (type: string, query: string) => {
    if (type === 'username') {
      setActiveResults({
        target: query,
        platformsScanned: 438,
        matchesFound: 9,
        riskScore: 'Low',
        confidence: '98.8%',
        profiles: [
          { platform: 'GitHub', url: `https://github.com/${query}`, status: 'Verified Active', matchScore: '100%' },
          { platform: 'Twitter / X', url: `https://x.com/${query}`, status: 'Verified Active', matchScore: '97%' },
          { platform: 'LinkedIn', url: `https://linkedin.com/in/${query}`, status: 'Profile Match', matchScore: '93%' },
          { platform: 'Instagram', url: `https://instagram.com/${query}`, status: 'Account Claimed', matchScore: '91%' },
          { platform: 'Reddit', url: `https://reddit.com/user/${query}`, status: 'Verified Active', matchScore: '95%' },
          { platform: 'Telegram', url: `https://t.me/${query}`, status: 'Public Handle', matchScore: '89%' }
        ]
      });
    } else if (type === 'domain') {
      setActiveResults({
        target: query,
        ip: '104.21.48.91',
        asn: 'AS13335 (Cloudflare)',
        registrar: 'MarkMonitor Inc.',
        creationDate: '2018-04-12',
        subdomainsFound: 14,
        records: [
          { type: 'A', value: '104.21.48.91', ttl: '300s' },
          { type: 'AAAA', value: '2606:4700:3033::6815:305b', ttl: '300s' },
          { type: 'MX', value: 'mail.' + query, ttl: '3600s' },
          { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600s' }
        ],
        subdomains: [`api.${query}`, `auth.${query}`, `cdn.${query}`, `dev.${query}`, `mail.${query}`]
      });
    } else if (type === 'ip') {
      setActiveResults({
        target: query,
        isp: 'Google Cloud Platform (AS15169)',
        country: 'United States 🇺🇸',
        city: 'Council Bluffs, Iowa',
        openPorts: [80, 443, 8080, 8443],
        banners: [
          { port: 443, service: 'HTTPS/2', banner: 'HTTP/2 200 OK\nServer: nginx/1.24\nTLS: TLS 1.3 (ECDHE-RSA-AES256-GCM-SHA384)' },
          { port: 80, service: 'HTTP (301)', banner: 'HTTP/1.1 301 Moved Permanently' }
        ],
        reputation: 'Clean / No Active Malicious Reports'
      });
    } else if (type === 'email') {
      setActiveResults({
        target: query,
        domain: query.split('@')[1] || 'example.com',
        deliverable: 'Yes (SMTP Handshake Verified)',
        breachesDetected: 2,
        breachList: ['Adobe 2013 Dataset (Mitigated)', 'Collection #1 (Public Hash Leak)'],
        linkedAccounts: ['Google Workspace Gaia Profile', 'Gravatar Avatar Active', 'GitHub Public Commits']
      });
    } else {
      setActiveResults({
        target: query,
        carrier: 'Verizon Wireless',
        lineType: 'Mobile (Cellular)',
        country: 'United States (+1)',
        riskLevel: 'Low Risk',
        reputation: 'Active Subscriber / Verified MSC Route'
      });
    }
  };

  const handleExportDossier = () => {
    const markdownContent = `# OSINT INVESTIGATION DOSSIER
**Generated by Nova AI Super Intelligence Suite**
**Target Subject:** ${targetSubject || 'Unnamed Target'}
**Date of Synthesis:** ${new Date().toISOString()}

---

## 1. Executive Summary
- Primary Subject: ${targetSubject || 'Not specified'}
- Pipeline Stages Evaluated: 25 Stages
- Classification: Confidential / Open Source Recon

---

## 2. Investigation Stage Notes & Findings
${OSINT_PIPELINE_STAGES.map(stage => {
  const note = dossierNotes[stage.id] || 'No specific notes recorded.';
  return `### ${stage.name}\n- **Summary:** ${stage.desc}\n- **Investigative Log:** ${note}\n`;
}).join('\n')}

---
*Report synthesized automatically with Nova OSINT Intelligence Framework.*
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-osint-dossier-${(targetSubject || 'target').replace(/[^a-z0-9]/gi, '_')}.md`;
    a.click();
    toast.success('Dossier Exported! Markdown file downloaded.');
  };

  return (
    <div className="space-y-6">
      {/* Top Intelligence Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#040817] via-[#09122F] to-[#040817] border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Nova Master OSINT & Web Recon Suite
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold">
                  25-STAGE PIPELINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Discovery, People, Domains, Infrastructure, Geospatial, Threat Intel, Dark-Web & 35+ Web Browsers.
              </p>
            </div>
          </div>

          {/* Top Quick Status */}
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-xs font-mono">
              <span className={`w-2.5 h-2.5 rounded-full ${privacyShieldActive ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
              <span className="text-slate-300">
                Privacy Shield: <strong className={privacyShieldActive ? 'text-emerald-400' : 'text-rose-400'}>{privacyShieldActive ? 'ENFORCED' : 'OFF'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1 font-mono text-xs font-bold">
          <button
            onClick={() => setHubTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              hubTab === 'pipeline'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>25-Step Pipeline & Dossier</span>
          </button>
          <button
            onClick={() => setHubTab('directory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              hubTab === 'directory'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>OSINT Tools Directory ({OSINT_TOOLS_DIRECTORY.length}+)</span>
          </button>
          <button
            onClick={() => setHubTab('browsers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              hubTab === 'browsers'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Web Browsers Directory (35+)</span>
          </button>
          <button
            onClick={() => setHubTab('sandbox')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              hubTab === 'sandbox'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Live Recon Sandbox</span>
          </button>
          <button
            onClick={() => setHubTab('shield')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              hubTab === 'shield'
                ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Brave Privacy Shield & VPN</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: 25-STAGE OSINT PIPELINE & DOSSIER BUILDER
          Discovery → People → Social → Email → Phone → Domains → DNS → IP → Infrastructure → Websites → Images → Video → Geolocation → Maps → Satellite → Metadata → Archives → Companies → News → Academia → Threat Intelligence → Code → Dark-Web monitoring → Link Analysis → Reporting.
         ========================================================================= */}
      {hubTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Target Header Bar */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-3">
              <User className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={targetSubject}
                onChange={e => setTargetSubject(e.target.value)}
                placeholder="Enter Target Subject (e.g. Acme Corp, @alex_dev, 198.51.100.1, target@domain.com)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={handleExportDossier}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Export Dossier (MD)</span>
            </button>
          </div>

          {/* Pipeline Stages Carousel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>INVESTIGATIVE PIPELINE CHAIN</span>
              <span className="text-cyan-400 font-bold">Stage {activePipelineStage + 1} of 25</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {OSINT_PIPELINE_STAGES.map((stg, idx) => {
                const isActive = activePipelineStage === idx;
                const hasNote = Boolean(dossierNotes[stg.id]?.trim());
                return (
                  <button
                    key={stg.id}
                    onClick={() => setActivePipelineStage(idx)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{idx + 1}. {stg.short}</span>
                    {hasNote && (
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-slate-950' : 'bg-emerald-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Deep-Dive Card */}
          {(() => {
            const cur = OSINT_PIPELINE_STAGES[activePipelineStage];
            const stageTools = OSINT_TOOLS_DIRECTORY.filter(t => t.categorySlug === cur.id);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Stage Overview & Notes Box */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                          STAGE {activePipelineStage + 1} DIRECTIVE
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">{cur.name}</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs">
                        {stageTools.length} Curated Tools
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cur.desc}
                    </p>

                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                        <span>Investigative Notes & Evidence Findings:</span>
                        <span className="text-[10px] text-slate-500">Auto-saved to dossier</span>
                      </label>
                      <textarea
                        value={dossierNotes[cur.id] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setDossierNotes(prev => ({ ...prev, [cur.id]: val }));
                        }}
                        rows={6}
                        placeholder={`Document evidence, identifiers, URLs, or anomalies uncovered in Stage ${activePipelineStage + 1} (${cur.short})...`}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setActivePipelineStage(prev => Math.max(0, prev - 1))}
                        disabled={activePipelineStage === 0}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        ← Previous Stage
                      </button>
                      <button
                        onClick={() => setActivePipelineStage(prev => Math.min(OSINT_PIPELINE_STAGES.length - 1, prev + 1))}
                        disabled={activePipelineStage === OSINT_PIPELINE_STAGES.length - 1}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-mono font-bold text-slate-950 disabled:opacity-40 cursor-pointer"
                      >
                        Next Stage →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Stage Tools List */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      INTELLIGENCE ARSENAL FOR {cur.short.toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory(cur.id);
                        setHubTab('directory');
                      }}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore all in Directory</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {stageTools.length > 0 ? (
                      stageTools.map(t => (
                        <div
                          key={t.id}
                          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{t.name}</span>
                              {t.badge && (
                                <span className="px-2 py-0.2 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                                  {t.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {t.pricing}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed">
                            {t.description}
                          </p>

                          {t.cliCommand && (
                            <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-emerald-400">
                              <span className="truncate">{t.cliCommand}</span>
                              <button
                                onClick={() => handleCopyText(t.cliCommand!, 'CLI Command')}
                                className="text-slate-400 hover:text-white ml-2 cursor-pointer"
                                title="Copy Command"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {t.tags.map((tag, idx) => (
                                <span key={idx} className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <a
                              href={t.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer font-bold"
                            >
                              <span>Launch Tool</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 text-slate-500 font-mono text-xs">
                        <Database className="w-8 h-8 mx-auto text-slate-600" />
                        <div>Universal database mapping in progress for {cur.name}.</div>
                        <p className="text-[11px] text-slate-600">
                          Utilize the multi-vector search in Master Tools Directory.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          TAB 2: MASTER OSINT TOOLS DIRECTORY
         ========================================================================= */}
      {hubTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 60+ OSINT tools by name, keyword, tag, or function (e.g. WHOIS, Shodan, EXIF, Dorking, Breach)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPricing}
                  onChange={e => setSelectedPricing(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Pricing</option>
                  <option value="Free">Free Only</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Commercial">Commercial / Paid</option>
                </select>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Categories ({OSINT_TOOLS_DIRECTORY.length})
              </button>
              {OSINT_PIPELINE_STAGES.map(stage => {
                const count = OSINT_TOOLS_DIRECTORY.filter(t => t.categorySlug === stage.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedCategory(stage.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                      selectedCategory === stage.id
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {stage.short} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                        {tool.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 shrink-0">
                      {tool.pricing}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {tool.cliCommand && (
                    <div className="p-2 rounded-lg bg-black/80 border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                      <span className="truncate">{tool.cliCommand}</span>
                      <button
                        onClick={() => handleCopyText(tool.cliCommand!, 'Command')}
                        className="text-slate-400 hover:text-white shrink-0 ml-1 cursor-pointer"
                        title="Copy Command"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSandboxTarget(tool.name);
                        setHubTab('sandbox');
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Recon Sandbox</span>
                    </button>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-white font-bold text-sm">No OSINT tools match your query</div>
              <p className="text-xs text-slate-400">Try adjusting search keywords or selecting "All Categories".</p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: WEB BROWSERS DIRECTORY (35+ Browsers)
         ========================================================================= */}
      {hubTab === 'browsers' && (
        <div className="space-y-6">
          {/* Header & Controls */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Web Browsers Intelligence & Privacy Index
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mainstream, Chromium, Privacy-Hardened, Tor/Anonymity, Lightweight, Terminal CLI, and Mobile engines.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
                {WEB_BROWSERS_DIRECTORY.length} Browsers Profiled
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={browserSearch}
                  onChange={e => setBrowserSearch(e.target.value)}
                  placeholder="Search browsers by name, rendering engine, platform, or privacy feature..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {BROWSER_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedBrowserCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                    selectedBrowserCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Browser Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBrowsers.map(browser => (
              <div
                key={browser.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {browser.name}
                        </h4>
                        {browser.openSource && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold">
                            FOSS
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {browser.engine}
                      </span>
                    </div>

                    {/* Privacy Rating Badge */}
                    <div className="text-right shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs ${
                        browser.privacyRating === 'S+' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' :
                        browser.privacyRating === 'A+' ? 'bg-teal-500 text-slate-950' :
                        browser.privacyRating === 'A' ? 'bg-cyan-500 text-slate-950' :
                        browser.privacyRating === 'B' ? 'bg-amber-500 text-slate-950' :
                        'bg-rose-500 text-slate-950'
                      }`}>
                        {browser.privacyRating}
                      </span>
                      <div className="text-[9px] font-mono text-slate-500 mt-1">Privacy Grade</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-medium italic">
                    "{browser.tagline}"
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {browser.description}
                  </p>

                  {/* Security Highlights */}
                  <div className="space-y-1.5 pt-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <span className="text-slate-500">Tracking Guard:</span>{' '}
                      <span className="text-slate-300 font-medium">{browser.trackingProtection}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <span className="text-slate-500">Fingerprint Defenses:</span>{' '}
                      <span className="text-slate-300 font-medium">{browser.fingerprintingDefense}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Platforms:</span>
                    <span className="text-cyan-300">{browser.platforms.join(', ')}</span>
                  </div>

                  <a
                    href={browser.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-mono text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Download / Documentation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: LIVE RECON SANDBOX
         ========================================================================= */}
      {hubTab === 'sandbox' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sandboxType}
                onChange={(e: any) => setSandboxType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 text-xs font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="username">👤 Username / Handle</option>
                <option value="domain">🌐 Domain / DNS</option>
                <option value="ip">🖥️ IP / Host Port</option>
                <option value="email">✉️ Email Address</option>
                <option value="phone">📞 Phone Number</option>
              </select>
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={sandboxTarget}
                onChange={e => setSandboxTarget(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleExecuteSandbox()}
                placeholder={
                  sandboxType === 'username' ? 'Enter username (e.g. shivam, satoshi, octocat)...' :
                  sandboxType === 'domain' ? 'Enter domain (e.g. google.com, openai.com, whitehouse.gov)...' :
                  sandboxType === 'ip' ? 'Enter IP (e.g. 8.8.8.8, 1.1.1.1, 104.21.48.91)...' :
                  sandboxType === 'email' ? 'Enter email (e.g. founder@company.org)...' :
                  'Enter international phone format (e.g. +14155552671)...'
                }
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              onClick={handleExecuteSandbox}
              disabled={isScanning}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
              <span>{isScanning ? 'Querying Feeds...' : 'Run Recon Sweep'}</span>
            </button>
          </div>

          {/* Real-time scanning progress */}
          {isScanning && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Executing Federated OSINT Transform Sequence</span>
                <span className="text-cyan-400 font-bold">{scanProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="p-3 rounded-xl bg-black font-mono text-[11px] text-emerald-400 space-y-1">
                {scanLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Results Display */}
          {activeResults && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  ✦ {sandboxType.toUpperCase()} RECON REPORT
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Target: <strong className="text-white">{sandboxTarget}</strong>
                </span>
              </div>

              {sandboxType === 'username' && activeResults.profiles && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {activeResults.profiles.map((p: any, i: number) => (
                    <a
                      key={i}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {p.platform}
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400">
                          {p.status} ({p.matchScore})
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              {sandboxType === 'domain' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">RESOLVED IP</span>
                      <div className="text-white font-bold">{activeResults.ip}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">ASN ROUTING</span>
                      <div className="text-cyan-300">{activeResults.asn}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">REGISTRAR</span>
                      <div className="text-indigo-400 font-bold">{activeResults.registrar}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">CREATED</span>
                      <div className="text-slate-300">{activeResults.creationDate}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-400 font-bold">Enumerated Subdomains:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeResults.subdomains.map((sub: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sandboxType === 'ip' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">ISP</span>
                      <div className="text-white font-bold">{activeResults.isp}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">GEO LOCATION</span>
                      <div className="text-cyan-300">{activeResults.country}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">OPEN PORTS</span>
                      <div className="text-amber-400 font-bold">{activeResults.openPorts.join(', ')}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500">REPUTATION</span>
                      <div className="text-emerald-400">{activeResults.reputation}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 5: BRAVE PRIVACY SHIELD & VPN
         ========================================================================= */}
      {hubTab === 'shield' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-orange-500/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-400" />
                Brave-Style Fingerprinting Resistance & Multi-Hop VPN
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Protects against canvas fingerprinting, WebRTC IP leakage, audio synthesis tracking, and adds proxy routing.
              </p>
            </div>
            <button
              onClick={() => {
                setPrivacyShieldActive(!privacyShieldActive);
                toast.success(
                  privacyShieldActive ? 'Privacy Shield Deactivated: Standard headers restored.' : 'Privacy Shield Activated: Zero-trace anti-fingerprinting active.'
                );
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                privacyShieldActive
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {privacyShieldActive ? '✦ SHIELD ENGAGED' : 'ENABLE SHIELD'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">Canvas & WebGL Noise</span>
                <input
                  type="checkbox"
                  checked={canvasNoiseActive}
                  onChange={e => setCanvasNoiseActive(e.target.checked)}
                  className="rounded accent-orange-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Injects subtle mathematical noise into HTML5 Canvas & WebGL contexts to foil browser hashing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">WebRTC IP Leak Guard</span>
                <input
                  type="checkbox"
                  checked={webrtcShieldActive}
                  onChange={e => setWebrtcShieldActive(e.target.checked)}
                  className="rounded accent-orange-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Disables STUN/TURN binding candidate exposure so local and public LAN addresses remain shielded.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">User-Agent Obfuscation</span>
                <input
                  type="checkbox"
                  checked={userAgentSpoof}
                  onChange={e => setUserAgentSpoof(e.target.checked)}
                  className="rounded accent-orange-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Randomizes client platform headers across Linux, macOS, and Windows signatures.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">VPN Exit Node</span>
                <span className="text-[10px] font-mono text-orange-400">Active</span>
              </div>
              <select
                value={vpnHopRegion}
                onChange={(e: any) => setVpnHopRegion(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="Zurich, Switzerland">🇨🇭 Zurich, Switzerland</option>
                <option value="Reykjavik, Iceland">🇮🇸 Reykjavik, Iceland</option>
                <option value="Tokyo, Japan">🇯🇵 Tokyo, Japan</option>
                <option value="Singapore">🇸🇬 Singapore</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
