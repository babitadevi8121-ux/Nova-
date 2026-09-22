import React, { useState, useMemo } from 'react';
import { 
  INDIA_CARRIERS, 
  INDIA_TELECOM_CIRCLES, 
  SANCHAR_SAATHI_SUITE, 
  INDIA_5G_SPECTRUM_SPECS,
  INDIA_PREFIX_MAP,
  IndiaCarrierProfile,
  IndiaCircle
} from '../data/indiaTelecomData';
import { 
  Globe, Radio, ShieldCheck, Smartphone, Search, Copy, Check, ExternalLink, 
  Activity, Zap, Info, ShieldAlert, AlertTriangle, UserCheck, RefreshCw, 
  Wifi, Layers, Cpu, Compass, PhoneCall, Building2, MapPin, Hash, Sparkles
} from 'lucide-react';

export default function IndiaTelecomHub() {
  const [activeTab, setActiveTab] = useState<'operators' | 'circles' | 'decoder' | 'sanchar_saathi' | 'spectrum' | 'ussd'>('operators');
  const [selectedCarrier, setSelectedCarrier] = useState<IndiaCarrierProfile>(INDIA_CARRIERS[0]);
  const [carrierTypeFilter, setCarrierTypeFilter] = useState<'all' | 'mno' | 'psu' | 'infra'>('all');
  
  // Circle Explorer State
  const [circleSearch, setCircleSearch] = useState('');
  const [circleCategoryFilter, setCircleCategoryFilter] = useState<'all' | 'Metro' | 'Category A' | 'Category B' | 'Category C'>('all');
  const [selectedCircle, setSelectedCircle] = useState<IndiaCircle | null>(INDIA_TELECOM_CIRCLES[0]);

  // Decoder State
  const [decoderInput, setDecoderInput] = useState('');
  
  // USSD & Copy State
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [ussdCarrierFilter, setUssdCarrierFilter] = useState<string>('all');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtered Carriers
  const filteredCarriers = useMemo(() => {
    if (carrierTypeFilter === 'all') return INDIA_CARRIERS;
    if (carrierTypeFilter === 'mno') return INDIA_CARRIERS.filter(c => c.type === 'Private MNO');
    if (carrierTypeFilter === 'psu') return INDIA_CARRIERS.filter(c => c.type === 'Govt of India PSU');
    if (carrierTypeFilter === 'infra') return INDIA_CARRIERS.filter(c => c.type === 'Enterprise / Infrastructure');
    return INDIA_CARRIERS;
  }, [carrierTypeFilter]);

  // Filtered Circles
  const filteredCircles = useMemo(() => {
    return INDIA_TELECOM_CIRCLES.filter(circle => {
      const matchesCategory = circleCategoryFilter === 'all' || circle.category === circleCategoryFilter;
      const q = circleSearch.toLowerCase();
      const matchesQuery = !q || 
        circle.name.toLowerCase().includes(q) ||
        circle.circleCode.toLowerCase().includes(q) ||
        circle.statesCovered.some(s => s.toLowerCase().includes(q)) ||
        circle.keyCities.some(c => c.toLowerCase().includes(q)) ||
        circle.stdCodes.some(code => code.includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [circleCategoryFilter, circleSearch]);

  // Decoded Number
  const decodedData = useMemo(() => {
    const clean = decoderInput.replace(/[^0-9]/g, '');
    if (!clean) return null;

    let targetPrefix = '';
    if (clean.startsWith('91') && clean.length >= 6) {
      targetPrefix = clean.substring(2, 6);
    } else if (clean.length >= 4) {
      targetPrefix = clean.substring(0, 4);
    }

    const match = INDIA_PREFIX_MAP.find(p => p.prefix === targetPrefix);
    const circleMatch = match ? INDIA_TELECOM_CIRCLES.find(c => c.name.toLowerCase().includes(match.circle.toLowerCase()) || match.circle.toLowerCase().includes(c.name.toLowerCase())) : null;

    return {
      raw: clean,
      prefix: targetPrefix,
      match,
      circleMatch
    };
  }, [decoderInput]);

  return (
    <div className="space-y-6">
      {/* Header Banner with Indian Telecom Info */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-950/40 via-neutral-900/60 to-emerald-950/40 border border-orange-500/20 p-6 md:p-8 backdrop-blur-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span>🇮🇳</span>
              <span>Indian Telecommunications Authority & Carrier Directory</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 tracking-tight">
              India Telecom & SIM Company Intelligence Center
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Comprehensive technical database covering India’s ~1.18 Billion subscriber telecom market, 22 Licensed Service Area (LSA) circles, 5G Standalone vs Non-Standalone architectures, Sanchar Saathi security portals, and TRAI regulatory frameworks.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
              <div className="text-xs text-neutral-400">Total Subscribers</div>
              <div className="text-lg font-bold text-neutral-100 mt-0.5">1.18+ Billion</div>
              <div className="text-[10px] text-emerald-400">92%+ Wireless Density</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
              <div className="text-xs text-neutral-400">5G Rollout Speed</div>
              <div className="text-lg font-bold text-orange-400 mt-0.5">Fastest Globally</div>
              <div className="text-[10px] text-neutral-400">450k+ 5G BTS Sites</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center col-span-2 sm:col-span-1">
              <div className="text-xs text-neutral-400">Telecom Circles</div>
              <div className="text-lg font-bold text-blue-400 mt-0.5">22 LSAs</div>
              <div className="text-[10px] text-neutral-400">Pan-India DoT Grids</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-800/80 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('operators')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'operators'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>SIM Companies & Operators</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">{INDIA_CARRIERS.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('circles')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'circles'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>22 Telecom Circles (LSAs)</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">{INDIA_TELECOM_CIRCLES.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('decoder')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'decoder'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Number & Prefix Decoder</span>
          </button>

          <button
            onClick={() => setActiveTab('sanchar_saathi')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'sanchar_saathi'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sanchar Saathi & TAF-COP</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">DoT Govt</span>
          </button>

          <button
            onClick={() => setActiveTab('spectrum')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'spectrum'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>5G Spectrum Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('ussd')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'ussd'
                ? 'bg-orange-500 text-neutral-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>USSD & APN Cheat Sheet</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OPERATORS & SIM COMPANIES */}
      {activeTab === 'operators' && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-medium">Category:</span>
              <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setCarrierTypeFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    carrierTypeFilter === 'all' ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  All Operators
                </button>
                <button
                  onClick={() => setCarrierTypeFilter('mno')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    carrierTypeFilter === 'mno' ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Private Telcos (Jio/Airtel/Vi)
                </button>
                <button
                  onClick={() => setCarrierTypeFilter('psu')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    carrierTypeFilter === 'psu' ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Govt PSUs (BSNL/MTNL)
                </button>
                <button
                  onClick={() => setCarrierTypeFilter('infra')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    carrierTypeFilter === 'infra' ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  RailTel & Backbone
                </button>
              </div>
            </div>

            <div className="text-xs text-neutral-500">
              Showing {filteredCarriers.length} registered Indian telecom entities
            </div>
          </div>

          {/* Carrier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCarriers.map(carrier => {
              const isSelected = selectedCarrier.id === carrier.id;
              return (
                <div
                  key={carrier.id}
                  onClick={() => setSelectedCarrier(carrier)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all border relative overflow-hidden flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-neutral-900/90 border-orange-500 ring-1 ring-orange-500/50 shadow-xl shadow-orange-500/10' 
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80'
                  }`}
                >
                  {/* Top Row */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🇮🇳</span>
                          <h3 className="text-base font-bold text-neutral-100">{carrier.name}</h3>
                        </div>
                        <p className="text-xs font-medium text-orange-400">{carrier.brand}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        carrier.type === 'Private MNO' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : carrier.type === 'Govt of India PSU'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}>
                        {carrier.type}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 mb-4 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Market Share:</span>
                        <span className="font-semibold text-neutral-200">{carrier.marketShare}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Subscribers:</span>
                        <span className="font-semibold text-emerald-400">{carrier.subscribers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">5G Core Architecture:</span>
                        <span className="font-semibold text-orange-300">{carrier.fiveGArchitecture}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Parent / Leadership:</span>
                        <span className="font-medium text-neutral-300 truncate max-w-[180px]">{carrier.founderOrParent}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Key Technologies & Bands:</div>
                      <div className="flex flex-wrap gap-1">
                        {carrier.keyFrequencyBands.slice(0, 3).map((band, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] text-neutral-300 border border-neutral-700">
                            {band}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 text-[11px]">
                      APN: <code className="text-orange-400 font-mono font-bold">{carrier.apnSettings.apn}</code>
                    </span>
                    <span className="text-orange-400 font-semibold flex items-center gap-1">
                      <span>View Technical Dossier</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Carrier Comprehensive Deep-Dive */}
          {selectedCarrier && (
            <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇮🇳</span>
                    <h3 className="text-xl font-bold text-neutral-100">{selectedCarrier.name} ({selectedCarrier.brand})</h3>
                  </div>
                  <p className="text-xs text-neutral-400 italic">"{selectedCarrier.tagline}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedCarrier.customerSupport.website}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Overview & Key Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-orange-400" />
                      <span>Executive Overview & Network Footprint</span>
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80">
                      {selectedCarrier.overview}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Key Technical Innovations & Strengths</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCarrier.coreStrengths.map((str, i) => (
                        <div key={i} className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60 text-xs text-neutral-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequency Spectrum Matrix for this Operator */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-blue-400" />
                      <span>Deployed Frequency Spectrum Bands</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCarrier.keyFrequencyBands.map((band, idx) => (
                        <div key={idx} className="px-3 py-1.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-300 font-mono">
                          {band}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: APN, USSD & Support Contacts */}
                <div className="space-y-5">
                  {/* APN Configuration Box */}
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                        <Wifi className="w-3.5 h-3.5 text-orange-400" />
                        <span>Official APN Settings</span>
                      </span>
                      <button
                        onClick={() => handleCopy(selectedCarrier.apnSettings.apn)}
                        className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                      >
                        {copiedCode === selectedCarrier.apnSettings.apn ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy APN</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Name:</span>
                        <span className="font-semibold text-neutral-300">{selectedCarrier.apnSettings.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">APN:</span>
                        <span className="font-mono font-bold text-orange-400">{selectedCarrier.apnSettings.apn}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Authentication:</span>
                        <span className="text-neutral-300">{selectedCarrier.apnSettings.authType}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Protocol:</span>
                        <span className="text-neutral-300">{selectedCarrier.apnSettings.protocol}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Care & Emergency Numbers */}
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                    <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Helplines & Official App</span>
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Complaints / Care:</span>
                        <span className="font-mono font-bold text-neutral-200">{selectedCarrier.customerSupport.helpline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Toll-Free Helpline:</span>
                        <span className="font-mono font-bold text-neutral-200">{selectedCarrier.customerSupport.tollFree}</span>
                      </div>
                      {selectedCarrier.customerSupport.whatsapp && (
                        <div className="flex justify-between">
                          <span className="text-neutral-500">WhatsApp Support:</span>
                          <span className="font-mono text-emerald-400">{selectedCarrier.customerSupport.whatsapp}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Official Mobile App:</span>
                        <span className="font-semibold text-orange-400">{selectedCarrier.customerSupport.app}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Porting Syntax (MNP):</span>
                        <span className="font-mono text-neutral-300 text-[11px]">{selectedCarrier.mnpFormat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrier USSD Quick Codes List */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-orange-400" />
                    <span>Essential USSD Codes for {selectedCarrier.name}</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 font-normal">Click code to copy to dialer</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedCarrier.ussdCodes.map((ussd, i) => (
                    <div
                      key={i}
                      onClick={() => handleCopy(ussd.code)}
                      className="group cursor-pointer p-3 rounded-xl bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="font-bold text-xs text-neutral-200">{ussd.label}</div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">{ussd.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 font-mono text-xs font-bold border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-neutral-950 transition-colors">
                        <span>{ussd.code}</span>
                        {copiedCode === ussd.code ? <Check className="w-3 h-3 text-emerald-400 group-hover:text-neutral-950" /> : <Copy className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 22 TELECOM CIRCLES (LSAs) */}
      {activeTab === 'circles' && (
        <div className="space-y-6">
          {/* Circle Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={circleSearch}
                onChange={e => setCircleSearch(e.target.value)}
                placeholder="Search state, city, STD code (e.g. 011, Delhi)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {(['all', 'Metro', 'Category A', 'Category B', 'Category C'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCircleCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                    circleCategoryFilter === cat ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {cat === 'all' ? 'All Circles' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Circles Master Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCircles.map(circle => {
              const isSelected = selectedCircle?.id === circle.id;
              return (
                <div
                  key={circle.id}
                  onClick={() => setSelectedCircle(circle)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-neutral-900 border-orange-500 ring-1 ring-orange-500/50 shadow-lg' 
                      : 'bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 font-mono font-bold text-xs border border-orange-500/20">
                            {circle.circleCode}
                          </span>
                          <h4 className="font-bold text-sm text-neutral-100">{circle.name}</h4>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">{circle.statesCovered.join(', ')}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 text-[10px] shrink-0">
                        {circle.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">5G Saturation:</span>
                        <span className="font-semibold text-emerald-400">{circle.fiveGCoverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">STD Codes:</span>
                        <span className="font-mono text-neutral-300">{circle.stdCodes.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Prefixes:</span>
                        <span className="font-mono text-orange-400">{circle.samplePrefixes.slice(0, 3).join(', ')}...</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Key Cities: {circle.keyCities.slice(0, 2).join(', ')}</span>
                    <span className="text-orange-400 font-medium">Details →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Circle Technical Inspector */}
          {selectedCircle && (
            <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-mono font-bold text-lg">
                    {selectedCircle.circleCode}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100">{selectedCircle.name}</h3>
                    <p className="text-xs text-neutral-400">{selectedCircle.category} • DoT Licensed Service Area</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    5G Coverage: {selectedCircle.fiveGCoverage}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>States & Key Hubs</span>
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="text-neutral-300 font-semibold">{selectedCircle.statesCovered.join(', ')}</div>
                    <div className="text-neutral-400">Major Cities: {selectedCircle.keyCities.join(', ')}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                    <span>STD & Mobile Prefixes</span>
                  </span>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-neutral-300">STD: {selectedCircle.stdCodes.join(', ')}</div>
                    <div className="text-orange-400">Prefixes: {selectedCircle.samplePrefixes.join(', ')}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Carrier MNC Sample</span>
                  </span>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-blue-300">Jio: {selectedCircle.mncSample.jio}</div>
                    <div className="text-red-300">Airtel: {selectedCircle.mncSample.airtel}</div>
                    <div className="text-amber-300">Vi: {selectedCircle.mncSample.vi}</div>
                    <div className="text-emerald-300">BSNL: {selectedCircle.mncSample.bsnl}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: NUMBER & PREFIX DECODER */}
      {activeTab === 'decoder' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-6">
            <div className="max-w-xl space-y-2">
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Hash className="w-5 h-5 text-orange-400" />
                <span>National Numbering Plan (NNP) Decoder for India</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter any 10-digit Indian mobile number or 4-digit prefix (e.g. <code className="text-orange-300">9810</code>, <code className="text-orange-300">9845</code>, <code className="text-orange-300">7004</code>, <code className="text-orange-300">9415</code>) to inspect initial circle allocation, originating carrier series, and LSA classification.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={decoderInput}
                  onChange={e => setDecoderInput(e.target.value)}
                  placeholder="Enter phone number (e.g. +91 98101 23456 or 9845...)"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 font-mono placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <button
                onClick={() => setDecoderInput('9845012345')}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors shrink-0"
              >
                Sample (Bengaluru)
              </button>
              <button
                onClick={() => setDecoderInput('9810012345')}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors shrink-0"
              >
                Sample (Delhi)
              </button>
            </div>

            {/* Decoded Inspection Result */}
            {decodedData && decodedData.match ? (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-950 to-orange-950/30 border border-orange-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇮🇳</span>
                    <span className="text-sm font-bold text-neutral-100">Decoded Series: {decodedData.prefix}xxxx</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                    DoT Validated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-500">Originating Circle:</div>
                    <div className="font-bold text-neutral-100 text-sm mt-0.5">{decodedData.match.circle}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-500">Initial Operator Series:</div>
                    <div className="font-bold text-orange-400 text-sm mt-0.5">{decodedData.match.carrier}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-500">Primary Metro / Region:</div>
                    <div className="font-bold text-neutral-200 text-sm mt-0.5">{decodedData.match.region}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-500">LSA Category:</div>
                    <div className="font-bold text-blue-400 text-sm mt-0.5">{decodedData.circleMatch?.category || 'Standard Circle'}</div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800/80 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    Note: Mobile Number Portability (MNP) enables subscribers to switch between operators (e.g. Airtel to Jio) while retaining this series. The initial series allocation remains registered with the originating circle MSC switch under DoT National Numbering records.
                  </span>
                </div>
              </div>
            ) : decoderInput ? (
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Prefix not found in high-priority cache. Standard 10-digit Indian numbers belong to 9xxx, 8xxx, 7xxx, or 6xxx series allocated under the DoT NNP 2003 / 2024 revised schema.</span>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 4: SANCHAR SAATHI & SECURITY SUITE */}
      {activeTab === 'sanchar_saathi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SANCHAR_SAATHI_SUITE.map(tool => (
              <div key={tool.id} className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-orange-400" />
                        <h3 className="font-bold text-base text-neutral-100">{tool.title}</h3>
                      </div>
                      <p className="text-xs text-emerald-400 font-semibold">{tool.badge}</p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/80">
                    {tool.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">How to Utilize:</div>
                    <div className="space-y-1.5">
                      {tool.howToUse.map((step, idx) => (
                        <div key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-red-300">
                    <span className="font-bold">Legal Mandate / Penalty: </span>
                    <span>{tool.legalLimitOrPenalty}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">{tool.regulatoryAuthority}</span>
                  <a
                    href={tool.officialPortal}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Open Govt Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: 5G SPECTRUM SPECS */}
      {activeTab === 'spectrum' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-4">
            <div className="max-w-2xl space-y-1">
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Radio className="w-5 h-5 text-orange-400" />
                <span>Indian 5G & 4G Spectrum Allocation Matrix</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Breakdown of the ₹1.5 Lakh Crore spectrum auctions conducted by the Department of Telecommunications (DoT) across Low, Mid, High, and Millimeter-Wave frequencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {INDIA_5G_SPECTRUM_SPECS.map((spec, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 font-mono font-bold text-xs border border-orange-500/20">
                        {spec.band}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 font-mono">
                        {spec.duplex}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-neutral-100">{spec.frequency}</div>
                    <div className="text-xs text-neutral-400">{spec.coverageProperty}</div>

                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Speed Potential:</span>
                        <span className="font-semibold text-emerald-400">{spec.speedCapability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Key Operators:</span>
                        <span className="text-neutral-300 font-medium">{spec.keyHolders.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/60 text-[11px] text-neutral-400">
                    <span className="font-semibold text-neutral-300">Ideal For:</span> {spec.idealUseCase}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: USSD & APN CHEAT SHEET */}
      {activeTab === 'ussd' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-orange-400" />
                  <span>Master USSD Dial Codes for Indian SIMs</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Instant dialer codes for checking main balance, 5G data allowance, own phone number, and plan expiry date.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                {['all', 'jio', 'airtel', 'vi', 'bsnl'].map(cId => (
                  <button
                    key={cId}
                    onClick={() => setUssdCarrierFilter(cId)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                      ussdCarrierFilter === cId ? 'bg-orange-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cId}
                  </button>
                ))}
              </div>
            </div>

            {/* USSD Master Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INDIA_CARRIERS
                .filter(c => ussdCarrierFilter === 'all' || c.id === ussdCarrierFilter)
                .flatMap(c => c.ussdCodes.map(u => ({ ...u, carrierName: c.name, brand: c.brand, carrierId: c.id })))
                .map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopy(item.code)}
                    className="group cursor-pointer p-3.5 rounded-xl bg-neutral-950/70 hover:bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-all flex items-center justify-between"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-orange-400 font-medium">
                          {item.brand}
                        </span>
                        <span className="font-bold text-xs text-neutral-200">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 font-mono text-xs font-bold border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-neutral-950 transition-colors">
                      <span>{item.code}</span>
                      {copiedCode === item.code ? <Check className="w-3 h-3 text-emerald-400 group-hover:text-neutral-950" /> : <Copy className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
