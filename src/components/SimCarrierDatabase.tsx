import React, { useState, useMemo } from 'react';
import { GLOBAL_SIM_DATABASE, SimCarrier } from '../data/simCarriers';
import { 
  Globe, Search, Filter, ShieldCheck, Radio, Smartphone, Cpu, CheckCircle2,
  AlertCircle, Sparkles, Database, Layers, Signal, Server, ArrowUpRight, Lock
} from 'lucide-react';

export default function SimCarrierDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [selectedCarrier, setSelectedCarrier] = useState<SimCarrier | null>(GLOBAL_SIM_DATABASE[0]);

  // Unique country list
  const countries = useMemo(() => {
    const list = Array.from(new Set(GLOBAL_SIM_DATABASE.map(c => c.country)));
    return ['ALL', ...list.sort()];
  }, []);

  // Filtered Carriers
  const filteredCarriers = useMemo(() => {
    return GLOBAL_SIM_DATABASE.filter((item) => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mcc.includes(searchTerm) ||
        item.mnc.includes(searchTerm) ||
        item.bands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCountry = selectedCountry === 'ALL' || item.country === selectedCountry;
      const matchTech = selectedTech === 'ALL' || item.tech.some(t => t.includes(selectedTech));

      return matchSearch && matchCountry && matchTech;
    });
  }, [searchTerm, selectedCountry, selectedTech]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 animate-pulse" />
                GLOBAL TELECOM OPERATOR DATABASE 🌍
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold">
                {GLOBAL_SIM_DATABASE.length}+ Verified MNOs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Worldwide SIM Companies & Carrier Intelligence Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Inspect Mobile Country Codes (MCC), Mobile Network Codes (MNC), 5G NR/LTE frequency bands, SIM security standards, and global roaming coverage metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-400 uppercase">MCC/MNC Index</div>
              <div className="text-base font-extrabold text-emerald-400">GSMA Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search carrier, MCC/MNC, country, or band (e.g. n78, 310)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Country Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Countries ({countries.length - 1})</option>
              {countries.filter(c => c !== 'ALL').map(country => (
                <option key={country} value={country} className="bg-slate-900 text-slate-200">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Tech Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Tech Generations</option>
              <option value="5G" className="bg-slate-900">5G Standalone / NSA</option>
              <option value="4G" className="bg-slate-900">4G LTE-A</option>
              <option value="VoNR" className="bg-slate-900">VoNR / VoLTE</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Grid: List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Carrier Cards List */}
        <div className="lg:col-span-1 space-y-3 max-h-[680px] overflow-y-auto pr-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
            <span>RESULTS ({filteredCarriers.length})</span>
            <span>CLICK TO INSPECT</span>
          </div>

          {filteredCarriers.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-2">
              <Database className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs font-mono">No SIM carrier matching "{searchTerm}" found.</p>
            </div>
          ) : (
            filteredCarriers.map((carrier) => {
              const isSelected = selectedCarrier?.name === carrier.name;
              return (
                <div
                  key={`${carrier.mcc}-${carrier.mnc}-${carrier.name}`}
                  onClick={() => setSelectedCarrier(carrier)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/10'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{carrier.flag}</span>
                      <span className="font-extrabold text-sm text-slate-100">{carrier.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold text-indigo-400">
                      MCC: {carrier.mcc} | MNC: {carrier.mnc}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center justify-between font-mono">
                    <span>{carrier.country} ({carrier.countryCode})</span>
                    <span className="text-emerald-400 font-semibold">{carrier.subscribers} Subs</span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {carrier.tech.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800/80 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Carrier Inspector */}
        <div className="lg:col-span-2 space-y-4">
          {selectedCarrier ? (
            <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
              
              {/* Top Carrier Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/10">
                    {selectedCarrier.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">
                        {selectedCarrier.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                        {selectedCarrier.status}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-300 font-mono">
                      Brand: {selectedCarrier.brand} • {selectedCarrier.country} ({selectedCarrier.countryCode})
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">MCC / MNC CODE</span>
                  <div className="text-lg font-mono font-extrabold text-emerald-400">
                    {selectedCarrier.mcc}-{selectedCarrier.mnc}
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">OPERATOR TYPE</span>
                  <div className="text-slate-200 font-bold">{selectedCarrier.type}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">SUBSCRIBERS BASE</span>
                  <div className="text-emerald-400 font-bold">{selectedCarrier.subscribers}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">DOMESTIC MARKET SHARE</span>
                  <div className="text-indigo-400 font-bold">{selectedCarrier.marketShare}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">GLOBAL ROAMING PARTNERS</span>
                  <div className="text-amber-300 font-bold">{selectedCarrier.roamingPartners} Networks</div>
                </div>
              </div>

              {/* Supported Technologies */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  CELLULAR NETWORK GENERATIONS & VOIP
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCarrier.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs font-mono font-bold text-indigo-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supported Frequency Bands */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  ALLOCATED 5G NR & 4G FREQUENCY BANDS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCarrier.bands.map((b, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security & Signaling Firewall Spec */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    GSMA TELECOM SECURITY & ENCRYPTION STANDARD
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {selectedCarrier.securityProtocol}
                </p>
              </div>

              {/* Technical Note Banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono text-slate-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-300">Global Carrier Interconnection:</strong> This SIM operator is registered under GSMA MCC-MNC table <code className="text-emerald-400">{selectedCarrier.mcc}-{selectedCarrier.mnc}</code>. Compatible with eSIM eUICC profiles, 5G SA SUCI concealing, and international SS7/Diameter signaling proxies.
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-3">
              <Database className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-mono">Select a carrier from the left list to inspect technical specifications.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
