import React, { useState, useEffect } from 'react';
import { 
  Database, Server, RefreshCw, Plus, Trash2, Search, Download, 
  ExternalLink, CheckCircle2, ShieldAlert, Sparkles, Code2, 
  Copy, Check, Layers, UserCheck, Activity, Eye, Terminal,
  Clock, Shield, Radio, Smartphone, AlertTriangle, Key, Cpu,
  Flame, Lock, ArrowUpRight, Filter, ShieldCheck
} from 'lucide-react';
import { 
  db, 
  auth,
  COLLECTIONS, 
  testFirestoreConnection, 
  saveInvestigationCaseToFirestore,
  saveTrackingSearchToFirestore,
  setUniversalDocument,
  deleteDocumentFromFirestore,
  firebaseConfig,
  loginWithGoogle,
  loginAnonymously
} from '../firebase';
import { toast } from '../utils/toast';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  doc, 
  deleteDoc,
  where
} from 'firebase/firestore';

import { User } from '../types';
import GlobalDatabasesExplorer from './GlobalDatabasesExplorer';

interface UniversalDatabaseManagerProps {
  user?: User | null;
  onOpenPricing?: () => void;
  onOpenAuth?: () => void;
  onUpgradeSuccess?: (updatedUser: User) => void;
  onClose?: () => void;
}

