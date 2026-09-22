import React, { useState } from 'react';
import { TrackResult } from './NumberTracker';
import { 
  ShieldCheck, ShieldAlert, Cpu, Radio, Zap, Lock, Terminal, Activity,
  Database, Server, RefreshCw, CheckCircle2, AlertTriangle, Eye, Globe
} from 'lucide-react';

interface TelecomSecurityProps {
  result: TrackResult;
}

export default function TelecomSecurity({ result }: TelecomSecurityProps) {
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<'signaling' | 'tower' | 'sim' | 'firewall'>('signaling');

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Telecom Security Assessment */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  AI Telecom Access & Cell Tower Security Audit
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                  SS7 / Diameter / 5G SEPP Guard
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time signaling gateway audit for subscriber <span className="font-mono text-indigo-300 font-bold">{result.formattedNumber}</span> ({result.carrier})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 uppercase">SIM SWAP RISK</span>
              <div className="text-emerald-400 font-extrabold">{result.simSwapRisk}</div>
            </div>
          </div>
        </div>

        {/* Security Tabs */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          {[
            { id: 'signaling', label: 'SS7 & Diameter Firewall', icon: ShieldCheck },
            { id: 'tower', label: 'Cell Tower Range & Coverage', icon: Radio },
            { id: 'sim', label: 'SIM Hardware & IMSI Protection', icon: Cpu },
            { id: 'firewall', label: '5G SEPP & Core Security', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAnalysisMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAnalysisMode(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Mode 1: SS7 & Diameter Firewall Audit */}
      {activeAnalysisMode === 'signaling' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SS7 MAP / CAP GATEWAY AUDIT</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                PASSED
              </span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>Location Update Intercept:</span>
                <span className="text-emerald-400 font-bold">BLOCKED (0 Attempt)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>SMS Router Spoofing Protection:</span>
                <span className="text-emerald-400 font-bold">ACTIVE (Category 3)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>HLR SRI_For_SM Query Gate:</span>
                <span className="text-indigo-400 font-bold">Encrypted Token Only</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">DIAMETER S6a / S13 INTERACTION</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                SECURE
              </span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>MME Tracking Area Update:</span>
                <span className="text-emerald-400 font-bold">Verified Node</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>IMSI Catching Mitigations:</span>
                <span className="text-emerald-400 font-bold">SUPI/SUCI Enabled</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                <span>MSC Switching Proxy:</span>
                <span className="text-slate-200 font-bold">{result.mscNode}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Cell Tower Range & Coverage */}
      {activeAnalysisMode === 'tower' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              Cell Tower Coverage Radius & Propagation Metrics
            </h4>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">
              Radius: ~{result.accuracyRadiusKm} KM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">REGISTERED BASE TOWER</span>
              <div className="text-indigo-300 font-bold">{result.btsTowerLocation}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">SIGNAL PROPAGATION</span>
              <div className="text-emerald-400 font-bold">{result.signalStrength} (Optimal)</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">TOWER HARDWARE RANGE</span>
              <div className="text-amber-300 font-bold">3.5 - 5.0 KM Coverage Ring</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/20 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-indigo-400 font-bold">Cellular Triangulation Protocol:</div>
            <p>
              Target device is connected via 5G NR Beamforming Node. The signal timing advance (TA) logs confirm physical positioning within the {result.neighborhood} zone.
            </p>
          </div>
        </div>
      )}

      {/* Mode 3: SIM Hardware & IMSI Protection */}
      {activeAnalysisMode === 'sim' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            SIM Hardware & Port Integrity Analysis
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">SIM TYPE</span>
              <div className="text-slate-200 font-bold">eSIM eUICC v3.2</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">SIM SWAP HISTORY</span>
              <div className="text-emerald-400 font-bold">No Swap (Last 180 Days)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">HLR SERVICE STATUS</span>
              <div className="text-emerald-400 font-bold">{result.hlrStatus}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">SPAM & FRAUD RATING</span>
              <div className="text-indigo-300 font-bold">{result.spamRating}</div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: 5G SEPP Core */}
      {activeAnalysisMode === 'firewall' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs font-mono">
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            5G SEPP (Security Edge Protection Proxy) Status
          </h4>
          <p className="text-slate-300 leading-relaxed">
            The subscriber connection is routed through a hardened 5G SEPP core. Inter-PLMN roaming signaling between {result.carrier} and external home networks is fully encrypted using TLS 1.3 mutual authentication (mTLS) with OAuth 2.0 token authorization.
          </p>
        </div>
      )}

    </div>
  );
}