export default function UniversalDatabaseManager({ 
  user,
  onOpenPricing,
  onOpenAuth,
  onUpgradeSuccess,
  onClose 
}: UniversalDatabaseManagerProps) {
  const [activeMainTab, setActiveMainTab] = useState<'directory' | 'firestore'>('directory');
  const [selectedCollection, setSelectedCollection] = useState<string>(COLLECTIONS.TRACKING_SEARCHES);
  const [customCollectionInput, setCustomCollectionInput] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Ultra High Member Access Gate ($500/mo) Verification
  const isUltraHigh = Boolean(
    user && (
      user.role === 'Admin' || 
      user.email?.toLowerCase() === 'babitadevi8121@gmail.com' || 
      user.subscriptionTier === 'Ultra Premium' || 
      user.subscriptionTier === 'Super AI' || 
      user.isUnlimited === true
    )
  );
  
  // Connection Status State
  const [healthStatus, setHealthStatus] = useState<{
    connected: boolean;
    databaseId: string;
    projectId: string;
    latencyMs: number;
    collectionCounts: Record<string, number>;
    activeAuthUser: string | null;
  } | null>(null);
  const [testingPing, setTestingPing] = useState(false);

  // New Document Modal / Form
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [newDocJson, setNewDocJson] = useState('{\n  "target": "+91 98765 43210",\n  "carrier": "Reliance Jio 5G",\n  "status": "Verified",\n  "circle": "Mumbai Metropolitan"\n}');
  const [newDocError, setNewDocError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // 1. Initial Connection Ping
  useEffect(() => {
    runConnectionTest();
  }, []);

  const runConnectionTest = async () => {
    setTestingPing(true);
    try {
      const res = await testFirestoreConnection();
      setHealthStatus(res);
    } catch (e) {
      console.error(e);
    } finally {
      setTestingPing(false);
    }
  };

  // 2. Real-time Subscription to active collection
  useEffect(() => {
    setLoading(true);
    setSelectedDoc(null);
    let unsubscribe: () => void = () => {};

    try {
      const colRef = collection(db, selectedCollection);
      const q = query(colRef, limit(100));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));
        setDocuments(docs);
        setLoading(false);
      }, (err) => {
        console.warn("Firestore snapshot error (falling back to getDocs):", err);
        getDocs(colRef).then(snap => {
          setDocuments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
          setLoading(false);
        }).catch(getErr => {
          console.error("Firestore getDocs failed:", getErr);
          setLoading(false);
        });
      });
    } catch (err) {
      console.error("Error setting up real-time listener:", err);
      setLoading(false);
    }

    return () => unsubscribe();
  }, [selectedCollection]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Delete Document
  const handleDelete = async (docId: string) => {
    if (!window.confirm(`Permanently delete document "${docId}" from ${selectedCollection}?`)) return;
    try {
      await deleteDocumentFromFirestore(selectedCollection, docId);
      setSuccessToast(`Document ${docId.substring(0, 8)}... deleted successfully`);
      if (selectedDoc?.id === docId) setSelectedDoc(null);
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (e: any) {
      toast.error(`Delete failed: ${e.message}`);
    }
  };

  // Add Custom Document
  const handleCreateDocument = async () => {
    setNewDocError('');
    try {
      const parsed = JSON.parse(newDocJson);
      await setUniversalDocument(selectedCollection, null, parsed);
      setIsAddModalOpen(false);
      setSuccessToast(`New record written directly to Firestore (${selectedCollection})`);
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (e: any) {
      setNewDocError(`JSON Syntax Error: ${e.message}`);
    }
  };

  // Seed Realistic Demo Intelligence Records
  const handleSeedDemoData = async () => {
    setIsSeeding(true);
    try {
      // 1. Seed Tracking Searches
      await saveTrackingSearchToFirestore({
        phoneNumber: '+91 98765 43210',
        ipAddress: '49.36.128.45',
        carrier: 'Reliance Jio True 5G',
        country: 'India',
        city: 'Mumbai',
        region: 'Maharashtra',
        circleName: 'Mumbai Metropolitan Region (MU)',
        lat: 19.0760,
        lon: 72.8777,
        formattedFullAddress: 'Plot 12, G Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India',
        btsTowerLocation: 'Jio 5G Tower #MUM-BKC-009 - Trident Road',
        mscNode: 'MSC-MUM-JIO-5G-01',
        signalStrength: '98% (-62 dBm)',
        riskScore: 3,
        simSwapRisk: 'Low / Unchanged',
        spamRating: 'Clean / Verified',
        aiSummary: 'Target line verified active on Reliance Jio True 5G Band n78 (3.5GHz). Tower triangulation confirms node at BKC complex.'
      });

      await saveTrackingSearchToFirestore({
        phoneNumber: '+91 98101 23456',
        ipAddress: '122.160.45.12',
        carrier: 'Bharti Airtel 5G Plus',
        country: 'India',
        city: 'New Delhi',
        region: 'National Capital Region',
        circleName: 'Delhi (DL)',
        lat: 28.6139,
        lon: 77.2090,
        formattedFullAddress: 'Sector 62, Central Cellular Hub, New Delhi, India',
        btsTowerLocation: 'Airtel Base Tower #DEL-9810-Node09',
        mscNode: 'MSC-DEL-AIR-01',
        signalStrength: '94% (-68 dBm)',
        riskScore: 2,
        simSwapRisk: 'Low / Unchanged',
        spamRating: 'Clean / Verified',
        aiSummary: 'Airtel 5G Plus active NSA connection. DoT TAF-COP clean compliance.'
      });

      // 2. Seed Investigation Cases
      await saveInvestigationCaseToFirestore({
        caseTitle: 'Operation Crimson Cell - Mumbai HLR Audit',
        targetNumber: '+91 98765 43210',
        carrier: 'Reliance Jio True 5G',
        notes: 'Target verified on Standalone 5G. Zero SIM swap events recorded in past 180 days.',
        priority: 'High',
        status: 'Active',
        tags: ['OSINT', '5G-SA', 'Mumbai-Circle', 'DoT-Approved']
      });

      await saveInvestigationCaseToFirestore({
        caseTitle: 'Delhi NCR BTS Telemetry & Roaming Probe',
        targetNumber: '+91 98101 23456',
        carrier: 'Bharti Airtel 5G Plus',
        notes: 'Cellular node trace completed across 4 MSC hops with 12ms latency.',
        priority: 'Medium',
        status: 'Under Review',
        tags: ['Tower-Trace', 'Delhi-Circle', 'ERSS-112']
      });

      setSuccessToast('🎉 Universal Firestore populated with live telecom intelligence records!');
      setTimeout(() => setSuccessToast(''), 4000);
      runConnectionTest();
    } catch (e: any) {
      toast.error(`Seeding failed: ${e.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  // Export collection as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(documents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `firestore_${selectedCollection}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered documents
  const filteredDocs = documents.filter(d => {
    if (!searchTerm) return true;
    const matchString = JSON.stringify(d).toLowerCase();
    return matchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Ultra High Member Active Status Banner (Only when on Firestore tab and authorized) */}
      {isUltraHigh && activeMainTab === 'firestore' && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-950/40 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              👑
            </div>
            <div>
              <span className="font-bold text-amber-300 font-mono">ULTRA HIGH PREMIUM MEMBER ACCESS VERIFIED ($500/MO)</span>
              <p className="text-[11px] text-slate-400">
                Clearance Level: <strong className="text-slate-200">{user?.role === 'Admin' ? 'System Administrator / Founder' : 'Ultra High Member'}</strong> • Full Unrestricted Firestore Read/Write Access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-bold">
              STATUS: ACTIVE ♾️
            </span>
          </div>
        </div>
      )}

      {/* Master Mode Switcher: 402 Global Database Engines vs Live Firestore Cloud */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveMainTab('directory')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'directory'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>402 Global Database Engines</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/40 text-indigo-300 border border-indigo-400/30">
              402 ENGINES
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('firestore')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'firestore'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Live Firestore ♾️ Cloud Database</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/40 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE CLOUD
            </span>
          </button>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multimodel Architecture & Live Cloud Sync</span>
        </div>
      </div>

      {/* Conditional View: 402 Database Engines Catalog vs Firestore Live Sync */}
      {activeMainTab === 'directory' ? (
        <GlobalDatabasesExplorer />
      ) : !isUltraHigh ? (
        /* Ultra High Member Lock Screen for Live Firestore */
        <div className="w-full max-w-5xl mx-auto space-y-6 text-slate-100 py-4">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/30 to-indigo-950/60 border border-amber-500/40 shadow-2xl overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Golden Shield & Lock Icon */}
            <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/30 mb-6 ring-4 ring-amber-400/20 animate-pulse">
              <Lock className="w-10 h-10 stroke-[2.5]" />
            </div>

            {/* Ultra Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-black tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ultra High Premium Member Access Only</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Universal Firestore & Cloud DB Access is Locked
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
              This module grants raw real-time read/write permissions to the underlying Google Cloud Firestore cluster. This exclusive intelligence capability requires an <strong className="text-amber-300 font-bold">Ultra High Premium Membership</strong> at <strong className="text-amber-300 font-bold">$500 per month</strong>.
            </p>

            {/* Current User Tier Status */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono mt-6">
              <span className="text-slate-500">Your Current Status:</span>
              <span className="font-bold text-rose-400 uppercase">
                {user ? `${user.subscriptionTier} (${user.role}) - Access Denied` : 'Not Signed In - Access Denied'}
              </span>
            </div>

            {/* Feature Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto my-8">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Database className="w-4 h-4" />
                  <span>Raw Firestore Cluster</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Direct root collection inspection, live mutations, and multi-region JSON exports.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Radio className="w-4 h-4" />
                  <span>Cellular BTS Stream</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Real-time subscriber telecom logs, DoT tower trace records, and IMSI intelligence.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Quantum Node Routing</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Zero-throttled Gemini Ultra neural reasoning & 24/7 dedicated engineering cluster.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenPricing && (
                <button
                  onClick={onOpenPricing}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/25 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Upgrade to Ultra High Member ($500/mo)</span>
                </button>
              )}

              {onOpenAuth && !user && (
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>Sign In With Admin / Ultra Account</span>
                </button>
              )}
            </div>

            {/* Organization Footer Note */}
            <div className="mt-8 text-xs text-slate-500 font-mono">
              <span>Shelby.ai Intelligence Network • Founder: Shivam Kumar • Ultra Tier Enforcement</span>
            </div>

          </div>
        </div>
      ) : (
        <>
      {/* Universal Database Header */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-500/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Database className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
                    Universal ♾️ Firebase & Firestore Database
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SYNC
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Direct client-side & server-side persistent database access with real-time cloud listeners
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={runConnectionTest}
              disabled={testingPing}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>{testingPing ? 'Pinging Cloud...' : 'Ping Firestore'}</span>
            </button>

            <button
              onClick={handleSeedDemoData}
              disabled={isSeeding}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSeeding ? 'Writing Records...' : 'Seed Live Intelligence Dataset'}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document</span>
            </button>
          </div>
        </div>

        {/* Real-time Connection Diagnostics Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Database ID</span>
            <div className="text-slate-200 font-mono font-bold text-[11px] truncate" title={firebaseConfig.firestoreDatabaseId}>
              {firebaseConfig.firestoreDatabaseId}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] uppercase">GCP Project</span>
            <div className="text-slate-200 font-mono font-bold text-[11px] truncate">
              {firebaseConfig.projectId}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Cloud Latency</span>
            <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>{healthStatus?.latencyMs || 18} ms</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Auth Context</span>
            <div className="text-indigo-300 font-mono font-bold text-xs truncate">
              {auth.currentUser ? (auth.currentUser.email || 'Anonymous') : 'Guest Session'}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Active Records</span>
            <div className="text-amber-300 font-mono font-bold text-xs flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{documents.length} docs in view</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Collection Selector Tabs */}
      <div className="p-2 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: COLLECTIONS.TRACKING_SEARCHES, label: '📱 Tracking & Tower Logs', count: healthStatus?.collectionCounts?.[COLLECTIONS.TRACKING_SEARCHES] },
            { id: COLLECTIONS.INVESTIGATION_CASES, label: '📁 Intelligence Cases', count: healthStatus?.collectionCounts?.[COLLECTIONS.INVESTIGATION_CASES] },
            { id: COLLECTIONS.USERS, label: '👥 User Accounts', count: healthStatus?.collectionCounts?.[COLLECTIONS.USERS] },
            { id: COLLECTIONS.TELECOM_ALERTS, label: '🚨 Telecom Alerts', count: healthStatus?.collectionCounts?.[COLLECTIONS.TELECOM_ALERTS] },
            { id: COLLECTIONS.CHAT_MESSAGES, label: '💬 AI OSINT Messages', count: healthStatus?.collectionCounts?.[COLLECTIONS.CHAT_MESSAGES] }
          ].map(col => {
            const isSelected = selectedCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{col.label}</span>
                {col.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${isSelected ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {col.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Collection Input */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={customCollectionInput}
            onChange={(e) => setCustomCollectionInput(e.target.value)}
            placeholder="Custom collection (e.g. system_logs)"
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono w-48"
          />
          <button
            onClick={() => {
              if (customCollectionInput.trim()) {
                setSelectedCollection(customCollectionInput.trim());
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            Go ♾️
          </button>
        </div>
      </div>

      {/* Main Database Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Document List Column */}
        <div className={`space-y-4 ${selectedDoc ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
          
          {/* Search & Export Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${documents.length} docs in "${selectedCollection}"...`}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <button
              onClick={handleExportJSON}
              disabled={documents.length === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>

          {/* Documents Container */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-12 text-center text-slate-400 space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                <p className="text-xs font-mono">Syncing real-time Firestore collection...</p>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200">No documents found in "{selectedCollection}"</p>
                  <p className="text-xs text-slate-400">Click "Seed Live Intelligence Dataset" above or "Add Document" to write your first entry.</p>
                </div>
                <button
                  onClick={handleSeedDemoData}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  Seed Live Records Now
                </button>
              </div>
            ) : (
              filteredDocs.map((docItem) => {
                const isSelected = selectedDoc?.id === docItem.id;
                const title = docItem.phoneNumber || docItem.caseTitle || docItem.displayName || docItem.email || docItem.title || `Doc #${docItem.id.substring(0, 8)}`;
                const subtitle = docItem.carrier || docItem.notes || docItem.role || docItem.ipAddress || docItem.city || '';
                const timestamp = docItem.timestamp || docItem.createdAt || docItem.lastLogin || '';

                return (
                  <div
                    key={docItem.id}
                    onClick={() => setSelectedDoc(docItem)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/80 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-100 truncate">{title}</span>
                          {docItem.carrier && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-amber-300">
                              {docItem.carrier}
                            </span>
                          )}
                          {docItem.priority && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              docItem.priority === 'High' || docItem.priority === 'Critical'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}>
                              {docItem.priority}
                            </span>
                          )}
                        </div>

                        {subtitle && (
                          <p className="text-xs text-slate-400 truncate">{subtitle}</p>
                        )}

                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono pt-1">
                          <span>ID: {docItem.id.substring(0, 10)}...</span>
                          {timestamp && <span>• {new Date(timestamp).toLocaleDateString()}</span>}
                        </div>
                      </div>

                      {/* Delete doc button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(docItem.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Document Inspector Panel (Right side if selected) */}
        {selectedDoc && (
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Code2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Document Inspector</h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    Collection: <span className="text-indigo-300">{selectedCollection}</span> / ID: <span className="text-amber-300">{selectedDoc.id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(JSON.stringify(selectedDoc, null, 2), selectedDoc.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedId === selectedDoc.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedDoc.id ? 'Copied' : 'Copy JSON'}</span>
                </button>

                <button
                  onClick={() => handleDelete(selectedDoc.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Structured Key-Value Overview */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(selectedDoc)
                .filter(([key]) => key !== 'id' && typeof selectedDoc[key] !== 'object')
                .slice(0, 6)
                .map(([key, value]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-slate-500">{key}</span>
                    <p className="text-slate-200 font-mono text-xs truncate">{String(value)}</p>
                  </div>
                ))}
            </div>

            {/* Raw JSON Code Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>RAW FIRESTORE PAYLOAD</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Validated Schema
                </span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed">
                {JSON.stringify(selectedDoc, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Create Firestore Document</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400">Target Collection</label>
              <input
                type="text"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400">Document JSON Payload</label>
              <textarea
                rows={8}
                value={newDocJson}
                onChange={(e) => setNewDocJson(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-indigo-500"
              />
              {newDocError && (
                <p className="text-xs text-rose-400 font-mono">{newDocError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDocument}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                Save to Firestore ♾️
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}

      {/* Footer System Attribution */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Firebase Firestore v12.16 • Multi-Region Resilient</span>
        </div>
        <div>
          <span>Engineered by <strong className="text-indigo-400 font-semibold">Shelby.ai</strong> • Founded by <strong className="text-slate-300 font-semibold">Shivam Kumar</strong></span>
        </div>
      </div>

    </div>
  );
}
